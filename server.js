import express from 'express';
import startServer from './libs/boot';
import injectRoutes from './routes';
import injectMiddlewares from './libs/middlewares';

/**
 * This module initializes and starts the Express server for
 * the application. It sets up the necessary middlewares and
 * routes before launching the server. The setup follows a
 * modular approach to keep the codebase clean and maintainable.
 *
 * Key functionalities include:
 * - Creating an Express server instance
 * - Injecting middlewares using `injectMiddlewares()`
 * - Injecting routes using `injectRoutes()`
 * - Starting the server using `startServer()`
 *
 * The server setup process involves importing required modules,
 * initializing the server, configuring middlewares, setting up
 * routes, and finally starting the server to listen for incoming
 * requests.
 */

const server = express();

injectMiddlewares(server);
injectRoutes(server);
startServer(server);

export default server;
