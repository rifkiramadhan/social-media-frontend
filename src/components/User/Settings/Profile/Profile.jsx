import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { checkAuthStatusAPI } from '../../../../APIServices/users/usersAPI';
import { useEffect } from 'react';
import { isAuthenticated } from '../../../../redux/slices/authSlices';

const Profile = () => {
  //! User Query
  const { data } = useQuery({
    queryKey: ['user-auth'],
    queryFn: checkAuthStatusAPI,
  });

  //! Dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(isAuthenticated(data));
    }
  }, [data, dispatch]);

  return <div>Profile</div>;
};

export default Profile;
