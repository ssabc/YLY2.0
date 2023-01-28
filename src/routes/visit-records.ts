/*
 * @Author: szhao
 * @Date: 2022-12-02 16:12:30
 * @LastEditTime: 2023-01-28 11:30:46
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
        name: 'VisitRecords',
        path: '/visit-records',
        redirect: '/visit-records/index',
        meta: { title: '访客记录', isHeadMenu: true },
        component: ViewRouter,
        children: [
            {
                name: 'NurseAideIndex',
                path: 'index',
                meta: { title: '访客记录总览', keepAlive: true },
                component: lazyImportPagesRootVueFile('visit-records'),
            },
            {
                name: 'VisitRecordsState',
                path: 'state',
                meta: { title: '访客记录明细' },
                component: lazyImportPagesRootVueFile('visit-records/state'),
            },
        ],
    },
];
