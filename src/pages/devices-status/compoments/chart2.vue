<template>
    <div class="like-table">
        <div class="hd">
            <div class="tr">
                <div class="th">类型</div>
                <div class="th">数量（单位：台）</div>
                <div class="th">占比</div>
            </div>
        </div>
        <div class="bd">
            <div v-for="item in list" :key="item.ServiceType" class="tr">
                <div class="td">{{ item.ServiceType }}</div>
                <div class="td">{{ item.Count }}</div>
                <div class="td">
                    <a-progress :percent="(item.Rate * 100).toFixed(2)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch, reactive } from 'vue';

interface ItemData {
    ServiceType: string;
    Count: number;
    Rate: number;
}
interface PData {
    list: Array<ItemData>;
}
interface Props {
    pData: PData;
}
const $props = defineProps<Props>();

let list = reactive<ItemData[]>([]);

watch(
    () => $props.pData,
    (e: PData) => {
        initFn(e.list);
    },
    {
        immediate: true,
    }
);

function initFn(_d: ItemData[]) {
    list = _d || [];
}
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
        & > div {
            &:first-child {
                flex: 1;
            }
            &:nth-child(2n) {
                flex: 1;
            }
            &:nth-child(3n) {
                width: 120px;
            }
        }
    }
}
</style>
