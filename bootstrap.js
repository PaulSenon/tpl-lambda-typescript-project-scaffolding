/**
 * This file is linked to the Dockerfile.devLambda
 * and is used to expose the typescript code
 * to the lambda runtime. for instant feedback during development.
 *
 * If you change this file, you need to restart the docker container
 */

/**
 * to toggle between tsc and swc, set the TS_COMPILER_DEV env variable
 *
 * tsc = slow but has typechecking ¯\_(ツ)_/¯
 * swc = fast as fuck but to typechecking (but your IDE is here for that (unless it's a shitty phpstorm))
 */

if (process.env['TS_COMPILER_DEV'] === 'tsc') {
  require('ts-node/register');
  require('tsconfig-paths/register');
} else if (process.env['TS_COMPILER_DEV'] === 'swc') {
  require('@swc-node/register');
} else {
  throw new Error('TS_COMPILER env should be set to either "swc" or "tsc"');
}

/**
 * Reccursively clear require cache for each sub dependencies
 */
function clearRequireCache(id) {
  const module = require.cache[id];
  if (module) {
    module.children.forEach((child) => clearRequireCache(child.id));
    delete require.cache[id];
  }
}

/**
 * This is some GitHub Copilot magic to (re)compile TS on the fly so you can make changes in dev
 * and have everything reflected in the running local dev lambda without reloading/rebuilding anything
 */
exports.handler = async function (event, context) {
  // Dynamically import the handler on every request
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { handler } = require('./src/index');

  // Clear the require cache to ensure the module is reloaded on next request
  clearRequireCache(require.resolve('./src/index'));

  // Invoke the handler
  return handler(event, context);
};
