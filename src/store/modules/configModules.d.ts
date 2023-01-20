/*
 * @Author: zhaoshan
 * @Date: 2022-11-30 14:10:30
 * @LastEditTime: 2023-01-19 13:55:26
 * @LastEditors: szhao
 * @Description:
 */

import type { SelectListData } from 'GlobComponentsModule';
declare module 'ConfigModule' {
    interface Getters {
        colors?: () => string[];
        enabledStatus?: () => SelectListData[];
        accountTypes?: () => SelectListData[];
        dealTypes?: () => SelectListData[];
        statusTypes?: () => SelectListData[];
        statusTypes2?: () => SelectListData[];
        statusTypes3?: () => SelectListData[];
        statusTypes4?: () => SelectListData[];
        deviceStatus?: () => SelectListData[];
        deviceAssignStatus?: () => SelectListData[];
        deviceClass?: () => SelectListData[];
        recordTypes?: () => SelectListData[];
        serviceSeries?: () => any[];
        serviceSeriesAll?: () => any[];
        serviceTypes?: () => SelectListData[];
        statusTypes?: () => SelectListData[];
        statusTypes2?: () => SelectListData[];
        statusTypes3?: () => SelectListData[];
        statusTypes4?: () => SelectListData[];
    }
    interface Common {
        namespaced: boolean;
        state?: () => State;
        getters: Getters;
        actions?: Actions;
        mutations?: Mutations;
    }
}
