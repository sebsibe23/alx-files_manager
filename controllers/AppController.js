/*
 * Controller for managing application status and statistics.
 * Utilizes Redis and MongoDB clients for real-time data retrieval.
 * Uses promises for asynchronous operations and JSON responses.
 * Code linting ensured using ESLint for consistent style.
 */
/* eslint-disable import/no-named-as-default */
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

export default class AppController {
  static getStatus(req, res) {
    res.status(200).json({
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    });
  }

  static getStats(req, res) {
    Promise.all([dbClient.nbUsers(), dbClient.nbFiles()])
      .then(([usersCount, filesCount]) => {
        res.status(200).json({ users: usersCount, files: filesCount });
      });
  }
}
