<template>
    <div class="wrap">
        <div id="ylyChart6" class="chart"></div>
        <div class="rg">
            <div class="cell out">
                <span class="label">设备分类</span>
                <span class="value">设备在线率</span>
            </div>
            <div class="cells">
                <div class="cell">
                    <span class="label">值班长</span>
                    <span class="value"
                        >{{
                            (info.ForemanOnlineRate * 100 + '')?.split(
                                '.'
                            )?.[0] || 0
                        }}%</span
                    >
                </div>
                <div class="cell">
                    <span class="label">服务提供</span>
                    <span class="value"
                        >{{
                            (info.ProvisionOnlineRate * 100 + '')?.split(
                                '.'
                            )?.[0] || 0
                        }}%</span
                    >
                </div>
                <div class="cell">
                    <span class="label">服务保障</span>
                    <span class="value"
                        >{{
                            (info.GuaranteeOnlineRate * 100 + '')?.split(
                                '.'
                            )?.[0] || 0
                        }}%</span
                    >
                </div>
                <div class="cell">
                    <span class="label">服务安全</span>
                    <span class="value"
                        >{{
                            (info.SecurityOnlineRate * 100 + '')?.split(
                                '.'
                            )?.[0] || 0
                        }}%</span
                    >
                </div>
            </div>
            <div class="cells">
                <div class="cell">
                    <span class="label">采集站</span>
                    <span class="value">{{ 0 }}%</span>
                </div>
            </div>
            <div class="cells">
                <div class="cell">
                    <span class="label">测温随申码访客机</span>
                    <span class="value">{{ 0 }}%</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { reactive, watch, nextTick } from 'vue';
import * as echarts from 'echarts';
import 'echarts-liquidfill/src/liquidFill.js';

interface Props {
    pData?: {
        OnlineStatus: any;
        DeviceStatus: any;
    };
}

function _fn(_arr: any[], _name: string) {
    return _arr?.filter((_e: any) => _e.Name === _name)?.[0]?.OnlineRate || 0;
}

const $store = useStore(),
    $props = defineProps<Props>();

let info = reactive<any>({});
// info = computed(() => $props.pData?.DeviceStatus || {});

watch(
    () => $props.pData,
    (e: any) => {
        const _d = {
            toralOnlineRate: _fn(e?.OnlineStatus, '总在线率'),
        };
        info = {
            ForemanOnlineRate: _fn(e?.OnlineStatus, '值班长'),
            ProvisionOnlineRate: _fn(e?.OnlineStatus, '服务提供'),
            GuaranteeOnlineRate: _fn(e?.OnlineStatus, '服务保障'),
            SecurityOnlineRate: _fn(e?.OnlineStatus, '服务安全'),
        };
        initFn(_d);
    },
    {
        immediate: true,
    }
);

function initFn(_d: any) {
    nextTick(() => {
        renderChart1((_d?.toralOnlineRate * 100 + '')?.split('.')?.[0]);
    });
}
const renderChart1 = (_rate: any) => {
    const option = {
        title: {
            show: true,
            text: '记录仪总在线率',
            x: '50%',
            y: '60%',
            z: 10,
            textAlign: 'center',
            textStyle: {
                color: '#ffffff',
                fontSize: 16,
                fontWeight: 500,
            },
        },
        series: [
            {
                type: 'liquidFill', //水位图
                radius: '90%', //显示比例
                center: ['50%', '50%'], //中心点
                amplitude: 20, //水波振幅
                data: [0.5, 0.5, 0.5], // data个数代表波浪数
                color: ['rgb(21,147,227)', 'rgb(67,182,247)', 'rgb(41,79,153)'], //波浪颜色
                backgroundStyle: {
                    borderWidth: 2, //外边框
                    borderColor: 'rgb(51, 255,255)', //边框颜色
                    color: 'rgba(41, 79,153, 0)', //边框内部填充部分颜色
                },
                label: {
                    //标签设置
                    normal: {
                        position: ['50%', '30%'],
                        formatter: `${_rate}%`, //显示文本,
                        textStyle: {
                            fontSize: '26px', //文本字号,
                            color: '#fff',
                        },
                    },
                },
                outline: {
                    itemStyle: {
                        borderWidth: 1,
                        borderColor: '#1082FF',
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowColor: '#1082FF',
                        shadowBlur: 4,
                    },
                },
            },
        ],
    };

    // 绘制图表
    let myChart = echarts.init(document.getElementById('ylyChart6'));
    myChart.clear();
    myChart.setOption(option);
};
</script>

<style lang="less" scoped>
.wrap {
    display: flex;
    justify-content: space-around;
    .rg {
        flex: 1;
        max-width: 600px;
    }
}
.chart {
    width: 260px;
    height: 260px;
}
.cell {
    display: flex;
    padding: 10px 10px;
    font-size: 12px;
    .label {
        display: block;
        width: 100px;
    }
    .value {
        flex: 1;
    }
}
.out {
    color: #ffe400;
}
.cells {
    margin-bottom: 10px;
    font-size: 12px;
    &:last-child {
        margin-bottom: 0;
    }
    .cell {
        background-image: url('@/assets/pictures/bg.svg');
        background-size: 100% 100%;
        padding: 8px 10px;
    }
}
</style>
