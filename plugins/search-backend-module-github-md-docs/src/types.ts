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
