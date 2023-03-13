/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const updUserData = createAsyncThunk('login/updUserData', async (data, { rejectWithValue }) => {
  try {
    const { email, password, username, image } = data;
    const token = localStorage.getItem('token');
    let user;
    if (password && !image) {
      user = {
        email,
        username,
        password,
        token,
      };
    } else {
      user = {
        email,
        username,
        image,
        token,
      };
    }

    const resolve = await fetch('https://blog.kata.academy/api/user', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user,
      }),
    });

    if (!resolve.ok) {
      throw new Error(resolve.status);
    }
    const res = await resolve.json();

    return res;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getUserData = createAsyncThunk('login/getUserData', async (username, { rejectWithValue }) => {
  try {
    const resolve = await fetch(`https://blog.kata.academy/api/profiles/${username}`);

    if (!resolve.ok) {
      throw new Error(resolve.status);
    }

    const res = await resolve.json();
    localStorage.setItem('username', res.profile.username);

    return res;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const postLoginUser = createAsyncThunk('login/postLoginUser', async (data, { rejectWithValue }) => {
  try {
    delete data.test;
    const responce = await fetch('https://blog.kata.academy/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        user: {
          ...data,
        },
      }),
    });

    if (!responce.ok) {
      throw new Error(responce.status);
    }

    const result = responce.json();
    result.then((user) => {
      localStorage.setItem('token', user.user.token);
      localStorage.setItem('username', user.user.username);
    });

    localStorage.setItem('email', data.email);
    return result;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const login = createSlice({
  name: 'login',
  initialState: {
    userData: {},
    status: 'expectation',
    token: null,
    error: null,
    login: false,
  },
  reducers: {
    clearData(state) {
      state.userData = {};
      state.status = 'expectation';
    },
  },
  extraReducers: {
    [postLoginUser.pending]: (state) => {
      state.status = 'loading';
      state.login = false;
      state.error = null;
    },
    [postLoginUser.fulfilled]: (state, action) => {
      state.userData = action.payload.user;
      state.status = 'resolved';
      state.login = true;
      state.error = null;
    },
    [postLoginUser.rejected]: (state, action) => {
      state.status = 'error';
      state.login = false;
      state.error = action.payload;
    },
    [getUserData.pending]: (state) => {
      state.status = 'loading';
      state.login = false;
      state.error = null;
    },
    [getUserData.fulfilled]: (state, action) => {
      state.userData = action.payload.profile;
      state.status = 'resolved';
      state.login = true;
      state.error = null;
    },
    [getUserData.rejected]: (state, action) => {
      state.status = 'error';
      state.login = false;
      state.error = action.payload;
    },
    [updUserData.pending]: (state) => {
      state.status = 'loading';
      state.login = false;
      state.error = null;
    },
    [updUserData.fulfilled]: (state) => {
      state.status = 'resolved';
      state.login = true;
      state.error = null;
    },
    [updUserData.rejected]: (state, action) => {
      state.status = 'error';
      state.login = false;
      state.error = action.payload;
    },
  },
});

export const { clearData } = login.actions;

export default login.reducer;
