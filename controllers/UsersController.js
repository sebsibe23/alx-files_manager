/* eslint-disable import/no-named-as-default */
import sha1 from 'sha1';
import Queue from 'bull/lib/queue';
import dbClient from '../utils/db';

const userQueue = new Queue('email sending');

/**
 * This module defines the UsersController class which handles
 * user-related requests, including creating new users and
 * retrieving user information. It interacts with the MongoDB
 * database to manage user data and uses a job queue for email
 * sending tasks.
 *
 * Key functionalities include:
 * - Creating a new user with `postNew()`
 * - Retrieving the current user's information with `getMe()`
 *
 * The UsersController class ensures that user data is securely
 * stored and managed, and handles tasks such as email sending
 * asynchronously using a job queue.
 */

export default class UsersController {
  /**
   * Handles the request to create a new user. Validates the
   * request data, checks for existing users, and inserts the
   * new user into the database. Adds a job to the email sending
   * queue.
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   */
  static async postNew(req, res) {
    const email = req.body ? req.body.email : null;
    const password = req.body ? req.body.password : null;

    if (!email) {
      res.status(400).json({ error: 'Missing email' });
      return;
    }
    if (!password) {
      res.status(400).json({ error: 'Missing password' });
      return;
    }
    const user = await (await dbClient.usersCollection()).findOne({ email });

    if (user) {
      res.status(400).json({ error: 'Already exist' });
      return;
    }
    const insertionInfo = await (await dbClient.usersCollection())
      .insertOne({ email, password: sha1(password) });
    const userId = insertionInfo.insertedId.toString();

    userQueue.add({ userId });
    res.status(201).json({ email, id: userId });
  }

  /**
   * Handles the request to retrieve the current user's
   * information. Responds with the user's email and ID.
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   */
  static async getMe(req, res) {
    const { user } = req;

    res.status(200).json({ email: user.email, id: user._id.toString() });
  }
}
