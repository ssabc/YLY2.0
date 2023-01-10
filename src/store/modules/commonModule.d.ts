/*
 * @Author: zhaoshan
 * @Date: 2022-11-30 14:10:30
 * @LastEditTime: 2023-01-10 21:30:43
 * @LastEditors: sZhao
 * @Description:
 */
declare module 'CommonModule' {
    import type { ActionContext } from 'vuex';
    interface UserInfoVO {
        type?: string;
        username?: string;
        group?: any[];
    }
    interface UserInfo {
        account?: UserInfoVO;
        token?: string;
    }
    interface State {
        menu: RouteItem[];
        userInfo: UserInfo;
        ylyList: any[];
        gisUrl: string;
    }

    interface Getters {
        menu: ({ menu }: State) => RouteItem[];
        headMenu: ({ menu }: State) => RouteItem[];
        isAdmin: ({ userInfo }: State) => boolean;
        userInfo: ({ userInfo }: State) => UserInfo;
        ylyList: ({ ylyList }: State) => any[];
        dealTypes: () => any[];
        statusTypes: () => any[];
        statusTypes2: () => any[];
        statusTypes3: () => any[];
        statusTypes4: () => any[];
    }

    interface Actions {
        exit: () => void;
        updateUserInfo: (
            context: ActionContext<State, any>,
            payload: object
        ) => void;
        getGisUrl: (context: ActionContext<State, any>) => void;
    }

    interface Mutations {
        setUserInfo: (state: State, payload: object) => void;
    }

    interface Common {
        namespaced: boolean;
        state: () => State;
        getters: Getters;
        actions: Actions;
        mutations: Mutations;
    }
}
