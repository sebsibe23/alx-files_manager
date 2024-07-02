import mongodb from 'mongodb';
// eslint-disable-next-line no-unused-vars
import Collection from 'mongodb/lib/collection';
import envLoader from './env_loader';

/**
 * Represents a MongoDB client for managing database connections,
 * querying user and file collections, and ensuring the database
 * is alive and responsive.
 */
class DBClient {
  /**
   * Initializes a new DBClient instance, loading environment
   * variables, constructing the MongoDB URL, and establishing
   * a connection to the database.
   */
  constructor() {
    envLoader();
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;

    this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
    try {
      this.client.connect();
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
    }
  }

  /**
   * Checks if this client's connection to the MongoDB server
   * is currently active and alive.
   * @returns {boolean} - True if the client is connected,
   * false otherwise.
   */
  isAlive() {
    try {
      return this.client.isConnected();
    } catch (error) {
      console.error('Error checking if MongoDB client is alive:', error);
      return false;
    }
  }

  /**
   * Retrieves the number of user documents in the `users`
   * collection of the database.
   * @returns {Promise<Number>} - A promise that resolves to
   * the number of users.
   */
  async nbUsers() {
    try {
      return await this.client.db().collection('users').countDocuments();
    } catch (error) {
      console.error('Error counting user documents:', error);
      throw error;
    }
  }

  /**
   * Retrieves the number of file documents in the `files`
   * collection of the database.
   * @returns {Promise<Number>} - A promise that resolves to
   * the number of files.
   */
  async nbFiles() {
    try {
      return await this.client.db().collection('files').countDocuments();
    } catch (error) {
      console.error('Error counting file documents:', error);
      throw error;
    }
  }

  /**
   * Retrieves a reference to the `users` collection in the
   * database, used for performing operations on user data.
   * @returns {Promise<Collection>} - A promise that resolves
   * to the users collection.
   */
  async usersCollection() {
    try {
      return this.client.db().collection('users');
    } catch (error) {
      console.error('Error retrieving users collection:', error);
      throw error;
    }
  }

  /**
   * Retrieves a reference to the `files` collection in the
   * database, used for performing operations on file data.
   * @returns {Promise<Collection>} - A promise that resolves
   * to the files collection.
   */
  async filesCollection() {
    try {
      return this.client.db().collection('files');
    } catch (error) {
      console.error('Error retrieving files collection:', error);
      throw error;
    }
  }
}

export const dbClient = new DBClient();
export default dbClient;
