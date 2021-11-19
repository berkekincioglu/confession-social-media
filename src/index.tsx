import React from 'react';
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
  return (
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default Root;

ReactDOM.render(
  <>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Root />
      </ReactReduxFirebaseProvider>
    </Provider>
  </>,
  document.getElementById('root')
);
