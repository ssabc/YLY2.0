/*
 * @Author: sZhao
 * @Date: 2023-01-10 23:19:43
 * @LastEditTime: 2023-01-11 23:45:26
 * @LastEditors: sZhao
 * @Description:
 */
import { request } from '@/utils/axios';
const prefix = '/api';

/**
 * @description: 服务记录-维修设备接口
 */
export function fetchDeviceAssignRepair(query: any) {
    return request({
        url: `${prefix}/manage/device-details/repair`,
        method: 'post',
        data: query,
    });
}

/**
 * @description: 服务记录-设备维修历史
 */
export function fetchDeviceAssignRepairHistory(query: any) {
    return request({
        url: `${prefix}/manage/device-details/repair/history`,
        method: 'post',
        data: query,
    });
}

/**
 * @description: 服务记录-详情
 */
export function fetchDeviceDetailById(query: any) {
    return request({
        url: `${prefix}//manage/device-details/info`,
        method: 'post',
        data: query,
    });
}
