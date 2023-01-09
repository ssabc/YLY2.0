<template>
    <div class="pie-cells">
        <div v-for="item in pieList" :key="item.name" class="pie-cell">
            <span
                class="square"
                :style="{ 'background-color': item.color }"
            ></span>
            <span>{{ item.name }}</span>
        </div>
    </div>
    <div class="charts">
        <div v-for="item in chartList" :key="item.key" class="chart-wrap">
            <div :id="item.key" class="chart"></div>
            <div>{{ item.name }}</div>
        </div>
    </div>
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
    isAdmin = computed(() => $store.getters['common/isAdmin']),
    pieList = computed(() => {
        return [
            {
                name: '服务提供',
                color: '#199ED8',
                value: 100,
            },
            {
                name: '服务安全',
                color: '#CCCCCC',
                value: 300,
            },
            {
                name: '服务保障',
                color: '#00FF00',
                value: 600,
            },
        ];
    }),
    chartList = computed(() => {
        return [
            {
                name: '养老院1',
                key: 'homeChart4_1',
                data: [],
            },
            {
                name: '养老院1',
                key: 'homeChart4_2',
                data: [],
            },
            {
                name: '养老院1',
                key: 'homeChart4_3',
                data: [],
            },
        ];
    });

watchEffect(() => {
    initFn();
});

function initFn() {
    nextTick(() => {
        renderChart();
    });
}

const renderChart = () => {
    const color = ['#199ED8', '#CCCCCC', '#00FF00'];
    const datas = pieList.value;
    let sum = 0;
    for (var i of datas) {
        sum += i.value;
    }
    const title = {
        value: sum,
        unit: '分钟',
    };
    const rich = {
        value: {
            color: '#fff',
            fontSize: 16,
            align: 'left',
        },
        titleUnit: {
            color: '#fff',
            fontSize: 14,
            padding: [15, 0, 0, 0],
        },
    };
    let option = {
        color,
        tooltip: {
            trigger: 'item',
            formatter: '{b} <br/> {c} ({d}%)',
        },
        series: [
            {
                type: 'pie',
                center: ['50%', '50%'],
                radius: ['50%', '70%'],
                data: datas,
                startAngle: 180,
                label: {
                    show: false,
                },
            },
            {
                type: 'pie',
                center: ['50%', '50%'],
                radius: ['50%', '70%'],
                data: datas,
                startAngle: 180,
                label: {
                    show: true,
                    position: 'center',
                    formatter: () =>
                        `{value|${title.value}}\n{titleUnit|${title.unit}}`,
                    rich,
                },
            },
        ],
    };
    // 绘制图表
    let myChart = echarts.init(document.getElementById('homeChart4_1'));
    myChart.setOption(option);

    // 绘制图表
    let myChart2 = echarts.init(document.getElementById('homeChart4_2'));
    myChart2.setOption(option);

    // 绘制图表
    let myChart3 = echarts.init(document.getElementById('homeChart4_3'));
    myChart3.setOption(option);
};
</script>

<style lang="less" scoped>
.pie-cells {
    display: flex;
    justify-content: flex-end;
    color: #fff;
    .pie-cell {
        display: flex;
        align-items: center;
        margin-left: 14px;
    }
    .square {
        border-radius: 4px;
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 4px;
    }
}

.charts {
    display: flex;
    .chart-wrap {
        flex: 1;
        position: relative;
        &::after {
            position: absolute;
            background-color: aqua;
            content: '';
            top: 10%;
            right: 0;
            width: 2px;
            height: 80%;
        }
        &:last-child {
            &::after {
                content: none;
            }
        }
        text-align: center;
        color: #b9eef8;
    }
    .chart {
        width: 160px;
        height: 160px;
    }
}
</style>
