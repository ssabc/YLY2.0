/*
 * @Author: zhaoshan
 * @Date: 2022-11-30 14:10:30
 * @LastEditTime: 2023-01-19 14:04:40
 * @LastEditors: szhao
 * @Description:
 */
import type { SelectListData } from 'GlobComponentsModule';
declare module 'CommonModule' {
    import type { ActionContext } from 'vuex';

    interface Yly {
        name?: string;
        id?: number;
    }
    interface UserInfoVO {
        type?: string;
        username?: string;
        group?: Yly[];
    }
    interface UserInfo {
        account?: UserInfoVO;
        token?: string;
    }
    interface State {
        menu: RouteItem[];
        userInfo: UserInfo;
        ylyList: SelectListData[];
        fileTags: string[];
        gisUrl: string;
        yly: Yly;
    }

    interface Getters {
        gisMapUrl: ({ gisUrl }: State) => string;
        menu: ({ menu }: State) => RouteItem[];
        headMenu: ({ menu }: State) => RouteItem[];
        isAdmin: ({ userInfo }: State) => boolean;
        userInfo: ({ userInfo }: State) => UserInfo;
        ylyList: ({ ylyList }: State) => SelectListData[];
        groupId: ({ yly }: State) => string;
        fileTags: ({ fileTags }: State) => string[];
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
