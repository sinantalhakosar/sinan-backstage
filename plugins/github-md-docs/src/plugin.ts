import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';
import {
  createSearchResultListItemExtension,
  SearchResultListItemExtensionProps,
} from '@backstage/plugin-search-react';
import { GithubMDDocSearchResultListItemProps } from './components/GithubMDDocSearchResultListItem';

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

export const GithubMDDocSearchResultListItem: (
  props: SearchResultListItemExtensionProps<GithubMDDocSearchResultListItemProps>,
) => JSX.Element | null = githubMdDocsPlugin.provide(
  createSearchResultListItemExtension({
    name: 'GithubMDDocSearchResultListItem',
    component: () =>
      import(
        './components/GithubMDDocSearchResultListItem/GithubMDDocSearchResultListItem'
      ).then(m => m.GithubMDDocSearchResultListItem),
    predicate: result => result.type === 'github-md-docs',
  }),
);
