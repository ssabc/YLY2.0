<template>
    <a-breadcrumb
        v-if="showBreadcrumb"
        separator=""
        class="breadcrumb select-none"
    >
        <template v-for="(item, index) of routeInfo" :key="index">
            <a-breadcrumb-item
                v-if="item && item.meta && item.meta.title !== '列表'"
                class="breadcrumb-item"
                @click="go(item)"
            >
                {{ item.meta.title }}
            </a-breadcrumb-item>
        </template>
    </a-breadcrumb>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { RouteItem } from 'RouterModule';
import { useRoute, useRouter } from 'vue-router';

interface Props {
    currentMenu: RouteItem; // 当激活菜单
    currentRoute: RouteItem; // 当前激活路由
    jumpRoute: ({ key }: { key: string }) => void; // 路由跳转方法
    secondLevelRouteIndex: string; // 二级路由首页path
}

interface RouteInfo {
    [key: string]: RouteItem;
}

const $props = defineProps<Props>(),
    $route = useRoute(),
    $router = useRouter();

let routeInfo = ref<RouteInfo>({}), // 路由信息
    showBreadcrumb = ref<boolean>(false);

showBreadcrumb = computed<boolean>(() => {
    console.log($props.currentMenu?.meta, '44444444');
    return (
        !$props.currentMenu?.meta?.hiddenBreadCrumb &&
        !!$props.currentMenu?.meta?.title
    );
});
routeInfo = computed<RouteInfo>(() => {
    const info: { [key: string]: RouteItem } = {},
        currentRoute = $props.currentRoute,
        currPath = $route.path;
    console.log('currentRoute', currentRoute);
    for (const [key, item] of Object.entries(currentRoute)) {
        if (key === 'meta') {
            info['1'] = currentRoute;
        }
        if (key === 'children' && Array.isArray(item)) {
            info['2'] =
                item.find((ele) => {
                    let p = `${currentRoute.path}/${ele.path}`,
                        res;

                    if (ele.children?.length) {
                        p = `${currentRoute.path}/${ele.path}/`;
                        res = currPath.indexOf(p) > 0;
                    }
                    if (!res) {
                        res = currPath.endsWith(
                            p.endsWith('/') ? p.slice(0, -1) : p
                        );
                    }
                    return res;
                }) ?? ({} as RouteItem);

            if (Array.isArray(info['2']?.children)) {
                info['3'] =
                    info['2'].children.find((ele) => {
                        return (
                            currPath.indexOf(
                                `${currentRoute.path}/${info['2'].path}/${ele.path}`
                            ) > 0
                        );
                    }) ?? ({} as RouteItem);
            }
        }
    }

    return info;
});

function go(item: RouteItem) {
    const childIndexItem = (item.children?.[0] ?? {}) as RouteItem;

    $router.push({
        name:
            childIndexItem.path === $props.secondLevelRouteIndex
                ? childIndexItem.name
                : item.name,
    });
}
</script>

<style lang="less" scoped>
.breadcrumb {
    padding-bottom: 1rem;
    .breadcrumb-item {
        display: block;
        padding: 10px 35px;
        background-color: #fff;
        position: relative;
        &::before {
            position: absolute;
            content: '';
            display: inline-block;
            left: 15px;
            top: 25%;
            background-color: rgba(72, 110, 231, 0.8784313725490196);
            width: 6px;
            height: 50%;
        }
    }
    .breadcrumb-item:hover {
        color: rgb(0 0 0 / 85%);
        cursor: pointer;
    }
}
</style>
