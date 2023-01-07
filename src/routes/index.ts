/*
 * @Author: szhao
 * @Date: 2022-11-30 14:10:30
 * @LastEditTime: 2023-01-07 12:11:47
 * @LastEditors: szhao
 * @Description:
 */
import type { RouteItem } from 'RouterModule';
import type { Router, RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';
import { lazyImportPagesRootVueFile } from '@/utils/common';
import { r as serviceRecords } from './service-records';
import { r as nurseAide } from './nurse-aide';
import { r as visitRecords } from './visit-records';
import { r as devicesStatus } from './devices-status';
import { r as deviceAssign } from './device-assign';
import { r as devicRepair } from './device-repair';
import { r as configCenter } from './config-center';

export const routes: RouteItem[] = [
    {
        name: 'Login',
        path: '/login',
        meta: { title: '登录', hidden: true, layout: false },
        component: lazyImportPagesRootVueFile('login'),
    },
    {
        name: 'Home',
        path: '/',
        meta: {
            title: '综合态势',
            hidden: false,
            isHeadMenu: true,
            keepAlive: true,
        },
        component: lazyImportPagesRootVueFile('home'),
    },
    ...serviceRecords,
    ...nurseAide,
    ...visitRecords,
    ...devicesStatus,
    ...deviceAssign,
    ...devicRepair,
    ...configCenter,
    {
        name: 'Home',
        path: '/:pathMatch(.*)',
        meta: { title: '首页', hidden: true },
        component: lazyImportPagesRootVueFile('home'),
    },
];

export const r: Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    history: createWebHashHistory(),
    routes: routes as RouteRecordRaw[],
});
