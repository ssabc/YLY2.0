<template>
    <div class="cells">
        <div
            v-for="(item, idx) in data.statisList"
            :key="item.name"
            class="cell"
        >
            <div
                class="lf icon-wrap"
                :style="{ 'background-color': item.color }"
            >
                <component :is="item.icon"></component>
            </div>
            <div class="ct">
                <div class="label">{{ item.name }}</div>
                <div class="value">
                    <span class="main" :style="{ color: item.color }">{{
                        item.value
                    }}</span>
                    <div class="unit">{{ item.unit }}</div>
                </div>
                <div class="bt" @click="handleView(idx)">查看 〉〉</div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column cm-box mr-15" style="width: 400px">
            <div>服务记录仪分布情况</div>
            <Chart2 :p-data="data.chart2Data"></Chart2>
        </div>
        <div class="column cm-box" style="flex: 1">
            <div class="hgb-head-wrap">
                <span>设备在线次数统计</span>
                <div class="rg">
                    <span
                        key="sevenday"
                        :class="data.chart3Tab === 'sevenday' ? 'active' : ''"
                        @click="changeTab('sevenday')"
                        >近7天</span
                    >
                    <span
                        key="year"
                        :class="data.chart3Tab === 'year' ? 'active' : ''"
                        @click="changeTab('year')"
                        >年度</span
                    >
                </div>
            </div>
            <Chart3 :p-data="data.chart3Data"></Chart3>
        </div>
    </div>
    <div class="row">
        <div class="column c1 cm-box">
            <div>设备流量统计（单位：T）</div>
            <Chart1 :p-data="data.chart1Data"></Chart1>
        </div>
    </div>
</template>

<script lang="ts" setup name="DevicesStatusIndex">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { reactive, onMounted } from 'vue';
import type { FormListProps } from 'GlobComponentsModule';
import { DiffOutlined } from '@ant-design/icons-vue';
import Chart1 from './compoments/chart1.vue';
import Chart2 from './compoments/chart2.vue';
import Chart3 from './compoments/chart3.vue';
import { fetchDeviceStatus } from '@/api/app';
import commonMixin from '@/mixins';
import { groupBy } from '@/utils/tools';

interface Data {
    formData: {
        inputName?: string;
    };
    list: FormListProps[];
    statisList: any[];
    info: any;
    chart1Data?: any;
    chart2Data?: any;
    chart3Data?: any;
    chart3Tab?: string;
}

const $store = useStore(),
    $router = useRouter(),
    data = reactive<Data>({
        /** 表单list */
        list: [
            {
                type: 'select',
                name: 'status',
                label: '',
                width: 160,
                props: {
                    placeholder: '请选择记录类型',
                    allowClear: true,
                },
                option: $store.getters['config/recordTypes'],
            },
            {
                type: 'range-picker',
                name: 'date',
                label: '记录时间',
                props: {
                    valueFormat: 'YYYY-MM-DD',
                },
            },
            {
                type: 'handle',
                name: 'handle',
                label: '',
                option: [
                    {
                        label: '查询',
                        value: 'submit',
                        props: {
                            type: 'primary',
                        },
                    },
                    {
                        label: '重置',
                        value: 'resetFields',
                    },
                ],
            },
        ],
        /** 表单数据 */
        formData: {},
        statisList: [],
        info: {},
        chart1Data: {},
        chart2Data: {},
        chart3Data: {},
        chart3Tab: 'sevenday',
    });

onMounted(() => {
    getInfoAjax();
});
commonMixin(getInfoAjax);
function handleView(idx: number) {
    console.log('idx=', idx);
    $router.push(`/devices-status/usage-record`);
}

function getInfoAjax() {
    const req = data.formData;
    fetchDeviceStatus(req).then((res: any) => {
        const {
            DeviceOverview,
            NetworkFlowStat,
            DeviceDistribution,
            OnlineCountStatWeek,
            OnlineCountStatYear,
        } = res?.data || {};
        data.info = res.data;

        data.statisList = [
            {
                name: '设备总数',
                value: DeviceOverview?.DeviceTotalCount,
                color: '#1d66d6',
                icon: DiffOutlined,
                unit: '',
            },
            {
                name: '服务记录仪',
                value: DeviceOverview?.RecorderCount,
                color: '#28d094',
                icon: DiffOutlined,
                unit: '',
            },
            {
                name: '采集柜',
                value: DeviceOverview?.StationCount,
                color: '#FDDB78',
                icon: DiffOutlined,
                unit: '',
            },
            {
                name: '数字哨兵',
                value: DeviceOverview?.SentryCount,
                color: '#FA746B',
                icon: DiffOutlined,
                unit: '',
            },
        ];

        data.chart1Data = {
            list: groupBy(NetworkFlowStat, 'GroupName'),
        };
        data.chart2Data = {
            list: DeviceDistribution ?? [],
        };
        data.chart3Data = {
            type: data.chart3Tab,
            list:
                data.chart3Tab === 'sevenday'
                    ? OnlineCountStatWeek
                    : OnlineCountStatYear, // groupBy(OnlineCountStat, 'GroupName'),
        };
    });
}

function changeTab(key: string) {
    data.chart3Tab = key;
    getInfoAjax();
}
</script>
<style lang="less" scoped>
.cells {
    display: flex;
    padding: 10px 0;
    .cell {
        flex: 1;
        background-color: #fff;
        border-radius: 4px;
        margin-right: 10px;
        display: flex;
        align-items: center;
        padding: 10px;
        &:last-child {
            margin-right: 0;
        }
        .icon-wrap {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            font-size: 22px;
            margin-right: 10px;
        }
        .ct {
            padding-top: 5px;
            color: #999;
            font-size: 12px;
            flex: 1;
            .value {
                padding: 10px 0;
                display: flex;
                align-items: flex-end;
                .main {
                    font-size: 22px;
                    font-weight: bold;
                    margin-right: 10px;
                }
            }
            .bt {
                color: #02a7f0;
                cursor: pointer;
                text-align: right;
            }
        }
    }
}
.mr-15 {
    margin-right: 15px;
}
.row {
    display: flex;
    .column {
        &.c1 {
            flex: 1;
        }
        &.c2 {
            width: 300px;
            height: 100%;
            .time-desc {
                padding: 20px 0;
            }
            .time-cells {
                .time-cell {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-top: 1px solid #efefef;
                    padding: 20px 0;
                    .value {
                        font-size: 18px;
                    }
                    .label {
                        color: #999;
                    }
                    .icon {
                        width: 6px;
                        height: 6px;
                        background-color: red;
                        border-radius: 50%;
                    }
                }
            }
        }
    }
}
.hgb-head-wrap {
    display: flex;
    justify-content: space-between;
    .rg {
        display: flex;
        align-items: center;
        span {
            color: #666;

            &:first-child {
                margin-right: 10px;
            }
            &.active {
                color: #02a7f0;
                cursor: pointer;
            }
        }
    }
}
</style>
