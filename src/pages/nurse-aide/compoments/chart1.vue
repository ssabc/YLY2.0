<!--
 * @Author: szhao
 * @Date: 2023-01-11 09:33:11
 * @LastEditTime: 2023-01-18 20:38:39
 * @LastEditors: sZhao
 * @Description:
-->
<template>
    <div>
        <div id="servicechart1" class="chart"></div>
        <div class="cells">
            <div
                v-for="(item, index) in data.list"
                :key="item.GroupName"
                class="cell"
            >
                <div
                    class="circle"
                    :style="{ 'background-color': colors[index] }"
                ></div>
                <div class="label">{{ item.GroupName }}:</div>
                <div class="value">{{ item.Count }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { watch, nextTick, reactive, computed } from 'vue';
import * as echarts from 'echarts';

interface Props {
    pData?: any;
}
const $store = useStore(),
    $props = defineProps<Props>(),
    colors = computed(() => $store.getters['config/colors']),
    data = reactive({
        list: [],
    });

watch(
    () => $props.pData,
    (e: any) => {
        data.list = e?.list;
        initFn(e);
    },
    {
        immediate: true,
    }
);

function initFn(_d: any) {
    nextTick(() => {
        renderChart('servicechart1', _d?.list, colors.value);
    });
}

const renderChart = (key: string, _d: any, _colors: Array<string>) => {
    const color = _colors,
        datas =
            _d?.map((_e: any) => ({
                name: _e.GroupName,
                value: _e.Count,
            })) || [];
    console.log('datas', datas);
    let sum = 0;
    for (var i of datas) {
        sum += +i.value;
    }
    const title = {
        value: sum,
        unit: '呼叫次数',
    };
    const rich = {
        value: {
            color: '#000',
            fontSize: 24,
            align: 'center',
            padding: [15, 0, 0, 0],
        },
        titleUnit: {
            fontSize: 14,
            color: '#999',
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
                radius: ['50%', '80%'],
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
                        `{titleUnit|${title.unit}}\n{value|${title.value}}`,
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
.chart {
    width: 100%;
    height: 260px;
}
.cells {
    .cell {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 160px;
        .circle {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #000;
        }
        .label {
            margin: 0 4px;
        }
    }
}
</style>
