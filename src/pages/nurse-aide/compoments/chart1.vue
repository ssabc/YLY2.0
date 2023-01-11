<!--
 * @Author: szhao
 * @Date: 2023-01-11 09:33:11
 * @LastEditTime: 2023-01-11 19:29:36
 * @LastEditors: szhao
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
            { name: '服务提供1', color: '#199ED8', value: 11 },
            { name: '服务提供2', color: '#199ED8', value: 11 },
            { name: '服务提供3', color: '#199ED8', value: 11 },
        ]);
    });
}

const renderChart = (key: string, datas: any) => {
    const color = ['#199ED8', '#CCCCCC', '#00FF00'];
    let sum = 0;
    for (var i of datas) {
        sum += i.value;
    }
    const title = {
        value: sum,
        unit: '分钟',
    };
    const rich = {
        value: {
            color: '#fff',
            fontSize: 16,
            align: 'left',
        },
        titleUnit: {
            color: '#fff',
            fontSize: 14,
            padding: [15, 0, 0, 0],
        },
    };
    let option = {
        legend: {
            icon: 'circle',
            bottom: '2%',
            left: '20%',
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
                radius: ['50%', '70%'],
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
                        `{value|${title.value}}\n{titleUnit|${title.unit}}`,
                    rich,
                },
            },
        ],
    };
    // 绘制图表
    let myChart = echarts.init(document.getElementById(key));
    myChart.setOption(option);
};
</script>

<style lang="less" scoped>
.chart {
    width: 100%;
    height: 260px;
}
</style>
