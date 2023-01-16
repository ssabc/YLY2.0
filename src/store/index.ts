/*
 * @Author: szhao
 * @Date: 2023-01-07 16:18:33
 * @LastEditTime: 2023-01-16 16:36:11
 * @LastEditors: szhao
 * @Description:
 */
import { createStore, createLogger } from 'vuex';
import { common } from './modules/common';
import { config } from './modules/config';

const debug = process.env.NODE_ENV !== 'production';

export default createStore({
    modules: {
        common: common as any,
        config: config as any,
    },
    strict: debug,
    plugins: debug ? [createLogger()] : [],
});
