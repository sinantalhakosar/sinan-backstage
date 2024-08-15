import { GithubTreeItem, GithubTreeResponse, Repository } from '../types';

const githubApiUrl = 'https://api.github.com';

interface Props extends Repository {}

export async function getGithubRepositoryMDFiles({
  owner,
  repo,
}: Props): Promise<Array<string> | Error> {
  try {
    const apiUrl = `${githubApiUrl}/repos/${owner}/${repo}/git/trees/main?recursive=1`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch repository tree: ${response.statusText}`,
      );
    }

    const data: GithubTreeResponse = await response.json();

    // Filter for .md files
    const mdFiles = data.tree
      .filter((item: GithubTreeItem) => item.path.endsWith('.md'))
      .map((item: GithubTreeItem) => item.path);

    return mdFiles;
  } catch (error) {
    return new Error(
      `Error fetching markdown files: ${(error as Error).message}`,
    );
  }
}
