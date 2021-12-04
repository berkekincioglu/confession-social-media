import React, { Fragment } from 'react';
import { Route, Navigate } from 'react-router';
import { useAppSelector } from '../app/hooks';
import Spinner from './Spinner';

type Props = {
  children?: React.ReactNode | JSX.Element[];
};
const PrivateRoute = ({ children }: Props) => {
  const { currentUser, isLoadingUser } = useAppSelector((state) => state.auth);
  if (isLoadingUser) return <Spinner />;
  return currentUser ? (
    // <Fragment>{children}</Fragment>
    (children as React.ReactElement)
  ) : (
    <Navigate to='/login' />
  );
};

export default PrivateRoute;
