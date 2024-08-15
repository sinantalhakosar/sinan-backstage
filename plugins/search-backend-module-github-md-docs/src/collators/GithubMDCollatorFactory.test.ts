import { Readable } from 'stream';
import { GithubMDCollatorFactory } from './GithubMDCollatorFactory';
import { getGithubRepositoryMDFiles } from '../utils/getGithubRepositoryMDFiles';
import { mockServices } from '@backstage/backend-test-utils';

jest.mock('../utils/getGithubRepositoryMDFiles', () => ({
  getGithubRepositoryMDFiles: jest.fn(),
}));

const mockLogger = mockServices.logger.mock();

const mockConfig = mockServices.rootConfig({
  data: {
    backend: {
      search: {
        github: {
          sources: [
            { owner: 'mockowner1', repo: 'mockrepo1' },
            { owner: 'mockowner2', repo: 'mockrepo2' },
          ],
        },
      },
    },
  },
});

const mockMDFiles: { [key: string]: string[] } = {
  'mockowner1/mockrepo1': ['docs/README.md', 'docs/CONTRIBUTING.md'],
  'mockowner2/mockrepo2': ['docs/README.md'],
};

describe('GithubMDCollatorFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fromConfig', () => {
    it('should create instance with repository list from config', () => {
      const factory = GithubMDCollatorFactory.fromConfig(mockConfig, {
        logger: mockLogger,
      });

      expect(factory).toBeInstanceOf(GithubMDCollatorFactory);
      // Check if repositories are correctly initialized
      expect((factory as any).repositoryList).toEqual([
        { owner: 'mockowner1', repo: 'mockrepo1' },
        { owner: 'mockowner2', repo: 'mockrepo2' },
      ]);
    });
  });

  describe('getCollator', () => {
    it('should return a Readable stream', async () => {
      (getGithubRepositoryMDFiles as jest.Mock).mockImplementation(() => {
        return Promise.resolve(mockMDFiles['mockowner1/mockrepo1']);
      });

      const factory = GithubMDCollatorFactory.fromConfig(mockConfig, {
        logger: mockLogger,
      });
      const collator = await factory.getCollator();

      expect(collator).toBeInstanceOf(Readable);
    });

    it('should yield documents for each MD file in repositories', async () => {
      (getGithubRepositoryMDFiles as jest.Mock).mockImplementation(
        (params: { owner: string; repo: string }) => {
          const key = `${params.owner}/${params.repo}`;
          return Promise.resolve(mockMDFiles[key] || []);
        },
      );

      const factory = GithubMDCollatorFactory.fromConfig(mockConfig, {
        logger: mockLogger,
      });
      const collator = await factory.getCollator();

      const documents: any[] = [];
      collator.on('data', data => documents.push(data));

      await new Promise<void>(resolve => {
        collator.on('end', () => resolve());
      });

      expect(documents).toEqual([
        {
          title: 'README.md',
          text: 'docs/README.md',
          location:
            '/github-md-docs/mockowner1/mockrepo1?path=docs%2FREADME.md',
          repositoryLink: 'https://github.com/mockowner1/mockrepo1',
          repositoryOwner: 'mockowner1',
          repositoryName: 'mockrepo1',
        },
        {
          title: 'CONTRIBUTING.md',
          text: 'docs/CONTRIBUTING.md',
          location:
            '/github-md-docs/mockowner1/mockrepo1?path=docs%2FCONTRIBUTING.md',
          repositoryLink: 'https://github.com/mockowner1/mockrepo1',
          repositoryOwner: 'mockowner1',
          repositoryName: 'mockrepo1',
        },
        {
          title: 'README.md',
          text: 'docs/README.md',
          location:
            '/github-md-docs/mockowner2/mockrepo2?path=docs%2FREADME.md',
          repositoryLink: 'https://github.com/mockowner2/mockrepo2',
          repositoryOwner: 'mockowner2',
          repositoryName: 'mockrepo2',
        },
      ]);
    });
  });
});
