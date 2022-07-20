import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { addedComment, addCommentLoading } = useSelector(
    (state) => state.post,
  );

  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  useEffect(() => {
    if (addedComment) {
      setCommentText('');
    }
  }, [addedComment]);

  const onSubmitForm = useCallback(() => {
    dispatch({
      type: 'ADD_COMMENT_REQUEST',
      data: { userId: id, postId: post.id, content: commentText },
    });
  }, [commentText, id]);
  return (
    <Form onFinish={onSubmitForm}>
      <Form.Item style={{ position: 'relative', margin: 0 }}>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          row={4}
        />
        <Button
          type="primary"
          htmlType="submit"
          style={{ position: 'absolute', right: 0, button: -40, zIndex: 1 }}
          loading={addCommentLoading}
        >
          Twit
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
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
export default CommentForm;
