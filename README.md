# [Backstage](https://backstage.io)

This is newly scaffolded Backstage App.
Backstage is now able to search the information in markdown files (all files with the extension .md) among the provided GitHub repositories in app-config.yaml.
You can search files by;
- File name
- Repository name
- Repository owner name

### Installation

1. Clone this repository
2. Run `yarn install` and `yarn tsc`

If any command fails in 2nd step, please check your local yarn versions or reach out @sinantalhakosar

### Configuration

Define the list of scanned repositories in app-config.yml file in format:
```yaml
backend:
    search:
        github:
            sources:
                - owner: backstage
                  repo: community-plugins
```

> [!IMPORTANT]
> If you want to add new repository to config, be aware that you need to rerun the application

> [!IMPORTANT]
> Inorder to run frontend side properly on locally, please make sure that you dont have any `/node_modules` folder under `plugins/github-md-docs`. If exists, you can remove it.

### How to run
To run whole project locally => `yarn dev`
To run frontent project locally => `yarn start`
To run backend project locally => `yarn start-backend`


### Other
This project is being created from https://backstage.io/docs/getting-started . So when created the project is very tiny. 
I made actual implementation on backstage repo but forking it. Here is the PR for it: https://github.com/sinantalhakosar/backstage/pull/1 (intentionally opened to target: origin/master)
The reason is the app created with tutorial is lack of some configurations which are already done on backstage repo.
So in any case of running locally fails, you can clone my backstage fork and run it. The configuration and how to run steps are same.

> [!NOTE]
> Please read MYREFLECTIONS.md file (in https://github.com/sinantalhakosar/sinan-backstage/tree/development) to better understand how I approach the solution