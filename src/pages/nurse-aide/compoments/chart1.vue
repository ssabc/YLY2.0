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
    const { data1 } = getData(isAdmin.value, $props.ylyFlag);
    nextTick(() => {
        renderChart1(data1);
    });
}

function getData(isAdmin: boolean, deptId: number) {
    console.log('isAdmin, deptId', isAdmin, deptId);
    if (deptId == 4) {
        return {
            data0: [{ value: 3, name: '黄浦老年公寓' }],
            data1: [
                { value: 1, name: '12.1' },
                { value: 0, name: '12.2' },
                { value: 1, name: '12.3' },
                { value: 0, name: '12.4' },
            ],
            data2: [
                { value: 0, name: '' },
                { value: 0, name: '' },
                { value: 2, name: '' },
                { value: 0, name: '' },
                { value: 0, name: '' },
                { value: 0, name: '' },
                { value: 0, name: '' },
            ],
        };
    }

    if (deptId == 6) {
        return {
            data0: [{ value: 2, name: '千鹤昌里' }],
            data1: [
                { value: 0, name: '12.1' },
                { value: 1, name: '12.2' },
                { value: 1, name: '12.3' },
                { value: 0, name: '12.4' },
            ],
            data2: [
                { value: 0, name: '' },
                { value: 0, name: '' },
                { value: 1, name: '' },
                { value: 1, name: '' },
                { value: 0, name: '' },
                { value: 0, name: '' },
                { value: 0, name: '' },
            ],
        };
    }

    if (deptId == 5) {
        return {
            data0: [{ value: 6, name: '千鹤乳山' }],
            data1: [
                { value: 0, name: '12.1' },
                { value: 1, name: '12.2' },
                { value: 1, name: '12.3' },
                { value: 0, name: '12.4' },
            ],
            data2: [
                { value: 0, name: '' },
                { value: 1, name: '' },
                { value: 1, name: '' },
                { value: 0, name: '' },
                { value: 0, name: '' },
                { value: 0, name: '' },
                { value: 0, name: '' },
            ],
        };
    }

    return {
        data0: [
            { value: 3, name: '黄浦老年公寓' },
            { value: 2, name: '千鹤昌里' },
            { value: 6, name: '千鹤乳山' },
        ],
        data1: [
            { value: 1, name: '12.1' },
            { value: 2, name: '12.2' },
            { value: 3, name: '12.3' },
            { value: 0, name: '12.4' },
        ],
        data2: [
            { value: 0, name: '' },
            { value: 1, name: '' },
            { value: 4, name: '' },
            { value: 1, name: '' },
            { value: 0, name: '' },
            { value: 0, name: '' },
            { value: 0, name: '' },
        ],
    };
}
const renderChart1 = (data: any) => {
    const colorList = ['#46ea91', '#2ba0ff', '#ed593b', '#7357ff', '#f2d750'],
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
                    data: ['1', '2', '3', '4', '5', '6', '7', '8'],
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
                    boundaryGap: false,
                },
            ],
            yAxis: [
                {
                    name: '(人次)',
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#05D5FF',
                        },
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#5FBBEB',
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
                },
                {
                    name: '养老院2',
                    type: 'line',
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
                    type: 'line',
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
    let myChart = echarts.init(document.getElementById('servicechart1'));
    myChart.setOption(option);
};
</script>

<style lang="less" scoped>
.chart {
    width: 100%;
    height: 400px;
}
</style>
