import React from 'react';
import { renderInTestApp } from '@backstage/test-utils';
import { screen } from '@testing-library/react';
import { GithubMDDocInfoCard } from './GithubMDDocInfoCard';

describe('<GithubMDDocInfoCard />', () => {
  it('renders MarkdownContent component with correct information', async () => {
    const owner = { text: 'owner', link: 'https://github.com/owner' };
    const repo = { text: 'repo', link: 'https://github.com/owner/repo' };
    const mdFilePath = {
      text: 'docs/README.md',
      link: 'https://github.com/owner/repo/blob/main/docs/README.md',
    };

    await renderInTestApp(
      <GithubMDDocInfoCard owner={owner} repo={repo} mdFilePath={mdFilePath} />,
    );

    // owner link
    const ownerLink = screen.getByText(/owner/);
    expect(ownerLink).toBeInTheDocument();
    expect(ownerLink.closest('a')).toHaveAttribute('href', owner.link);

    // repo link
    const repoLink = screen.getByText(/repo/);
    expect(repoLink).toBeInTheDocument();
    expect(repoLink.closest('a')).toHaveAttribute('href', repo.link);

    // markdown file path
    const mdFilePathText = screen.getByText(/docs\/README\.md/);
    expect(mdFilePathText).toBeInTheDocument();

    // View file on Github button
    const viewFileButton = screen.getByText(/View file on Github/);
    expect(viewFileButton).toBeInTheDocument();
    expect(viewFileButton.closest('a')).toHaveAttribute(
      'href',
      mdFilePath.link,
    );
  });
});
