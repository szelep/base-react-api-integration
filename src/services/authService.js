import { sessionService } from './storageService';
import { requestService } from './requestService';
import { API_ROUTES } from '../constants/ApiRoutes';

/**
 * @typedef {object} sessionUser
 * @property {boolean} authenticated - user authenticated state
 * @property {string} username - username
 * @property {Array} roles - user roles
 * @property {string} token - user JWT token
 * @property {string} iat - token initialization time (as seconds from 1970)
 * @property {string} exp - token expiration time (as seconds from 1970)
 */

/**
 * Auth helper functions.
 */
export const authService = {
  /**
   * Gets logged user data from session.
   *
   * @returns {sessionUser}
   */
  retrieveUser: () => ({
    authenticated: !!sessionService.get('username'),
    username: sessionService.get('username'),
    token: sessionService.get('token'),
    iat: sessionService.get('iat'),
    exp: sessionService.get('exp'),
    id: sessionService.get('id'),
    roles: sessionService.get('roles') || [],
  }),

  /**
   * Send request to authentication API.
   *
   * @param {string} username - user name
   * @param {string} password - user password
   * @param {Function} onSuccess - function invoked on request success
   * @param {Function} onFailure - function invoked on request failure
   * @returns {void}
   */
  handleLogin: async (username, password, onSuccess, onFailure) => {
    const authUrl = API_ROUTES.authenticate;

    try {
      const { data } = await requestService.post(
        authUrl,
        {
          username,
          password,
        }
      );

      onSuccess(data);
    } catch (error) {
      onFailure(error);
    }
  },
};
