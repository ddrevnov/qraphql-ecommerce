import React from 'react';
import { Menu, Layout, message } from 'antd';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';
import { useMutation } from 'react-apollo-hooks';
import { QueryResult } from 'react-apollo';

import CurrentUser from '../CurrentUser';
import { SIGNOUT_USER, CURRENT_USER_QUERY } from '../../shared/queries';

const Header: React.FC<RouteComponentProps> = ({ location }) => {
  const signOut = useMutation(SIGNOUT_USER, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  });

  const _signOut = async () => {
    try {
      await signOut();
      message.success('You are signed out');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CurrentUser>
      {({ data, error, loading }: QueryResult) => (
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

            {!data.me && !loading && (
              <Menu.Item key="/signIn">
                <NavLink to="/signIn">Sign In</NavLink>
              </Menu.Item>
            )}

            {!data.me && !loading && (
              <Menu.Item key="/signUp">
                <NavLink to="/signUp">Sign Up</NavLink>
              </Menu.Item>
            )}

            {data.me && !loading && (
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
