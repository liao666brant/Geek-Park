import './index.scss';

import { LogoutOutlined } from '@ant-design/icons';
import { Layout, Popconfirm } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useStore } from '@/store';

import MenuRC from './MenuRC';

const { Header, Sider } = Layout;

function LayoutComponent() {
  const { userStore, loginStore, channelStore } = useStore();

  // 发起请求存储全局数据
  useEffect(() => {
    userStore.getUserInfo();
    channelStore.loadChannelList();
  }, [userStore, channelStore]);

  /**
   * 确认退出
   */
  const handleConfirm = () => {
    loginStore.loginOut();
    location.reload();
  };

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userStore.userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
              onConfirm={handleConfirm}
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          {/* 侧边栏菜单 */}
          <MenuRC />
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
}

export default observer(LayoutComponent);
