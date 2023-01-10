<!--
 * @Author: sZhao
 * @Date: 2023-01-08 16:48:43
 * @LastEditTime: 2023-01-10 22:51:17
 * @LastEditors: sZhao
 * @Description:
-->
<template>
    <div class="like-table">
        <div class="hd">
            <div class="tr">
                <div class="th">排名</div>
                <div class="th">养老院</div>
                <div class="th">记录时长</div>
                <div class="th">设备号</div>
                <div class="th">记录类型</div>
            </div>
        </div>
        <div class="bd">
            <vue3-seamless-scroll
                :list="scrollList"
                :hover="true"
                class="scroll"
            >
                <!-- <div v-for="(arr, idx) in scrollList" :key="idx"> -->
                <div v-for="item in scrollList" :key="item.Sn" class="tr">
                    <div class="td">{{ item.Rank }}</div>
                    <div class="td">{{ item.GroupName }}</div>
                    <div class="td">{{ item.TotalFileDuration }} 小时</div>
                    <div class="td">{{ item.Sn }}</div>
                    <div class="td">{{ item.ServiceType }}</div>
                </div>
                <!-- </div> -->
            </vue3-seamless-scroll>
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
        //     newCardList = [];
        // for (var i = 0; i < cardList.length; i += 5) {
        //     newCardList.push(cardList.slice(i, i + 5));
        // }
        // return newCardList;
    });
</script>

<style lang="less" scoped>
.scroll {
    height: 200px;
    width: 100%;
    overflow: hidden;
}
.tr {
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #efefef;
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
</style>
