import TabsView from '@/layouts/tabs/TabsView'
import BlankView from '@/layouts/BlankView'
// import PageView from "@/layouts/PageView";
const options = {
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: () => import('@/pages/login'),
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/pages/exception/404'),
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/pages/exception/403'),
    },
    {
      path: '/',
      name: '首页',
      component: TabsView,
      redirect: '/login',
      children: [
        {
          path: 'index',
          name: '首页',
          meta: {
            icon: 'home',
            // invisible: true,
          },
          component: () => import('@/pages/hello/index.vue'),
        },

        {
          path: 'info-manage',
          name: '信息管理',
          meta: {
            icon: 'project',
          },
          component: BlankView,
          children: [
            {
              path: 'building',
              name: '楼宇信息',
              component: () => import('@/pages/info-manage/building/index.vue'),
            },
            {
              path: 'enterprise',
              name: '企业信息',
              component: () => import('@/pages/info-manage/enterprise/index.vue'),
            },
            {
              path: 'household',
              name: '住户信息',
              component: () => import('@/pages/info-manage/household/index.vue'),
            },
            // {
            //   path: "enterprise-other",
            //   name: "企业其他信息",
            //   component: () => import("@/pages/info-manage/enterprise-other/index.vue"),
            // },
            {
              path: 'owner',
              name: '业主信息',
              component: () => import('@/pages/info-manage/owner/index.vue'),
            },
          ],
        },
        {
          path: 'data-analysis',
          name: '数据分析',
          meta: {
            icon: 'bar-chart',
          },
          component: BlankView,
          children: [
            {
              path: 'revenue',
              name: '营收数据分析',
              component: () => import('@/pages/data-analysis/revenue/index.vue'),
            },
            {
              path: 'tax-revenue',
              name: '税收数据分析',
              component: () => import('@/pages/data-analysis/tax-revenue/index.vue'),
            },
            {
              path: 'talent',
              name: '人才信息分析',
              component: () => import('@/pages/data-analysis/talent/index.vue'),
            },
            {
              path: 'house',
              name: '房屋信息分析',
              component: () => import('@/pages/data-analysis/house/index.vue'),
            },
          ],
        },
        {
          path: 'system-manage',
          name: '系统管理',
          meta: {
            icon: 'setting',
          },
          // component: () => import("@/pages/system-manage"),
          component: BlankView,
          children: [
            {
              path: 'user',
              name: '用户管理',
              component: () => import('@/pages/system-manage/user/index.vue'),
            },
            {
              path: 'role',
              name: '角色管理',
              component: () => import('@/pages/system-manage/role/index.vue'),
            },
            {
              path: 'announcement',
              name: '公告管理',
              component: () => import('@/pages/system-manage/announcement/index.vue'),
            },
            {
              path: 'announcement/update',
              name: '修改公告',
              component: () => import('@/pages/system-manage/announcement/update.vue'),
              meta: {
                invisible: true,
              },
            },
            {
              path: 'announcement/add',
              name: '新增公告',
              component: () => import('@/pages/system-manage/announcement/add.vue'),
              meta: {
                invisible: true,
              },
            },
            {
              path: 'announcement/detail',
              name: '公告详情',
              component: () => import('@/pages/system-manage/announcement/detail.vue'),
              meta: {
                invisible: true,
              },
            },
            {
              path: 'images',
              name: '图片管理',
              component: () => import('@/pages/system-manage/images/index.vue'),
            },
            {
              path: 'building',
              name: '楼宇管理',
              component: () => import('@/pages/system-manage/building/index.vue'),
            },
            {
              path: 'msg',
              name: '消息中心',
              component: () => import('@/pages/system-manage/msg/index.vue'),
            },
          ],
        },
      ],
    },
  ],
}

export default options
