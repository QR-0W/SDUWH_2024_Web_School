import { createPinia } from 'pinia';
import { useAppStore } from './modules/app';
import { useUserStore } from './modules/user';
import { useSidebarStore } from './sidebar';

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export { useAppStore, useUserStore, useSidebarStore };
export default pinia;
//这些函数可以在组件中使用，以获取、设置和监听相应模块的状态数据。使用了Pinia库来创建和配置状态管理器