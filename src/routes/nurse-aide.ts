/*
 * @Author: szhao
 * @Date: 2022-12-02 16:12:30
 * @LastEditTime: 2023-01-07 15:48:34
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
        name: 'NurseAide',
        path: '/nurse-aide',
        redirect: '/nurse-aide/index',
        meta: { title: '护工帮', isHeadMenu: true },
        component: ViewRouter,
        children: [
            {
                name: 'NurseAideIndex',
                path: 'index',
                meta: { title: '护工帮总览' },
                component: lazyImportPagesRootVueFile('nurse-aide'),
            },
            {
                name: 'NurseAideDetail',
                path: 'detail',
                meta: { title: '查看详情', hidden: true },
                component: lazyImportPagesRootVueFile('nurse-aide/detail'),
            },
            {
                name: 'callRecord',
                path: 'call-record',
                meta: { title: '呼叫记录' },
                component: lazyImportPagesRootVueFile('nurse-aide/call-record'),
            },
            {
                name: 'videoDetail',
                path: 'video-detail',
                meta: { title: '视频详情', hidden: true },
                component: lazyImportPagesRootVueFile('nurse-aide'),
            },
        ],
    },
];
