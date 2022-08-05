import axios from 'axios';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import AppLayout from '../../components/AppLayout';
import wrapper from '../../store/configureStore';
import PostCard from '../../components/PostCard';
import { LOAD_POST_REQUEST } from '../../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Post = () => {
  const router = useRouter();
  const { singlePost } = useSelector((state) => state.post);

  return (
    <AppLayout>
      <Head>
        <title>{`${singlePost.User.nickname}\'s Post`}</title>
        <meta name="description" content={singlePost.content} />
        <meta name="og:title" content={`${singlePost.User.nickname}\'s Post`} />
        <meta name="og:description" content={singlePost.content} />
        <meta
          name="og:image"
          content={
            singlePost.Images[0]
              ? singlePost.Images[0].src
              : 'http://localhost:3000/favicon.ico'
          }
        />
        <meta
          name="og:url"
          content={`http://localhost:3000/post/${router.query}`}
        />
      </Head>
      <PostCard post={singlePost} />
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
      type: LOAD_MY_INFO_REQUEST,
    });

    context.store.dispatch({
      type: LOAD_POST_REQUEST,
      data: context.params.id,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  },
);

export default Post;
