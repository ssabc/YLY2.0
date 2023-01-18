<template>
    <a target="_blank" :href="data.url" :src="data.url">警佳平台地图</a>
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
    <div class="row chart">
        <div class="column c1 cm-box" style="margin-right: 10px">
            <div>护工帮使用情况</div>
            <Chart1 :p-data="data.chart1Data"></Chart1>
        </div>
        <div class="column c2 cm-box">
            <div class="hgb-head-wrap">
                <span>护工帮数据统计</span>
                <div class="rg">
                    <span
                        key="sevenday"
                        :class="data.chart2Tab === 'sevenday' ? 'active' : ''"
                        @click="changeTab('sevenday')"
                        >近7天</span
                    >
                    <span
                        key="year"
                        :class="data.chart2Tab === 'year' ? 'active' : ''"
                        @click="changeTab('year')"
                        >年度</span
                    >
                </div>
            </div>
            <Chart2 :p-data="data.chart2Data"></Chart2>
        </div>
    </div>
    <div class="row cm-box">
        <div class="column c-full">
            <div class="table-title">24小时呼叫记录</div>
            <GmTable
                v-model:data="data.tableData"
                :headers="data.columns"
                :send-data="dealReqData(data.formData)"
                @on-handle="handleClick"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref, reactive, computed, toRaw, createVNode, onMounted } from 'vue';
import type {
    ColumnProps,
    FormListProps,
    TableHandleOptItem,
} from 'GlobComponentsModule';
import { DiffOutlined } from '@ant-design/icons-vue';
import Chart1 from './compoments/chart1.vue';
import Chart2 from './compoments/chart2.vue';
import {
    getOpsOptions,
    dealReqData,
    groupBy,
    showFileDurationText,
} from '@/utils/tools';
import { fetchNursingRecord, fetchNursingMap } from '@/api/nurse';
import { message as $message, Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import commonMixin from '@/mixins';

interface Data {
    formData: {
        inputName?: string;
    };
    list: FormListProps[];
    tableData: Item[];
    columns: ColumnProps[];
    statisList: Array<any>;
    url?: string;
    chart1Data?: any;
    chart2Data?: any;
    chart2Tab?: string;
    info?: any;
}
interface Item {
    deviceId: string;
    sn: string;
    groupId: string;
    upgradeStatus: string;
}
let sendRequest = ref(false);

const $store = useStore(),
    isAdmin = computed(() => $store.getters['common/isAdmin']),
    $router = useRouter(),
    typeList = computed(() => $store.getters['config/dealTypes']),
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
        /** 列表数据 */
        tableData: [],
        /** 列表项 */
        columns: [
            {
                title: '设备编号',
                dataIndex: 'DeviceSn',
            },
            {
                title: '养老院名称',
                dataIndex: 'GroupName',
                minWidth: 120,
            },
            {
                title: '处置时间',
                dataIndex: 'DealTime',
            },
            {
                title: '视频时长',
                dataIndex: 'FileDuration',
            },
            {
                title: '视频上传时间',
                dataIndex: 'UploadTime',
                minWidth: 120,
            },
            {
                title: '操作',
                type: 'handle',
                minWidth: 240,
                optionFn: ({ record }) => {
                    return [
                        {
                            name: '立即处置',
                            type: 'deal',
                            disabled: record?.IsHandled,
                        },
                        ...getOpsOptions(isAdmin),
                    ];
                },
            },
        ],
        statisList: [],
        /** 警佳平台地图嵌入url */
        url: '',
        info: {},
        chart2Tab: 'sevenday',
        chart1Data: {},
        chart2Data: {},
    });

onMounted(() => {
    getMapUrl();
    getInfo();
});

commonMixin(() => {
    initFn();
});

function initFn() {
    sendRequest.value = true;
    getMapUrl();
    getInfo();
}

