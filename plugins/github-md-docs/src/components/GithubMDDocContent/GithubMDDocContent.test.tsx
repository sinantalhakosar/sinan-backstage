import React from 'react';
import { renderInTestApp, TestApiProvider } from '@backstage/test-utils';
import { screen } from '@testing-library/react';
import { GithubMDDocContent } from './GithubMDDocContent';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { configApiRef } from '@backstage/core-plugin-api';

const mockConfig = {
  getString: () => 'mock-value',
};

const server = setupServer(
  rest.get(
    'https://raw.githubusercontent.com/:owner/:repo/main/:mdFilePath',
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.text('# Sample Markdown\n\nThis is a sample markdown content.'),
      );
    },
  ),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('<GithubMDDocContent />', () => {
  it('renders MarkdownContent when markdown is fetched successfully', async () => {
    await renderInTestApp(
      <TestApiProvider apis={[[configApiRef, mockConfig]]}>
        <GithubMDDocContent owner="owner" repo="repo" mdFilePath="README.md" />
      </TestApiProvider>,
    );

    expect(screen.getByText('Sample Markdown')).toBeInTheDocument();
    expect(
      screen.getByText('This is a sample markdown content.'),
    ).toBeInTheDocument();
  });

  it('renders error panel when markdown fetch fails', async () => {
    server.use(
      rest.get(
        'https://raw.githubusercontent.com/:owner/:repo/main/:mdFilePath',
        (_req, res, ctx) => {
          return res(ctx.status(404), ctx.json({ message: 'Not Found' }));
        },
      ),
    );

    await renderInTestApp(
      <TestApiProvider apis={[[configApiRef, mockConfig]]}>
        <GithubMDDocContent owner="owner" repo="repo" mdFilePath="README.md" />
      </TestApiProvider>,
    );

    expect(
      screen.getByText('Error: Failed to fetch file content: Not Found'),
    ).toBeInTheDocument();
  });
});
