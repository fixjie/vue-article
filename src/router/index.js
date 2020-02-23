import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../Layout/index.vue'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '登陆',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login'),
    redirect: '/login',
    isShow: false,
    power: ['admin', 'plain'],
    children: [
      { name: '用户登陆', path: '/login', icon: 'el-icon-pie-chart', isShow: true, component: () => import(/* webpackChunkName: "about" */ '../views/Login') }
    ]
  },
  {
    path: '/home',
    name: '首页',
    component: Layout,
    redirect: '/dashboard',
    isShow: true,
    power: ['admin', 'plain'],
    icon: 'el-icon-pie-chart',
    children: [
      { name: '仪表盘', path: '/dashboard', icon: 'el-icon-pie-chart', isShow: true, component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard') }
    ]
  },
  {
    path: '/Article',
    name: '文章管理',
    component: Layout,
    isShow: true,
    power: ['admin', 'plain'],
    icon: 'el-icon-notebook-2',
    redirect: '/article',
    children: [
      { name: '文章列表', path: '/article', icon: 'el-icon-notebook-2', isShow: true, component: () => import(/* webpackChunkName: "about" */ '../views/Article') }
    ]
  },
  {
    path: '/Settings',
    name: '设置',
    component: Layout,
    isShow: true,
    power: ['admin', 'plain'],
    icon: 'el-icon-setting',
    redirect: '/settings',
    children: [
      { name: '个人设置', path: '/settings', icon: 'el-icon-setting', isShow: true, component: () => import(/* webpackChunkName: "about" */ '../views/Settings') }
    ]
  },
  {
    path: '/Notifications',
    name: '通知',
    component: Layout,
    isShow: false,
    redirect: '/notifications',
    power: ['admin', 'plain'],
    icon: 'el-icon-setting',
    children: [
      { name: '通知中心', path: '/notifications', icon: 'el-icon-setting', isShow: true, component: () => import(/* webpackChunkName: "about" */ '../views/Notifications') }
    ]
  }
]
// history
const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
// 挂载路由守卫
router.beforeEach((to, from, next) => {
  const tokenStr = window.localStorage.getItem('vue_article_token')
  if (to.path === '/login') return next()
  if (!tokenStr) {
    return next('/login')
  } else {
    return next()
  }
})

export default router
