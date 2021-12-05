import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFirebase } from 'react-redux-firebase';
import { ALL } from '../../utils/Tags';

export const confessionSlice = createSlice({
  name: 'confessions',
  initialState: {
    confessions: [],
    loading: 'idle',
    currentCategory: ALL,
  },
  reducers: {
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
  },
});

export const { setCurrentCategory } = confessionSlice.actions;

export default confessionSlice.reducer;
