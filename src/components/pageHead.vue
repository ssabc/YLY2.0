<template>
    <div class="hd-wrap">
        <a-button type="primary" @click="handleNaviPage">历史记录</a-button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const $router = useRouter();

function handleNaviPage() {
    $router.push('/inspection-records/history-records/index');
}
</script>

<style lang="less" scoped>
.iframe-wrap {
    padding: 20px 0;
    iframe {
        max-width: 1000px;
    }
}
</style>
