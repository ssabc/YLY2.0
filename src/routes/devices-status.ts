/*
 * @Author: szhao
 * @Date: 2022-12-02 16:12:30
 * @LastEditTime: 2023-01-28 11:17:20
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
        name: 'DevicesStatus',
        path: '/devices-status',
        redirect: '/devices-status/index',
        meta: { title: '设备状态', isHeadMenu: true },
        component: ViewRouter,
        children: [
            {
                name: 'DevicesStatusIndex',
                path: 'index',
                meta: { title: '设备总览', keepAlive: true },
                component: lazyImportPagesRootVueFile('devices-status'),
            },
            {
                name: 'DevicesUsageRecord',
                path: 'usage-record',
                meta: { title: '设备使用记录' },
                component: lazyImportPagesRootVueFile(
                    'devices-status/usage-record'
                ),
            },
        ],
    },
];
