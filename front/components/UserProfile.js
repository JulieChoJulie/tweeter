import React, { useCallback, useMemo } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../reducers/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const onLogOut = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  const buttonStyle = useMemo(() => ({ left: '45px' }), []);

  return (
    <Card
      actions={[
        <div key="twits">
          Twits
          <br />0
        </div>,
        <div key="followings">
          Followings
          <br />0
        </div>,
        <div key="followers">
          Followers
          <br />0
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>JC</Avatar>} title="JulieCho" />
      <Button style={buttonStyle} onClick={onLogOut}>
        Log out
      </Button>
    </Card>
  );
};

export default UserProfile;
