/*
 * @Author: szhao
 * @Date: 2022-12-02 16:12:30
 * @LastEditTime: 2023-01-07 15:54:10
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
                meta: { title: '设备总览' },
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
