<!--
 * @Author: zhaoshan
 * @Date: 2022-12-01 18:35:26
 * @LastEditTime: 2022-12-08 13:47:44
 * @LastEditors: szhao
 * @Description:
-->
<template>
    <a-modal
        :visible="modalData.visible"
        :title="title"
        :footer="null"
        @cancel="$emit('cancel')"
    >
        <video style="width: 100%; height: 100%" controls>
            <source :src="vedioUrl" type="video/mp4" />
            <!-- <source v-if="vedioUrlIMG" :src="vedioUrlIMG" type="video/jpg" /> -->
            您的浏览器不支持 HTML5 video 标签。
        </video>
    </a-modal>
</template>
<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';
import type { ModalData } from 'GlobComponentsModule';

const $props = defineProps<{
        modalData: ModalData; // 弹窗数据信息
    }>(),
    $emit = defineEmits<{
        (event: 'cancel', v: void): void;
        (event: 'ok', v: void): void;
    }>();
/** 弹窗标题 */
const title = computed(() => {
    return `${$props.modalData.data.FileName}`;
});
const vedioUrl = computed(() => {
    return `${$props.modalData.data.FilePath || $props.modalData.data.Video}`;
});
// const vedioUrlIMG = computed(() => {
//     const _a = $props.modalData.data.Video || '',
//         _t = _a.substring(0, _a.lastIndexOf('.'));
//     return _t ? `${_t}_thumb.jpg` : '';
// });
</script>
<style></style>
