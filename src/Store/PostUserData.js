/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const postDataOnServer = createAsyncThunk('userData/postDataOnServer', async (user, { rejectWithValue }) => {
  delete user.test;

  const jsonUser = {
    user: {
      ...user,
    },
  };
  try {
    const responce = await fetch('https://blog.kata.academy/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(jsonUser),
    });

    if (!responce.ok) {
      throw new Error(responce.status);
    }

    delete user.password;
    return user;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const postUserData = createSlice({
  name: 'userData',
  initialState: {
    userData: {},
    status: 'expectation',
    error: null,
  },
  reducers: {
    resetData(state) {
      state.userData = {};
      state.status = 'expectation';
      state.error = null;
    },
  },
  extraReducers: {
    [postDataOnServer.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [postDataOnServer.fulfilled]: (state) => {
      state.status = 'resolved';
      state.error = null;
    },
    [postDataOnServer.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    },
  },
});

export const { resetData } = postUserData.actions;

export default postUserData.reducer;
