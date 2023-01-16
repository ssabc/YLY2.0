<!--
 * @Author: szhao
 * @Date: 2023-01-11 09:33:11
 * @LastEditTime: 2023-01-16 16:04:29
 * @LastEditors: szhao
 * @Description:
-->
<template>
    <div>
        <div id="servicechart1" class="chart"></div>
        <div class="cells">
            <div v-for="item in data.list" :key="item.name" class="cell">
                <div
                    class="circle"
                    :style="{ 'background-color': item.color }"
                ></div>
                <div class="label">{{ item.name }}:</div>
                <div class="value">{{ item.value }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { computed, watchEffect, nextTick, reactive } from 'vue';
import * as echarts from 'echarts';

interface Props {
    ylyFlag?: any;
}
const $store = useStore(),
    $props = defineProps<Props>(),
    data = reactive({
        list: [
            { name: '养老院1', color: '#2984f8', value: 70 },
            { name: '养老院2', color: '#67d4fb', value: 40 },
            { name: '养老院3', color: '#ff9700', value: 20 },
        ],
    }),
    isAdmin = computed(() => $store.getters['common/isAdmin']);

watchEffect(() => {
    initFn();
});

function initFn() {
    const _d = data.list;
    nextTick(() => {
        renderChart('servicechart1', _d);
    });
}

const renderChart = (key: string, datas: any) => {
    const color = datas?.map((_e: any) => _e.color);
    let sum = 0;
    for (var i of datas) {
        sum += i.value;
    }
    const title = {
        value: sum,
        unit: '呼叫次数',
    };
    const rich = {
        value: {
            color: '#000',
            fontSize: 24,
            align: 'center',
            padding: [15, 0, 0, 0],
        },
        titleUnit: {
            fontSize: 14,
            color: '#999',
        },
    };
    let option = {
        color,
        tooltip: {
            trigger: 'item',
            formatter: '{b} <br/> {c} ({d}%)',
        },
        series: [
            {
                type: 'pie',
                center: ['50%', '50%'],
                radius: ['50%', '80%'],
                data: datas,
                startAngle: 180,
                label: {
                    show: false,
                },
            },
            {
                type: 'pie',
                center: ['50%', '50%'],
                radius: ['50%', '70%'],
                data: datas,
                startAngle: 180,
                label: {
                    show: true,
                    position: 'center',
                    formatter: () =>
                        `{titleUnit|${title.unit}}\n{value|${title.value}}`,
                    rich,
                },
            },
        ],
    };
    // 绘制图表
    let myChart = echarts.init(document.getElementById(key));
    myChart.clear();
    myChart.setOption(option);
};
</script>

<style lang="less" scoped>
.chart {
    width: 100%;
    height: 260px;
}
.cells {
    .cell {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 160px;
        .circle {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #000;
        }
        .label {
            margin: 0 4px;
        }
    }
}
</style>
