import type { SubAppConfig, WujieRouteConfig } from "./types";

const isDev = process.env.NODE_ENV === "development";

const getSubAppUrl = (name: string, devPort: number): string => {
  if (isDev) {
    return `http://localhost:${devPort}`;
  }
  return `/${name}`;
};

export const subApps: Record<string, SubAppConfig> = {
  // 示例子应用配置
  // dashboard: {
  //   name: "dashboard",
  //   url: getSubAppUrl("dashboard", 3001),
  //   alive: true,
  //   sync: true,
  //   fiber: true,
  // },
};

export const routes: WujieRouteConfig[] = [
  // 示例路由配置
  // {
  //   path: "/dashboard",
  //   subApp: subApps.dashboard,
  //   exact: false,
  // },
];

export const defaultWujieProps = {
  alive: true,
  sync: true,
  fiber: true,
  degrade: false,
};

export { getSubAppUrl };
