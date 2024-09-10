import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreatePost from './components/Posts/CreatePost/CreatePost';
import PostList from './components/Posts/PostList/PostList';
import PublicNavbar from './components/Navbar/PublicNavbar';
// import UpdatePost from './components/Posts/UpdatePost/UpdatePost';
import Home from './components/Home/Home';
import PostDetails from './components/Posts/PostDetails/PostDetails';

const App = () => {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <PublicNavbar />
      <Routes>
        <Route element={<Home />} path='/' />
        <Route element={<CreatePost />} path='/create-post' />
        <Route element={<PostList />} path='/posts' />
        <Route element={<PostDetails />} path='/posts/:postId' />
        {/* <Route element={<UpdatePost />} path='/posts/:postId' /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
