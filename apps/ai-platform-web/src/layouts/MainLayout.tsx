import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  DashboardOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    { key: '/', icon: <HomeOutlined />, label: '首页' },
    { key: '/assets', icon: <DashboardOutlined />, label: '资产管理' },
    { key: '/aifoot', icon: <ThunderboltOutlined />, label: 'AI 足球分析' },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light" width={200}>
        <div style={{ height: 64, padding: 16, fontWeight: 'bold', fontSize: 18 }}>
          FluxSum
        </div>
        <Menu
          mode="inline"
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px' }}>
          <h2 style={{ margin: 0 }}>AI 聚合平台</h2>
        </Header>
        <Content style={{ margin: 24, padding: 24, background: '#fff' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
