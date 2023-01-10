<!--
 * @Author: sZhao
 * @Date: 2023-01-08 16:48:43
 * @LastEditTime: 2023-01-10 19:57:02
 * @LastEditors: szhao
 * @Description:
-->
<template>
    <div class="like-table">
        <div class="hd">
            <div class="tr">
                <div class="th">排名</div>
                <div class="th">养老院</div>
                <div class="th">记录时长(小时)</div>
                <div class="th">设备号</div>
                <div class="th">记录类型</div>
            </div>
        </div>
        <div class="bd">
            <vue3-seamless-scroll
                :list="data.tableData"
                :hover="true"
                class="scroll"
            >
                <div
                    v-for="(item, index) in data.tableData"
                    :key="item.name"
                    class="tr"
                >
                    <div class="td">{{ index + 1 }}</div>
                    <div class="td">{{ item.name }}</div>
                    <div class="td">{{ item.name }}</div>
                    <div class="td">{{ item.name }}</div>
                    <div class="td">{{ item.name }}</div>
                </div>
            </vue3-seamless-scroll>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { ColumnProps } from 'GlobComponentsModule';
import { repairList } from '@/api/app';

interface Data {
    tableData: Item[];
    columns: ColumnProps[];
}
interface Item {
    name: string;
}
let sendRequest = ref(false);

const data = reactive<Data>({
    /** 列表数据 */
    tableData: [
        {
            name: '养老院1',
        },
        {
            name: '养老院1',
        },
        {
            name: '养老院1',
        },
        {
            name: '养老院1',
        },
        {
            name: '养老院1',
        },
        {
            name: '养老院1',
        },
        {
            name: '养老院1',
        },
        {
            name: '养老院1',
        },
        {
            name: '养老院1',
        },
    ],
    /** 列表项 */
    columns: [
        {
            title: '排名',
            type: 'index',
            width: 80,
            dataIndex: 'index',
        },
        {
            title: '养老院',
            dataIndex: 'Dept',
        },
        {
            title: '记录时长(小时）',
            dataIndex: 'Name',
        },
        {
            title: '设备号',
            dataIndex: 'RepairCount',
        },
        {
            title: '记录类型',
            dataIndex: 'Mac',
        },
    ],
});
</script>

<style lang="less" scoped>
.scroll {
    height: 200px;
    width: 100%;
    overflow: hidden;
}
</style>
