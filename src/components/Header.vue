<template>
    <a-layout-header>
        <div class="head-wrap flex justify-between">
            <div class="title">黄浦区无感式养老服务系统</div>
            <div class="head-menus">
                <a-menu
                    v-model:selectedKeys="data.selectedKeys"
                    mode="horizontal"
                    @click="jumpRoute"
                >
                    <MenuItem
                        v-for="item in headMenu"
                        :key="item.path"
                        :name="item.name"
                    >
                        {{ item.meta.title }}
                    </MenuItem>
                </a-menu>
            </div>
            <div class="simple-info flex" style="height: 100%">
                <div
                    class="bell-wrap flex"
                    :class="data.bellNum > 0 ? 'animated swing' : ''"
                    @click="handleNaviPage"
                >
                    <img
                        class="bell"
                        :src="data.bellNum > 0 ? BellIcon2 : BellIcon1"
                    />
                    <span v-show="data.bellNum > 0" style="color: #f82607">{{
                        data.bellNum
                    }}</span>
                </div>
                <div>
                    <UserOutlined style="font-size: 20px" />
                    <span>{{ userInfo.username }}</span>
                </div>
                <button class="pl-12" @click="exit">退出</button>
            </div>
        </div>
    </a-layout-header>
    <div v-if="isAdmin" class="label-div">
        <span>选择养老院：</span>
        <a-select
            v-model:value="yly"
            style="width: 200px"
            @change="handleChangeYLY"
        >
            <a-select-option
                v-for="ele of ylyList"
                :key="ele['value']"
                :value="'' + ele['value']"
            >
                {{ ele['label'] }}
            </a-select-option>
        </a-select>
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { computed, reactive, ref, onMounted } from 'vue';
import { MenuItem } from 'ant-design-vue';
import { useRouter, useRoute } from 'vue-router';
import { watch } from 'vue';
import type { UserInfoVO } from 'CommonModule';
import BellIcon1 from '@/assets/pictures/bell1.png';
import BellIcon2 from '@/assets/pictures/bell2.png';
import { UserOutlined } from '@ant-design/icons-vue';
import { fetchWarningCount } from '@/api/app';

interface Data {
    openKeys: Array<string>; // 当前展开的 SubMenu 菜单项 key 数组
    selectedKeys: Array<string>; // 当前选中的菜单项 key 数组
    bellNum: number; // 铃铛数
}

const data = reactive<Data>({
        openKeys: [],
        selectedKeys: [],
        bellNum: 0,
    }),
    $store = useStore(),
    $router = useRouter(),
    $route = useRoute(),
    isAdmin = computed(() => $store.getters['common/isAdmin']),
    ylyList = computed(() => {
        const ylyList = $store.getters['common/ylyList'];
        return [{ label: '全部', value: '' }, ...ylyList];
    }),
    // 路由菜单
    headMenu = computed(() => $store.getters['common/headMenu']);

let userInfo = ref<UserInfoVO>({});
let yly = ref<string>('');
userInfo = computed(() => $store.getters['common/userInfo']?.account || {});

onMounted(() => {
    fetchWarningCount({}).then((res: any) => {
        data.bellNum = res.data || 0;
    });
    initFn();
});

function initFn() {
    yly.value = `${$store.getters['common/groupId'] || ''}`;
}

// 更新并高亮路由
watch(
    () => $route.path,
    () => {
        data.selectedKeys = $route.matched?.map((_e: any) => _e.path);
    },
    {
        immediate: true,
    }
);

/**
 * @description: 路由跳转
 */
function jumpRoute({ key }: { key: string }) {
    $router.push(key);
}

function exit() {
    $store.dispatch('common/exit');
}

function handleNaviPage() {
    data.bellNum = 0;
    $router.push('/nurse-aide');
}

function handleChangeYLY(e: string) {
    const _tmp = ylyList.value.filter((_e) => {
            return _e.value == e;
        })?.[0],
        _q = {
            name: _tmp?.label || '',
            id: _tmp?.value || '',
        };
    $store.commit('common/setYly', _q);
}
</script>

<style lang="less" scoped>
.ant-layout-header {
    height: auto;
    padding: 0;
    background: #082c61;
}
:deep(.ant-menu) {
    background: #082c61 !important;
}
.head-wrap {
    height: 60px;
    max-height: 60px;
    padding: 0 15px;
    color: white;
    background: #082c61;
    .head-menus {
        flex: 1;
        :deep(li.ant-menu-item),
        :deep(li.ant-menu-submenu) {
            background-color: rgba(8, 44, 97, 0);
        }
        :deep(li.ant-menu-item-selected) {
            background-color: rgba(8, 44, 97, 0) !important;
            border-bottom: 4px solid rgba(2, 109, 155, 1);
        }
    }
    .title {
        width: 320px;
        font-size: 24px;
        font-weight: bolder;
        line-height: 60px;
    }
    .simple-info {
        white-space: nowrap;
    }
    :deep(.ant-menu) {
        background-color: rgba(8, 44, 97, 0);
        height: 60px;
        border: none;
    }
    :deep(.ant-menu-item-active::after) {
        border: none !important;
    }
}

.bell-wrap {
    position: relative;
    align-items: center;
    margin-right: 10px;
    color: #fff;
    cursor: pointer;
    .bell {
        width: 22px;
        height: 22px;
        margin: 0;
    }
    span {
        position: absolute;
        right: 0;
        top: 0;
        line-height: 40px;
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

.label-div {
    height: 50px;
    background-color: rgba(65, 92, 133, 1);
    display: flex;
    align-items: center;
    color: #fff;
    padding: 10px 15px;
}
</style>
