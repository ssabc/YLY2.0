import { request } from '@/utils/axios';
const prefix = '/api';

/**
 * @description: 获取验证码
 */
export function fetchVerificationCode(query: any) {
    return request({
        url: `${prefix}/manage/account/login/captcha`,
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

