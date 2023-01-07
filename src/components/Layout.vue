<template>
    <a-layout class="base-layout h-full">
        <Header></Header>
        <a-layout v-if="data.modulesMenu && data.modulesMenu.length > 0">
            <a-layout-sider class="overflow-y-scroll">
                <a-menu
                    v-model:selectedKeys="data.selectedKeys"
                    class="h-full"
                    mode="inline"
                    @click="jumpRoute"
                >
                    <template v-for="item in data.modulesMenu" :key="item.path">
                        <template v-if="!item.meta.hidden && !item.children">
                            <MenuItem :key="data.parentPath + '/' + item.path">
                                <!-- <template #icon>
                                    <PieChartOutlined />
                                </template> -->
                                {{ item.meta.title }}
                            </MenuItem>
                        </template>
                        <template v-else-if="!item.meta.hidden">
                            <SubMenu :key="item.path" :menu-info="item">
                                <template #title>
                                    {{ item.meta.title }}
                                </template>
                                <MenuItem
                                    v-for="child of item.children"
                                    :key="`${item.path}/${child.path}${
                                        child.children &&
                                        child.children[0].path ===
                                            secondLevelRouteIndex
                                            ? `/${secondLevelRouteIndex}`
                                            : ''
                                    }`"
                                >
                                    <template #icon>
                                        <PieChartOutlined />
                                    </template>
                                    {{ child.meta.title }}
                                </MenuItem>
                            </SubMenu>
                        </template>
                    </template>
                </a-menu>
            </a-layout-sider>
            <a-layout-content class="flex flex-col overflow-y-scroll p-4">
                <RouteBreadcrumb
                    :current-menu="data.currentMenu"
                    :current-route="data.currentRoute"
                    :jump-route="jumpRoute"
                    :second-level-route-index="secondLevelRouteIndex"
                />
                <a-card :bordered="false" class="flex-1">
                    <ViewRouter />
                </a-card>
            </a-layout-content>
        </a-layout>
        <ViewRouter v-else />
    </a-layout>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { computed, reactive, onMounted } from 'vue';
import { PieChartOutlined } from '@ant-design/icons-vue';
import { MenuItem, SubMenu } from 'ant-design-vue';
import { useRouter, useRoute } from 'vue-router';
import { watch } from 'vue';
import RouteBreadcrumb from './breadcrumb/index.vue';
import type { RouteItem } from 'RouterModule';
import { fetchWarningCount } from '@/api/app';

interface Data {
    parentPath: string;
    modulesMenu: Array<RouteItem>; // 当前模块下的菜单
    selectedKeys: Array<string>; // 当前选中的菜单项 key 数组
    currentMenu: RouteItem; // 当激活菜单
    currentRoute: RouteItem; // 当前激活路由
    bellNum: number; // 铃铛数
}

const data = reactive<Data>({
        parentPath: '',
        selectedKeys: [],
        modulesMenu: [],
        currentMenu: {} as RouteItem,
        currentRoute: {} as RouteItem,
        bellNum: 0,
    }),
    $store = useStore(),
    $router = useRouter(),
    $route = useRoute(),
    // 二级路由首页path
    secondLevelRouteIndex = 'index',
    // 路由菜单
    menu = computed(() => $store.getters['common/menu']);

onMounted(() => {
    console.log($route, '---$route');
    fetchWarningCount({}).then((res: any) => {
        data.bellNum = res.data?.Unhandled;
    });
});

/**
 * @description: 路由跳转
 */
function jumpRoute({ key }: { key: string }) {
    $router.push(key);
}

/**
 * @description: 从顶部菜单大类中获取侧边栏菜单项列表
 * @param { string } _path 顶部菜单path
 * @param { Array } _menu 所有菜单
 */
function getMenu(_path: string, _menu: any) {
    return _menu?.filter((_e: RouteItem) => _e.path === _path)?.[0]?.children;
}

// 更新并高亮路由
watch(
    () => $route.path,
    (currentPath) => {
        const childPath =
                currentPath != '/' && currentPath.endsWith('/')
                    ? currentPath.slice(0, -1)
                    : currentPath,
            parentPath = currentPath.slice(0, currentPath.indexOf('/', 1));

        data.parentPath = parentPath;
        data.selectedKeys = [childPath];
        data.modulesMenu = getMenu(parentPath, menu.value);
        let isRes = false;
        data.currentRoute = data.currentMenu =
            data.modulesMenu?.filter((ele: RouteItem) => {
                if (ele.children?.length) {
                    isRes = ele.children.some((v: RouteItem) => {
                        let p = `${ele.path}/${v.path}`,
                            r: any = childPath.endsWith(p);

                        if (!r && Array.isArray(v.children)) {
                            r = v.children.find((pItem: RouteItem) => {
                                return childPath.endsWith(`${p}/${pItem.path}`);
                            });
                        }
                        if (r) {
                            data.selectedKeys = [
                                `${childPath.slice(
                                    0,
                                    childPath.lastIndexOf(v.path)
                                )}${secondLevelRouteIndex}`,
                            ];
                        }

                        return r;
                    });
                } else {
                    isRes = childPath.endsWith(ele.path);
                }

                return isRes;
            })[0] ?? ({} as RouteItem);

        console.warn(
            '左侧菜单',
            data.selectedKeys,
            parentPath,
            data.currentMenu
        );
    },
    {
        immediate: true,
    }
);
</script>

<style lang="less" scoped>
.base-layout {
    .ant-layout-sider {
        // background: #fafafa;
        box-shadow: none;
    }
    :deep(.ant-menu),
    :deep(li.ant-menu-item),
    :deep(li.ant-menu-submenu) {
        background: rgba(65, 92, 133, 1);
        border: none;
    }
    :deep(.ant-menu-inline .ant-menu-item:not(:last-child)) {
        margin: 2px;
    }
    :deep(.ant-menu-inline .ant-menu-item:not(:last-child)),
    :deep(.ant-menu-inline .ant-menu-submenu:not(:last-child)) {
        margin: 2px 0;
    }
    :deep(.ant-menu-title-content),
    :deep(.ant-menu-item-icon) {
        color: #fff;
    }
    :deep(.ant-menu-item-selected::after) {
        content: none;
    }
    :deep(.ant-menu-submenu-arrow),
    :deep(
            .ant-menu-submenu:hover
                .ant-menu-submenu-title
                .ant-menu-submenu-arrow
        ) {
        color: #fff;
    }

    :deep(.ant-menu-inline .ant-menu-submenu-title) {
        margin: 0;
    }
    :deep(.ant-menu-inline .ant-menu-item) {
        margin-top: 0;
    }
    :deep(.ant-menu-title-content) {
        text-align: center;
    }
    :deep(.overflow-y-scroll) {
        overflow-y: auto;
    }
    :deep(.ant-menu-item-selected) {
        background-color: rgba(2, 109, 155, 1) !important;
    }
}

.animated {
    padding-top: 5px;
    margin-bottom: 6px;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    animation-iteration-count: infinite;
}

@-webkit-keyframes swing {
    20%,
    40%,
    60%,
    80%,
    100% {
        -webkit-transform-origin: top center;
    }
    20% {
        -webkit-transform: rotate(15deg);
    }
    40% {
        -webkit-transform: rotate(-10deg);
    }
    60% {
        -webkit-transform: rotate(5deg);
    }
    80% {
        -webkit-transform: rotate(-5deg);
    }
    100% {
        -webkit-transform: rotate(0deg);
    }
}

@keyframes swing {
    20% {
        transform: rotate(15deg);
    }
    40% {
        transform: rotate(-10deg);
    }
    60% {
        transform: rotate(5deg);
    }
    80% {
        transform: rotate(-5deg);
    }
    100% {
        transform: rotate(0deg);
    }
}

.swing {
    -webkit-transform-origin: top center;
    transform-origin: top center;
    -webkit-animation-name: swing;
    animation-name: swing;
}
</style>
