### General
This document has information about how I approach the solution.
In general, I have created 1 plugin(FE) + 1 module(BE)

### FE side
There is a plugin created by scaffold `yarn new`. I have also extended the requirements and created a page to render the requested .md file content. We can divide FE part into 2.

The component tests are also added. But because of the `canvas` package in backstage fork, I cannot run it there. But in this application (repo: https://github.com/sinantalhakosar/sinan-backstage/tree/development) works fine if you run `yarn test`

Ps. I had to get SearchModal file from backstage repository to show search result consistent with SearchPage. You can find it in commit 8275c75a821e0807b543e3d0cd17198f7494e46d

For some implementation you can find related comment next to it. (why I did it etc.). Also while I faced some problem for imports between plugins and modules in this repo but NOT in backstage fork (https://github.com/sinantalhakosar/backstage/tree/development)

#### Page
The route is `/github-md-docs/<repository_owner>/<repository_name>?path=<mdFilePath>`
If you have any missing parameters, the page will fallback to Empty state or ErrorPanel

In the successfully opened page, there are 2 components;
1. InfoCard: Where you can access info `Repository owner` (with link to repository owner Github profile), `Repository name`(with link to repository page on Github) and `mdFilePath` and button to view md file on Github

2. Content: Where you can view rendered .md file

All external links has icon indicating it

#### Search Item
Custom search item implemented to have better UI/UX. It has
- File name => redirects to `/github-md-docs/<repository_owner>/<repository_name>?path=<mdFilePath>`
- File path
- Repository that consist related file => redirects to file on Github

All external links has icon indicating this


### BE side
I have create a backend module because instead of creating a backend plugin, if we create a backend-module where pluginId is `search` as we are going to add a functionality to existing search plugin by adding a collator and then within the module file we can add the logic to use the collator. This module can then directly be imported into the backstage backend.

I haven't use any URL reader or octokit to read file and content from Github. 
Backend service is now only able to read public repositories content. This can be improved to support all repositories that user have access by adding signin by Github option and reading authToken. ref: https://github.com/backstage/backstage/issues/25613#issuecomment-2282248448

Rest implemented based on backstage documentation