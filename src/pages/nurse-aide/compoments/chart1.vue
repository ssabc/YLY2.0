<!--
 * @Author: szhao
 * @Date: 2023-01-11 09:33:11
 * @LastEditTime: 2023-01-11 21:18:34
 * @LastEditors: sZhao
 * @Description:
-->
<template>
    <div id="servicechart1" class="chart"></div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { computed, watchEffect, nextTick } from 'vue';
import * as echarts from 'echarts';

interface Props {
    ylyFlag?: any;
}
const $store = useStore(),
    $props = defineProps<Props>(),
    isAdmin = computed(() => $store.getters['common/isAdmin']);

watchEffect(() => {
    initFn();
});

function initFn() {
    nextTick(() => {
        renderChart('servicechart1', [
            { name: '养老院3', color: '#199ED8', value: 20 },
            { name: '养老院1', color: '#199ED8', value: 70 },
            { name: '养老院2', color: '#199ED8', value: 40 },
        ]);
    });
}

const renderChart = (key: string, datas: any) => {
    const color = ['#ff275b', '#2799ff', '#27f68f'];
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
        legend: {
            icon: 'circle',
            bottom: '2%',
            left: '25%',
            itemWidth: 6,
            itemGap: 5,
            textStyle: {
                color: '#000',
                padding: [3, 0, 0, 0],
            },
        },
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
    myChart.clear();myChart.setOption(option);
};
</script>

<style lang="less" scoped>
.chart {
    width: 100%;
    height: 260px;
}
</style>
