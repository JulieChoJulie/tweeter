import React, { useCallback, useState } from 'react';
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

const fetch = (url) =>
  axios.get(url, { withCredentials: true }).then((result) => result.data);

const Profile = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const [followingsLimit, setFollowingsLimit] = useState(6);
  const [followersLimit, setFollowersLimit] = useState(6);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);

  const onClickMoreFollowers = useCallback(() => {
    dispatch({
      type: GET_FOLLOWERS_REQUEST,
      data: followersLimit,
    });
    setFollowersLimit((prev) => prev + 3);
  }, [followersLimit]);

  const onClickMoreFollowings = useCallback(() => {
    dispatch({
      type: GET_FOLLOWINGS_REQUEST,
      data: followingsLimit,
    });
    setFollowingsLimit((prev) => prev + 3);
  }, [followingsLimit]);

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
        <FollowList
          header="Followers"
          data={me.Followers}
          onClickMore={onClickMoreFollowers}
        />
        <FollowList
          header="Followings"
          data={me.Followings}
          onClickMore={onClickMoreFollowings}
        />
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

    context.store.dispatch({
      type: GET_FOLLOWERS_REQUEST,
      data: 3,
    });

    context.store.dispatch({
      type: GET_FOLLOWINGS_REQUEST,
      data: 3,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  },
);

export default Profile;
