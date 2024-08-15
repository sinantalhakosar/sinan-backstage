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
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
