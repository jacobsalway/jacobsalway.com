import { FullPost, GroupedPosts, Post } from '@types'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { groupBy } from './utils'

const postsDir = path.join(process.cwd(), 'posts')

export const getPostIds = () => {
    const fileNames = fs.readdirSync(postsDir)
    return fileNames.map((fileName) => fileName.replace(/\.md$/, ''))
}

const loadPost = (id: string) => {
    const fullPath = path.join(postsDir, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf-8')
    return matter(fileContents)
}

export const getPost = (id: string) => {
    const post = loadPost(id)
    const { title, date } = post.data

    return { id, title, date } as Post
}

export const getFullPost = (id: string) => {
    const post = loadPost(id)
    const { data, content } = post
    const { title, date } = data

    return { id, title, date, content } as FullPost
}

export const getPosts = (...ids: string[]) => {
    const postIds = ids.length ? ids : getPostIds()
    return postIds.map((postId) => getPost(postId))
}

export const getFullPosts = (...ids: string[]) => {
    const postIds = ids.length ? ids : getPostIds()
    return postIds.map((postId) => getFullPost(postId))
}

export const sortPostsByDate = <T extends Post>(
    posts: T[],
    ascending = true
): T[] => {
    const sortedPosts = posts.sort((a, b) => {
        const dateA = Date.parse(a.date).valueOf()
        const dateB = Date.parse(b.date).valueOf()
        return ascending ? dateB - dateA : dateA - dateB
    })

    return sortedPosts
}

export const groupPostsByYear = <T extends Post>(
    posts: T[],
    sortWithinYear = true
): GroupedPosts<T>[] => {
    const postsByYear = Array.from(
        groupBy(posts, (post) => new Date(post.date).getFullYear())
    )
    const postsByYearSorted = postsByYear
        .sort((a, b) => b[0] - a[0])
        .map(([year, posts]) => ({ group: year, posts }))

    return sortWithinYear
        ? postsByYearSorted.map(({ group, posts }) => ({
              group,
              posts: sortPostsByDate(posts),
          }))
        : postsByYearSorted
}

export const getAdjacentPosts = <T extends Post>(post: T) => {
    const sortedPosts = sortPostsByDate(getPosts(), false)
    const curr = sortedPosts.findIndex((p) => p.id == post.id)
    const [prev, next] = [curr - 1, curr + 1]

    return {
        prevPost: prev >= 0 ? sortedPosts[prev] : null,
        nextPost: next < sortedPosts.length ? sortedPosts[next] : null,
    }
}

export const getPostViews = () => {
    const viewsFilePath = path.join(process.cwd(), 'views.json')
    const postViewString: { uri: string; views: string }[] = JSON.parse(
        fs.readFileSync(viewsFilePath, 'utf-8')
    )

    const postViews = new Map<string, number>()
    postViewString.forEach(({ uri, views }) =>
        postViews.set(uri, parseInt(views))
    )

    return postViews
}
