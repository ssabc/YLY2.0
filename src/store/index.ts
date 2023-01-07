
import { createStore, createLogger } from 'vuex';
import { common } from './modules/common';

const debug = process.env.NODE_ENV !== 'production';

export default createStore({
    modules: {
        common: common as any,
    },
    strict: debug,
    plugins: debug ? [createLogger()] : [],
});
