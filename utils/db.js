/**
 * This script represents a MongoDB client that provides
 * an interface to interact
 * with a MongoDB database. It includes methods
 * to check the connection status,
 * retrieve the number of users and files in the database,
 * and get references
 * to the 'users' and 'files' collections.
 *
 * The script uses the 'mongodb' library to connect
 * to the MongoDB server and
 * perform various operations. It also loads environment
 * variables using the
 * 'env_loader' module.
 */

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
        try {
            envLoader();
            const host = process.env.DB_HOST || 'localhost';
            const port = process.env.DB_PORT || 27017;
            const database = process.env.DB_DATABASE || 'files_manager';
            const dbURL = `mongodb://${host}:${port}/${database}`;

            this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
            this.client.connect();
        } catch (error) {
            console.error('Error creating DBClient instance:', error);
            throw error;
        }
    }

    /**
     * Checks if this client's connection to the MongoDB server is active.
     * @returns {boolean}
     */
    isAlive() {
        try {
            return this.client.isConnected();
        } catch (error) {
            console.error('Error checking connection status:', error);
            return false;
        }
    }

    /**
     * Retrieves the number of users in the database.
     * @returns {Promise<Number>}
     */
    async nbUsers() {
        try {
            return this.client.db().collection('users').countDocuments();
        } catch (error) {
            console.error('Error retrieving the number of users:', error);
            throw error;
        }
    }

    /**
     * Retrieves the number of files in the database.
     * @returns {Promise<Number>}
     */
    async nbFiles() {
        try {
            return this.client.db().collection('files').countDocuments();
        } catch (error) {
            console.error('Error retrieving the number of files:', error);
            throw error;
        }
    }

    /**
     * Retrieves a reference to the `users` collection.
     * @returns {Promise<Collection>}
     */
    async usersCollection() {
        try {
            return this.client.db().collection('users');
        } catch (error) {
            console.error('Error retrieving the users collection:', error);
            throw error;
        }
    }

    /**
     * Retrieves a reference to the `files` collection.
     * @returns {Promise<Collection>}
     */
    async filesCollection() {
        try {
            return this.client.db().collection('files');
        } catch (error) {
            console.error('Error retrieving the files collection:', error);
            throw error;
        }
    }
}

export const dbClient = new DBClient();
export default dbClient;
