import { IndexableDocument } from '@backstage/plugin-search-common';

export interface GithubMDDocument extends IndexableDocument {
  repositoryLink: string;
  repositoryOwner: string;
  repositoryName: string;
}

export type Repository = {
  owner: string;
  repo: string;
};

export interface GithubTreeItem {
  path: string;
  mode: string;
  type: string;
  sha: string;
  size?: number;
  url: string;
}

export interface GithubTreeResponse {
  sha: string;
  url: string;
  tree: GithubTreeItem[];
  truncated: boolean;
}
