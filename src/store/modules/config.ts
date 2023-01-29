import type { Getters, Common } from 'ConfigModule';

const getters: Getters = {
    colors: () => ['#2984f8', '#67d4fb', '#ff9700', '#7357ff', '#f2d750'],
    dealTypes: () => {
        return [
            {
                label: '已处置',
                value: '1',
            },
            {
                label: '未处置',
                value: '0',
            },
        ];
    },
    enabledStatus: () => {
        return [
            {
                label: '启用',
                value: '1',
            },
            {
                label: '禁用',
                value: '0',
            },
        ];
    },
    accountTypes: () => {
        return [
            {
                label: '管理员账号',
                value: '1',
            },
            {
                label: '普通账号',
                value: '0',
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
                label: '测温随申码访客机',
                value: '2',
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
export const config: Common = {
    namespaced: true,
    getters,
};
