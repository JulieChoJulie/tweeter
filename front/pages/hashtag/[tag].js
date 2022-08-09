import axios from 'axios';
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../../reducers/post';
import wrapper from '../../store/configureStore';
import { useRouter } from 'next/router';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import { Card } from 'antd';

const User = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { mainPosts, hasMorePosts, loadUserPostsLoading, postsLength } =
    useSelector((state) => state.post);
  const tag = router.query.tag;

  useEffect(() => {
    const onScoll = () => {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadUserPostsLoading) {
          dispatch({
            type: LOAD_HASHTAG_POSTS_REQUEST,
            lastId:
              mainPosts[mainPosts.length - 1] &&
              mainPosts[mainPosts.length - 1].id,
            data: tag,
          });
        }
      }
    };
    window.addEventListener('scroll', onScoll);
    return () => {
      window.removeEventListener('scroll', onScoll);
    };
  }, [mainPosts.length, hasMorePosts, tag, loadUserPostsLoading]);

  return (
    <AppLayout>
      <Head>
        <title>{`Hashtag #${tag}`}</title>
        <meta name="description" />
        <meta name="og:title" content={`Hashtag - #${tag}`} />
        <meta
          name="og:description"
          content={`Search for the posts with hashtag, //#region ${tag}.`}
        />
        <meta name="og:image" content="http://localhost:3000/favicon.ico" />
        <meta name="og:url" content={`http://localhost:3000/hashtag/${tag}`} />
      </Head>
      {mainPosts ? (
        <Card>
          <h2>{`#${tag} - ${postsLength + 1} posts found`}</h2>
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
      type: LOAD_HASHTAG_POSTS_REQUEST,
      data: context.params.tag,
    });

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  },
);
export default User;
