import { useQuery } from '@tanstack/react-query';
import { checkAuthStatusAPI } from '../../../APIServices/users/usersAPI';
import { Navigate } from 'react-router-dom';
import AuthChecking from '../AuthChecking/AuthChecking';

const AuthRoute = ({ children }) => {
  //! User Query
  const { isLoading, data } = useQuery({
    queryKey: ['user-auth'],
    queryFn: checkAuthStatusAPI,
  });

  //! For loading
  if (isLoading) {
    return <AuthChecking />;
  }

  //! In case a user is not login
  if (!data) {
    return <Navigate to='/login' />;
  }

  //! Render
  return children;
};

export default AuthRoute;
