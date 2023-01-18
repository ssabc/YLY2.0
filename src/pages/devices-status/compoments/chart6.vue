<template>
    <div id="deviceStatusChart1" class="chart"></div>
</template>

<script setup lang="ts">
import { watchEffect, nextTick } from 'vue';
import * as echarts from 'echarts';

watchEffect(() => {
    initFn();
});

function initFn() {
    nextTick(() => {
        renderChart();
    });
}

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
            right: '8%',
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
            left: '8%',
            bottom: '15%',
            right: '10%',
        },
        xAxis: [
            {
                name: '日期', nameLocation: 'start', nameGap: 20,
                nameTextStyle: {
                    color: '#999',
                },
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
                name: '次数(次)',
                type: 'value',
                nameTextStyle: {
                    color: '#999',
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
    height: 360px;
}
</style>
