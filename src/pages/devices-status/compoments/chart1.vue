<template>
    <div id="deviceStatusChart1" class="chart"></div>
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
        renderChart();
    });
}

const renderChart1 = () => {
    const colorList = ['#2984f8', '#67d4fb', '#ff9700', '#7357ff', '#f2d750'],
        option = {
            legend: {
                icon: 'circle',
                top: '5%',
                right: '5%',
                itemWidth: 6,
                itemGap: 5,
                textStyle: {
                    color: '#000',
                    padding: [3, 0, 0, 0],
                },
            },
            tooltip: {
                trigger: 'axis',
            },
            grid: {
                top: '15%',
                left: '5%',
                bottom: '15%',
                right: '5%',
            },
            xAxis: [
                {
                    type: 'category',
                    data: [
                        '2023年1月5日',
                        '2023年1月6日',
                        '2023年1月7日',
                        '2023年1月8日',
                        '2023年1月9日',
                        '2023年1月10日',
                        '2023年1月11日',
                    ],
                    axisLine: {
                        lineStyle: {
                            color: '#33BBFF',
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        interval: 0,
                        textStyle: {
                            color: '#000',
                        },
                        // 默认x轴字体大小
                        fontSize: 12,
                        // margin:文字到x轴的距离
                        margin: 10,
                    },
                    axisPointer: {
                        label: {
                            // padding: [11, 5, 7],
                            padding: [0, 0, 0, 0],
                            // 这里的margin和axisLabel的margin要一致!
                            margin: 10,
                            // 移入时的字体大小
                            fontSize: 12,
                            backgroundColor: 'rgba(0,0,0,0)',
                        },
                    },
                },
            ],
            yAxis: [
                {
                    name: '',
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#f0f2f5',
                        },
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#999',
                        },
                    },
                    splitLine: {
                        show: false,
                    },
                },
            ],
            series: [
                {
                    name: '养老院1',
                    type: 'bar',
                    data: [100, 20, 30, 102, 15, 30, 20, 18],
                    smooth: true,
                    itemStyle: {
                        normal: {
                            color: colorList[0],
                            borderColor: colorList[0],
                        },
                    },
                },
                {
                    name: '',
                    type: 'bar',
                    barWidth: '50%',
                    xAxisIndex: 0,
                    yAxisIndex: 1,
                    data: [100, 20, 30, 102, 15, 30, 20, 18].map(
                        () =>
                            Math.max.apply(
                                null,
                                [100, 20, 30, 102, 15, 30, 20, 18].map((p) => p)
                            ) * 1.5
                    ),
                    tooltip: {
                        backgroundColor: 'transparent',
                        formatter: ' ',
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgba(255,255,255,0.1)',
                        },
                    },
                    zlevel: 9,
                },
            ],
        };
    // 绘制图表
    let myChart = echarts.init(document.getElementById('deviceStatusChart1'));
    myChart.clear();
    myChart.setOption(option);
};

const renderChart = () => {
    let chartData = [
        { stage: '2023年1月5日', number: '470' },
        { stage: '2023年1月5日', number: '1410' },
        { stage: '2023年1月5日', number: '3390' },
        { stage: '2023年1月5日', number: '5870' },
        { stage: '2023年1月5日', number: '5870' },
        { stage: '2023年1月5日', number: '5870' },
        { stage: '2023年1月5日', number: '5870' },
    ];
    const option = {
        color: ['#0EECE4'],
        legend: {
            icon: 'circle',
            top: '5%',
            left: '5%',
            itemWidth: 6,
            itemGap: 5,
            textStyle: {
                color: '#000',
                padding: [3, 0, 0, 0],
            },
        },
        tooltip: {
            confine: true,
        },
        grid: {
            top: '15%',
            left: '5%',
            bottom: '15%',
            right: '5%',
        },
        xAxis: [
            {
                type: 'category',
                gridIndex: 0,
                data: chartData.map((item) => item.stage),
                axisLine: {
                    lineStyle: {
                        color: '#efefef',
                    },
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    interval: 0,
                    textStyle: {
                        color: '#000',
                    },
                    // 默认x轴字体大小
                    fontSize: 12,
                    // margin:文字到x轴的距离
                    margin: 10,
                },
            },
        ],
        yAxis: [
            {
                type: 'value',
                name: '',
                nameTextStyle: {
                    fontSize: 11,
                    color: '#BAE7FF',
                    align: 'left',
                },
                splitArea: { show: false },
                gridIndex: 0,
                min: 0,
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#f0f2f5',
                    },
                },
                axisLabel: {
                    textStyle: {
                        color: '#999',
                    },
                },
                splitLine: {
                    show: false,
                },
                max:
                    Math.max.apply(
                        null,
                        chartData.map((p) => p.number)
                    ) * 1.5,
            },
            {
                type: 'value',
                splitArea: { show: false },
                gridIndex: 0,
                min: 0,
                splitNumber: 12,
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#f0f2f5',
                    },
                },
                axisLabel: {
                    show: false,
                    textStyle: {
                        color: '#999',
                    },
                },
                splitLine: {
                    show: false,
                },
                max:
                    Math.max.apply(
                        null,
                        chartData.map((p) => p.number)
                    ) * 1.5,
            },
        ],
        series: [
            {
                name: '在线台数',
                type: 'bar',
                barWidth: '30%',
                xAxisIndex: 0,
                yAxisIndex: 0,
                label: {
                    show: true,
                    position: 'top',
                    distance: 15,
                    color: '#fff',
                    fontSize: 11,
                    formatter: '{c}',
                },
                itemStyle: {
                    normal: {
                        color: 'rgb(41,132,248)',
                    },
                },
                data: chartData.map((item) => item.number),
                zlevel: 11,
            },
            {
                name: '总台数',
                type: 'bar',
                barWidth: '30%',
                xAxisIndex: 0,
                yAxisIndex: 1,
                barGap: '-100%',
                data: chartData.map(
                    () =>
                        Math.max.apply(
                            null,
                            chartData.map((p) => p.number)
                        ) * 1.5
                ),
                tooltip: {
                    backgroundColor: 'transparent',
                    formatter: ' ',
                },
                itemStyle: {
                    normal: {
                        color: 'rgb(212,230,254)',
                    },
                },
                zlevel: 9,
            },
        ],
    };

    // 绘制图表
    let myChart = echarts.init(document.getElementById('deviceStatusChart1'));
    myChart.clear();
    myChart.setOption(option);
};
</script>

<style lang="less" scoped>
.chart {
    width: 100%;
    height: 260px;
}
</style>
