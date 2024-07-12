import { createRouter, createWebHistory } from 'vue-router';
import root from './root';
import { ADMIN_USER_TOKEN, USER_TOKEN } from '/@/store/constants';

// 路由权限白名单
const allowList = ['adminLogin', 'home', 'login', 'register', 'portal', 'search', 'detail', '403', '404'];
// 前台登录地址
const loginRoutePath = '/index/login';
// 前台首页地址
const homeRoutePath = '/index/home';
// 后台登录地址
const adminLoginRoutePath = '/adminLogin';

// 创建 Vue Router 实例
const router = createRouter({
  history: createWebHistory('/'), // 使用 HTML5 模式的路由历史记录
  routes: root, // 路由配置
});

// 路由前置守卫，用于在每次导航之前执行
router.beforeEach(async (to, from, next) => {
  console.log(to, from);

  /** 后台路由 **/
  if (to.path.startsWith('/admin')) {
    if (localStorage.getItem(ADMIN_USER_TOKEN)) {
      if (to.path === adminLoginRoutePath) {
        next({ path: '/' }); // 已登录且访问登录页时，重定向到首页
      } else {
        next(); // 继续导航
      }
    } else {
      if (allowList.includes(to.name as string)) {
        next(); // 免登录白名单，直接进入
      } else {
        next({ path: adminLoginRoutePath, query: { redirect: to.fullPath } }); // 未登录，重定向到后台登录页
      }
    }
  }

  /** 前台路由 **/
  if (to.path.startsWith('/index')) {
    if (localStorage.getItem(USER_TOKEN)) {
      if (to.path === loginRoutePath) {
        next({ path: '/' }); // 已登录且访问登录页时，重定向到首页
      } else {
        next(); // 继续导航
      }
    } else {
      if (allowList.includes(to.name as string)) {
        next(); // 免登录白名单，直接进入
      } else {
        next({ path: loginRoutePath, query: { redirect: to.fullPath } }); // 未登录，重定向到前台登录页
      }
    }
  }
});

// 路由后置守卫，用于在每次导航后执行
router.afterEach((_to) => {
  // 回到顶部
  document.getElementById('html')?.scrollTo(0, 0);
});

export default router;
