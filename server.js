import express from 'express';
import startServer from './libs/boot';
import injectRoutes from './routes';
import injectMiddlewares from './libs/middlewares';

/**
 * This script sets up and starts an Express server by
 * injecting middleware, routes, and initializing the
 * server startup process.
 */

const server = express();

/**
 * Injects necessary middlewares into the server.
 * This can include logging, parsing, and security
 * middlewares.
 */
try {
  injectMiddlewares(server);
} catch (error) {
  console.error('Error injecting middlewares:', error);
}

/**
 * Injects application routes into the server. This
 * includes defining endpoints and their respective
 * handlers.
 */
try {
  injectRoutes(server);
} catch (error) {
  console.error('Error injecting routes:', error);
}

/**
 * Starts the server on the specified port and host,
 * making it ready to accept requests.
 */
try {
  startServer(server);
} catch (error) {
  console.error('Error starting the server:', error);
}

export default server;
