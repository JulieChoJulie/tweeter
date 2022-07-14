import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Card, Avatar, Button } from 'antd';

const UserProfile = ({ setIsLoggedIn }) => {
  const onLogOut = useCallback(() => {
    setIsLoggedIn(false);
  });

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

UserProfile.propTypes = {
  setIsLoggedIn: PropTypes.func,
};

export default UserProfile;
