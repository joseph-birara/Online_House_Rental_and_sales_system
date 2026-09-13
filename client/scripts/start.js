'use strict';

const Module = require('module');

const originalLoad = Module._load;

function adaptWebpackDevServerConfig(config) {
  if (!config || config.setupMiddlewares) {
    return config;
  }

  const adapted = Object.assign({}, config);
  const https = adapted.https;
  const onBeforeSetupMiddleware = adapted.onBeforeSetupMiddleware;
  const onAfterSetupMiddleware = adapted.onAfterSetupMiddleware;

  if (https !== undefined) {
    delete adapted.https;
    if (https === true) {
      adapted.server = 'https';
    } else if (https && typeof https === 'object') {
      adapted.server = { type: 'https', options: https };
    }
  }

  if (onBeforeSetupMiddleware || onAfterSetupMiddleware) {
    delete adapted.onBeforeSetupMiddleware;
    delete adapted.onAfterSetupMiddleware;
    adapted.setupMiddlewares = function setupMiddlewares(middlewares, devServer) {
      if (onBeforeSetupMiddleware) {
        onBeforeSetupMiddleware(devServer);
      }
      if (onAfterSetupMiddleware) {
        onAfterSetupMiddleware(devServer);
      }
      return middlewares;
    };
  }

  return adapted;
}

Module._load = function patchedLoad(request, parent, isMain) {
  const exported = originalLoad.apply(this, arguments);
  if (
    typeof request === 'string' &&
    request.includes('webpackDevServer.config') &&
    typeof exported === 'function'
  ) {
    return function patchedCreateDevServerConfig(proxy, allowedHost) {
      return adaptWebpackDevServerConfig(exported(proxy, allowedHost));
    };
  }
  return exported;
};

require('react-scripts/scripts/start');
