import React from 'react';
import Login from '../../User/Login/Login';
import { useQuery } from '@tanstack/react-query';
import { checkAuthStatusAPI } from '../../../APIServices/users/usersAPI';
import { Navigate } from 'react-router-dom';
import AuthChecking from '../AuthChecking/AuthChecking';

const AuthRoute = ({ children }) => {
  //! User Query
  const { isError, isLoading, isSuccess, data, error, refetch } = useQuery({
    queryKey: ['user-auth'],
    queryFn: checkAuthStatusAPI,
  });

  console.log(data);

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
