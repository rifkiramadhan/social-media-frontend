import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatusAPI } from './APIServices/users/usersAPI';
import { useQuery } from '@tanstack/react-query';
import { isAuthenticated } from './redux/slices/authSlices';
import { useEffect } from 'react';
import {
  AccountSummaryDashboard,
  AccountVerificationDashboard,
  AddCategory,
  AuthRoute,
  CheckoutForm,
  CreatePlan,
  CreatePost,
  DashboardPosts,
  Home,
  Login,
  MyEarnings,
  MyFollowers,
  MyFollowing,
  NotificationsLists,
  PayingFreePlan,
  PaymentSuccess,
  PostDetails,
  PostList,
  Pricing,
  PrivateNavbar,
  Profile,
  PublicNavbar,
  Rankings,
  Register,
  RequestResetPassword,
  ResetPassword,
  SettingsPage,
  UpdateEmail,
  UpdatePost,
  UploadProfilePicture,
  UserDashboard,
  UsersList,
} from './components';

const App = () => {
  //! User Query
  const { data } = useQuery({
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
        <Route element={<UserDashboard />} path='/dashboard'>
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
          {/* Upload Profile Picture */}
          <Route
            element={
              <AuthRoute>
                <UploadProfilePicture />
              </AuthRoute>
            }
            path='upload-profile-picture'
          />
          {/* Update Email */}
          <Route
            element={
              <AuthRoute>
                <UpdateEmail />
              </AuthRoute>
            }
            path='update-email'
          />
          {/* Settings Page */}
          <Route
            element={
              <AuthRoute>
                <SettingsPage />
              </AuthRoute>
            }
            path='settings'
          />
          {/* My Post */}
          <Route
            element={
              <AuthRoute>
                <DashboardPosts />
              </AuthRoute>
            }
            path='posts'
          />
          {/* Users Lists */}
          <Route
            element={
              <AuthRoute>
                <UsersList />
              </AuthRoute>
            }
            path='users'
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
