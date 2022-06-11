import axios from 'axios';
import { sessionService } from './storageService';

export const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${sessionService.getToken()}`,
  },
});

export const requestService = {
  /**
   * Send authenticated DELETE request.
   *
   * @param {string} url - request url
   * @returns {Promise}
   */
  delete: async (url) => axios.delete(url, getAuthHeaders()),

  /**
   * Send authenticated GET request.
   *
   * @param {string} url - request url
   * @returns {Promise}
   */
  get: async (url) => axios.get(url, getAuthHeaders()),

  /**
   * Send authenticated POST request.
   *
   * @param {string} url - request url
   * @param {object} payload - request payload
   * @param {boolean} authenticated - append authorization header
   * @returns {Promise}
   */
  post: async (url, payload = {}, authenticated = true) => axios.post(
    url,
    payload,
    authenticated ? getAuthHeaders() : {}
  ),

  /**
   * Send authenticated PUT request.
   *
   * @param {string} url - request url
   * @param {object} payload - request payload
   * @returns {Promise}
   */
  put: async (url, payload = {}) => axios.put(url, payload, getAuthHeaders()),
};
