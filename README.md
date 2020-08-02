![test: formatting queries](https://github.com/yoheikikuta/sql-autoformat-action/workflows/test:%20formatting%20queries/badge.svg)

# SQL AutoFormat Action
This is a repository of a GitHub Action for auto-formatting SQL queries.

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
              uses: actions/checkout@v2.0.0

            - name: Install zetasql
              run: |
                wget https://github.com/Matts966/zetasql-formatter/releases/latest/download/zetasql-formatter_linux_x86_64.zip
                sudo unzip zetasql-formatter_linux_x86_64.zip -d /usr/local/bin
                rm zetasql-formatter_linux_x86_64.zip

            - name: SQLAutoFormatter
              uses: yoheikikuta/sql-autoformat-action@1.0.0
              with:
                github_token: ${{ secrets.github_token }}
```

## Acknowledgement
This repository is based on https://github.com/samuelmeuli/lint-action and https://github.com/Matts966/zetasql-formatter.
Thanks for publishing greate repos.
