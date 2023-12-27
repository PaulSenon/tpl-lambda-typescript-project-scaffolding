/**
 * This file is linked to the Dockerfile.devLambda
 * and is used to expose the typescript code
 * to the lambda runtime. for instant feedback during development.
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const { register } = require('@swc-node/register/register');
register();
const handler = require('./src/hello').handler;
exports.handler = handler;
