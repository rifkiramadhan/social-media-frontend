import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreatePost from './components/Posts/CreatePost/CreatePost';
import PostList from './components/Posts/PostList/PostList';
import PublicNavbar from './components/Navbar/publicNavbar/PublicNavbar';
import Home from './components/Home/Home';
import PostDetails from './components/Posts/PostDetails/PostDetails';
import Login from './components/User/Login/Login';
import Register from './components/User/Register/Register';
import Profile from './components/User/Profile/Profile';
import PrivateNavbar from './components/Navbar/privateNavbar/privateNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatusAPI } from './APIServices/users/usersAPI';
import { useQuery } from '@tanstack/react-query';
import { isAuthenticated } from './redux/slices/authSlices';
import { useEffect } from 'react';
import AuthRoute from './components/Auth/AuthRoute/AuthRoute';
import UserDashbaord from './components/User/UserDashboard/userDashboard';
import AccountSummaryDashboard from './components/User/UserDashboard/AccountSummaryDashboard/AccountSummaryDashboard';

const App = () => {
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

  //! Get the login user from store
  const { userAuth } = useSelector(state => state.auth);
  console.log(userAuth);
  return (
    <BrowserRouter>
      {/* Navbar */}
      {userAuth ? <PrivateNavbar /> : <PublicNavbar />}
      <Routes>
        <Route element={<Home />} path='/' />
        <Route element={<UserDashbaord />} path='/dashboard'>
          {/* Create Post */}
          <Route
            element={
              <AuthRoute>
                <CreatePost />
              </AuthRoute>
            }
            path='create-post'
          />
          {/* Account Summary Dashboard */}
          <Route
            element={
              <AuthRoute>
                <AccountSummaryDashboard />
              </AuthRoute>
            }
            path=''
          />
        </Route>
        <Route element={<PostList />} path='/posts' />
        <Route element={<PostDetails />} path='/posts/:postId' />
        <Route element={<Login />} path='/login' />
        <Route element={<Register />} path='/register' />
        <Route
          element={
            <AuthRoute>
              <Profile />
            </AuthRoute>
          }
          path='/profile'
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
