import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { githubMdDocsPlugin, GithubMdDocsPage } from '../src/plugin';

createDevApp()
  .registerPlugin(githubMdDocsPlugin)
  .addPage({
    element: <GithubMdDocsPage />,
    title: 'Root Page',
    path: '/github-md-docs',
  })
  .render();
