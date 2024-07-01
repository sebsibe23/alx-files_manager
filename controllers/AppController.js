/* eslint-disable import/no-named-as-default */
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

/**
 * Represents the controller for handling application status and statistics.
 */
export default class AppController {
  /**
   * Retrieves the current status of Redis and MongoDB connections.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static getStatus(req, res) {
    try {
      res.status(200).json({
        redis: redisClient.isAlive(),
        db: dbClient.isAlive(),
      });
    } catch (error) {
      console.error('Failed to get status:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
   * Retrieves statistics including the number of users and files in the database.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static getStats(req, res) {
    try {
      Promise.all([dbClient.nbUsers(), dbClient.nbFiles()])
        .then(([usersCount, filesCount]) => {
          res.status(200).json({ users: usersCount, files: filesCount });
        });
    } catch (error) {
      console.error('Failed to get statistics:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
