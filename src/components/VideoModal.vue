<!--
 * @Author: zhaoshan
 * @Date: 2022-12-01 18:35:26
 * @LastEditTime: 2023-03-03 16:37:39
 * @LastEditors: szhao
 * @Description:
-->
<template>
    <a-modal
        :visible="modalData.visible"
        :title="'查看视频'"
        :footer="null"
        width="1240px"
        height="700px"
        @cancel="handleCancel"
    >
        <div style="width: 1200px; height: 660px" class="box">
            <div id="Player1"></div>
        </div>
    </a-modal>
</template>
<script setup lang="ts">
import {
    watch,
    defineProps,
    defineEmits,
    reactive,
    nextTick,
    onMounted,
    onBeforeUnmount,
} from 'vue';
import func from 'vue-temp/vue-editor-bridge';

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

onMounted(() => {
    window.onbeforeunload = function () {
        closePage();
        return false;
    };
});
onBeforeUnmount(() => {
    closePage();
});
function closePage() {
    data.player?.destroy();
    window.onbeforeunload = null;
}

function handleCancel() {
    data.player?.destroy();
    $emit('cancel');
}

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
<style></style>
