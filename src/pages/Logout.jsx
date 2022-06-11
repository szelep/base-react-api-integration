import { useAuth } from '../providers/AuthProvider';

/**
 * Page used for invalidate user session.
 * Some user message can be dispatched from this place before or after logging out.
 *
 * @returns {string}
 */
export const Logout = () => {
  const { onLogout } = useAuth();

  onLogout();

  return '';
};
