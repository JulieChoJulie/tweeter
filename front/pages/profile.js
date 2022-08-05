import React from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { END } from 'redux-saga';
import Router from 'next/router';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import {
  GET_FOLLOWERS_REQUEST,
  GET_FOLLOWINGS_REQUEST,
  LOAD_MY_INFO_REQUEST,
} from '../reducers/user';
import wrapper from '../store/configureStore';

const Profile = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);

  useEffect(() => {
    dispatch({
      type: GET_FOLLOWERS_REQUEST,
    });
    dispatch({
      type: GET_FOLLOWINGS_REQUEST,
    });
  }, []);

  if (!me) {
    return null;
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>My Profile</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="Followers" data={me.Followers} />
        <FollowList header="Followings" data={me.Followings} />
      </AppLayout>
    </>
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

export default Profile;
