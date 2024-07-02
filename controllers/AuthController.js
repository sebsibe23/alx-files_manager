/* eslint-disable import/no-named-as-default */

/**
 * AuthController class handles user authentication endpoints
 * using UUID for token generation and Redis for session management.
 *
 * Key functionalities:
 * - Generate and manage authentication tokens using UUIDv4
 * - Store user sessions in Redis with expiration times
 * - Handle user connect and disconnect operations securely
 */

import { v4 as uuidv4 } from 'uuid';
import redisClient from '../utils/redis';

export default class AuthController {
  /**
   * Handles user authentication and token generation
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   */
  static async getConnect(req, res) {
    const { user } = req;
    const token = uuidv4();

    await redisClient.set(`auth_${token}`, user._id.toString(), 24 * 60 * 60);
    res.status(200).json({ token });
  }

  /**
   * Handles user logout and token deletion from Redis
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   */
  static async getDisconnect(req, res) {
    const token = req.headers['x-token'];

    await redisClient.del(`auth_${token}`);
    res.status(204).send();
  }
}
