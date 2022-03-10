---
title: 'How to generate a project tree in Tableau using Python'
date: '2022-03-08'
tags: [tableau, python, tableauserverclient, tableaudocumentapi]
---

If you're working with a Tableau Server instance through the API wrapper Python package `server-client-python`
([Github repo here](https://github.com/tableau/server-client-python)),
you might have a usecase for traversing through a project and all its nested sub-projects from top to bottom,
for example to clone a project structure, since the parent project must exist before you create the child project.

For this, you'll need a tree-like structure to store the relationship between parent and child projects.
I came up with two ways to store the parent-child relationship while allowing traversal:
a tree structure using nested dictionaries, and an adjacency list-like structure using a dictionary and sets/lists.

## Nested dictionaries

For this one, define a function that takes the `server` instance and a `project_id` for the project
you'd like to create a nested structure for. Then, you can generate a set of parent-to-child mappings
by iterating over `server.projects`, create an adjacency list from that,
then use a recursive function to construct the dictionary.
For this case, I'll designate a leaf with `None`.

```python
from collections import defaultdict
import tableauserverclient as TSC


def create_project_tree(server: TSC.Server, project_id: str):
    adj_list = defaultdict(list)
    for project in TSC.Pager(server.projects):
        adj_list[project.parent_id].append(project.id)

    def helper(tree, *ids: str):
        if not ids:
            return None  # use None to designate leaf

        for id in ids:
            tree[id] = helper({}, *adj_list[id])

        return tree

    # recursively generate project tree
    return helper({}, *adj_list[project_id])
```

From this, you'll get a result looking like this (with dummy IDs):

```python
{
    '11123c9b-5e2d-4b1e-969d-1bf28a6ec591': {
        '51916903-d26e-4a4b-9886-aca607b6124f': {
            '22f8d73b-f7c5-4dbc-9d01-783952393d32': None
        },
        '802f358f-af10-4ef5-a8d3-887ebfe62665': None
    }
}
```

## Adjacency list

For this one, create the same function definition as above and take the same adjacency list generating code as well.
You could stop there and generate a site-wide adjacency list, but
you can also do an iterative breadth-first traversal to visit all the children,
keep track of which have been seen, and restrict the adjacency list to that.

```python
from collections import defaultdict, deque
import tableauserverclient as TSC


def create_project_adjacency_list(
    server: TSC.Server, project_id: str
) -> dict[str, list[str]]:
    adj_list = defaultdict(list)
    for project in TSC.Pager(server.projects):
        adj_list[project.parent_id].append(project.id)

    # iterative breadth-first traversal to find all child projects
    # tree structure means no need to keep a visited set
    # (unlike a graph where you may visit the same node more than once)
    seen, queue = [project_id], deque(graph[project_id])
    while queue:
        curr = queue.popleft()
        seen.add(curr)

        if curr in adj_list:
            for child_id in adj_list[curr]:
                queue.append(child_id)

    return {id: adj_list[id] for id in seen}
```

## Usecase: cloning a project structure

One usecase for the above methods might be to clone an existing project structure under a new destination project.
For example, moving or cloning an entire root level project under a test project of some sort. When cloning each project child,
you'll need the parent project cloned first so you can set the `parent_id` of the new child.

Here's how the code for this might look:

```python
import argparse
from collections import defaultdict, deque
from typing import Iterator

import tableauserverclient as TSC

# set these from environment variables, for example
SERVER_URL = None
SITE_ID = None
TOKEN_NAME = None
TOKEN_VALUE = None


def generate_adjacency_list(
    server: TSC.Server
) -> dict[str, list[str]]:
    adj_list = defaultdict(list)
    for project in TSC.Pager(server.projects):
        adj_list[project.parent_id].append(project.id)

    return adj_list


def traverse_project_tree(
    server: TSC.Server, project_id: str
) -> Iterator[tuple[str, str]]:
    adj_list = generate_adjacency_list(server)

    queue = deque([(None, project_id)])
    while queue:
        parent, current = queue.popleft()

        if current in adj_list:
            for child_id in adj_list[current]:
                queue.append((current, child_id))

        yield (parent, current)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument('--project-id', required=True, type=str)
    parser.add_argument('--destination-id', required=True, type=str)

    args = parser.parse_args()

    tableau_auth = TSC.PersonalAccessTokenAuth(
        TOKEN_NAME, TOKEN_VALUE, site_id=SITE_ID
    )
    server = TSC.Server(SERVER_URL)

    with server.auth.sign_in(tableau_auth):
        server.use_server_version()

        # store old to new project id mapping
        # so that we can clone under the new parent
        mapping = {}
        for pair in traverse_project_tree(server, args.project_id):
            parent_id, current_id = pair
            current_project = server.projects.get_by_id(current_id)

            print(f'Cloning {current_project.name}...')

            new_parent_id = mapping.get(parent_id, None)
            new_project_item = TSC.ProjectItem(
                name=current_project.name,
                parent_id=new_parent_id
            )
            new_project = server.projects.create(new_project_item)
            mapping[current_id] = new_project.id

    print('All nested projects cloned cloned')


if __name__ == '__main__':
    main()
```
