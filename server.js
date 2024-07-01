import express from 'express';
import startServer from './libs/boot';
import injectRoutes from './routes';
import injectMiddlewares from './libs/middlewares';

/**
 * Initialize a new Express server instance.
 */
const server = express();

/**
 * Inject middlewares into the server instance.
 * @param {object} server - The Express server instance.
 */
injectMiddlewares(server);

/**
 * Inject routes into the server instance.
 * @param {object} server - The Express server instance.
 */
injectRoutes(server);

/**
 * Start the server with the injected middlewares and routes.
 * @param {object} server - The Express server instance.
 */
startServer(server);

export default server;
