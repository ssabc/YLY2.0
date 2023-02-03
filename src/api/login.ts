/*
 * @Author: sZhao
 * @Date: 2023-01-08 15:09:43
 * @LastEditTime: 2023-02-02 23:10:11
 * @LastEditors: sZhao
 * @Description:
 */
import { request } from '@/utils/axios';
const prefix = '/api';

/**
 * @description: 获取验证码
 */
export function fetchVerificationCode(query: any) {
    return request({
        url: `${prefix}/manage/account/login/captcha??VNK=${new Date().getTime()}`,
        method: 'get',
        data: query,
    });
}
/**
 * @description: 登录
 */
export function fetchLogin(query: any) {
    return request({
        url: `${prefix}/manage/account/login`,
        method: 'post',
        data: query,
    });
}

