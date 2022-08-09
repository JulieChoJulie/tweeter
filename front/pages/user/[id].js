import axios from 'axios';
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST } from '../../reducers/user';
import { LOAD_USER_POSTS_REQUEST } from '../../reducers/post';
import wrapper from '../../store/configureStore';
import { useRouter } from 'next/router';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import { Avatar, Card } from 'antd';

const User = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { mainPosts, hasMorePosts, loadUserPostsLoading } = useSelector(
    (state) => state.post,
  );
  const { userInfo } = useSelector((state) => state.user);
  const id = router.query.id;

  useEffect(() => {
    const onScoll = () => {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadUserPostsLoading) {
          dispatch({
            type: LOAD_USER_POSTS_REQUEST,
            lastId:
              mainPosts[mainPosts.length - 1] &&
              mainPosts[mainPosts.length - 1].id,
            data: id,
          });
        }
      }
    };
    window.addEventListener('scroll', onScoll);
    return () => {
      window.removeEventListener('scroll', onScoll);
    };
  }, [mainPosts.length, hasMorePosts, id, loadUserPostsLoading]);

  return (
    <AppLayout>
      <Head>
        <title>{`${userInfo.nickname}\'s Posts`}</title>
        <meta name="description" />
        <meta name="og:title" content={`${userInfo.nickname}\'s Posts`} />
        <meta name="og:description" content={`${userInfo.nickname}\'s Posts`} />
        <meta name="og:image" content="http://localhost:3000/favicon.ico" />
        <meta name="og:url" content={`http://localhost:3000/${id}`} />
      </Head>
      {userInfo ? (
        <Card
          actions={[
            <div key="twit">
              Twits
              <br />
              {userInfo.Posts}
            </div>,
            <div key="followers">
              Followers
              <br />
              {userInfo.Followers}
            </div>,
            <div key="followings">
              Followings
              <br />
              {userInfo.Followings}
            </div>,
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
          />
        </Card>
      ) : null}
      {mainPosts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
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
      type: LOAD_USER_POSTS_REQUEST,
      data: context.params.id,
    });

    context.store.dispatch({
      type: LOAD_USER_REQUEST,
      data: context.params.id,
    });

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  },
);
export default User;
