# @internal/backstage-plugin-search-backend-module-github-md-docs

The github-md-docs backend module for the search plugin.

_This plugin was created through the Backstage CLI_

## Description

This plugin is for;
Fetching and indexing below information for repositories inside `app-config.yaml`.
You can add or modify indexed markdown files from specified Github repositories shown as below:

app-config.yaml

```
backend:
  search:
    github:
      sources:
        - owner: <owner>
          repo: <repository_name>
        - owner: <owner>
          repo: <repository_name>
        ...
```
