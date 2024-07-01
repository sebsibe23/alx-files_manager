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
      console.error('Redis client failed to connect:',
        err.message || err.toString());
      this.isClientConnected = false;
    });
    this.client.on('connect', () => {
      this.isClientConnected = true;
    });
  }

  /**
   * Checks if the client's connection to Redis server is active.
   * @returns {boolean} - True if connected, otherwise false.
   */
  isAlive() {
    return this.isClientConnected;
  }

  /**
   * Retrieves the value of a given key.
   * @param {string} key - The key of the item to retrieve.
   * @returns {Promise<string | object>} - The value of the key.
   */
  async get(key) {
    try {
      return await promisify(this.client.GET).bind(this.client)(key);
    } catch (error) {
      console.error(`Failed to get value for key ${key}:`, error);
      throw error;
    }
  }

  /**
   * Stores a key and its value along with an expiration time.
   * @param {string} key - The key of the item to store.
   * @param {string|number|boolean} value - The item to store.
   * @param {number} duration - The expiration time of the item in seconds.
   * @returns {Promise<void>}
   */
  async set(key, value, duration) {
    try {
      await promisify(this.client.SETEX)
        .bind(this.client)(key, duration, value);
    } catch (error) {
      console.error(`Failed to set value for key ${key}:`, error);
      throw error;
    }
  }

  /**
   * Removes the value of a given key.
   * @param {string} key - The key of the item to remove.
   * @returns {Promise<void>}
   */
  async del(key) {
    try {
      await promisify(this.client.DEL).bind(this.client)(key);
    } catch (error) {
      console.error(`Failed to delete key ${key}:`, error);
      throw error;
    }
  }
}

export const redisClient = new RedisClient();
export default redisClient;
