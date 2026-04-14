import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'

const Home = lazy(() => import('./pages/Home'))

const FixbuyAssetList = lazy(() => import('fixbuyAdmin/AssetList'))
const FixbuyDashboard = lazy(() => import('fixbuyAdmin/Dashboard'))

const AifootAnalysis = lazy(() => import('aifootWeb/Analysis'))

function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-background">
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
    </div>
  )
}

export default App
