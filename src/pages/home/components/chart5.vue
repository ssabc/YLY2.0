<template>
    <div class="wrap">
        <div class="cells flex">
            <div class="cell">
                <span class="label">总呼叫数：</span>
                <span class="value">{{ totalSosCount }}</span>
                <span class="unit">次</span>
            </div>
            <div class="cell">
                <span class="label">记录时长：</span>
                <span class="value">{{ recordDuration }}</span>
                <span class="unit">分钟</span>
            </div>
            <div class="cell">
                <span class="label">已处置数：</span>
                <span class="value red">{{ handledCount }}</span>
                <span class="unit">件</span>
            </div>
        </div>
        <vue3-seamless-scroll :list="listData" :hover="true" class="scroll">
            <div
                v-for="(item, index) in listData"
                :key="index"
                class="row flex"
            >
                <div class="tip" :class="!item.IsHandled ? 'red' : ''">
                    {{ !item.IsHandled ? '未处置' : '已处置' }}
                </div>
                <div class="content flex">
                    <span>{{ item.GroupName }}</span>
                    <span class="date">{{ item.DealTime }}</span>
                    <span>设备编号：{{ item.DeviceSn }}</span>
                </div>
            </div>
        </vue3-seamless-scroll>
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { reactive, watch, ref } from 'vue';

interface Props {
    pData?: {
        SosCount: any;
        SosIn24h: any;
    };
}

interface SosTableItem {
    IsHandled: boolean;
    GroupName: string;
    DealTime: string;
    DeviceSn: string;
}
const $store = useStore(),
    $props = defineProps<Props>(),
    handledCount = ref<number>(0),
    recordDuration = ref<string>(0),
    totalSosCount = ref<number>(0);

let listData = reactive<SosTableItem[]>([]);

watch(
    () => $props.pData,
    (e: any) => {
        initFn(e);
    },
    {
        immediate: true,
    }
);

function initFn(e: any) {
    const { SosCount, SosIn24h } = e || {},
        { HandledCount, RecordDuration, TotalSosCount } = SosCount || {};
    handledCount.value = HandledCount;
    recordDuration.value = `${
        +RecordDuration < 60 ? '< 1' : Math.floor(+RecordDuration / 60)
    }`;
    totalSosCount.value = TotalSosCount;

    listData = SosIn24h || [];
}
</script>

<style lang="less" scoped>
.wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.scroll {
    height: 150px;
    width: 100%;
    overflow: hidden;
}
.cells {
    color: #fff;
    font-size: 12px;
    margin-bottom: 10px;
    .cell {
        flex: 1;
        padding: 2px 4px;
        display: flex;
        justify-content: space-between;
        margin-right: 20px;
        border-radius: 4px;
        background-color: rgba(197, 233, 246, 0.5764705882352941);
        &:last-child {
            margin-right: 0;
        }
        .value {
            color: #015478;
            font-size: 28px;
            font-weight: bold;
            &.red {
                color: #e61707;
            }
        }
        .unit {
            display: flex;
            align-items: flex-end;
        }
    }
}
.row {
    color: #fff;
    background-color: rgba(127, 123, 155, 0.6);
    border-radius: 4px;
    height: 50px;
    align-items: center;
    margin-bottom: 10px;
    font-size: 12px;
    .tip {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 100%;
        background-color: #015478;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        &.red {
            background-color: #e61707;
        }
    }
    .date {
        // flex: 1;
    }
    .content {
        width: 100%;
        justify-content: space-around;
        padding: 0 10px;
        align-items: center;
    }
}
</style>
