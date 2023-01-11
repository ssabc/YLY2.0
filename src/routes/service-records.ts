/*
 * @Author: szhao
 * @Date: 2022-12-02 16:12:30
 * @LastEditTime: 2023-01-11 15:30:55
 * @LastEditors: szhao
 * @Description:
 */
import type { RouteItem } from 'RouterModule';
import { lazyImportPagesRootVueFile } from '@/utils/common';

const ViewRouter = import.meta.glob('../components/ViewRouter.vue')[
    '../components/ViewRouter.vue'
];

export const r: RouteItem[] = [
    {
        name: 'ServiceRecords',
        path: '/service-records',
        redirect: '/service-records/index',
        meta: { title: '服务记录', isHeadMenu: true },
        component: ViewRouter,
        children: [
            {
                name: 'ServiceRecordsIndex',
                path: 'index',
                meta: { title: '服务总览', hiddenBreadCrumb: true },
                component: lazyImportPagesRootVueFile('service-records'),
            },
            {
                name: 'ServiceRecordsVideoDetail',
                path: 'video-detail',
                meta: { title: '视频详情', hidden: true, isShowBack: true },
                component: lazyImportPagesRootVueFile('service-records/detail'),
            },
            {
                name: 'ServiceRecordsList',
                path: 'list/:type',
                meta: { title: '记录', hidden: true },
                component: lazyImportPagesRootVueFile('service-records/list'),
            },
            {
                name: 'ChiefOperator',
                path: 'chief-operator',
                redirect: '/service-records/list/0',
                meta: { title: '值班长记录' },
            },
            {
                name: 'ServiceProvider',
                path: 'service-provider',
                redirect: '/service-records/list/1',
                meta: { title: '服务提供记录' },
            },
            {
                name: 'ServiceEnsure',
                path: 'service-ensure',
                redirect: '/service-records/list/2',
                meta: { title: '服务保障记录' },
            },
            {
                name: 'ServiceSecure',
                path: 'service-secure',
                redirect: '/service-records/list/3',
                meta: { title: '服务安全记录' },
            },
        ],
    },
];
