/*
 * @Author: szhao
 * @Date: 2022-12-02 16:12:30
 * @LastEditTime: 2023-01-28 11:26:05
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
        name: 'DeviceAssign',
        path: '/device-assign',
        redirect: '/device-assign/index',
        meta: { title: '设备分配', isHeadMenu: true },
        component: ViewRouter,
        children: [
            {
                name: 'DeviceAssignIndex',
                path: 'index',
                meta: { title: '设备分配总览', keepAlive: true },
                component: lazyImportPagesRootVueFile('device-assign'),
            },
            {
                name: 'DeviceAssignList',
                path: 'list',
                meta: { title: '设备分配明细', keepAlive: true },
                component: lazyImportPagesRootVueFile('device-assign/list'),
            },
            {
                name: 'DeviceAssignDetail',
                path: 'detail',
                meta: { title: '查看详情', hidden: true, isShowBack: true },
                component: lazyImportPagesRootVueFile('device-assign/detail'),
            },
            {
                name: 'DeviceAssignEdit',
                path: 'edit',
                meta: { title: '编辑', hidden: true, isShowBack: true },
                component: lazyImportPagesRootVueFile('device-assign/detail'),
            },
        ],
    },
];
