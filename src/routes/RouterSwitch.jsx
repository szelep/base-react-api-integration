import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { Login } from '../pages/Login';
import { useAuth } from '../providers/AuthProvider';
import { Logout } from '../pages/Logout';
import { AccessDenied } from '../pages/AccessDenied';
import { GoBackNavigate } from './GoBackNavigate';
import { PageWrapper } from '../pages/PageWrapper';

/**
 * Router switch with configured routes.
 *
 * @returns {RouterSwitch}
 */
export function RouterSwitch() {
  const {
    authenticated, hasRole,
  } = useAuth();

  /**
   * Authenticated routes available only after login.
   * Extra `access` can be configured.
   */
  const authenticatedRoutes = [
    {
      path: '/dashboard',
      access: hasRole('ROLE_USER'),
      component: <Dashboard />,
    },
    {
      path: '/404',
      access: true,
      component: <AccessDenied />,
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {[
          <Route
            key="login-page"
            path="/login"
            element={!authenticated ? <Login /> : <GoBackNavigate to="/dashboard" />}
          />,
          <Route
            key="logout-page"
            path="/logout"
            element={authenticated ? <Logout /> : <Navigate to="/login" />}
          />,
          <Route
            key="wildcard"
            path="*"
            element={authenticated ? <Navigate to="/404" /> : <GoBackNavigate to="/login" />}
          />,
          <Route
            key="common"
            path="/"
            element={<Navigate to="/dashboard" />}
          />,
          ...authenticatedRoutes
            .filter(({ access }) => authenticated && access)
            .map(({
              path, component,
            }) => (
              <Route
                key={`page-${path}`}
                path={path}
                element={(
                  <PageWrapper>
                    {component}
                  </PageWrapper>
                )}
              />
            )),
        ]}
      </Routes>
    </BrowserRouter>
  );
}
