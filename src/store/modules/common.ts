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
    dealTypes: () => {
        return [
            {
                label: '已处置',
                value: '1',
            },
            {
                label: '未处置',
                value: '2',
            },
        ];
    },
    deviceStatus: () => {
        return [
            {
                label: '在线',
                value: '1',
            },
            {
                label: '离线',
                value: '0',
            },
        ];
    },
    deviceAssignStatus: () => {
        return [
            {
                label: '已分配',
                value: '1',
            },
            {
                label: '未分配',
                value: '0',
            },
        ];
    },
    deviceClass: () => {
        return [
            {
                label: '服务记录仪',
                value: '1',
            },
            {
                label: '采集柜',
                value: '0',
            },
            {
                label: '数字哨兵',
                value: '2',
            },
        ];
    },
    dealTypes2: () => {
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
    recordTypes: () => {
        return [
            {
                label: '值班长',
                value: '值班长',
            },
            {
                label: '服务提供',
                value: '服务提供',
            },
            {
                label: '服务保障',
                value: '服务保障',
            },
            {
                label: '服务安全',
                value: '服务安全',
            },
        ];
    },
    serviceSeries: () => [
        {
            name: '服务提供',
            color: '#1d66d6',
        },
        {
            name: '服务安全',
            color: '#28d094',
        },
        {
            name: '服务保障',
            color: '#FDDB78',
        },
    ],
    serviceSeriesAll: () => [
        {
            name: '值班长',
            color: '#FA746B',
        },
    ],
    serviceTypes: () => {
        return [
            {
                label: '护工呼叫',
                value: '1',
            },
            {
                label: '常规巡检',
                value: '2',
            },
            {
                label: '其他',
                value: '',
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
