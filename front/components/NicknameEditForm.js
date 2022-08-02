import React, { useCallback, useMemo } from 'react';
import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';
import useInput from '../hooks/useInput';

const NicknameEditForm = () => {
  const dispatch = useDispatch();
  const { changeNicknameLoading, me } = useSelector((state) => state.user);
  const [nickname, onChangenickname] = useInput(me?.nickname || '');

  const onEditNickname = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [dispatch, nickname]);
  const style = useMemo(
    () => ({
      marginBottom: '20px',
      border: '1px solid #d9d9d9',
      padding: '30px',
    }),
    [],
  );
  return (
    <Form style={style}>
      <Input.Search
        value={nickname}
        onChange={onChangenickname}
        addonBefore="Nickname"
        enterButton="Edit"
        loading={changeNicknameLoading}
        onSearch={onEditNickname}
      />
    </Form>
  );
};

export default NicknameEditForm;
