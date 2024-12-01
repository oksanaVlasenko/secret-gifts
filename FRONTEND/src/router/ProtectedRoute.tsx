import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: ReactNode; // Ось тут використовуємо ReactNode, а не ReactElement
}

const ProtectedRoute = ({ isAuthenticated, children }: ProtectedRouteProps): JSX.Element => {
  console.log(isAuthenticated, ' is auth')
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!children) {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
