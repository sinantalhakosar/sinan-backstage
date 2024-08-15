import React from 'react';
import { GithubMDDocPage } from './GithubMDDocPage';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { screen } from '@testing-library/react';
import { registerMswTestHooks, renderInTestApp } from '@backstage/test-utils';

describe('GithubMDDocPage', () => {
  const server = setupServer();
  // Enable sane handlers for network requests
  registerMswTestHooks(server);

  // setup mock response
  beforeEach(() => {
    server.use(
      rest.get('/*', (_, res, ctx) =>
        res(ctx.status(200), ctx.text('Content')),
      ),
    );
  });

  it('should render', async () => {
    await renderInTestApp(<GithubMDDocPage />);
    expect(screen.getByText('Welcome to github-md-docs!')).toBeInTheDocument();
  });
});
