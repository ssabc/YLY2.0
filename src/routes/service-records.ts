/*
 * @Author: szhao
 * @Date: 2022-12-02 16:12:30
 * @LastEditTime: 2023-01-07 15:46:09
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
                name: 'ChiefOperator',
                path: 'chief-operator',
                meta: { title: '值班长记录' },
                component: lazyImportPagesRootVueFile(
                    'service-records/chief-operator'
                ),
            },
            {
                name: 'ServiceProvider',
                path: 'service-provider',
                meta: { title: '服务提供记录' },
                component: lazyImportPagesRootVueFile(
                    'service-records/service-provider'
                ),
            },
            {
                name: 'ServiceEnsure',
                path: 'service-ensure',
                meta: { title: '服务保障记录' },
                component: lazyImportPagesRootVueFile(
                    'service-records/service-ensure'
                ),
            },
            {
                name: 'ServiceSecure',
                path: 'service-secure',
                meta: { title: '服务安全记录' },
                component: lazyImportPagesRootVueFile(
                    'service-records/service-secure'
                ),
            },
        ],
    },
];
