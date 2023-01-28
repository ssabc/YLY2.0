/*
 * @Author: szhao
 * @Date: 2022-12-02 16:12:30
 * @LastEditTime: 2023-01-19 15:03:53
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
                path: 'detail',
                meta: { title: '查看详情', hidden: true },
                component: lazyImportPagesRootVueFile('service-records/detail'),
            },
            {
                name: 'NurseAideDetail',
                path: 'index',
                meta: { title: '护工帮总览', keepAlive: true },
                component: lazyImportPagesRootVueFile('nurse-aide'),
            },
            {
                name: 'callRecord',
                path: 'call-record',
                meta: { title: '呼叫记录', keepAlive: true },
                component: lazyImportPagesRootVueFile('nurse-aide/call-record'),
            },
            {
                name: 'NurseAideVideoDetail',
                path: 'video-detail',
                meta: {
                    title: '视频详情',
                    hidden: true,
                    isShowBack: true,
                },
                component: lazyImportPagesRootVueFile('service-records/detail'),
            },
        ],
    },
];
