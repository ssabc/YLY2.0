<template>
    <div class="pie-cells">
        <div v-for="item in seriesList" :key="item.name" class="pie-cell">
            <span
                class="square"
                :style="{ 'background-color': item.color }"
            ></span>
            <span>{{ item.name }}</span>
        </div>
    </div>
    <div class="charts">
        <div v-for="item in data.chartList" :key="item.key" class="chart-wrap">
            <div :id="item.key" class="chart"></div>
            <div>{{ item.name }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { reactive, computed, watchEffect, nextTick } from 'vue';
import * as echarts from 'echarts';
import { groupBy, second2minutes } from '@/utils/tools';

interface Props {
    pData?: any;
}

const $store = useStore(),
    $props = defineProps<Props>(),
    seriesList = computed(() => $store.getters['config/serviceSeries']),
    data = reactive<any>({
        chartList: [],
    });

watchEffect(() => {
    initFn($props.pData || []);
});

function initFn(_list: any) {
    const _res = groupBy(_list, 'GroupName');
    data.chartList = _res?.map((_e: any, index: number) => {
        const name = _e?.[0]?.GroupName,
            key = `homeChart4_${index + 1}`;
        return {
            name,
            key,
            data: _e,
        };
    });
    nextTick(() => {
        const _fn = (_d: any) => {
            const _tmp = JSON.parse(JSON.stringify(seriesList.value));
            _tmp?.forEach((_e: any) => {
                _e.value = second2minutes(
                    _d?.filter((_s: any) => _s.ServiceType === _e.name)?.[0]
                        ?.TotalFileDuration || 0
                );
            });
            return _tmp?.filter((_e: any) => _e.value > 0);
        };
        data.chartList?.map((_e: any) => {
            console.log('333333333333', _fn(_e.data));
            renderChart(_e.key, _fn(_e.data));
        });
    });
}

const renderChart = (key: string, datas: any) => {
    const color = datas?.map((_e: any) => _e.color);
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
    let myChart = echarts.init(document.getElementById(key));
    myChart.clear();
    myChart.setOption(option);
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
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
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
