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
 * @param {Express} api - The Express application instance.
 */
const injectRoutes = (api) => {
  /**
   * Route to get the status of the application.
   * @route GET /status
   */
  api.get('/status', AppController.getStatus);

  /**
   * Route to get the statistics of the application.
   * @route GET /stats
   */
  api.get('/stats', AppController.getStats);

  /**
   * Route to connect a user with basic authentication.
   * @route GET /connect
   */
  api.get('/connect', basicAuthenticate, AuthController.getConnect);

  /**
   * Route to disconnect a user with token authentication.
   * @route GET /disconnect
   */
  api.get('/disconnect', xTokenAuthenticate, AuthController.getDisconnect);

  /**
   * Route to create a new user.
   * @route POST /users
   */
  api.post('/users', UsersController.postNew);

  /**
   * Route to get the current user's details.
   * @route GET /users/me
   */
  api.get('/users/me', xTokenAuthenticate, UsersController.getMe);

  /**
   * Route to upload a new file.
   * @route POST /files
   */
  api.post('/files', xTokenAuthenticate, FilesController.postUpload);

  /**
   * Route to get details of a specific file by ID.
   * @route GET /files/:id
   */
  api.get('/files/:id', xTokenAuthenticate, FilesController.getShow);

  /**
   * Route to get a list of all files.
   * @route GET /files
   */
  api.get('/files', xTokenAuthenticate, FilesController.getIndex);

  /**
   * Route to publish a file by ID.
   * @route PUT /files/:id/publish
   */
  api.put('/files/:id/publish', xTokenAuthenticate, FilesController.putPublish);

  /**
   * Route to unpublish a file by ID.
   * @route PUT /files/:id/unpublish
   */
  api.put('/files/:id/unpublish', xTokenAuthenticate, FilesController.putUnpublish);

  /**
   * Route to get file data by ID.
   * @route GET /files/:id/data
   */
  api.get('/files/:id/data', FilesController.getFile);

  /**
   * Catch-all route for handling 404 errors.
   * @route ALL *
   */
  api.all('*', (req, res, next) => {
    errorResponse(new APIError(404, `Cannot ${req.method} ${req.url}`), req, res, next);
  });

  /**
   * Middleware to handle errors.
   */
  api.use(errorResponse);
};

export default injectRoutes;
