<!--
 * @Author: szhao
 * @Date: 2022-11-30 14:10:30
 * @LastEditTime: 2023-07-03 21:32:43
 * @LastEditors: sZhao
 * @Description:
-->

<template>
    <a-config-provider v-if="componentName" :locale="zhCN">
        <component :is="componentName" />
    </a-config-provider>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import $store from '@/store/index';

let componentName = ref<string>('');
const $route = useRoute();

watch(
    () => $route.path,
    () => {
        // if (v === location.pathname) {
        componentName.value =
            $route.meta.layout === false
                ? 'ViewRouter'
                : $store.getters['common/userInfo']?.token
                ? 'Layout'
                : '';
        // }
    },
    {
        immediate: true,
    }
);
</script>
<style lang="less">
body {
    background-color: #f0f2f5;
}
.cm-box {
    background-color: #fff;
    border-radius: 10px;
    padding: 10px 15px;
    margin-bottom: 1rem;
}

.marginBt10 {
    margin-bottom: 1rem;
}
.table-title {
    padding: 10px 0;
}
.iconqingxiLOGO {
    display: none !important;
}
</style>
