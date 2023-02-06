/*
 * @Author: sZhao
 * @Date: 2023-01-08 15:09:43
 * @LastEditTime: 2023-02-06 19:04:00
 * @LastEditors: szhao
 * @Description:
 */
import { request } from '@/utils/axios';
const prefix = '/api';

/**
 * @description: home
 */
export function fetchHomeInfo(data: any) {
    return request({
        url: `${prefix}/manage/comprehensive`,
        method: 'post',
        data,
    });
}

/**
 * @description: 历史记录
 */
export function fetchHistoryRecords(data: any) {
    return request({
        url: `${prefix}/manage/file/history`,
        method: 'post',
        data,
    });
}

export function fetchCommunication(data: any) {
    return request({
        url: `${prefix}/manage/realtime/communication`,
        method: 'post',
        data,
    });
}

export function fetchCarerWarning(data: any) {
    return request({
        url: `${prefix}/manage/carer-warning`,
        method: 'post',
        data,
    });
}

/** 报修列表 */
export function fetchServiceRecord(data: any) {
    return request({
        url: `${prefix}/manage/report-repair`,
        method: 'post',
        data,
    });
}

/** 一键报修 */
export function oneRepair(data: any) {
    return request({
        url: `${prefix}/manage/report-repair/apply`,
        method: 'post',
        data,
    });
}

/** 已修复 */
export function repaiConfirm(data: any) {
    return request({
        url: `${prefix}/manage/report-repair/confirm`,
        method: 'post',
        data,
    });
}

/** 获取告警数 */
export function fetchCarerWarning2(data: any) {
    return request({
        url: `${prefix}/manage/carer-warning`,
        method: 'post',
        data,
    });
}

export function fetchWarningCount(data: any) {
    return request({
        url: `${prefix}/manage/nursing/alarm`,
        method: 'post',
        data,
    });
}

/** sos记录列表 */
export function fetchSosRecord(data: any) {
    return request({
        url: `${prefix}/temp/sos/record`,
        method: 'post',
        data,
    });
}

/** 设备状态 */
export function fetchDeviceStatus(data: any) {
    return request({
        url: `${prefix}/manage/device-status`,
        method: 'post',
        data,
    });
}

/** 服务内容list */
export function fetchDefineFileTag(data: any) {
    return request({
        url: `${prefix}/manage/define/file-tag`,
        method: 'post',
        data,
    });
}

export function fetchNursingMap(data: any) {
    return request({
        url: `${prefix}/manage/nursing/map`,
        method: 'post',
        data,
    });
}

/** 删除文件 */
export function deleteFile(data: any) {
    return request({
        url: `${prefix}/manage/sync/file/delete`,
        method: 'post',
        data,
    });
}

/** 获取实时调度视频详情接口 */
export function fetchRealTimeInfo(data: any) {
    return request({
        url: `${prefix}/manage/real-time/list/info`,
        method: 'post',
        data,
    });
}
