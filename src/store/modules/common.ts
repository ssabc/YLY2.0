import { routes, r as $router } from '@/routes';
import type { State, Getters, Actions, Common } from 'CommonModule';
import type { ActionContext } from 'vuex';
import { fetchCommunication } from '@/api/app';

const state = (): State => ({
    menu: routes,
    userInfo: {},
    ylyList: [],
    gisUrl: '',
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
        return _t === 'corp';
    },
    deptId: () => {
        return getters.userInfo(state)?.account?.id;
    },
    userInfo: ({ userInfo }: State) =>
        userInfo?.token
            ? userInfo
            : JSON.parse(localStorage.getItem('userInfo') || '{}'),
    ylyList: (state: State) => {
        const _t = getters.userInfo(state)?.account?.dept || [];
        console.log('类型：', _t);
        return _t.map((_e: any) => ({
            label: _e.name,
            value: _e.id,
        }));
    },
    dealTypes: () => {
        return [
            {
                label: '已处理',
                value: '1',
            },
            {
                label: '已忽略',
                value: '2',
            },
            {
                label: '未处理',
                value: '3',
            },
            {
                label: '超时未处理',
                value: '4',
            },
        ];
    },
    statusTypes: () => {
        return [
            {
                label: '已修复',
                value: '0',
            },
            {
                label: '未修复',
                value: '1',
            },
        ];
    },
    statusTypes2: () => {
        return [
            {
                label: '已领取',
                value: '1',
            },
            {
                label: '未领取',
                value: '2',
            },
        ];
    },
    statusTypes3: () => {
        return [
            {
                label: '用药记录',
                value: '1',
            },
            {
                label: '服务记录',
                value: '2',
            },
            {
                label: '巡查记录',
                value: '3',
            },
        ];
    },
    statusTypes4: () => {
        return [
            {
                label: '06:00~09:00',
                value: '06:00~09:00',
            },
            {
                label: '10:30~12:00',
                value: '10:30~12:00',
            },
            {
                label: '15:30~17:30',
                value: '15:30~17:30',
            },
        ];
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
};

export const common: Common = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
