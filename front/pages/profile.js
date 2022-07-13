import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {
  const followerList = [
    { nickname: 'amy' },
    { nickname: 'babo' },
    { nickname: 'eric' },
  ];
  const followingList = [
    { nickname: 'babo ' },
    { nickname: 'Amy' },
    { nickname: 'Jane' },
  ];
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>My Profile</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="Follower list" data={followerList} />
        <FollowList header="Following list" data={followingList} />
      </AppLayout>
    </>
  );
};

export default Profile;
