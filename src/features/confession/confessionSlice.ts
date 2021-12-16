import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFirebase } from 'react-redux-firebase';
import { confessionSchema } from '../../utils/schema';
import { ALL } from '../../utils/Tags';
import { RootState } from '../../app/store';
import { CreateConfessionType } from '../types';

export const likeConfession = createAsyncThunk(
  'confessions/likeConfessionStatus',
  async (confession: any, { getState, rejectWithValue }: any) => {
    const { currentUser } = getState().auth;
    const currentUserUid = currentUser.uid;

    let userReaction = confession.feelings[currentUserUid];
    userReaction = userReaction === null ? 0 : userReaction;
    const userAlreadyLiked = userReaction === 1;

    if (!userAlreadyLiked) {
      const result = await getFirebase()
        .database()
        .ref(`confessions/${confession.id}`)
        .transaction(function (update) {
          if (update) {
            update.feelings[currentUserUid] = 1;
            update.numberOfLikes = update.numberOfLikes + 1;
            update.numberOfDislikes =
              userReaction === 0
                ? update.numberOfDislikes
                : update.numberOfDislikes - 1;
          }
          return update;
        });

      return { confessionId: confession.id, currentUserUid, userReaction };
    } else {
      return rejectWithValue('Already Liked');
    }
  }
);

export const fetchConfessions = createAsyncThunk(
  'confessions/fetchConfessions',
  async (_, {}) => {
    const data: any = await getFirebase()
      .database()
      .ref('confessions')
      .get()
      .then((snapshot) => {
        let confessions: any = [];
        snapshot.forEach((childSnapshot) => {
          confessions.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });

        return confessions;
      });
    return data;
  }
);

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
    searchTerm: '',
  },
  reducers: {
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: {
    [createConfession.fulfilled.type]: (state, action) => {
      state.confessions.concat(action.payload);
    },
    [fetchConfessions.pending.type]: (state, action) => {
      state.loading = 'pending';
    },
    [fetchConfessions.fulfilled.type]: (state, action) => {
      state.loading = 'idle';
      state.confessions = action.payload;
    },
    [fetchConfessions.rejected.type]: (state, action) => {
      state.loading = 'idle';
    },
  },
});

export const { setCurrentCategory, setSearchTerm } = confessionSlice.actions;

export default confessionSlice.reducer;
function as(
  arg0: (
    childSnapshot: import('@firebase/database-types').DataSnapshot
  ) => void,
  as: any,
  any: any
) {
  throw new Error('Function not implemented.');
}
