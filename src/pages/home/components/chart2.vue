<template>
    <div id="ylyChart2" class="chart"></div>
</template>

<script setup lang="ts">
import { watch, nextTick } from 'vue';
import * as echarts from 'echarts';
import { getLastest7day } from '@/utils/tools';

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

function initFn(_list: any) {
    nextTick(() => {
        renderChart1(_list);
    });
}

const renderChart1 = (_list: any) => {
    const colorList = ['#2984f8', '#67d4fb', '#ff9700', '#7357ff', '#f2d750'],
        seriesData = [];
    _list?.map((_e: any, idx: number) => {
        seriesData.push({
            name: _e.name,
            type: 'line',
            data: _e.data,
            symbolSize: 1,
            symbol: 'circle',
            smooth: true,
            showSymbol: false,
            lineStyle: {
                width: 2,
                color: colorList[idx],
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
            top: '5%',
            right: '8%',
            itemWidth: 6,
            itemGap: 5,
            textStyle: {
                color: '#fff',
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
                nameGap: 20,
                type: 'category',
                data: getLastest7day(),
                axisLine: {
                    lineStyle: {
                        color: '#fff',
                    },
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    textStyle: {
                        color: '#999',
                    },
                    // 默认x轴字体大小）
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
                name: '人次',
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#fff',
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
    let myChart = echarts.init(document.getElementById('ylyChart2'));
    myChart.clear();
    myChart.setOption(option);
};
</script>

<style lang="less" scoped>
.chart {
    width: 100%;
    height: 200px;
}
</style>
