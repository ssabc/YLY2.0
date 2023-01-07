<!--
 * @Author: zhaoshan
 * @Date: 2022-11-30 14:10:30
 * @LastEditTime: 2022-12-05 23:47:06
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @Description:
-->
<template>
    <div class="items-center">
        <div class="tp flex">
            <pageHead></pageHead>
            <div v-if="isAdmin">
                <span style="margin-right: 10px">养老院选择:</span>
                <a-select
                    v-model:value="data.yly"
                    style="width: 140px"
                    :options="ylyList"
                    allow-clear
                />
            </div>
        </div>
        <div class="iframe-wrap">
            <IframeComp></IframeComp>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { reactive, computed } from 'vue';
import type { FormListProps } from 'GlobComponentsModule';

interface Data {
    list: FormListProps[];
    yly: string;
}
const $store = useStore(),
    isAdmin = computed(() => $store.getters['common/isAdmin']),
    ylyList = computed(() => {
        const ylyList = $store.getters['common/ylyList'];
        return [{ label: '全部', value: '' }, ...ylyList];
    }),
    data = reactive<Data>({
        /** 表单list */
        list: [
            {
                type: 'select',
                name: 'Dept',
                label: '养老院',
                props: {
                    placeholder: '养老院选择',
                    allowClear: true,
                },
                option: $store.getters['common/ylyList'] || [],
            },
            {
                type: 'handle',
                name: 'handle',
                label: '',
                option: [
                    {
                        label: '查询',
                        value: 'submit',
                        props: {
                            type: 'primary',
                        },
                    },
                    {
                        label: '重置',
                        value: 'resetFields',
                    },
                ],
            },
        ],
        yly: '',
    });
</script>

<style lang="less" scoped>
.tp {
    justify-content: space-between;
}
.iframe-wrap {
    padding: 20px 0;
    height: calc(100vh - 180px);
    min-height: 300px;
}
</style>
