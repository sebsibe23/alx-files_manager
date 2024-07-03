// eslint-disable-next-line no-unused-vars
import { Express } from 'express';
import AppController from '../controllers/AppController';
import AuthController from '../controllers/AuthController';
import UsersController from '../controllers/UsersController';
import FilesController from '../controllers/FilesController';
import { basicAuthenticate, xTokenAuthenticate } from '../middlewares/auth';
import { APIError, errorResponse } from '../middlewares/error';

/**
 * This module defines and injects routes and their handlers into
 * the provided Express application instance. It sets up routes for
 * various endpoints related to app status, user authentication,
 * user management, and file operations. Middleware for
 * authentication and error handling is also integrated.
 *
 * Key functionalities include:
 * - Setting up status and statistics endpoints
 * - Configuring authentication routes for connecting and
 *   disconnecting users
 * - Defining routes for user creation and retrieval
 * - Defining routes for file upload, retrieval, publishing,
 *   and unpublishing
 * - Handling invalid routes with a 404 error response
 * - Applying error response middleware
 *
 * The injectRoutes function ensures that all necessary routes are
 * registered and proper middleware is applied for each route.
 *
 * @param {Express} api - The Express application instance to inject
 *                        routes into.
 */

const injectRoutes = (api) => {
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
};

export default injectRoutes;
