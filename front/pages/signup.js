import React, { useCallback, useState, useEffect } from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import { Form, Input, Checkbox, Button } from 'antd';
import useInput from '../hooks/useInput';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_MY_INFO_REQUEST, signupRequestAction } from '../reducers/user';
import Router from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '../store/configureStore';

const ErrorMessage = styled.div`
  color: red;
`;

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading, me, signedUp, signUpError } = useSelector(
    (state) => state.user,
  );
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (me && me.id) {
      Router.replace('/');
    }
  }, [me]);

  useEffect(() => {
    if (signedUp) {
      Router.replace('/');
    }
  }, [signedUp]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  const onChangeConfirmPassword = useCallback(
    (e) => {
      setConfirmPassword(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password],
  );

  useEffect(() => {
    setPasswordError(confirmPassword !== password);
  }, [password]);

  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(false);

  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== confirmPassword) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    dispatch(signupRequestAction({ email, password, nickname }));
  }, [email, password, term, confirmPassword, nickname]);

  return (
    <AppLayout>
      <Head>Sign up * Twitter</Head>
      <Form onFinish={onSubmit}>
        <div>
          <label>Email</label>
          <br />
          <Input
            name="user-email"
            type="email"
            value={email}
            required
            onChange={onChangeEmail}
          />
        </div>
        <div>
          <label>Nickname</label>
          <br />
          <Input
            name="user-nickname"
            value={nickname}
            required
            onChange={onChangeNickname}
          />
        </div>
        <div>
          <label>Password</label>
          <br />
          <Input
            name="user-password"
            value={password}
            type="password"
            required
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <br />
          <Input
            name="user-confirm-password"
            value={confirmPassword}
            type="password"
            required
            onChange={onChangeConfirmPassword}
          />
        </div>
        {passwordError && (
          <ErrorMessage>
            {"Those passwords didn't match. Try again."}
          </ErrorMessage>
        )}
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            By clicking Sign Up, you agree to our Terms, Data Policy and Cookies
            Policy. \ You may receive SMS Notifications from us and can opt out
            any time.
          </Checkbox>
          {termError && (
            <ErrorMessage>
              Please indicate that you have read and agree to the Terms and
              Conditions and Privacy Policy.
            </ErrorMessage>
          )}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type="primary" htmlType="submit" loading={signUpLoading}>
            Register
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  },
);

export default Signup;
