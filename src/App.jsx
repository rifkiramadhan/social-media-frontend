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
import UserDashbaord from './components/User/UserDashboard/UserDashboard';
import AccountSummaryDashboard from './components/User/UserDashboard/AccountSummaryDashboard/AccountSummaryDashboard';
import AddCategory from './components/Category/AddCategory/AddCategory';
import CreatePlan from './components/Plans/CreatePlan/CreatePlan';
import Pricing from './components/Plans/Pricing/Pricing';

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
        {/* User Dashboard */}
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
          {/* Create Plan */}
          <Route
            element={
              <AuthRoute>
                <CreatePlan />
              </AuthRoute>
            }
            path='create-plan'
          />
          {/* Create Category */}
          <Route
            element={
              <AuthRoute>
                <AddCategory />
              </AuthRoute>
            }
            path='add-category'
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
        {/* Public Links */}
        <Route element={<PostList />} path='/posts' />
        <Route element={<PostDetails />} path='/posts/:postId' />
        <Route element={<Login />} path='/login' />
        <Route element={<Register />} path='/register' />
        <Route element={<Pricing />} path='/pricing' />
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
