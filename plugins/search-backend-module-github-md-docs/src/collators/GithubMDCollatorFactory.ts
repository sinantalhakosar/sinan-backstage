import { LoggerService } from '@backstage/backend-plugin-api';
import { Config } from '@backstage/config';
import { Readable } from 'stream';
import {
  DocumentCollatorFactory,
  IndexableDocument,
} from '@backstage/plugin-search-common';
import { Repository } from '../types';

export interface GithubMDDocument extends IndexableDocument {}

export type GithubMDCollatorFactoryOptions = {
  logger: LoggerService;
  repositoryList?: Array<Repository>;
};

export class GithubMDCollatorFactory implements DocumentCollatorFactory {
  private readonly logger: LoggerService;
  public readonly type: string = 'github-md-docs';

  private readonly repositoryList: Array<Repository> | undefined;

  private constructor(
    options: GithubMDCollatorFactoryOptions,
    repositoryList?: Array<Repository>,
  ) {
    this.logger = options.logger;
    this.repositoryList = repositoryList;
  }

  static fromConfig(config: Config, options: GithubMDCollatorFactoryOptions) {
    const repoList: Array<Repository> = config
      .getConfigArray('backend.search.github.sources')
      .map(source => ({
        owner: source.get<Repository['owner']>('owner'),
        repo: source.get<Repository['repo']>('repo'),
      }));

    return new GithubMDCollatorFactory(options, repoList);
  }

  async getCollator() {
    return Readable.from(this.execute());
  }

  async *execute(): AsyncGenerator<GithubMDDocument> {
    if (!this.repositoryList) {
      this.logger.error(
        'No backend.search.github.sources configured in your app-config.yaml',
      );
      return;
    }

    for (const repository of this.repositoryList) {
      const owner = repository.owner;
      const name = repository.repo;
      const apiUrl = `https://api.github.com/repos/${owner}/${name}/git/trees/main?recursive=1`;

      this.logger.info(`GithubMDCollatorFactory repo ${apiUrl}`);
    }
  }
}
