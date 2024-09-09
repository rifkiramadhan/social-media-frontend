import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreatePost from './components/Posts/CreatePost';
import PostList from './components/PostList/PostList';
import PublicNavbar from './components/Navbar/PublicNavbar';
import HomePage from './components/HomePage/HomePage';
import UpdatePost from './components/UpdatePost/UpdatePost';

function App() {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <PublicNavbar />
      <Routes>
        <Route element={<HomePage />} path='/' />
        <Route element={<CreatePost />} path='/create-post' />
        <Route element={<PostList />} path='/lists' />
        <Route element={<UpdatePost />} path='/posts/:postId' />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
