/*
 * @Author: szhao
 * @Date: 2023-01-07 16:18:32
 * @LastEditTime: 2023-01-10 10:07:55
 * @LastEditors: szhao
 * @Description:
 */
import { createApp } from 'vue';
import App from './App.vue';
import '@/assets/styles/tailwind.css';
import store from './store';
import { r as router } from './routes';
import globalComponents from './components';
import 'ant-design-vue/dist/antd.css';
import '@/assets/styles/common.less';
import '@/utils/routeAuth';

createApp(App).use(router).use(store).use(globalComponents).mount('#app');
