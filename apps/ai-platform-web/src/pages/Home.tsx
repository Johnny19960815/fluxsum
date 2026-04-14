import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { UserOutlined, AppstoreOutlined, CloudServerOutlined } from '@ant-design/icons';

const Home: React.FC = () => {
  return (
    <div>
      <h1>欢迎使用 FluxSum AI 聚合平台</h1>
      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="活跃用户"
              value={1128}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="子应用数量"
              value={50}
              prefix={<AppstoreOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="服务状态"
              value="正常"
              prefix={<CloudServerOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
