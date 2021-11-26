import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  Grid,
  Segment,
  Form,
  Header,
  Button,
  Icon,
  Message,
} from 'semantic-ui-react';

import { loginUser, logoutUser } from './authSlice';
import { ErrorsType } from '../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { unwrapResult } from '@reduxjs/toolkit';

const Login = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<ErrorsType[]>([]);

  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser]);
  const isFormValid = () => Boolean(email && password);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrors([]);

    if (isFormValid()) {
      dispatch(loginUser({ email, password }))
        .then(unwrapResult)
        .then((user) => {
          console.log(user);
        })
        .catch((error) => {
          setErrors((prevErrors) => [...prevErrors, error]);
        });
    }
  };
  const displayErrors = () =>
    errors.map((err: ErrorsType, key) => <p key={key}>{err.message}</p>);
  return (
    <div>
      <Grid
        textAlign='center'
        verticalAlign='middle'
        style={{ height: '100vh' }}
      >
        <Grid.Column style={{ maxWidth: '420px' }}>
          <Header as='h5' icon>
            <Icon
              name='bullhorn'
              color='orange'
              style={{ marginBottom: '25px' }}
            />
            <p style={{ fontSize: '26px', color: 'orange' }}>Login</p>
          </Header>

          <Form>
            <Segment>
              <Form.Field>
                <Form.Input
                  placeholder='Email'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  icon='users'
                  name='mail'
                  type='text'
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  placeholder='Password'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  icon='lock'
                  name='password'
                  type='password'
                />
              </Form.Field>
            </Segment>

            <Button
              color='orange'
              size='small'
              onClick={(e) => handleSubmit(e)}
            >
              {' '}
              Login
            </Button>
          </Form>
          {errors.length > 0 && <Message error>{displayErrors()} </Message>}
          <Message style={{ margin: '20px' }}>
            Do not have an account ?{' '}
            <Link style={{ color: 'orangered' }} to='/register'>
              Sing up
            </Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Login;
