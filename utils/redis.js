import { promisify } from 'util';
import { createClient } from 'redis';

/**
 * Represents a Redis client.
 */
class RedisClient {
  /**
   * Creates a new RedisClient instance.
   */
  constructor() {
    this.client = createClient();
    this.isClientConnected = true;
    this.client.on('error', (err) => {
      console.error(
        'Redis client failed to connect:',
        err.message || err.toString()
      );
      this.isClientConnected = false;
    });
    this.client.on('connect', () => {
      this.isClientConnected = true;
    });
  }

  /**
   * Checks if this client's connection to the Redis server
   * is active.
   * @returns {boolean}
   */
  isAlive() {
    return this.isClientConnected;
  }

  /**
   * Retrieves the value of a given key.
   * @param {String} key The key of the item to retrieve.
   * @returns {String | Object}
   */
  async get(key) {
    try {
      return await promisify(this.client.GET)
        .bind(this.client)(key);
    } catch (err) {
      console.error('Error retrieving key:', err.message || err.toString());
      throw err;
    }
  }

  /**
   * Stores a key and its value along with an expiration
   * time.
   * @param {String} key The key of the item to store.
   * @param {String | Number | Boolean} value The item to
   * store.
   * @param {Number} duration The expiration time of the
   * item in seconds.
   * @returns {Promise<void>}
   */
  async set(key, value, duration) {
    try {
      await promisify(this.client.SETEX)
        .bind(this.client)(key, duration, value);
    } catch (err) {
      console.error('Error setting key:', err.message || err.toString());
      throw err;
    }
  }

  /**
   * Removes the value of a given key.
   * @param {String} key The key of the item to remove.
   * @returns {Promise<void>}
   */
  async del(key) {
    try {
      await promisify(this.client.DEL)
        .bind(this.client)(key);
    } catch (err) {
      console.error('Error deleting key:', err.message || err.toString());
      throw err;
    }
  }
}

export const redisClient = new RedisClient();
export default redisClient;
