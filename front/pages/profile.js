import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Router from 'next/router';
import {
  GET_FOLLOWERS_REQUEST,
  GET_FOLLOWINGS_REQUEST,
} from '../reducers/user';

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

export default Profile;
