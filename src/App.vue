<!--
 * @Author: szhao
 * @Date: 2022-11-30 14:10:30
 * @LastEditTime: 2023-01-07 10:20:38
 * @LastEditors: szhao
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
