import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { message as $message } from 'ant-design-vue';
import { getType } from '@/utils/common';
import $store from '@/store/index';
import qs from 'qs';
import { toLine } from '@/utils/tools';

interface Params {
    resFlag?: boolean; // true：自定义处理接口响应数据，不走通用的响应数据处理逻辑
    showLoading?: boolean; // 是否显示全局加载提示,默认显示加载中提示
}

interface Config {
    url: string;
    data: object | string;
    params: object | string;
}

const recordReq = new Set(),
    recordMsg = new Set();
/**
 * @description: 获取请求信息key
 */
function getKey(c: Config) {
    // eslint-disable-next-line prefer-const
    let { data, params, url } = c ?? {};

    data = getType(data) === 'object' ? JSON.stringify(data) : data;
    params = getType(params) === 'object' ? JSON.stringify(params) : params;

    return `${url}${data}${params}`;
}
/**
 * @description: 记录请求信息
 */
function changeRecordReq(t: 'delete' | 'add' | 'asynDel', c: Config) {
    if (!c) return;

    const key = getKey(c);

    switch (t) {
        case 'delete':
            recordReq.delete(key);
            break;
        case 'add':
            recordReq.add(key);
            break;
        case 'asynDel':
            setTimeout(() => {
                recordReq.delete(key);
            }, 400);
    }
}
/**
 * @description: 弹窗信息
 */
function showMessage(msg: string) {
    const content = msg || '操作失败';

    if (content.startsWith('api:') && content.endsWith('存在重复请求')) {
        return;
    }
    if (!recordMsg.has(content)) {
        recordMsg.add(content);
        $message.error({
            duration: 5,
            onClose: () => {
                recordMsg.delete(content);
            },
            content,
        });
    }
}

function dealwidthReqData(_d: any) {
    const _r = {};
    Object.keys(_d).forEach((_k: any) => {
        _r[toLine(_k)] = _d[_k];
    });
    return _r;
}

export function request(config: any, params?: Params) {
    const service: AxiosInstance = axios.create({
        baseURL: '/',
        timeout: 90000,
    });

    // 请求拦截器
    service.interceptors.request.use(
        (config: any) => {
            // let cancel: Canceler = (msg?: string) => {
            //     console.info(msg);
            // };

            // config.cancelToken = new axios.CancelToken((c) => {
            //     cancel = c;
            // });
            // recordReq.has(getKey(config))
            //     ? cancel(`api:${config.url}存在重复请求`)
            //     : changeRecordReq('add', config);

            params && params.showLoading && $message.loading('加载中...', 0);
            const _q = {
                    token: $store.getters['common/userInfo']?.token,
                    ...dealwidthReqData(config.data),
                },
                groupId = $store.getters['common/groupId'] || null;
            if (groupId) {
                _q['group-id'] = groupId;
            }
            config.data = qs.stringify(_q);
            config.headers['Content-Type'] =
                'application/x-www-form-urlencoded';

            return config;
        },
        (error) => {
            console.error(error);
            return Promise.reject(error);
        }
    );

    // 响应拦截器
    service.interceptors.response.use(
        (response) => {
            params && params.showLoading && $message.destroy();

            const res = response.data,
                // 自定义处理响应数据
                resFlag = !!params?.resFlag,
                handleRes = () => ({
                    original: response, // 原始数据
                    data: res?.data ?? {},
                });

            if (res.code == 1001) {
                $store.dispatch('common/exit');
                return Promise.reject(new Error('登录失效'));
            }

            changeRecordReq('asynDel', response.config as any);
            if (resFlag) {
                return handleRes();
            }

            if (res.code !== 1000) {
                showMessage(res.message);

                return Promise.reject(new Error(res.message || '服务器异常'));
            } else {
                return handleRes();
            }
        },
        (error) => {
            params && params.showLoading && $message.destroy();
            if (error.response?.status == 401) {
                $store.dispatch('common/exit');
            }
            changeRecordReq('asynDel', error.config as any);
            showMessage(error?.message);

            return Promise.reject(error);
        }
    );

    return service(config);
}
