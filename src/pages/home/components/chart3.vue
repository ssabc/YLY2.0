<!--
 * @Author: sZhao
 * @Date: 2023-01-08 16:48:43
 * @LastEditTime: 2023-01-16 16:27:52
 * @LastEditors: szhao
 * @Description:
-->
<template>
    <div class="like-table">
        <div class="hd">
            <div class="tr">
                <div class="th">序号</div>
                <div class="th">养老院</div>
                <div class="th">记录时长</div>
                <div class="th">设备号</div>
                <div class="th">记录类型</div>
            </div>
        </div>
        <div class="bd">
            <div v-for="(item, index) in scrollList" :key="item.Sn" class="tr">
                <div class="td">{{ index + 1 }}</div>
                <div class="td">{{ item.GroupName }}</div>
                <div class="td">{{ item.TotalFileDuration }}</div>
                <div class="td">{{ item.Sn }}</div>
                <div class="td">{{ item.ServiceType }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import type { ColumnProps } from 'GlobComponentsModule';

interface Props {
    ylyFlag?: any;
    pData?: any;
}

interface Data {
    columns: ColumnProps[];
}
const data = reactive<Data>({
        /** 列表项 */
        columns: [
            {
                title: '排名',
                type: 'index',
                width: 50,
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
    }),
    $props = defineProps<Props>(),
    scrollList = computed(() => {
        const cardList = $props.pData || [];
        return cardList;
    });
</script>

<style lang="less" scoped>
.like-table {
    height: 260px;
    width: 100%;
    overflow: hidden;
    .hd {
        .tr {
            border: none;
        }
    }
    .tr {
        display: flex;
        padding: 10px;
        border-bottom: 1px solid #666;
        & > div {
            &:first-child {
                width: 50px;
            }
            &:nth-child(2n) {
                width: 80px;
            }
            &:nth-child(3n) {
                width: 60px;
            }
            &:nth-child(4n) {
                flex: 1;
            }
            &:nth-child(5n) {
                width: 80px;
            }
            // flex: 1;
        }
    }
}
</style>
