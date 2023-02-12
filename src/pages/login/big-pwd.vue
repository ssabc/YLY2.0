<!--
 * @Author: zhaoshan
 * @Date: 2022-12-01 18:35:26
 * @LastEditTime: 2023-02-12 14:12:39
 * @LastEditors: sZhao
 * @Description:
-->
<template>
    <a-modal
        :visible="modalData?.visible"
        :title="'输入查看密码'"
        :footer="null"
        @cancel="$emit('cancel')"
    >
        <a-input type="password" v-model="data.dapinPwd" />

        <a-button
            type="primary"
            class="submit-btn mt-6 w-full"
            size="large"
            @click="submit"
        >
            确定
        </a-button>
    </a-modal>
</template>
<script setup lang="ts">
import { computed, reactive, defineProps, defineEmits } from 'vue';
import type { ModalData } from 'GlobComponentsModule';

interface Data {
    dapinPwd: string;
}

const $props = defineProps<{
        modalData: ModalData; // 弹窗数据信息
    }>(),
    modalData = computed(() => $props.modalData),
    data = reactive<Data>({
        dapinPwd: '',
    }),
    $emit = defineEmits<{
        (event: 'cancel', v: void): void;
        (event: 'ok', v: void): void;
    }>();

/**
 * @description: 提交登录
 */
function submit() {
    console.log('3333', data.dapinPwd);
    if (!data.dapinPwd) {
        $emit('ok');
    }
}
</script>
<style></style>
