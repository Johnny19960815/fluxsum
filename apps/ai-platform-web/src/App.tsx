import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spin, Layout } from 'antd';
import MainLayout from './layouts/MainLayout';

const Home = lazy(() => import('./pages/Home'));

const FixbuyAssetList = lazy(() => import('fixbuyAdmin/AssetList'));
const FixbuyDashboard = lazy(() => import('fixbuyAdmin/Dashboard'));

const AifootAnalysis = lazy(() => import('aifootWeb/Analysis'));

const Loading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Spin size="large" />
  </div>
);

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="assets" element={<FixbuyAssetList />} />
            <Route path="assets/dashboard" element={<FixbuyDashboard />} />
            <Route path="aifoot" element={<AifootAnalysis />} />
          </Route>
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
