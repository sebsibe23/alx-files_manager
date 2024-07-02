// eslint-disable-next-line no-unused-vars
import { Express } from 'express';
import AppController from '../controllers/AppController';
import AuthController from '../controllers/AuthController';
import UsersController from '../controllers/UsersController';
import FilesController from '../controllers/FilesController';
import { basicAuthenticate, xTokenAuthenticate } from '../middlewares/auth';
import { APIError, errorResponse } from '../middlewares/error';

/**
 * Injects routes with their handlers to the given Express application.
 * This function defines the routes and their corresponding controllers,
 * including authentication and error handling middlewares.
 *
 * @param {Express} api - The Express application instance to inject routes into.
 */
const injectRoutes = (api) => {
  try {
    api.get('/status', AppController.getStatus);
    api.get('/stats', AppController.getStats);

    api.get('/connect', basicAuthenticate, AuthController.getConnect);
    api.get('/disconnect', xTokenAuthenticate, AuthController.getDisconnect);

    api.post('/users', UsersController.postNew);
    api.get('/users/me', xTokenAuthenticate, UsersController.getMe);

    api.post('/files', xTokenAuthenticate, FilesController.postUpload);
    api.get('/files/:id', xTokenAuthenticate, FilesController.getShow);
    api.get('/files', xTokenAuthenticate, FilesController.getIndex);
    api.put('/files/:id/publish', xTokenAuthenticate, FilesController.putPublish);
    api.put('/files/:id/unpublish', xTokenAuthenticate, FilesController.putUnpublish);
    api.get('/files/:id/data', FilesController.getFile);

    api.all('*', (req, res, next) => {
      errorResponse(new APIError(404, `Cannot ${req.method} ${req.url}`), req, res, next);
    });

    api.use(errorResponse);
  } catch (error) {
    console.error('Error injecting routes:', error);
  }
};

export default injectRoutes;
