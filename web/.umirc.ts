import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'flexnpu演示',
  },
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      name: '演示环境信息',
      path: '/dashboard',
      component: './dashboard',
    },
    {
      name: '推理服务部署',
      path: '/deploy',
      component: './deploy',
    },
    {
      name: '推理服务扩容',
      path: '/scale',
      component: './scale',
    },
  ],
  npmClient: 'npm',
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8090',
      changeOrigin: true,
      pathRewrite: { '^/api': '/api' },
    },
  },
});

