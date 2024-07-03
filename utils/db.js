import mongodb from 'mongodb';
// eslint-disable-next-line no-unused-vars
import Collection from 'mongodb/lib/collection';
import envLoader from './env_loader';

/**
 * This module initializes and manages a MongoDB client for the
 * 'files_manager' application. It loads environment variables
 * to configure the MongoDB connection details such as host,
 * port, and database name. The DBClient class provides methods
 * to check the connection status, and retrieve user and file
 * collections from the database. The class uses MongoDB's
 * native driver for efficient database operations.
 *
 * Key functionalities include:
 * - Connecting to the MongoDB server using environment configs
 * - Checking the connection status with `isAlive()`
 * - Counting users in the database with `nbUsers()`
 * - Counting files in the database with `nbFiles()`
 * - Providing access to the 'users' collection with
 *   `usersCollection()`
 * - Providing access to the 'files' collection with
 *   `filesCollection()`
 */

class DBClient {
  /**
   * Creates a new DBClient instance.
   * Initializes the MongoDB connection using environment
   * variables or default values if not specified.
   */
  constructor() {
    envLoader();
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;

    this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
    this.client.connect();
  }

  /**
   * Checks if this client's connection to the MongoDB server is
   * active.
   * @returns {boolean}
   */
  isAlive() {
    return this.client.isConnected();
  }

  /**
   * Retrieves the number of users in the database.
   * @returns {Promise<Number>}
   */
  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  /**
   * Retrieves the number of files in the database.
   * @returns {Promise<Number>}
   */
  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }

  /**
   * Retrieves a reference to the `users` collection.
   * @returns {Promise<Collection>}
   */
  async usersCollection() {
    return this.client.db().collection('users');
  }

  /**
   * Retrieves a reference to the `files` collection.
   * @returns {Promise<Collection>}
   */
  async filesCollection() {
    return this.client.db().collection('files');
  }
}

export const dbClient = new DBClient();
export default dbClient;
