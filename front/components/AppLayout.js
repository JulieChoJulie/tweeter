import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

import UserProfile from '../components/UserProfile';
import LoginForm from '../components/LoginForm';
import { useRouter } from 'next/router';
import useInput from '../hooks/useInput';

const Global = createGlobalStyle`
  .ant-row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
`;

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  const [searchInput, onChangeSearchInput] = useInput('');
  const router = useRouter();

  const onSearch = useCallback(() => {}, []);

  return (
    <div>
      <Global />
      <Menu
        mode="horizontal"
        selectedKeys={[router.pathname]}
        items={[
          {
            label: (
              <Link href="/">
                <a>Tweeter</a>
              </Link>
            ),
            key: '/',
          },
          {
            label: (
              <Link href="/profile">
                <a>Profile</a>
              </Link>
            ),
            key: '/profile',
          },
          {
            label: (
              <SearchInput
                enterButton
                value={searchInput}
                onChange={onChangeSearchInput}
                onSearch={onSearch}
              />
            ),
            key: '/search',
          },
        ]}
      />

      <Row gutter={24}>
        <Col xs={24} md={6}>
          {me?.id ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://www.google.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            Google
          </a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
