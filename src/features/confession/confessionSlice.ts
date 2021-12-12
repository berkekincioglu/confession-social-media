import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFirebase } from 'react-redux-firebase';
import { confessionSchema } from '../../utils/schema';
import { ALL } from '../../utils/Tags';
import { CreateConfessionType } from '../types';
import { RootState } from '../../app/store';
export const createConfession = createAsyncThunk(
  'confessions/createConfessionStatus',
  async (
    { content, tags, shareAs, profile }: CreateConfessionType,
    { getState }: any
  ) => {
    const { currentUser }: any = getState().auth;
    const confessionsRef = getFirebase().ref('confessions');
    const key: any = confessionsRef.push().key;

    const confession: any = {
      id: key,
      content,
      tags,
      shareAs,
      timestamp: getFirebase().database.ServerValue.TIMESTAMP,
      numberOfLikes: 0,
      numberOfDislikes: 0,
      user: {
        uid: currentUser.uid,
        username: currentUser.displayName,
        photoURL: currentUser.photoURL,
        gender: profile.gender,
      },
      favorites: {
        [currentUser.uid]: 0,
      },
      feelings: {
        [currentUser.uid]: 0,
      },
    };

    const validate = await confessionSchema.validateAsync(confession);
    const result = confessionsRef.child(key).set(confession);

    const savedConfession = await confessionsRef
      .child(key)
      .once('value')
      .then((snapshot) => {
        return snapshot.val();
      });
    return savedConfession;
  }
);

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
  extraReducers: {
    [createConfession.fulfilled.type]: (state, action) => {
      state.confessions.concat(action.payload);
    },
  },
});

export const { setCurrentCategory } = confessionSlice.actions;

export default confessionSlice.reducer;
