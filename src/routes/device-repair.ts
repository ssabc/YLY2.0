/*
 * @Author: szhao
 * @Date: 2022-12-02 16:12:30
 * @LastEditTime: 2023-01-07 15:56:23
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
        name: 'DeviceRepair',
        path: '/device-repair',
        redirect: '/device-repair/index',
        meta: { title: '设备报修', isHeadMenu: true },
        component: ViewRouter,
        children: [
            {
                name: 'DeviceRepairIndex',
                path: 'index',
                meta: { title: '设备报修' },
                component: lazyImportPagesRootVueFile('device-repair'),
            },
            {
                name: 'DeviceRepairDetail',
                path: 'detail',
                meta: { title: '查看详情', hidden: true },
                component: lazyImportPagesRootVueFile('device-repair/detail'),
            },
        ],
    },
];
