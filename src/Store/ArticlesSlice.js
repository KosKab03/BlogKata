/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async ({ page, token = localStorage.getItem('token') }, { rejectWithValue }) => {
    try {
      page = !page ? 1 : page;
      const offset = page === 1 ? 0 : page * 20;

      const responce = await fetch(`https://blog.kata.academy/api/articles?limit=20&offset=${offset}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      });

      if (!responce.ok) {
        throw new Error('Server Error');
      }

      const data = await responce.json();
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchArticle = createAsyncThunk('articles/fetchArticle', async (slug, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');

    const responce = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    });

    if (!responce.ok) {
      throw new Error('Server Error');
    }

    const data = await responce.json();

    return data;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

export const setLike = createAsyncThunk('articles/setLike', async (slug, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');

    const responce = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    });

    if (!responce.ok) {
      throw new Error('Server Error');
    }

    const data = await responce.json();

    return data;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

export const deleteLike = createAsyncThunk('articles/deleteLike', async (slug, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');

    const responce = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    });

    if (!responce.ok) {
      throw new Error('Server Error');
    }

    const data = await responce.json();

    return data;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    articleView: null,
    totalPages: null,
    page: 1,
    status: null,
    error: null,
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    resetArticleView(state) {
      state.articleView = null;
    },
  },
  extraReducers: {
    [fetchArticles.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchArticles.fulfilled]: (state, action) => {
      state.articles = action.payload.articles;
      state.totalPages = Math.round(action.payload.articlesCount / 20);
      state.status = 'resolved';
      state.error = null;
    },
    [fetchArticles.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    },
    [fetchArticle.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchArticle.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.error = null;
      state.articleView = action.payload.article;
    },
  },
});

export const { setPage, resetArticleView } = articlesSlice.actions;

export default articlesSlice.reducer;
