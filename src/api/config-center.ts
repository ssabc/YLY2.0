/*
 * @Author: sZhao
 * @Date: 2023-01-10 23:19:43
 * @LastEditTime: 2023-02-05 11:38:32
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
        url: `${prefix}/manage/config/register`,
        method: 'post',
        data: query,
    });
}

/**
 * @description 账户管理-保存
 */
export function saveUser(query: any) {
    return request({
        url: `${prefix}/manage/config/register/save`,
        method: 'post',
        data: query,
    });
}

/**
 * @description 账户管理-详情
 */
export function fetchUserInfo(query: any) {
    return request({
        url: `${prefix}/manage/config/register/info`,
        method: 'post',
        data: query,
    });
}

/**
 * @description: 配置中心-养老院-修改
 */
export function saveNurseHome(query: any) {
    return request({
        url: `${prefix}/manage/config/nursing-home/save`,
        method: 'post',
        data: query,
    });
}

/**
 * @description: 配置中心-养老院-养老院详情
 */
export function feachNurseHomeDetail(query: any) {
    return request({
        url: `${prefix}/manage/config/nursing-home/info`,
        method: 'post',
        data: query,
    });
}

/**
 * @description: 用户列表
 */
 export function feachUserList(query: any) {
    return request({
        url: `${prefix}/manage/config/user`,
        method: 'post',
        data: query,
    });
}

/**
 * @description: 修改用户信息
 */
export function saveUserInfo(query: any) {
    return request({
        url: `${prefix}/manage/config/user/save`,
        method: 'post',
        data: query,
    });
}

/**
 * @description: 用户列表
 */
export function feachUserDetail(query: any) {
    return request({
        url: `${prefix}/manage/config/user/info`,
        method: 'post',
        data: query,
    });
}
