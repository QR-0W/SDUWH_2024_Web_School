import { createRouter, createWebHistory } from 'vue-router';
import root from './root';
import { ADMIN_USER_TOKEN, USER_TOKEN } from '/@/store/constants';

// 路由权限白名单
const allowList = ['adminLogin', 'login', 'register', 'portal', 'search', 'detail', '403', '404'];
// 前台登录地址
const loginRoutePath = '/index/login';
// 后台登录地址
const adminLoginRoutePath = '/adminLogin';

const router = createRouter({
  history: createWebHistory(),
  routes: root,
});

router.beforeEach(async (to, from, next) => {
  console.log(to, from);

  const isAdminRoute = to.path.startsWith('/admin');
  const isIndexRoute = to.path.startsWith('/index');

  if (isAdminRoute || isIndexRoute) {
    const tokenKey = isAdminRoute ? ADMIN_USER_TOKEN : USER_TOKEN;
    const loginPath = isAdminRoute ? adminLoginRoutePath : loginRoutePath;

    if (localStorage.getItem(tokenKey)) {
      if (to.path === loginPath) {
        next({ path: '/' });
      } else {
        next();
      }
    } else {
      if (allowList.includes(<string>to.name ?? '')) {
        // 在免登录名单，直接进入
        next();
      } else {
        next({ path: loginPath, query: { redirect: to.fullPath } });
      }
    }
  } else {
    next();
  }
});

router.afterEach((_to) => {
  // 回到顶部
  document.documentElement.scrollTo(0, 0);
});

export default router;
