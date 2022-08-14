import React, { useCallback, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input } from 'antd';
import {
  ADD_POST_REQUEST,
  UPLOAD_IMAGES_REQUEST,
  REMOVE_IMAGE,
} from '../reducers/post';
import useInput from '../hooks/useInput';
import { backUrl } from '../config/config';

const PostForm = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { imagePaths, addedPost } = useSelector((state) => state.post);

  const [text, onChangeText, setText] = useInput('');

  useEffect(() => {
    if (addedPost) {
      setText('');
    }
  }, [addedPost]);

  const onChangeImages = useCallback((e) => {
    console.log('images', e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  });

  const onRemoveImages = useCallback((i) => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data: i,
    });
  });

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('The post cannot be empty.');
    }
    const formData = new FormData();

    imagePaths.forEach((f) => {
      formData.append('image', f);
    });
    formData.append('content', text);
    dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [dispatch, text, imagePaths]);

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <Form
      style={{ margin: '10px 0 20px' }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="Share your thoughts!"
      />
      <div>
        <input
          name="image"
          type="file"
          multiple
          hidden
          ref={imageInput}
          onChange={onChangeImages}
        />
        <Button onClick={onClickImageUpload}>Image Upload</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit">
          Twit
        </Button>
      </div>
      <div>
        {imagePaths.map((p, i) => (
          <div key={p + i} style={{ display: 'inline-block' }}>
            <img src={`${backUrl}/${p}`} style={{ width: '200px' }} alt={p} />
            <div>
              <Button onClick={onRemoveImages(i)}>Remove</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
