/**
 * This script starts a local registry for e2e testing purposes.
 * It is meant to be called in jest's globalSetup.
 */
import { startLocalRegistry } from '@nx/js/plugins/jest/local-registry';
import { execFileSync } from 'child_process';

export default async () => {
  // local registry target to run
  const localRegistryTarget = 'monodon:local-registry';
  // storage folder for the local registry
  const storage = './tmp/local-registry/storage';

  (global as any).stopLocalRegistry = await startLocalRegistry({
    localRegistryTarget,
    storage,
    verbose: false,
  });
  const nx = require.resolve('nx');
  execFileSync(
    nx,
    ['run-many', '--targets', 'publish', '--ver', '0.0.0-e2e', '--tag', 'e2e'],
    { env: process.env, stdio: 'inherit' }
  );
};
