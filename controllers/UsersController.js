/* eslint-disable import/no-named-as-default */
import sha1 from 'sha1';
import Queue from 'bull/lib/queue';
import dbClient from '../utils/db';

const userQueue = new Queue('email sending');

/**
 * Controller handling operations related to user management.
 */
export default class UsersController {
  /**
   * Handles creating a new user with provided email and password.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static async postNew(req, res) {
    try {
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
    } catch (error) {
      console.error('Failed to create user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
   * Retrieves the details of the authenticated user.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static async getMe(req, res) {
    try {
      const { user } = req;
      res.status(200).json({ email: user.email, id: user._id.toString() });
    } catch (error) {
      console.error('Failed to retrieve user details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
i/* eslint-disable import/no-named-as-default */
import sha1 from 'sha1';
import Queue from 'bull/lib/queue';
import dbClient from '../utils/db';

const userQueue = new Queue('email sending');

/**
 * Controller handling operations related to user management.
 */
export default class UsersController {
  /**
   * Handles creating a new user with provided email and password.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static async postNew(req, res) {
    try {
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

  i    res.status(201).json({ email, id: userId });
    } catch (error) {
      console.error('Failed to create user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
   * Retrieves the details of the authenticated user.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static async getMe(req, res) {
    try {
      const { user } = req;
      res.status(200).json({ email: user.email, id: user._id.toString() });
    } catch (error) {
      console.error('Failed to retrieve user details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
