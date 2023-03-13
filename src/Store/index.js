import articles from './articles-slice';
import postUserData from './post-user-data';
import login from './log-in';
import createArticle from './create-article';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    articles,
    postUserData,
    login,
    createArticle,
  },
});
