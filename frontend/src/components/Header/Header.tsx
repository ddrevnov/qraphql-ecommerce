import React from 'react';
import { Menu, Layout } from 'antd';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';

const Header: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" />
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
        <Menu.Item key="/sell">
          <NavLink to="/sell">Sell</NavLink>
        </Menu.Item>
      </Menu>
    </Layout.Header>
  );
};

export default withRouter(Header);
