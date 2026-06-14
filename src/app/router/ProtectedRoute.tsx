import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '@/app/redux/hooks';

interface ProtectedRouteProps {
  requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requireAuth = true }) => {
  const { accessToken } = useAppSelector((state) => state.auth);

  // Route cần login
  if (requireAuth && !accessToken) {
    return <Navigate to="/auth/login" replace />;
  }

  // Route auth (login/register)
  if (!requireAuth && accessToken) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
