<template>
    <div id="visitRecordsChart2" class="chart"></div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { computed, watchEffect, nextTick } from 'vue';
import * as echarts from 'echarts';

interface Props {}
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
                bottom: '32%',
                right: '8%',
            },
            xAxis: [
                {
                    name: '日期',
                    nameLocation: 'start',
                    nameGap: 20,
                    nameTextStyle: {
                        color: '#999',
                    },
                    type: 'category',
                    data: [
                        '0:00:00-03：00',
                        '3:00:00-06：00',
                        '6:00:00-09：00',
                        '9:00:00-12：00',
                        '12:00:00-15：00',
                        '15:00:00-18：00',
                        '18:00:00-21：00',
                        '21:00:00-24：00',
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
                        textStyle: {
                            color: '#000',
                        },
                        // 默认x轴字体大小
                        fontSize: 12,
                        // margin:文字到x轴的距离
                        margin: 15,
                        rotate: 30,
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
                    boundaryGap: true,
                },
            ],
            yAxis: [
                {
                    name: '次数',
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
                    data: [0, 0, 3, 9, 12, 15, 4, 0],
                    symbolSize: 1,
                    symbol: 'circle',
                    smooth: false,
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
                    type: 'line',
                    data: [0, 0, 5, 5, 6, 3, 1, 0],
                    symbolSize: 1,
                    symbol: 'circle',
                    smooth: false,
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
                    type: 'line',
                    data: [0, 0, 10, 9, 6, 3, 0, 0],
                    symbolSize: 1,
                    symbol: 'circle',
                    smooth: false,
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
    let myChart = echarts.init(document.getElementById('visitRecordsChart2'));
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
