import './index.scss';

import { DiffOutlined, EditOutlined, HomeOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
) {
  return {
    label,
    key,
    icon,
    children,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link to="/">数据概览</Link>, '/', <HomeOutlined />),
  getItem(<Link to="/article">内容管理</Link>, '/article', <DiffOutlined />),
  getItem(<Link to="/publish">发布文章</Link>, '/publish', <EditOutlined />),
];

export default function MenuFC() {
  const { pathname } = useLocation();
  return (
    <Menu
      mode="inline"
      theme="dark"
      defaultSelectedKeys={[pathname]}
      style={{ height: '100%', borderRight: 0 }}
      items={items}
    />
  );
}
