import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import firebase from './firebase';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './features/auth/Login';
import SignUp from './features/auth/SignUp';
import NotFound from './components/NotFound';
import { setCurrentUser } from './features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

const rrfProps = {
  firebase,
  config: {
    userProfile: 'users',
    enableLogging: false,
  },
  dispatch: store.dispatch,
};
const Root = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.auth);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(setCurrentUser(user));
      } else {
        navigate('/login');
      }
    });
  }, []);

  return (
    <Routes>
      <Route
        path='/'
        element={
          <PrivateRoute>
            <App />
          </PrivateRoute>
        }
      />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<SignUp />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default Root;

ReactDOM.render(
  <>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <Root />
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  </>,
  document.getElementById('root')
);
