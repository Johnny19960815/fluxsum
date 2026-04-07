# 构建阶段
FROM node:20-alpine AS builder

WORKDIR /app

# 安装 pnpm
RUN corepack enable && corepack prepare pnpm@9.1.0 --activate

# 复制依赖文件
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/main/package.json ./apps/main/
COPY packages/ui-kit/package.json ./packages/ui-kit/
COPY packages/shared/package.json ./packages/shared/
COPY packages/api-sdk/package.json ./packages/api-sdk/
COPY packages/wujie-config/package.json ./packages/wujie-config/
COPY packages/tailwind-config/package.json ./packages/tailwind-config/
COPY packages/typescript-config/package.json ./packages/typescript-config/

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 构建
RUN pnpm build:main

# 运行阶段
FROM nginx:alpine AS runner

# 复制 nginx 配置
COPY deploy/dockerfiles/nginx.conf /etc/nginx/nginx.conf

# 复制构建产物
COPY --from=builder /app/apps/main/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
