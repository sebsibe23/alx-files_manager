/* eslint-disable import/no-named-as-default */

/**
 * AppController class handles the status and stats endpoints
 * for the application. It uses Redis and MongoDB clients to
 * check the status of the database connections and retrieve
 * statistics on users and files stored in the database.
 *
 * Key functionalities:
 * - Get status of Redis and MongoDB connections
 * - Retrieve the number of users and files in the database
 * - Handle errors and respond with appropriate HTTP statuses
 */

import redisClient from '../utils/redis';
import dbClient from '../utils/db';

export default class AppController {
  /**
   * Returns the status of Redis and MongoDB connections
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   */
  static getStatus(req, res) {
    try {
      res.status(200).json({
        redis: redisClient.isAlive(),
        db: dbClient.isAlive(),
      });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }

  /**
   * Returns the number of users and files in the database
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   */
  static getStats(req, res) {
    Promise.all([dbClient.nbUsers(), dbClient.nbFiles()])
      .then(([usersCount, filesCount]) => {
        res.status(200).json({ users: usersCount, files: filesCount });
      })
      .catch(() => {
        res.status(500).json({ error: 'Server error' });
      });
  }
}
