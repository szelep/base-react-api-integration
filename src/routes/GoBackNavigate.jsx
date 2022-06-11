import {
  Navigate,
  useLocation,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../providers/AuthProvider';

/**
 * Returns Navigate to given page.
 * If user is not authenticated `?back_url=` will be appended to URI.
 * Then after authentication user will be redirected to this page.
 *
 * @param {object} props - root props
 * @param {string} props.to - path to redirect
 * @returns {GoBackNavigate}
 */
export function GoBackNavigate({ to }) {
  const { authenticated } = useAuth();
  const backToText = 'back_to';
  const {
    pathname, search,
  } = useLocation();

  /**
   * Check is given word includes restricted words.
   *
   * @param {string} text - text to search
   * @returns {boolean}
   */
  const hasRestrictedWord = (text) => text.includes('logout') || text.includes('login');

  if (authenticated) {
    const redirectTo = {
      pathname: to,
    };

    if (search.includes(backToText)) {
      const decodedBackPath = decodeURIComponent(search.split('=')[1]);

      redirectTo.pathname = hasRestrictedWord(decodedBackPath) ? to : decodedBackPath;
      redirectTo.search = undefined;
    }

    return <Navigate to={redirectTo} />;
  }

  /**
   * Gets `?back_to=` text based on requested route.
   * If location's pathname contains restricted word like `logout` or `login`
   * undefined will be returned to avoid login loop abusing.
   * Will return string only if user is not authenticated,
   * REDIRECT WORKS ONLY AFTER LOGIN.
   *
   * @returns {string|undefined}
   */
  const getSearchRedirect = () => {
    if (hasRestrictedWord(pathname) || authenticated) {
      return undefined;
    }

    return `${backToText}=${encodeURIComponent(pathname)}`;
  };

  const redirectTo = {
    pathname: to,
    search: getSearchRedirect(),
  };

  return <Navigate to={redirectTo} />;
}

GoBackNavigate.propTypes = {
  to: PropTypes.string.isRequired,
};
