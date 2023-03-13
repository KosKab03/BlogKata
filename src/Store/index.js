import articles from './ArticlesSlice';
import postUserData from './PostUserData';
import login from './LogIn';
import createArticle from './CreateArticle';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    articles,
    postUserData,
    login,
    createArticle,
  },
});
