<template>
    <div class="chart1">
        <div class="cells-wrap">
            <div class="title">最近7日访客累计</div>
            <div class="cells">
                <div v-for="item in data.ylyList" :key="item.name" class="cell">
                    <span>{{ item.name }}</span>
                    <span style="font-size: 30px">{{ item.value }}</span>
                </div>
            </div>
        </div>
    </div>
    <div id="ylyChart33" class="chart1"></div>
    <div id="ylyChart22" class="chart2"></div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { computed, watchEffect, nextTick, reactive } from 'vue';
import * as echarts from 'echarts';

interface Props {
    ylyFlag?: any;
}
const data = reactive<any>({
        ylyList: [],
    }),
    $store = useStore(),
    $props = defineProps<Props>(),
    isAdmin = computed(() => $store.getters['common/isAdmin']);

watchEffect(() => {
    console.log('111111111', $props.ylyFlag);
    initFn();
});

function initFn() {
    console.log($props, '$props.ylyFlag', $props.ylyFlag);
    const { data0, data1, data2 } = getData(isAdmin.value, $props.ylyFlag);
    nextTick(() => {
        data.ylyList = data0;
        renderChart1(data1);
        renderChart4(data2);
    });
}

function getData(isAdmin: boolean, deptId: number) {
    console.log('isAdmin, deptId', isAdmin, deptId);
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
    let myChart = echarts.init(document.getElementById('ylyChart33'));
    myChart.clear();myChart.setOption(option);
};
const renderChart4 = (data: any) => {
    const option = {
        title: {
            text: '本月探访时间段统计',
            left: 'center',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999',
                },
            },
        },
        xAxis: [
            {
                type: 'category',
                data: [
                    '06：00-08：00',
                    '08：00-10：00',
                    '10：00-12：00',
                    '12：00-14：00',
                    '14：00-16：00',
                    '16：00-18：00',
                    '18：00-20：00',
                ],
                axisPointer: {
                    type: 'shadow',
                },
            },
        ],
        yAxis: [
            {
                type: 'value',
                min: 0,
                max: 3,
                axisLabel: {
                    formatter: '{value}',
                },
            },
        ],
        series: [
            {
                name: '访客人次',
                type: 'bar',
                tooltip: {
                    valueFormatter: function (value) {
                        return value;
                    },
                },
                data: data?.map((_e) => _e.value),
            },
        ],
    };
    let myChart = echarts.init(document.getElementById('ylyChart22'));
    // 绘制图表
    myChart.clear();myChart.setOption(option);
};
</script>

<style lang="less" scoped>
.cells-wrap {
    background-color: #82a8bd;
    color: #fff;
    text-align: center;
    .title {
        height: 40px;
        text-align: center;
        font-size: 20px;
    }
    .cells {
        display: flex;
        .cell {
            height: 100px;
            box-sizing: border-box;
            border: 1px solid #efefef;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
        }
    }
}
.chart1 {
    width: 300px;
    height: 200px;
    margin-top: 20px;
}
.chart2 {
    width: 300px;
    height: 300px;
    margin-top: 20px;
}
</style>
