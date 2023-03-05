import articles from './ArticlesSlice';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    articles,
  },
});
