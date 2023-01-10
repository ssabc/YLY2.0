<template>
    <div class="wrap">
        <div class="cells flex">
            <div class="cell">
                <span class="label">总呼叫数：</span>
                <span class="value">80</span>
                <span class="unit">次</span>
            </div>
            <div class="cell">
                <span class="label">记录时长：</span>
                <span class="value">80</span>
                <span class="unit">分钟</span>
            </div>
            <div class="cell">
                <span class="label">已处置数：</span>
                <span class="value red">60</span>
                <span class="unit">件</span>
            </div>
        </div>
        <!-- <vue3-seamless-scroll
            :list="listData"
            :class-option="optionSingleHeight"
        > -->
        <div v-for="(item, index) in listData" :key="index" class="row flex">
            <div class="tip" :class="item.status == 1 ? 'red' : ''">
                {{ item.status == 1 ? '未处置' : '已处置' }}
            </div>
            <div class="content flex">
                <span>养老院{{ index + 1 }}</span>
                <span class="date">{{ item.date }}</span>
                <span>设备编号：01098654</span>
            </div>
        </div>
        <!-- </vue3-seamless-scroll> -->
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { computed, watchEffect, nextTick } from 'vue';
import * as echarts from 'echarts';
// import vue3SeamlessScroll from 'vue3-seamless-scroll/src';

interface Props {
    ylyFlag: any;
}
const $store = useStore(),
    $props = defineProps<Props>(),
    isAdmin = computed(() => $store.getters['common/isAdmin']),
    listData = computed(() => [
        {
            status: 1,
            title: '无缝滚动第一行无缝滚动第一行',
            date: '2017-12-16',
        },
        {
            status: 0,
            title: '无缝滚动第二行无缝滚动第二行',
            date: '2017-12-16',
        },
        // {
        //     status: 1,
        //     title: '无缝滚动第三行无缝滚动第三行',
        //     date: '2017-12-16',
        // },
        // {
        //     status: 0,
        //     title: '无缝滚动第四行无缝滚动第四行',
        //     date: '2017-12-16',
        // },
    ]),
    optionSingleHeight = computed(() => {
        return {
            step: 0.2, // 数值越大速度滚动越快
            // limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
            // hoverStop: true, // 是否开启鼠标悬停stop
            // direction: 1, // 0向下 1向上 2向左 3向右
            // openWatch: true, // 开启数据实时监控刷新dom
            singleHeight: 26, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
            // singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
            // waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
        };
    });

watchEffect(() => {
    initFn();
});

function initFn() {
    const { data1 } = getData(isAdmin.value, $props.ylyFlag);
    nextTick(() => {
        // renderChart1(data1);
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
.wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.cells {
    color: #fff;
    font-size: 12px;
    margin-bottom: 10px;
    .cell {
        flex: 1;
        padding: 2px 4px;
        display: flex;
        justify-content: space-between;
        margin-right: 20px;
        border-radius: 4px;
        background-color: rgba(197, 233, 246, 0.5764705882352941);
        &:last-child {
            margin-right: 0;
        }
        .value {
            color: #015478;
            font-size: 28px;
            font-weight: bold;
            &.red {
                color: #e61707;
            }
        }
        .unit {
            display: flex;
            align-items: flex-end;
        }
    }
}
.row {
    color: #fff;
    background-color: rgba(127, 123, 155, 0.6);
    border-radius: 4px;
    height: 50px;
    align-items: center;
    margin-bottom: 10px;
    font-size: 12px;
    &:last-child {
        margin-bottom: 0;
    }
    .tip {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 100%;
        background-color: #015478;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        &.red {
            background-color: #e61707;
        }
    }
    .date {
        // flex: 1;
    }
    .content {
        width: 100%;
        justify-content: space-around;
        padding: 0 10px;
        align-items: center;
    }
}
</style>
