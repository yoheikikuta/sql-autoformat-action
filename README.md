![test: formatting queries](https://github.com/yoheikikuta/sql-autoformat-action/workflows/test:%20formatting%20queries/badge.svg)

# SQL AutoFormat Action
This is a repository of a GitHub Action for auto-formatting SQL queries.  
This GitHub Action uses https://github.com/Matts966/zetasql-formatter as a formatter.

![query comparison](https://i.imgur.com/nWfUKgF.png)
Left: original query, Center: formatted query using BQ Web UI, Right: formatted query using SQL AutoFormat Action (zetasql-formatter).

## Usage
Create a GitHub Actions workflow yaml file (e.g., `./github/workflow/autoformat.yml`) like the following:

```yml
name: "Formatting queries"
on: # rebuild any PRs and master branch changes
    pull_request:
    push:
        branches:
            - master

jobs:
    test: # make sure the action works on a clean machine without building
        name: Run auto formatter
        runs-on: ubuntu-latest

        steps:
            - name: Check out Git repository
              uses: actions/checkout@v2

            - name: Install zetasql
              run: |
                wget https://github.com/Matts966/zetasql-formatter/releases/latest/download/zetasql-formatter_linux_x86_64.zip
                sudo unzip zetasql-formatter_linux_x86_64.zip -d /usr/local/bin
                rm zetasql-formatter_linux_x86_64.zip

            - name: SQLAutoFormatter
              uses: yoheikikuta/sql-autoformat-action@v1
              with:
                github_token: ${{ secrets.github_token }}
```

This GitHub Action automatically format `*.sql` files, then commit and push.

![commit log](https://i.imgur.com/eLVJtkz.png)

## Acknowledgement
This repository is based on https://github.com/samuelmeuli/lint-action and https://github.com/Matts966/zetasql-formatter.
Thanks for publishing greate repos.
