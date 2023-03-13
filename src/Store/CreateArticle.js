/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const deleteArticle = createAsyncThunk('createArticle/deleteArticle', async (slug, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');

    const resolve = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    if (!resolve.ok) {
      throw new Error(resolve.status);
    }

    return resolve;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const updArticle = createAsyncThunk(
  'createArticle/updArticle',
  async ({ newData, slug }, { rejectWithValue }) => {
    try {
      const { title, description, text, tagList } = newData;
      const token = localStorage.getItem('token');

      const resolve = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          article: {
            title,
            description,
            body: text,
            tagList,
            token,
          },
        }),
      });

      if (!resolve.ok) {
        throw new Error(resolve.status);
      }

      const result = resolve.json();

      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const postCreateArticle = createAsyncThunk(
  'createArticle/postCreateArticle',
  async (data, { rejectWithValue }) => {
    try {
      const { title, description, text, tagList } = data;
      const token = localStorage.getItem('token');

      const resolve = await fetch('https://blog.kata.academy/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          article: {
            title,
            description,
            body: text,
            tagList,
            token,
          },
        }),
      });

      if (!resolve.ok) {
        throw new Error(resolve.status);
      }

      const result = resolve.json();

      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const createArticle = createSlice({
  name: 'createArticle',
  initialState: {
    slugArticle: null,
    status: null,
    error: null,
  },
  reducers: {
    resetCreateArticle(state) {
      state.slugArticle = null;
      state.status = null;
      state.error = null;
    },
  },
  extraReducers: {
    [postCreateArticle.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [postCreateArticle.fulfilled]: (state, action) => {
      state.slugArticle = action.payload.article.slug;
      state.status = 'resolved';
      state.error = null;
    },
    [postCreateArticle.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    },
    [updArticle.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [updArticle.fulfilled]: (state, action) => {
      state.slugArticle = action.payload.article.slug;
      state.status = 'resolved';
      state.error = null;
    },
    [updArticle.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    },
    [deleteArticle.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [deleteArticle.fulfilled]: (state) => {
      state.status = 'deleted';
      state.error = null;
    },
    [deleteArticle.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    },
  },
});

export const { resetCreateArticle } = createArticle.actions;

export default createArticle.reducer;
