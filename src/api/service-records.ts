/*
 * @Author: sZhao
 * @Date: 2023-01-10 23:19:43
 * @LastEditTime: 2023-01-10 23:22:34
 * @LastEditors: sZhao
 * @Description:
 */
import { request } from '@/utils/axios';
const prefix = '/api';
/**
 * @description: 服务记录-服务记录
 */
export function fetchServiceRecord(query: any) {
    return request({
        url: `${prefix}/manage/service-record`,
        method: 'post',
        data: query,
    });
}

/**
 * @description: 服务记录-分类的记录统计
 */
export function fetchServiceStat(query: any) {
    return request({
        url: `${prefix}/manage/service-record/stat`,
        method: 'post',
        data: query,
    });
}

/**
 * @description: 服务记录-分类下的文件列表
 */
export function fetchServiceFileList(query: any) {
    return request({
        url: `${prefix}/manage/service-record/file`,
        method: 'post',
        data: query,
    });
}
