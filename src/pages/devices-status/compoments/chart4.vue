<template>
    <div id="deviceStatusChart4" class="chart"></div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import * as echarts from 'echarts';

interface Props {
    pData?: any;
}

const $props = defineProps<Props>();

watch(
    () => $props.pData,
    (e) => {
        initFn(e);
    },
    {
        immediate: false,
    }
);
function initFn(_list: any[]) {
    renderChart1(_list);
}

const renderChart1 = (_list: any[]) => {
    const colorList = ['#2984f8', '#67d4fb', '#ff9700', '#7357ff', '#f2d750'],
        seriesData = [];
    _list?.map((_e: any, idx: number) => {
        seriesData.push({
            name: _e.name,
            type: 'bar',
            data: _e.data,
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
                    color: colorList[idx],
                    borderColor: colorList[idx],
                },
            },
        });
    });
    const option = {
        legend: {
            icon: 'circle',
            top: '0%',
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
            top: '20%',
            left: '8%',
            bottom: '15%',
            right: '8%',
        },
        xAxis: [
            {
                name: '月份',
                nameLocation: 'start',
                nameGap: 20,
                nameTextStyle: {
                    color: '#999',
                },
                type: 'category',
                data: [
                    '1月',
                    '2月',
                    '3月',
                    '4月',
                    '5月',
                    '6月',
                    '7月',
                    '8月',
                    '9月',
                    '10月',
                    '11月',
                    '12月',
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
        series: seriesData,
    };
    // 绘制图表
    let myChart = echarts.init(document.getElementById('deviceStatusChart4'));
    myChart.clear();
    myChart.setOption(option);
};
</script>

<style lang="less" scoped>
.chart {
    width: 100%;
    height: 160px;
}
</style>
