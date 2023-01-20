<!--
 * @Author: szhao
 * @Date: 2023-01-07 16:18:32
 * @LastEditTime: 2023-01-20 10:33:01
 * @LastEditors: szhao
 * @Description: 
-->
<template>
    <router-view v-slot="{ Component }">
        <!-- <keep-alive :include="includeList.join(',')"> -->
        <component :is="Component" />
        <!-- </keep-alive> -->
    </router-view>
</template>

<script setup lang="ts">
// import { reactive, watch } from 'vue';
// import { useRoute } from 'vue-router';
// const includeList = reactive<any[]>([]);
// const $route = useRoute();
// watch(
//     () => $route,
//     (newVal) => {
//         if (newVal.meta && newVal.meta?.keepAlive && newVal?.name) {
//             !includeList.includes(newVal.name) && includeList.push(newVal.name);

//             console.log(
//                 newVal.meta,
//                 '====================================',
//                 includeList
//             );
//         }
//     },
//     { deep: true, immediate: true }
// );
</script>
