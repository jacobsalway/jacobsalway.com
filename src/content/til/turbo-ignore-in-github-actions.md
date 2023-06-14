---
title: turbo-ignore in Github Actions
date: 2023-06-14
---

This is how I set up a Github Actions pipeline for one of my side projects that contains a `pnpm` monorepo and Turborepo,
so that services in monorepo are deployed only if the service or one of its dependencies has been changed. This was motivated
by a long deployment time for a service in the monorepo that I did not change much (plus it saves minutes on the Github Actions free tier).

```yaml
name: pipeline

on:
  push:
    branches:
      - main

jobs:
  lint:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      actions: read
    env:
      TURBO_TEAM: ${{ secrets.TURBO_TEAM }}
      TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
    outputs:
      changes: ${{ fromJSON(steps.changes.outputs.value) }}

    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      # lint, check formatting, etc.
      - ...

      - name: Derive SHA for last successful run
        id: sha
        uses: nrwl/nx-set-shas@v3
        with:
          set-environment-variables-for-job: false

      - name: Set changed workspaces
        id: changes
        run: |
          pnpm turbo run build --dry-run=json \
            --filter="...[${{ steps.sha.outputs.base }}]" \
            | jq -c .packages \
            | xargs -I"{}" echo "value='{}'" >> $GITHUB_OUTPUT

  service1:
    runs-on: ubuntu-latest
    needs: lint
    if: ${{ contains(needs.lint.outputs.changes, 'service1')}}

    steps:
      - ...

  service2:
    runs-on: ubuntu-latest
    needs: lint
    if: ${{ contains(needs.lint.outputs.changes, 'service2')}}

    steps:
      - ...
```

Note that `nrwl/nx-set-shas@v3` determines the changed packages from the last commit where the **whole** pipeline ran successfully, even if some packages were successfully deployed in subsequent runs but the deployment pipeline has a whole did not succeed. I've tried to illustrate this with an example below.

```yaml
run 1: ✅
  service 1: ✅
  service 2: ✅

run 2: ❌
  service 1: ❌
  service 2: ❌

run 3: ❌
  service 1: ✅
  service 2: ❌

# service 1 is re-deployed even though it previously succeeded
# since the changeset/successful runs will be assessed against run 1
run 4: ✅
  service 1: ✅
  service 2: ✅
```
