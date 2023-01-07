<!--
 * @Author: zhaoshan
 * @Date: 2022-11-30 14:10:30
 * @LastEditTime: 2022-12-03 18:09:49
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @Description:
-->
<template>
    <div class="items-center">
        <div style="text-align: right">
            <a-button @click="back">返回</a-button>
        </div>
        <div class="iframe-wrap">
            <IframeComp></IframeComp>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const $router = useRouter();

function back() {
    $router.go(-1);
}
</script>

<style lang="less" scoped>
.iframe-wrap {
    padding: 20px 0;
    height: calc(100vh - 220px);
    min-height: 300px;
}
</style>
