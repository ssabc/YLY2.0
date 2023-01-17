<template>
    <div id="servicechart1" class="chart"></div>
</template>

<script setup lang="ts">
import { watchEffect, nextTick } from 'vue';
import * as echarts from 'echarts';
import { groupBy } from '@/utils/tools';

interface Props {
    ylyFlag?: any;
    pData?: any;
}
const $props = defineProps<Props>();

watchEffect(() => {
    const { chart1 } = $props.pData;
    nextTick(() => {
        renderChart1(chart1 || {});
    });
});

const renderChart1 = (chartData: any) => {
    const { list, legend } = chartData,
        _newList = groupBy(list, 'Date'),
        xAxisData = _newList?.map((_e: any) => _e?.[0]?.Date),
        seriesData: any[] = [];
    legend?.forEach((_e: any) => {
        const { name, color } = _e,
            obj = {
                name,
                type: 'line',
                data: _newList?.map(
                    (_e: any) =>
                        _e?.filter((_s: any) => _s.ServiceType === name)?.[0]
                            ?.TotalFileDuration || 0
                ),
                symbolSize: 1,
                symbol: 'circle',
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    width: 2,
                    color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
                        {
                            offset: 0,
                            color,
                        },
                        {
                            offset: 1,
                            color,
                        },
                    ]),
                    shadowColor: 'rgba(144, 255, 198, .3)',
                    shadowBlur: 5,
                    shadowOffsetY: 5,
                },
                itemStyle: {
                    normal: {
                        color,
                        borderColor: color,
                    },
                },
            };
        seriesData.push(obj);
    });
    const option = {
        legend: {
            icon: 'circle',
            top: '5%',
            left: '10%',
            itemWidth: 6,
            itemGap: 5,
            textStyle: {
                color: '#000',
                padding: [0, 0, 0, 0],
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
                nameTextStyle: {
                    color: '#999',
                },
                type: 'category',
                data: xAxisData,
                axisLine: {
                    lineStyle: {
                        color: '#f0f2f5',
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
                name: '次数（人次）',
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
                    show: true,
                },
            },
        ],
        series: seriesData,
    };
    // 绘制图表
    let myChart = echarts.init(document.getElementById('servicechart1'));
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
