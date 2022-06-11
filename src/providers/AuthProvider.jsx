import {
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import { authService } from '../services/authService';
import { sessionService } from '../services/storageService';
/**
 * @typedef {object} useAuth
 * @property {Function} onLogin - login handler
 * @property {Function} onLogout - logout handler
 * @property {Function} onUpdate - update handler
 * @property {Function} onRefresh - session refresh handler
 * @property {Function} hasRole - check if user has role
 */

const ACTION_TYPES = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  UPDATE: 'update',
};

const authReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN:
      return {
        ...state,
        ...action.value || {},
        authenticated: true,
      };
    case ACTION_TYPES.LOGOUT:
      return {
        authenticated: false,
      };
    case ACTION_TYPES.UPDATE:
      return {
        ...state,
        ...action.value || {},
      };
    default:
      return state;
  }
};

export const AuthState = createContext({});

/**
 * Authentication provider.
 *
 * @param {object} props - root props
 * @param {Node|Node[]} props.children - children elements
 * @returns {AuthProvider}
 */
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(
    authReducer,
    {
      roles: [],
      ...authService.retrieveUser(),
    },
    undefined
  );

  const dispatchDecoded = (payload, onSuccessCallback) => {
    const tokenDecoded = jwtDecode(payload?.token) || {};

    dispatch({
      type: ACTION_TYPES.LOGIN,
      value: tokenDecoded,
    });

    sessionService.write({
      username: payload?.username,
      token: payload?.token,
      ...tokenDecoded,
    });

    onSuccessCallback(payload);
  };

  const handleLogin = async (username, password, onSuccess = () => {}, onFailure = () => {}) => {
    await authService.handleLogin(
      username,
      password,
      (payload) => dispatchDecoded(payload, onSuccess),
      onFailure
    );
  };

  const handleLogout = async () => {
    Promise.resolve().then(() => {
      dispatch({ type: ACTION_TYPES.LOGOUT });
      sessionService.clear();
    });
  };

  const handleUpdate = (values) => {
    dispatch({
      type: ACTION_TYPES.UPDATE,
      value: values,
    });

    sessionService.write(values);
  };

  const context = useMemo(() => ({
    ...state,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onUpdate: handleUpdate,
    hasRole: (roleName) => (state?.roles ? state.roles.includes(roleName) : false),
  }), [state]);

  return (
    <AuthState.Provider value={context}>
      {children}
    </AuthState.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Use auth context.
 *
 * @returns {useAuth}
 */
export const useAuth = () => useContext(AuthState);
