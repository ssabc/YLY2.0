<template>
    <div id="ylyChart1" class="chart"></div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { computed, watchEffect, nextTick } from 'vue';
import * as echarts from 'echarts';
import { groupBy } from '@/utils/tools';

interface Props {
    ylyFlag?: any;
    pData?: any;
}

const $store = useStore(),
    $props = defineProps<Props>(),
    isAdmin = computed(() => $store.getters['common/isAdmin']),
    seriesList = computed(() => $store.getters['config/serviceSeries']);

watchEffect(() => {
    initFn($props.pData);
});

function initFn(list: any) {
    let res = groupBy(list, 'Date');
    nextTick(() => {
        renderChart1(res);
    });
}
const renderChart1 = (_d: any) => {
    const xData = _d?.map((_e: any) => _e?.[0]?.Date),
        _fn = (_d: any, type: string) => {
            return _d?.map(
                (_e: any) =>
                    _e?.filter((_s: any) => _s?.ServiceType === type)?.[0]
                        ?.TotalFileDuration
            );
        },
        // 服务提供
        yData1 = _fn(_d, '服务提供'),
        // 服务保障
        yData2 = _fn(_d, '服务保障'),
        // 服务安全
        yData3 = _fn(_d, '服务安全'),
        borderData = [],
        seriesData = [],
        legend = seriesList.value?.map((_e: any) => _e.name),
        colorArr = seriesList.value?.map((_e: any) => _e.color);
    var normalColor = '#DEEBFF';
    var borderHeight = 4;
    xData.forEach(() => {
        borderData.push(borderHeight);
    });
    legend.forEach((name: string, index: number) => {
        const obj1 = {
            name,
            type: 'bar',
            stack: name,
            data: _fn(_d, name),
            barWidth: '20%',
            itemStyle: {
                normal: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: colorArr[index],
                            },
                            {
                                offset: 0.2,
                                color: colorArr[index],
                            },
                            {
                                offset: 1,
                                color: colorArr[index],
                            },
                        ],
                        globalCoord: false,
                    },
                },
            },
        };
        seriesData.push(obj1);
    });
    const option = {
        grid: {
            left: '3%',
            top: '12%',
            right: '10%',
            bottom: '5%',
            containLabel: true,
        },
        legend: {
            show: true,
            itemWidth: 16,
            itemHeight: 9,
            right: '2%',
            top: 0,
            textStyle: {
                color: '#fff',
            },
            data: legend,
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(18, 57, 60, .8)', //设置背景颜色
            textStyle: {
                color: '#fff',
            },
            borderColor: 'rgba(18, 57, 60, .8)',
            axisPointer: {
                type: 'shadow',
                shadowStyle: {
                    color: 'rgba(0, 11, 34, .4)',
                },
            },
        },
        xAxis: [
            {
                name: '日期',
                type: 'category',
                data: xData,
                axisPointer: {
                    type: 'shadow',
                },
                axisLabel: {
                    interval: 0,
                    align: 'center',
                    textStyle: {
                        color: normalColor,
                        fontSize: 12,
                    },
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff',
                    },
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
            },
        ],
        yAxis: [
            {
                name: '时长（分钟）',
                type: 'value',
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: normalColor,
                        fontSize: 12,
                    },
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff',
                    },
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
            },
        ],
        series: seriesData,
    };
    // 绘制图表
    let myChart = echarts.init(document.getElementById('ylyChart1'));
    myChart.clear();
    myChart.setOption(option);
};
</script>

<style lang="less" scoped>
.chart {
    width: 100%;
    min-height: 200px;
    flex: 1;
    background-color: linear-gradient(
        180deg,
        rgba(0, 223, 214, 1) 0%,
        rgba(0, 223, 214, 1) 0%,
        rgba(29, 125, 215, 1) 100%,
        rgba(29, 125, 215, 1) 100%
    );
}
</style>
//
