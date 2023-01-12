<template>
    <div class="cells">
        <div v-for="(item, idx) in statisList" :key="item.name" class="cell">
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
            <Chart1></Chart1>
        </div>
        <div class="column c2 cm-box">
            <div>护工帮数据统计</div>
            <Chart2></Chart2>
        </div>
    </div>
    <div class="row cm-box">
        <div class="column c-full">
            <div class="table-title">24小时呼叫记录</div>
            <GmTable
                v-model:data="data.tableData"
                v-model:sendRequest="sendRequest"
                :headers="data.columns"
                :request-api="fetchSosRecord"
                :send-data="dealReqData(data.formData)"
                @on-handle="handleClick"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref, reactive, computed, toRaw, createVNode } from 'vue';
import type {
    ColumnProps,
    FormListProps,
    TableHandleOptItem,
} from 'GlobComponentsModule';
import { DiffOutlined } from '@ant-design/icons-vue';
import Chart1 from './compoments/chart1.vue';
import Chart2 from './compoments/chart2.vue';
import { getOpsOptions, getNowDate, dealReqData } from '@/utils/tools';
import { fetchSosRecord } from '@/api/app';
import { message as $message } from 'ant-design-vue';
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

interface Data {
    formData: {
        inputName?: string;
    };
    list: FormListProps[];
    tableData: Item[];
    columns: ColumnProps[];
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
    typeList = computed(() => $store.getters['common/dealTypes']),
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
                option: $store.getters['common/recordTypes'] || [],
            },
            {
                type: 'range-picker',
                name: 'date',
                label: '可用时间',
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
                dataIndex: 'Sn',
            },
            {
                title: '养老院名称',
                dataIndex: 'GroupName',
                hidden: !isAdmin.value,
                minWidth: 120,
            },
            {
                title: '处置时间',
                dataIndex: 'DealTime',
            },
            {
                title: '视频时长',
                dataIndex: 'Name',
            },
            {
                title: '视频上传时间',
                dataIndex: 'UploadTime',
                minWidth: 120,
            },
            {
                title: '上传时间',
                dataIndex: 'RepairTime',
                minWidth: 120,
            },
            {
                title: '操作',
                type: 'handle',
                minWidth: 240,
                optionFn: ({ record }) => {
                    console.log(record);
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
    }),
    statisList = computed(() => [
        {
            name: '总呼叫数',
            value: 100,
            color: '#1d66d6',
            icon: DiffOutlined,
            unit: '分钟',
        },
        {
            name: '记录时长',
            value: 100,
            color: '#28d094',
            icon: DiffOutlined,
            unit: '分钟',
        },
        {
            name: '未处置数',
            aliasName: '未处置',
            value: 100,
            color: '#FDDB78',
            icon: DiffOutlined,
            unit: '分钟',
        },
        {
            name: '已处置数',
            aliasName: '已处置',
            value: 100,
            color: '#FDDB78',
            icon: DiffOutlined,
            unit: '分钟',
        },
        {
            name: '24小时呼叫数',
            value: 100,
            color: '#FA746B',
            icon: DiffOutlined,
            unit: '分钟',
        },
    ]);

/**
 * @description: table 项操作
 */
function handleClick(item: TableHandleOptItem, row: any) {
    const { name } = item;
    const rowData = toRaw(row);
    switch (name) {
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

function handleToDetail(row: any) {
    console.log(row, '---');
    $router.push('/service-records/video-detail');
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
</style>
