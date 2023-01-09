<template>
    <div id="ylyChart1" class="chart"></div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { computed, watchEffect, nextTick } from 'vue';
import * as echarts from 'echarts';

interface Props {
    ylyFlag: any;
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
        renderChart1();
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
const renderChart1 = () => {
    var xData = [
            '0801',
            '0801',
            '0801',
            '0801',
            '0801',
            '0801',
            '0801',
            '0801',
        ],
        yData1 = [400, 410, 350, 320, 280, 340, 360, 400, 420, 410, 420, 380],
        yData2 = [350, 320, 260, 240, 220, 280, 300, 360, 340, 340, 340, 290],
        yData3 = [200, 260, 200, 190, 180, 220, 260, 300, 280, 300, 280, 200],
        borderData = [],
        seriesData = [],
        legend = ['服务提供', '服务保障', '服务安全'],
        colorArr = [
            {
                start: 'rgba(0, 223, 214,',
                end: 'rgba(17, 107, 243, 0.6)',
            },
            {
                start: 'rgba(34, 120, 217,',
                end: 'rgba(83, 60, 236, 0.6)',
            },
            {
                start: 'rgba(27, 208, 207,',
                end: 'rgba(9, 238, 105, 0.8)',
            },
            {
                color: '#EC6941',
            },
        ];
    var normalColor = '#DEEBFF';
    var borderHeight = 4;
    xData.forEach(() => {
        borderData.push(borderHeight);
    });
    [yData1, yData2, yData3].forEach((item, index) => {
        const obj1 = {
                name: legend[index],
                type: 'bar',
                stack: legend[index],
                data: item,
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
                                    color: colorArr[index].start + '1)',
                                },
                                {
                                    offset: 0.2,
                                    color: colorArr[index].start + '1)',
                                },
                                {
                                    offset: 1,
                                    color: colorArr[index].end,
                                },
                            ],
                            globalCoord: false,
                        },
                    },
                },
            },
            obj2 = {
                name: '',
                type: 'bar',
                stack: legend[index],
                itemStyle: {
                    barBorderRadius: '2px',
                    normal: {
                        color: colorArr[index].start + '1)',
                    },
                },
                data: [],
            };
        seriesData.push(obj1);
        seriesData.push(obj2);
    });
    const option = {
        grid: {
            left: '3%',
            top: '20%',
            right: '3%',
            bottom: '2%',
            containLabel: true,
        },
        legend: {
            show: true,
            itemWidth: 16,
            itemHeight: 9,
            right: '15%',
            top: '2%',
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
            // formatter: function (params: any) {
            //     console.log('params', params);
            //     var str = '';
            //     for (var i = 0; i < params.length; i++) {
            //         if (params[i].seriesName !== '') {
            //             str +=
            //                 params[i].name +
            //                 ':' +
            //                 params[i].seriesName +
            //                 '-' +
            //                 params[i].value +
            //                 '<br/>';
            //         }
            //     }
            //     return str;
            // },
        },
        xAxis: [
            {
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
    myChart.setOption(option);
};
</script>

<style lang="less" scoped>
.chart {
    width: 100%;
    height: 200px;
    background-color: linear-gradient(
        180deg,
        rgba(0, 223, 214, 1) 0%,
        rgba(0, 223, 214, 1) 0%,
        rgba(29, 125, 215, 1) 100%,
        rgba(29, 125, 215, 1) 100%
    );
}
</style>
