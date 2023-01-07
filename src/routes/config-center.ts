/*
 * @Author: szhao
 * @Date: 2022-12-02 16:12:30
 * @LastEditTime: 2023-01-07 16:02:34
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
        name: 'ConfigCenter',
        path: '/config-center',
        redirect: '/config-center/index',
        meta: { title: '配置中心', isHeadMenu: true },
        component: ViewRouter,
        children: [
            {
                name: 'CareHomeManagement',
                path: 'index',
                meta: { title: '养老院管理' },
                component: lazyImportPagesRootVueFile('config-center'),
            },
            {
                name: 'CareHomeManagementDetail',
                path: 'detail',
                meta: { title: '养老院信息详情' },
                component: lazyImportPagesRootVueFile('config-center/detail'),
            },
            {
                name: 'CareHomeManagementAdd',
                path: 'add',
                meta: { title: '养老院信息新增' },
                component: lazyImportPagesRootVueFile('config-center/detail'),
            },
            {
                name: 'AccountManagement',
                path: 'account-management',
                meta: { title: '账户管理' },
                component: lazyImportPagesRootVueFile('config-center'),
            },
            {
                name: 'AccountManagementDetail',
                path: 'account-management/detail',
                meta: { title: '账户信息详情' },
                component: lazyImportPagesRootVueFile(
                    'config-center/account-management/detail'
                ),
            },
            {
                name: 'AccountManagementAdd',
                path: 'account-management/add',
                meta: { title: '账户信息新增' },
                component: lazyImportPagesRootVueFile(
                    'config-center/account-management/detail'
                ),
            },
            {
                name: 'UserManagement',
                path: 'user-management',
                meta: { title: '用户管理' },
                component: lazyImportPagesRootVueFile('config-center'),
            },
            {
                name: 'UserManagementDetail',
                path: 'user-management/detail',
                meta: { title: '用户信息详情' },
                component: lazyImportPagesRootVueFile(
                    'config-center/user-management/detail'
                ),
            },
            {
                name: 'UserManagementAdd',
                path: 'user-management/add',
                meta: { title: '用户信息新增' },
                component: lazyImportPagesRootVueFile(
                    'config-center/user-management/detail'
                ),
            },
            {
                name: 'OperationLogs',
                path: 'oeration-logs',
                meta: { title: '操作日志' },
                component: lazyImportPagesRootVueFile('config-center'),
            },
        ],
    },
];
