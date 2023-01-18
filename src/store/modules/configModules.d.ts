/*
 * @Author: zhaoshan
 * @Date: 2022-11-30 14:10:30
 * @LastEditTime: 2023-01-18 11:52:18
 * @LastEditors: szhao
 * @Description:
 */
declare module 'ConfigModule' {
    interface Getters {
        colors?: () => any[];
        dealTypes?: () => any[];
        statusTypes?: () => any[];
        statusTypes2?: () => any[];
        statusTypes3?: () => any[];
        statusTypes4?: () => any[];
        deviceStatus?: () => any[];
        deviceAssignStatus?: () => any[];
        deviceClass?: () => any[];
        recordTypes?: () => any[];
        serviceSeries?: () => any[];
        serviceSeriesAll?: () => any[];
        serviceTypes?: () => any[];
        statusTypes?: () => any[];
        statusTypes2?: () => any[];
        statusTypes3?: () => any[];
        statusTypes4?: () => any[];
    }
    interface Common {
        namespaced: boolean;
        state?: () => State;
        getters: Getters;
        actions?: Actions;
        mutations?: Mutations;
    }
}
