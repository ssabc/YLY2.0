/*
 * @Author: sZhao
 * @Date: 2023-01-10 23:19:43
 * @LastEditTime: 2023-01-18 14:42:04
 * @LastEditors: szhao
 * @Description:护工帮
 */
import { request } from '@/utils/axios';
const prefix = '/api';
/**
 * @description:
 */
export function fetchNursingRecord(query: any) {
    return request({
        url: `${prefix}/manage/nursing`,
        method: 'post',
        data: query,
    });
}

/**
 * @description:
 */
export function fetchNursingRealTime(query: any) {
    return request({
        url: `${prefix}/manage/nursing/real-time`,
        method: 'post',
        data: query,
    });
}

/**
 * @description:
 */
export function fetchNursingRecordList(query: any) {
    return request({
        url: `${prefix}/manage/nursing/record/list`,
        method: 'post',
        data: query,
    });
}

export function fetchNursingMap(data: any) {
    return request({
        url: `${prefix}/manage/nursing/map`,
        method: 'post',
        data,
    });
}

export function fetchNursingRecordStat(data: any) {
    return request({
        url: `${prefix}/manage/nursing/record/stat`,
        method: 'post',
        data,
    });
}
