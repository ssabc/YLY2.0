<template>
    <div id="deviceStatusChart3" class="chart"></div>
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
        renderChart1();
    });
}
const renderChart1 = (data: any) => {
    const colorList = ['#2984f8', '#67d4fb', '#ff9700', '#7357ff', '#f2d750'],
        option = {
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
                    nameTextStyle: {
                        color: '#999',
                    },
                    type: 'category',
                    data: [
                        '2023年1月4日',
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
                            color: '#999',
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        interval: 0,
                        textStyle: {
                            color: '#999',
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
                    boundaryGap: false,
                },
            ],
            yAxis: [
                {
                    name: '次数(人次)',
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
                    type: 'line',
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
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                        offset: 0,
                                        color: 'rgba(0,150,255,0.8)',
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(56,208,251,0.2)',
                                    },
                                ],
                                false
                            ),
                        },
                    },
                },
            ],
        };
    // 绘制图表
    let myChart = echarts.init(document.getElementById('deviceStatusChart3'));
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
