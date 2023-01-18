<template>
    <div>
        <div>{{ chartTitle }}</div>
        <div id="recordTimeChart" class="chart"></div>
    </div>
</template>

<script setup lang="ts">
import { watchEffect, nextTick, computed } from 'vue';
import * as echarts from 'echarts';

interface Props {
    ylyFlag?: any;
    pData?: any;
}
const $props = defineProps<Props>(),
    chartTitle = computed(() => $props.pData.name || '记录统计');

watchEffect(() => {
    console.log('($props.pData =', $props.pData);
    nextTick(() => {
        renderChart1($props.pData?.list);
    });
});

const renderChart1 = (list: any) => {
    const _newList = list || [],
        xAxisData = _newList?.map((_e: any) => _e?.Date),
        seriesData = _newList?.map((_e: any) => _e?.TotalFileDuration);
    const option = {
        legend: {
            icon: 'circle',
            top: '5%',
            left: '10%',
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
                name: '日期', nameLocation: 'start', nameGap: 20,
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
                    //
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
            },
        ],
        yAxis: [
            {
                name: '次数（次）',
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
        series: {
            name: '',
            type: 'bar',
            barWidth: '20px',
            data: seriesData,
        },
    };
    // 绘制图表
    let myChart = echarts.init(document.getElementById('recordTimeChart'));
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
