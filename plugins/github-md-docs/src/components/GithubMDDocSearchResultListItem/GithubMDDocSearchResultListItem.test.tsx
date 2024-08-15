import React from 'react';
import { screen } from '@testing-library/react';
import {
  GithubMDDocSearchResultListItem,
  GithubMDDocSearchResultListItemProps,
} from './GithubMDDocSearchResultListItem';
import { renderInTestApp, TestApiProvider } from '@backstage/test-utils';

const mockResult: GithubMDDocSearchResultListItemProps['result'] = {
  title: 'README.md',
  location: '/owner/repo/main/docs/README.md',
  text: 'src/README.md',
  repositoryOwner: 'owner',
  repositoryName: 'repo',
  repositoryLink: 'https://github.com/owner/repo',
};

describe('<GithubMDDocSearchResultListItem />', () => {
  it('renders title and paths correctly', async () => {
    await renderInTestApp(
      <TestApiProvider apis={[]}>
        <GithubMDDocSearchResultListItem result={mockResult} />
      </TestApiProvider>,
    );

    expect(screen.getByText('README.md')).toBeInTheDocument();
    expect(screen.getByText('Path: src/README.md')).toBeInTheDocument();
    expect(screen.getByText('owner/repo')).toBeInTheDocument();
  });

  it('renders repository information with links', async () => {
    await renderInTestApp(
      <TestApiProvider apis={[]}>
        <GithubMDDocSearchResultListItem result={mockResult} />
      </TestApiProvider>,
    );

    const repositoryLink = screen.getByRole('link', { name: /owner\/repo/i });
    expect(repositoryLink).toBeInTheDocument();
    expect(repositoryLink).toHaveAttribute(
      'href',
      'https://github.com/owner/repo',
    );
    expect(screen.getByText('Repository:')).toBeInTheDocument();
    expect(screen.getByText('owner/repo')).toBeInTheDocument();
  });
});
