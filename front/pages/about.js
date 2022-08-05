import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import { Avatar, Card } from 'antd';
import wrapper from '../store/configureStore';
import { LOAD_USER_REQUEST } from '../reducers/user';
import { END } from 'redux-saga';

const About = () => {
  const { userInfo, me } = useSelector((state) => state.user);

  return (
    <AppLayout>
      <Head>
        <meta charSet="utf-8" />
        <title>Twitter</title>
      </Head>
      {userInfo ? (
        <Card
          actions={[
            <div key="twit">
              Twit
              <br />
              {userInfo.Posts}
            </div>,
            <div key="followings">
              Followings
              <br />
              {userInfo.Followings}
            </div>,
            <div key="followers">
              Followers
              <br />
              {userInfo.Followers}
            </div>,
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
            description="twitter addictor"
          />
        </Card>
      ) : null}
    </AppLayout>
  );
};

export const getStaticProps = wrapper.getStaticProps(async (context) => {
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: 1,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default About;
