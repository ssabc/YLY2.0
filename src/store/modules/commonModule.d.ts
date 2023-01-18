/*
 * @Author: zhaoshan
 * @Date: 2022-11-30 14:10:30
 * @LastEditTime: 2023-01-18 22:28:40
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

    interface Yly {
        name?: string;
        id?: number;
    }
    interface State {
        menu: RouteItem[];
        userInfo: UserInfo;
        ylyList: any[];
        fileTags: any[];
        gisUrl: string;
        yly: Yly;
    }

    interface Getters {
        gisMapUrl: ({ gisUrl }: State) => string;
        menu: ({ menu }: State) => RouteItem[];
        headMenu: ({ menu }: State) => RouteItem[];
        isAdmin: ({ userInfo }: State) => boolean;
        userInfo: ({ userInfo }: State) => UserInfo;
        ylyList: ({ ylyList }: State) => any[];
        groupId: ({ yly }: State) => string;
        fileTags: ({ fileTags }: State) => any[];
    }

    interface Actions {
        exit: () => void;
        updateUserInfo: (
            context: ActionContext<State, any>,
            payload: object
        ) => void;
        getGisUrl: (context: ActionContext<State, any>) => void;
        fetchNursingMap: (context: ActionContext<State, any>) => void;
        getDefineFileTag: (context: ActionContext<State, any>) => void;
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
