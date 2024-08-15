import { LoggerService } from '@backstage/backend-plugin-api';
import { Config } from '@backstage/config';
import { Readable } from 'stream';
import {
  DocumentCollatorFactory,
  IndexableDocument,
} from '@backstage/plugin-search-common';

export interface GithubMDDocument extends IndexableDocument {}

export type GithubMDCollatorFactoryOptions = {
  logger: LoggerService;
};

export class GithubMDCollatorFactory implements DocumentCollatorFactory {
  private readonly logger: LoggerService;
  public readonly type: string = 'github-md-docs';

  private constructor(options: GithubMDCollatorFactoryOptions) {
    this.logger = options.logger;
  }

  static fromConfig(_config: Config, options: GithubMDCollatorFactoryOptions) {
    return new GithubMDCollatorFactory(options);
  }

  async getCollator() {
    return Readable.from(this.execute());
  }

  async *execute(): AsyncGenerator<GithubMDDocument> {
    this.logger.info(`Executed GithubMDCollatorFactory`);
  }
}
