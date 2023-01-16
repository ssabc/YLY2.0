/*
 * @Author: szhao
 * @Date: 2023-01-16 15:42:21
 * @LastEditTime: 2023-01-16 16:49:32
 * @LastEditors: szhao
 * @Description:
 */
import { routes, r as $router } from '@/routes';
import type { State, Getters, Actions, Common } from 'CommonModule';
import type { ActionContext } from 'vuex';
import { fetchCommunication } from '@/api/app';

const state = (): State => ({
    menu: routes,
    userInfo: {},
    ylyList: [],
    gisUrl: '',
    /** 系统当前养老院 */
    yly: {},
});

const getters: Getters = {
    menu: (state: State) => {
        const _m = JSON.parse(JSON.stringify(state.menu)),
            isAdmin = getters.isAdmin(state);
        if (isAdmin) {
            // _m[6].children?.length = 1;
            return _m;
        }
        return _m;
    },
    headMenu: (state: State) => {
        const _m = JSON.parse(JSON.stringify(state.menu));

        return _m?.filter((_e: any) => _e.meta?.isHeadMenu) || [];
    },
    isAdmin: (state: State) => {
        const _t = getters.userInfo(state)?.account?.type;
        console.log('类型：', _t);
        return _t === 'district';
    },
    groupId: (state: State) => {
        const ylyObj = state.yly?.name
            ? state.yly
            : JSON.parse(localStorage.getItem('currentYLY') || '{}');
        return `${ylyObj?.id}`;
    },
    userInfo: ({ userInfo }: State) =>
        userInfo?.token
            ? userInfo
            : JSON.parse(localStorage.getItem('userInfo') || '{}'),
    ylyList: (state: State) => {
        const _t = getters.userInfo(state)?.account?.group || [];
        console.log('类型：', _t);
        return _t.map((_e: any) => ({
            label: _e.name,
            value: _e.id,
        }));
    },
};

const actions: Actions = {
    /**
     * @description: 退出登录
     */
    async exit() {
        localStorage.clear();
        sessionStorage.clear();
        $router.push('/login');
    },
    async getGisUrl({ commit }: ActionContext<State, any>) {
        return fetchCommunication({}).then((res: any) => {
            console.log('gis: ', res?.data?.url);
            commit('setGisUrl', res?.data?.url || '');
        });
    },
    updateUserInfo({ commit }: ActionContext<State, any>, p: object) {
        localStorage.setItem('userInfo', JSON.stringify(p));
        commit('setUserInfo', p);
    },
};

const mutations = {
    setUserInfo(state: State, p: object) {
        state.userInfo = p;
    },
    setGisUrl(state: State, p: string) {
        state.gisUrl = p;
    },
    setYly(state: State, p: object) {
        console.log('setYly', p);
        localStorage.setItem('currentYLY', JSON.stringify(p));
        state.yly = p;
    },
};

export const common: Common = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
