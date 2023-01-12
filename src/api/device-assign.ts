/*
 * @Author: sZhao
 * @Date: 2023-01-10 23:19:43
 * @LastEditTime: 2023-01-12 10:45:56
 * @LastEditors: szhao
 * @Description:
 */
import { request } from '@/utils/axios';
const prefix = '/api';
/**
 * @description: 服务记录-服务记录
 */
export function fetchDeviceAssignRecord(query: any) {
    return request({
        url: `${prefix}/manage/service-record`,
        method: 'post',
        data: query,
    });
}

/**
 * @description: 服务记录-分类的记录统计
 */
export function fetchDeviceAssignStat(query: any) {
    return request({
        url: `${prefix}/manage/device-details/allocation/count`,
        method: 'post',
        data: query,
    });
}

/**
 * @description: 服务记录-分类下的文件列表
 */
export function fetchDeviceAssignList(query: any) {
    return request({
        url: `${prefix}/manage/device-details`,
        method: 'post',
        data: query,
    });
}

/**
 * @description: 服务记录-分配设备
 */
export function fetchDeviceAssignAllocation(query: any) {
    return request({
        url: `${prefix}/manage/device-details/allocation`,
        method: 'post',
        data: query,
    });
}

/**
 * @description: 服务记录-设备分配历史信息表
 */
export function fetchDeviceAssignAllocationHistory(query: any) {
    return request({
        url: `${prefix}/manage/device-details/allocation/history`,
        method: 'post',
        data: query,
    });
}

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
