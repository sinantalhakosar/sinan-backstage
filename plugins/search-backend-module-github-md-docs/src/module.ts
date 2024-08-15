import {
  coreServices,
  createBackendModule,
} from '@backstage/backend-plugin-api';

export const searchModuleGithubMdDocs = createBackendModule({
  pluginId: 'search',
  moduleId: 'github-md-docs',
  register(reg) {
    reg.registerInit({
      deps: { logger: coreServices.logger },
      async init({ logger }) {
        logger.info('Hello World!');
      },
    });
  },
});
