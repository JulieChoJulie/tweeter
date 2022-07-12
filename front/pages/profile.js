import Head from 'next/head';
import AppLayout from '../components/AppLayout';

const Profile = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>My Profile</title>
      </Head>
      <AppLayout>
        <div>Profile</div>
      </AppLayout>
    </>
  );
};

export default Profile;
