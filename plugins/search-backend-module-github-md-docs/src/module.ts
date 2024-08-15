import {
  coreServices,
  createBackendModule,
} from '@backstage/backend-plugin-api';
import { searchIndexRegistryExtensionPoint } from '@backstage/plugin-search-backend-node/alpha';
import { GithubMDCollatorFactory } from './collators/GithubMDCollatorFactory';

export const searchModuleGithubMdDocs = createBackendModule({
  pluginId: 'search',
  moduleId: 'github-md-docs',
  register(reg) {
    reg.registerInit({
      deps: {
        logger: coreServices.logger,
        config: coreServices.rootConfig,
        scheduler: coreServices.scheduler,
        indexRegistry: searchIndexRegistryExtensionPoint,
      },
      async init({ logger, config, scheduler, indexRegistry }) {
        const defaultSchedule = {
          frequency: { minutes: 10 },
          timeout: { minutes: 15 },
          initialDelay: { seconds: 3 },
        };

        indexRegistry.addCollator({
          schedule: scheduler.createScheduledTaskRunner(defaultSchedule),
          factory: GithubMDCollatorFactory.fromConfig(config, {
            logger,
          }),
        });
      },
    });
  },
});
