import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import PostImages from './PostImages';
import { Avatar, Button, Card, Popover } from 'antd';
import {
  RetweetOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';

const PostCard = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id);
  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const onToggleLiked = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);
  const onToggleComments = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  return (
    <div style={{ marginTop: '20px' }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart"
              onClick={onToggleLiked}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLiked} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComments} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && id === post.User.id ? (
                  <>
                    <Button>Edit</Button>
                    <Button type="danger">Delete</Button>
                  </>
                ) : (
                  <Button>Report</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Card.Meta
          description={post.content}
          title={post.User.nickname}
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
        />
        <Button></Button>
      </Card>
      {commentFormOpened && <div>Comments Opened</div>}
      {/* <CommentForm />
      <Comments /> */}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.shape({
      id: PropTypes.number,
      nickname: PropTypes.string,
    }),
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Images: PropTypes.arrayOf(PropTypes.object),
    Comments: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;
