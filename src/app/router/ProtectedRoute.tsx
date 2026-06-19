import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '@/app/redux/hooks';

interface ProtectedRouteProps {
  requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requireAuth = true }) => {
  const { accessToken, initialized } = useAppSelector((state) => state.auth);

  // Chưa khởi tạo xong => không render gì
  if (!initialized) {
    return null;
  }

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
