import React from 'react';
import { Menu, Layout, message } from 'antd';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';

import CurrentUser from '../CurrentUser';
import client from '../../client';
import { AUTH_TOKEN } from '../../shared/constants';

const Header: React.FC<RouteComponentProps> = ({ location, history }) => {
  const _signOut = () => {
    try {
      window.localStorage.removeItem(AUTH_TOKEN);
      client.resetStore();
      message.success('You are signed out');
      history.push('/signIn');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CurrentUser>
      {({ isLoggedIn }: { isLoggedIn: string }) => (
        <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['/']}
            selectedKeys={[location.pathname]}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="/">
              <NavLink to="/">Home</NavLink>
            </Menu.Item>
            <Menu.Item key="/items">
              <NavLink to="/items">Items</NavLink>
            </Menu.Item>
            <Menu.Item key="/admin">
              <NavLink to="/admin">Admin</NavLink>
            </Menu.Item>

            {!isLoggedIn && (
              <Menu.Item key="/signIn">
                <NavLink to="/signIn">Sign In</NavLink>
              </Menu.Item>
            )}

            {!isLoggedIn && (
              <Menu.Item key="/signUp">
                <NavLink to="/signUp">Sign Up</NavLink>
              </Menu.Item>
            )}

            {isLoggedIn && (
              <Menu.Item key="signOut" onClick={_signOut}>
                Sign Out
              </Menu.Item>
            )}
          </Menu>
        </Layout.Header>
      )}
    </CurrentUser>
  );
};

export default withRouter(Header);