function getInfo() {
    fetchNursingRecord({}).then((_res: any) => {
        console.log(_res.data);
        data.info = _res.data;
        const { Overview, SosGroupCount, SosIn24h } = _res.data || {},
            _values = Overview;

        data.statisList = [
            {
                name: '总呼叫数',
                value: _values?.TotalSosCount,
                color: '#1d66d6',
                icon: DiffOutlined,
                unit: '',
            },
            {
                name: '记录时长',
                value: showFileDurationText(_values?.RecordDuration),
                color: '#28d094',
                icon: DiffOutlined,
                unit: '',
            },
            {
                name: '未处置数',
                aliasName: '未处置',
                value: _values?.UnhandledCount,
                color: '#FDDB78',
                icon: DiffOutlined,
                unit: '',
            },
            {
                name: '已处置数',
                aliasName: '已处置',
                value: _values?.HandledCount,
                color: 'rgb(132, 0, 255)',
                icon: DiffOutlined,
                unit: '',
            },
            {
                name: '24小时呼叫数',
                value: _values?.SosCountIn24h,
                color: '#FA746B',
                icon: DiffOutlined,
                unit: '',
            },
        ];
        data.chart1Data = {
            list: SosGroupCount,
        };
        data.chart2Data = getChart2Data(data.chart2Tab, data.info);
        data.tableData = SosIn24h || [];
    });
}

function getChart2Data(key: string | undefined, _info: any) {
    if (!key) {
        return {};
    }
    const { SosDailyStatWeek, SosDailyStatYear } = _info || {},
        _list = key === 'sevenday' ? SosDailyStatWeek : SosDailyStatYear;
    return {
        list: groupBy(_list, 'GroupName'),
    };
}

function getMapUrl() {
    fetchNursingMap({}).then((_res: any) => {
        data.url = _res.data;
    });
}
/**
 * @description: table 项操作
 */
function handleClick(item: TableHandleOptItem, row: any, index: number) {
    const { name } = item;
    const rowData = toRaw(row);
    switch (name) {
        case '立即处置':
            handleDeal(index);
            break;
        case '点击查看':
            handleToDetail(rowData);
            break;
        case '下载':
            handleDownload(rowData);
            break;
        case '删除':
            handleDelete();
            break;
        default:
    }
}
function handleDeal(index: number) {
    data.tableData[index].IsHandled = !data.tableData[index].IsHandled;
}

function changeTab(key: string) {
    data.chart2Tab = key;
    data.chart2Data = getChart2Data(key, data.info);
}

function handleToDetail(row: any) {
    console.log(row, '---');
    $router.push('/nurse-aide/video-detail');
}

function handleDelete() {
    Modal.confirm({
        content: '确定删除吗？',
        icon: createVNode(ExclamationCircleOutlined),
        onCancel() {
            Modal.destroyAll();
        },
    });
}

// 浏览器下载
function handleDownload(row: any) {
    let fileName = row.FileName;
    let x = new XMLHttpRequest();
    $message.loading('视频下载中，请稍后...', 0);
    x.open('GET', row.Video, true);
    x.responseType = 'blob';
    x.onload = () => {
        console.log('link', row.Video);
        $message.destroy();
        $message.success('下载完成');
        let url = window.URL.createObjectURL(x.response);
        let a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
    };
    x.send();
}
function handleView(idx: number) {
    console.log(statisList.value?.[idx], typeList.value);
    const _t = statisList.value?.[idx];

    if (
        _t?.aliasName &&
        typeList.value?.map((_e: any) => _e.label).includes(_t?.aliasName)
    ) {
        const type = typeList.value?.filter(
            (_e: any) => _e.label === _t?.aliasName
        )?.[0]?.value;
        $router.push(`/nurse-aide/call-record?type=${type}`);
        return;
    }
    $router.push(`/nurse-aide/call-record`);
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
.row {
    display: flex;
    .column {
        &.c-full {
            flex: 1;
        }
    }
    &.chart {
        .c1 {
            width: 400px;
        }
        .c2 {
            flex: 1;
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
            cursor: pointer;

            &:first-child {
                margin-right: 10px;
            }
            &.active {
                color: #02a7f0;
            }
        }
    }
}
</style>
