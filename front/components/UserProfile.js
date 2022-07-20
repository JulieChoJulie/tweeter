import React, { useCallback, useMemo } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, isLoggingOut } = useSelector((state) => state.user);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, [dispatch]);

  const buttonStyle = useMemo(() => ({ left: '45px' }), []);

  return (
    <Card
      actions={[
        <div key="twits">
          Twits
          <br />
          {me.Posts.length}
        </div>,
        <div key="followings">
          Followings
          <br />
          {me.Followings.length}
        </div>,
        <div key="followers">
          Followers
          <br />
          {me.Followers.length}
        </div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
      />
      <Button style={buttonStyle} onClick={onLogOut} loading={isLoggingOut}>
        Log out
      </Button>
    </Card>
  );
};

export default UserProfile;
