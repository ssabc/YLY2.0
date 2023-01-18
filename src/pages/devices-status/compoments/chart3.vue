<template>
    <div id="deviceStatusChart3" class="chart"></div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { computed, watch, nextTick } from 'vue';
import * as echarts from 'echarts';

interface PData {
    list?: Array<any>;
}
interface Props {
    pData?: PData;
}
const $store = useStore(),
    $props = defineProps<Props>(),
    colors = computed(() => $store.getters['config/colors']);

watch(
    () => $props.pData,
    (e: any) => {
        initFn(e);
    },
    {
        immediate: true,
    }
);

function initFn(e: PData) {
    nextTick(() => {
        renderChart1(e?.list, colors.value);
    });
}
const renderChart1 = (data: any, _colors: Array<string>) => {
    const colorList = _colors,
        seriesData: any[] = [],
        xAxisData: string[] = data?.[0]?.map((_e: any) => `${_e.Month}月`);
    data?.forEach((_e: any, index: number) => {
        const name = _e?.[0]?.GroupName || '',
            data = _e?.map((_s: any) => _s.TotalFileSize),
            _t = {
                name,
                type: 'line',
                data,
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
                        color: colorList[index],
                        borderColor: colorList[index],
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
            };
        seriesData.push(_t);
    });
    const option = {
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
        series: seriesData,
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
