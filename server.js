/*
 * Entry point for starting an Express server.
 * Initializes middleware and routes injection.
 * Uses ES modules for module imports.
 * Starts the server using custom bootstrapping logic.
 */
import express from 'express';
import startServer from './libs/boot';
import injectRoutes from './routes';
import injectMiddlewares from './libs/middlewares';

const server = express();

injectMiddlewares(server);
injectRoutes(server);
startServer(server);

export default server;
