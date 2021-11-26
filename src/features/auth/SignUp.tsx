import React, { useState, useEffect } from 'react';
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
import { unwrapResult } from '@reduxjs/toolkit';

import { ErrorsType } from '../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { registerUserAndUpdateProfile } from './authSlice';

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [gender, setGender] = useState('male');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<ErrorsType[]>([]);

  const { loading, currentUser } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setErrors([]);

    if (isFormValid()) {
      dispatch(
        registerUserAndUpdateProfile({ username, email, password, gender })
      )
        .then(unwrapResult)
        .then((user) => {
          console.log(user);
        })
        .catch((error) => {
          setErrors((prevErrors) => [...prevErrors, error]);
        });
    }
  };

  const isFormEmpty = () =>
    ![username, email, password, passwordConfirm, gender].every(Boolean);

  const isFormValid = () => {
    let error: any;

    if (!isFormEmpty() && !passwordsNotMatch()) {
      return true;
    }

    if (isFormEmpty()) {
      error = {
        code: 'empty_fields',
        message: 'Form is empty',
      };
    } else if (passwordsNotMatch()) {
      error = {
        code: 'passwords_not_match',
        message: 'Passwords do not match',
      };
    }

    setErrors((prevErrors) => [...prevErrors, error]);
    return false;
  };

  const passwordsNotMatch = () => password !== passwordConfirm;

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
            <p style={{ fontSize: '26px', color: 'orange' }}>
              Join to confession !
            </p>
          </Header>

          <Form>
            <Segment>
              <Form.Field>
                <Form.Input
                  placeholder='Username'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUserName(e.target.value)
                  }
                  icon='users'
                  name='username'
                  type='text'
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  placeholder='Email'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  icon='mail'
                  name='email'
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
              <Form.Field>
                <Form.Input
                  placeholder='Confirm password'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPasswordConfirm(e.target.value)
                  }
                  icon='repeat'
                  name='passwordConfirm'
                  type='password'
                />
              </Form.Field>
            </Segment>
            <Segment
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '0px',
                textAlign: 'center',
                alignItems: 'center',
              }}
            >
              <Form.Group inline style={{ margin: '0px', padding: '10px' }}>
                <label>Gender</label>
                <Form.Radio
                  label='Male'
                  name='radioGroup'
                  value='male'
                  checked={gender === 'male'}
                  onChange={(e, { value }: any) => setGender(value)}
                />
                <Form.Radio
                  label='Female'
                  name='radioGroup'
                  value='female'
                  checked={gender === 'female'}
                  onChange={(e, { value }: any) => setGender(value)}
                />
              </Form.Group>
            </Segment>
            <Button
              color='orange'
              size='small'
              loading={loading === 'pending'}
              onClick={(e) => handleSubmit(e)}
            >
              {' '}
              Sign up
            </Button>
          </Form>
          {errors.length > 0 && <Message error>{displayErrors()} </Message>}
          <Message style={{ margin: '20px' }}>
            Already have an account ?{' '}
            <Link style={{ color: 'orangered' }} to='/login'>
              Login
            </Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default SignUp;
