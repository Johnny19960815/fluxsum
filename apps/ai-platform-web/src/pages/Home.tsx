import React from 'react'
import { Users, AppWindow, Server } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@fluxsum/ui'

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ElementType
  valueClassName?: string
}

function StatCard({ title, value, icon: Icon, valueClassName }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <p className={`text-3xl font-bold ${valueClassName ?? ''}`}>{value}</p>
      </CardContent>
    </Card>
  )
}

const Home: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">欢迎使用 FluxSum AI 聚合平台</h1>
        <p className="mt-1 text-sm text-muted-foreground">一站式服务全球，基于 Module Federation 2.0 微前端架构</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard title="活跃用户" value={1128} icon={Users} />
        <StatCard title="子应用数量" value={50} icon={AppWindow} />
        <StatCard
          title="服务状态"
          value="正常"
          icon={Server}
          valueClassName="text-green-600"
        />
      </div>
    </div>
  )
}

export default Home
