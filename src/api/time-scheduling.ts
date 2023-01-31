import { request } from '@/utils/axios';

const prefix = '/api';

/**
 * @description: 实时调度统计表
 */
export function fetchRealTimeStat(query: any) {
    return request({
        url: `${prefix}/manage/real-time/stat`,
        method: 'post',
        data: query,
    });
}

/**
 * @description: 实时调度文件列表
 */
export function fetchRealTimeList(query: any) {
    return request({
        url: `${prefix}/manage/real-time/list`,
        method: 'post',
        data: query,
    });
}
