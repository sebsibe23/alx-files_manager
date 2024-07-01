import mongodb from 'mongodb';
// eslint-disable-next-line no-unused-vars
import Collection from 'mongodb/lib/collection';
import envLoader from './env_loader';

/**
 * Represents a MongoDB client.
 */
class DBClient {
  /**
   * Creates a new DBClient instance.
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
   * Checks if this client's connection to the MongoDB server
   * is active.
   * @returns {boolean} - True if connected, otherwise false.
   */
  isAlive() {
    try {
      return this.client.isConnected();
    } catch (error) {
      console.error('Failed to check connection:', error);
      throw error;
    }
  }

  /**
   * Retrieves the number of users in the database.
   * @returns {Promise<number>} - The number of users.
   */
  async nbUsers() {
    try {
      return await this.client.db().collection('users').countDocuments();
    } catch (error) {
      console.error('Failed to count users:', error);
      throw error;
    }
  }

  /**
   * Retrieves the number of files in the database.
   * @returns {Promise<number>} - The number of files.
   */
  async nbFiles() {
    try {
      return await this.client.db().collection('files').countDocuments();
    } catch (error) {
      console.error('Failed to count files:', error);
      throw error;
    }
  }

  /**
   * Retrieves a reference to the `users` collection.
   * @returns {Promise<Collection>} - The users collection.
   */
  async usersCollection() {
    try {
      return this.client.db().collection('users');
    } catch (error) {
      console.error('Failed to get users collection:', error);
      throw error;
    }
  }

  /**
   * Retrieves a reference to the `files` collection.
   * @returns {Promise<Collection>} - The files collection.
   */
  async filesCollection() {
    try {
      return this.client.db().collection('files');
    } catch (error) {
      console.error('Failed to get files collection:', error);
      throw error;
    }
  }
}

export const dbClient = new DBClient();
export default dbClient;
