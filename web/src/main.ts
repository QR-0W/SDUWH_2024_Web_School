// 引入Vue的createApp方法，用于创建应用实例
import { createApp } from 'vue';
// 引入根组件
import App from './App.vue';
// 引入路由配置
import router from './router';
// 引入Pinia状态管理
import piniaStore from './store';

// 引入自定义的启动配置
import bootstrap from './core/bootstrap';
// 引入样式重置文件
import '/@/styles/reset.less';
// 引入全局样式文件
import '/@/styles/index.less';
// 引入Ant Design Vue组件库
import Antd from 'ant-design-vue';

// 创建Vue应用实例
const app = createApp(App);

// 使用Ant Design Vue组件库
app.use(Antd);
// 使用路由
app.use(router);
// 使用Pinia状态管理
app.use(piniaStore);
// 执行自定义启动配置
app.use(bootstrap);

// 将应用实例挂载到页面上的#app元素
app.mount('#app');
