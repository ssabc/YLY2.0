/*
 * @Author: sZhao
 * @Date: 2023-01-10 23:19:43
 * @LastEditTime: 2023-01-18 20:23:21
 * @LastEditors: sZhao
 * @Description:护工帮
 */
import { request } from '@/utils/axios';
const prefix = '/api';
/**
 * @description: 配置中心-养老院列表
 */
export function fetchConfigNursingHome(query: any) {
    return request({
        url: `${prefix}//manage/config/nursing-home`,
        method: 'post',
        data: query,
    });
}

/**
 * @description: 配置中心-操作日志
 */
export function fetchConfigSystemLog(query: any) {
    return request({
        url: `${prefix}/manage/config/system-log`,
        method: 'post',
        data: query,
    });
}

/**
 * @description: 配置中心-账户管理
 */
export function fetchConfigAccount(query: any) {
    return request({
        url: `${prefix}/manage/config/account`,
        method: 'post',
        data: query,
    });
}
