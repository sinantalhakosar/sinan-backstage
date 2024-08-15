import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const githubMdDocsPlugin = createPlugin({
  id: 'github-md-docs',
  routes: {
    root: rootRouteRef,
  },
});

export const GithubMdDocsPage = githubMdDocsPlugin.provide(
  createRoutableExtension({
    name: 'GithubMdDocsPage',
    component: () =>
      import('./components/GithubMDDocPage').then(m => m.GithubMDDocPage),
    mountPoint: rootRouteRef,
  }),
);
