import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import React from 'react';
import { checkAuthStatusAPI } from '../../../../APIServices/users/usersAPI';
import { useEffect } from 'react';
import { isAuthenticated } from '../../../../redux/slices/authSlices';

const Profile = () => {
  //! User Query
  const { isError, isLoading, isSuccess, data, error, refetch } = useQuery({
    queryKey: ['user-auth'],
    queryFn: checkAuthStatusAPI,
  });

  //! Dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isAuthenticated(data));
  }, [data]);

  return <div>Profile</div>;
};

export default Profile;
