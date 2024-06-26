/*
 * @Author: szhao
 * @Date: 2022-12-02 16:12:30
 * @LastEditTime: 2023-02-01 22:46:55
 * @LastEditors: sZhao
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
                meta: { title: '养老院管理', keepAlive: true },
                component: lazyImportPagesRootVueFile('config-center'),
            },
            {
                name: 'CareHomeManagementDetail',
                path: 'detail',
                meta: {
                    title: '养老院信息详情',
                    hidden: true,
                    isShowBack: true,
                },
                component: lazyImportPagesRootVueFile('config-center/detail'),
            },
            {
                name: 'CareHomeManagementEdit',
                path: 'edit',
                meta: {
                    title: '养老院信息编辑',
                    hidden: true,
                    isShowBack: true,
                },
                component: lazyImportPagesRootVueFile('config-center/detail'),
            },
            {
                name: 'AccountManagement',
                path: 'account-management',
                meta: { title: '账户管理', keepAlive: true },
                component: lazyImportPagesRootVueFile(
                    'config-center/account-management'
                ),
            },
            {
                name: 'AccountManagementDetail',
                path: 'account-management/detail1',
                meta: { title: '账户信息详情', hidden: true },
                component: lazyImportPagesRootVueFile(
                    'config-center/account-management/detail'
                ),
            },
            {
                name: 'AccountManagementEdit',
                path: 'account-management/edit1',
                meta: { title: '账户信息编辑', hidden: true },
                component: lazyImportPagesRootVueFile(
                    'config-center/account-management/detail'
                ),
            },
            {
                name: 'UserManagement',
                path: 'user-management',
                meta: { title: '用户管理', keepAlive: true },
                component: lazyImportPagesRootVueFile(
                    'config-center/user-management'
                ),
            },
            {
                name: 'UserManagementDetail',
                path: 'user-management/detail2',
                meta: { title: '用户信息详情', hidden: true },
                component: lazyImportPagesRootVueFile(
                    'config-center/user-management/detail'
                ),
            },
            {
                name: 'UserManagementEdit',
                path: 'user-management/edit2',
                meta: { title: '用户信息编辑', hidden: true },
                component: lazyImportPagesRootVueFile(
                    'config-center/user-management/detail'
                ),
            },
            {
                name: 'OperationLogs',
                path: 'operation-logs',
                meta: { title: '操作日志' },
                component: lazyImportPagesRootVueFile(
                    'config-center/operation-logs'
                ),
            },
        ],
    },
];
