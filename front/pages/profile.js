import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Router from 'next/router';

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);

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
        <FollowList header="Follower list" data={me.Followers} />
        <FollowList header="Following list" data={me.Followings} />
      </AppLayout>
    </>
  );
};

export default Profile;
