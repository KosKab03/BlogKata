/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (page = 1) => {
  const offset = page * 20;
  const responce = await fetch(`https://blog.kata.academy/api/articles?offset=${offset}`);

  const data = await responce.json();

  return data;
});

export const fetchArticle = createAsyncThunk('articles/fetchArticle', async (slug) => {
  const responce = await fetch(`https://blog.kata.academy/api/articles/${slug}`);

  const data = await responce.json();

  return data;
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    articleView: null,
    totalPages: null,
    status: null,
    error: null,
  },
  extraReducers: {
    [fetchArticles.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchArticles.fulfilled]: (state, action) => {
      state.status = 'resolved';

      state.articles = action.payload.articles;
      state.totalPages = Math.round(action.payload.articlesCount / 20);
    },
    // [fetchArticles.rejected]: (state, action) => {},
    [fetchArticle.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchArticle.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.articleView = action.payload.article;
    },
  },
});

export default articlesSlice.reducer;
