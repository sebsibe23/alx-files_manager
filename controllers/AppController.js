/* eslint-disable import/no-named-as-default */
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

/**
 * This module defines the AppController class which provides
 * methods for handling application-level requests related to
 * status and statistics. It interacts with Redis and MongoDB
 * clients to fetch the required information and send responses.
 *
 * Key functionalities include:
 * - Checking the status of Redis and MongoDB connections
 *   using `getStatus()`
 * - Retrieving the count of users and files in the database
 *   using `getStats()`
 *
 * The AppController class ensures that the application can
 * provide real-time status updates and statistical information
 * by querying the Redis and MongoDB clients.
 */

export default class AppController {
  /**
   * Handles the request to get the status of Redis and MongoDB
   * connections.
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   */
  static getStatus(req, res) {
    res.status(200).json({
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    });
  }

  /**
   * Handles the request to get the statistics of users and files
   * in the database.
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   */
  static getStats(req, res) {
    Promise.all([dbClient.nbUsers(), dbClient.nbFiles()])
      .then(([usersCount, filesCount]) => {
        res.status(200).json({ users: usersCount, files: filesCount });
      });
  }
}
