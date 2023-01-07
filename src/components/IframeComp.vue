<template>
    <div class="iframe-wrap">
        <div class="quanpin" @click="handleClick">
            <FullscreenOutlined :style="{ fontSize: '26px', color: '#08c' }" />
        </div>
        <iframe style="width: 100%; height: 100%" :src="url"></iframe>
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';
import { FullscreenOutlined } from '@ant-design/icons-vue';
const $store = useStore(),
    url = computed(() => $store.state.common.gisUrl);

onMounted(async () => {
    $store.dispatch('common/getGisUrl');
});
function handleClick() {
    console.log('444', url);
    window.open(url.value);
}
</script>
<style lang="less" scoped>
.iframe-wrap {
    width: 100%;
    height: 100%;
    position: relative;
    .quanpin {
        position: absolute;
        background-color: #fff;
        top: 20px;
        right: 0;
        width: 30px;
        height: 30px;
        cursor: pointer;
    }
}
</style>
