import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreatePost from './components/Posts/CreatePost/CreatePost';
import PostList from './components/Posts/PostList/PostList';
import PublicNavbar from './components/Navbar/publicNavbar/publicNavbar';
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
import CheckoutForm from './components/Plans/CheckoutForm/CheckoutForm';
import PaymentSuccess from './components/Plans/PaymentSuccess/PaymentSuccess';
import PayingFreePlan from './components/Plans/Playing/PlayingFreePlan/PlayingFreePlan';
import AccountVerificationDashboard from './components/User/UserDashboard/AccountVerificationDashboard/AccountVerificationDashboard';
import RequestResetPassword from './components/User/ResetPassword/RequestResetPassword/RequestResetPassword';
import ResetPassword from './components/User/ResetPassword/ResetPassword/ResetPassword';
import UpdatePost from './components/Posts/UpdatePost/UpdatePost';
import Rankings from './components/Rankings/Rankings';
import NotificationsLists from './components/Notification/NotificationLists/NotificationLists';
import MyFollowing from './components/User/Followers/MyFollowing/MyFollowing';
import MyFollowers from './components/User/Followers/MyFollowers/MyFollowers';
import MyEarnings from './components/User/MyEarnings/MyEarnings';

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
          {/* My Earnings */}
          <Route
            element={
              <AuthRoute>
                <MyEarnings />
              </AuthRoute>
            }
            path='my-earnings'
          />
          {/* My Followers */}
          <Route
            element={
              <AuthRoute>
                <MyFollowers />
              </AuthRoute>
            }
            path='my-followers'
          />
          {/* My Following */}
          <Route
            element={
              <AuthRoute>
                <MyFollowing />
              </AuthRoute>
            }
            path='my-followings'
          />
          {/* Create Post */}
          <Route
            element={
              <AuthRoute>
                <CreatePost />
              </AuthRoute>
            }
            path='create-post'
          />
          {/* Update Post */}
          <Route
            element={
              <AuthRoute>
                <UpdatePost />
              </AuthRoute>
            }
            path='update-post/:postId'
          />
          {/* Notification */}
          <Route
            element={
              <AuthRoute>
                <NotificationsLists />
              </AuthRoute>
            }
            path='notifications'
          />
          {/* Verify Account */}
          <Route
            element={
              <AuthRoute>
                <AccountVerificationDashboard />
              </AuthRoute>
            }
            path='account-verification/:verifyToken'
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
        <Route element={<CheckoutForm />} path='/checkout/:planId' />
        <Route element={<RequestResetPassword />} path='/forgot-password' />
        <Route element={<Rankings />} path='/ranking' />
        <Route
          element={<ResetPassword />}
          path='/reset-password/:verifyToken'
        />
        <Route
          element={
            <AuthRoute>
              <Profile />
            </AuthRoute>
          }
          path='/profile'
        />
        <Route
          element={
            <AuthRoute>
              <PaymentSuccess />
            </AuthRoute>
          }
          path='/success'
        />
        <Route
          element={
            <AuthRoute>
              <PayingFreePlan />
            </AuthRoute>
          }
          path='/free-subscription'
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
