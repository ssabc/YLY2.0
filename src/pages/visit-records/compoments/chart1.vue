<template>
    <div id="visitRecordsChart1" class="chart"></div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { computed, watchEffect, nextTick } from 'vue';
import * as echarts from 'echarts';
import { getLastest7day } from '@/utils/tools';

interface Props {}
const $store = useStore();

watchEffect(() => {
    initFn();
});

function initFn() {
    nextTick(() => {
        renderChart1();
    });
}

const renderChart1 = (data: any) => {
    const colorList = ['#2984f8', '#67d4fb', '#ff9700', '#7357ff', '#f2d750'],
        option = {
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
                trigger: 'axis',
            },
            grid: {
                top: '15%',
                left: '8%',
                bottom: '15%',
                right: '8%',
            },
            xAxis: [
                {
                    name: '日期',
                    nameLocation: 'start',
                    // nameGap: 20,
                    nameTextStyle: {
                        color: '#999',
                    },
                    type: 'category',
                    data: getLastest7day(),
                    axisLine: {
                        lineStyle: {
                            color: '#33BBFF',
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
                    name: '人次',
                    nameTextStyle: {
                        color: '#999',
                    },
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
                    symbolSize: 1,
                    symbol: 'circle',
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        width: 2,
                        color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
                            {
                                offset: 0,
                                color: '#90ffc6',
                            },
                            {
                                offset: 1,
                                color: '#46ea91',
                            },
                        ]),
                        shadowColor: 'rgba(144, 255, 198, .3)',
                        shadowBlur: 5,
                        shadowOffsetY: 5,
                    },
                    itemStyle: {
                        normal: {
                            color: colorList[0],
                            borderColor: colorList[0],
                        },
                    },
                },
                {
                    name: '养老院2',
                    type: 'bar',
                    data: [20, 12, 11, 14, 25, 16, 10, 20],
                    symbolSize: 1,
                    symbol: 'circle',
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        width: 2,
                        color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
                            {
                                offset: 0,
                                color: '#67bcfc',
                            },
                            {
                                offset: 1,
                                color: '#2ba0ff',
                            },
                        ]),
                        shadowColor: 'rgba(105, 188, 252,.3)',
                        shadowBlur: 5,
                        shadowOffsetY: 5,
                    },
                    itemStyle: {
                        normal: {
                            color: colorList[1],
                            borderColor: colorList[1],
                        },
                    },
                },
                {
                    name: '养老院3',
                    type: 'bar',
                    data: [150, 120, 170, 140, 100, 160, 110, 110],
                    symbolSize: 1,
                    symbol: 'circle',
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        width: 2,
                        color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
                            {
                                offset: 0,
                                color: '#fc937e ',
                            },
                            {
                                offset: 1,
                                color: '#ed593b',
                            },
                        ]),
                        shadowColor: 'rgb(252, 147, 126,.3)',
                        shadowBlur: 2,
                        shadowOffsetY: 2,
                    },
                    itemStyle: {
                        normal: {
                            color: colorList[2],
                            borderColor: colorList[2],
                        },
                    },
                },
            ],
        };
    // 绘制图表
    let myChart = echarts.init(document.getElementById('visitRecordsChart1'));
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
