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
    const option = {
        title: {
            text: '最近7日访客累计',
            left: 'center',
        },
        legend: {
            top: 'bottom',
        },
        grid: {
            containLabel: true,
            left: 20,
            right: 20,
            bottom: 40,
            top: 40,
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0,0,0,0.7)',
            borderColor: 'rgba(0,0,0,0.7)',
            textStyle: {
                color: '#fff',
            },
        },
        xAxis: {
            data: data?.map((_e) => _e.name),
            splitLine: {
                show: true,
                lineStyle: {
                    width: 2,
                },
            },
            axisLabel: {
                show: true,
                margin: 14,
                fontSize: 12,
            },
        },
        yAxis: [
            {
                name: '人次',
                type: 'value',
                splitNumber: 5,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#fff'],
                        opacity: 0.06,
                    },
                },
            },
        ],
        series: [
            {
                name: '访客数量(人次)',
                type: 'line',
                data: data?.map((_e) => _e.value),
                lineStyle: {
                    color: '#7E2DFF',
                },
                itemStyle: {
                    color: '#7E2DFF',
                },
            },
        ],
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
}
</style>
