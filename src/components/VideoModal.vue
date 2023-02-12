<!--
 * @Author: zhaoshan
 * @Date: 2022-12-01 18:35:26
 * @LastEditTime: 2023-02-12 15:32:02
 * @LastEditors: sZhao
 * @Description:
-->
<template>
    <a-modal
        :visible="modalData.visible"
        :title="'查看视频'"
        :footer="null"
        width="1240px"
        height="700px"
        @cancel="$emit('cancel')"
    >
        <div style="width: 1200px; height: 660px" class="box">
            <div id="Player1"></div>
        </div>
    </a-modal>
</template>
<script setup lang="ts">
import { watch, defineProps, defineEmits, reactive, nextTick } from 'vue';

interface Data {
    player?: any;
}

const $props = defineProps<{
        modalData: any; // 弹窗数据信息
    }>(),
    data = reactive<Data>({
        player: null,
    }),
    $emit = defineEmits<{
        (event: 'cancel', v: void): void;
        (event: 'ok', v: void): void;
    }>();

watch(
    () => $props.modalData.videoUrl,
    (e: string) => {
        e && initVideoFn(e, 'Player1');
    },
    {
        immediate: false,
    }
);
// onMounted(() => {
//     data.player = new WasmPlayer(null, domId, callbackfun);
// });

function initVideoFn(url: string, domId: string) {
    console.log('url', url);
    // 实例化播放器
    nextTick(() => {
        data.player = new WasmPlayer(null, domId, callbackfun);
        // 调用播放
        data.player.play(url, 1);
    });
}
function callbackfun(e) {
    console.log('callbackfun', e);
}
</script>
<style>
</style>
