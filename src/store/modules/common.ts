/*
 * @Author: szhao
 * @Date: 2023-01-16 15:42:21
 * @LastEditTime: 2023-01-19 14:31:46
 * @LastEditors: szhao
 * @Description:
 */
import { routes, r as $router } from '@/routes';
import type { State, Getters, Actions, Common } from 'CommonModule';
import type { ActionContext } from 'vuex';
import { fetchNursingMap, fetchDefineFileTag } from '@/api/app';

const state = (): State => ({
    menu: routes,
    userInfo: {},
    ylyList: [],
    gisUrl: '',
    fileTags: [],
    /** 系统当前养老院 */
    yly: {},
});

const getters: Getters = {
    gisMapUrl: (state: State) => {
        const _t =
            JSON.parse(localStorage.getItem('gisUrl') || '""') ||
            state?.gisUrl ||
            '';
        return _t;
    },
    fileTags: (state: State) => {
        const _t =
            JSON.parse(localStorage.getItem('fileTags') || '[]') ||
            state?.fileTags ||
            [];
        return _t.map((_e: string) => ({
            label: _e,
            value: _e,
        }));
    },
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
        return fetchNursingMap({}).then((res: any) => {
            commit('setGisUrl', res?.data);
        });
    },
    async getDefineFileTag({ commit }: ActionContext<State, any>) {
        return fetchDefineFileTag({}).then((res: any) => {
            commit('setFileTags', res?.data);
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
        localStorage.setItem('gisUrl', JSON.stringify(p));
        state.gisUrl = p;
    },
    setFileTags(state: State, p: any[]) {
        localStorage.setItem('fileTags', JSON.stringify(p));
        state.fileTags = p;
    },
    setYly(state: State, p: object) {
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
