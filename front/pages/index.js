import Head from 'next/head';
import AppLayout from '../components/AppLayout';

const Home = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Twitter</title>
      </Head>
      <AppLayout>
        <div>Hello</div>
      </AppLayout>
    </>
  );
};

export default Home;
