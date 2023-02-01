<template>
    <div class="cm-box">
        <GmForm
            v-model:data="data.formData"
            :list="data.list"
            layout="inline"
            @on-handle="handleFormClick"
        >
        </GmForm>
        <br />
        <recordTimeChart :p-data="data.chartData"></recordTimeChart>
    </div>
    <div class="cm-box">
        <div class="flex justify-between">
            <div class="table-title">呼叫记录</div>
            <a-button type="primary" @click="handleOneClick">
                一键处置
            </a-button>
        </div>
        <GmTable
            v-model:data="data.tableData"
            v-model:sendRequest="sendRequest"
            v-model:selectedRowKeys="data.selectedRowKeys"
            :row-key="'LogId'"
            :is-selection="true"
            :headers="data.columns"
            :request-api="fetchNursingRecordList"
            :send-data="dealReqData(data.formData)"
            @on-handle="handleClick"
        />
    </div>
</template>

<script setup lang="ts" name="callRecord">
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { ref, reactive, toRaw, createVNode, watch, computed } from 'vue';
import type {
    ColumnProps,
    FormListProps,
    TableHandleOptItem,
} from 'GlobComponentsModule';
import { deleteFile } from '@/api/app';
import {
    fetchNursingRecordList,
    fetchNursingRecordStat,
    nursingHandle,
} from '@/api/nurse';
import {
    getNowDate,
    dealReqData,
    getReqData,
    GetNumberOfDays,
    showFileDurationText,
    handleDownload,
} from '@/utils/tools';
import { message as $message } from 'ant-design-vue';
import recordTimeChart from '@/pages/service-records/compoments/record-time-chart.vue';
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import commonMixin from '@/mixins';

interface Data {
    formData: {
        serviceType?: string;
        date?: any[];
    };
    list: FormListProps[];
    tableData: Item[];
    columns: ColumnProps[];
    chartData?: any;
    selectedRowKeys?: any[];
}
interface Item {
    deviceId: string;
    sn: string;
    groupId: string;
    upgradeStatus: string;
}
let sendRequest = ref(false);

const $store = useStore(),
    $router = useRouter(),
    $route = useRoute(),
    isAdmin = computed(() => $store.getters['common/isAdmin']),
    data = reactive<Data>({
        /** 表单list */
        list: [
            {
                type: 'select',
                name: 'isHandled',
                label: '',
                width: 160,
                props: {
                    placeholder: '请选择处置状态',
                    allowClear: true,
                },
                option: $store.getters['config/dealTypes'],
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
                title: '呼叫时间',
                dataIndex: 'DealTime',
                minWidth: 120,
                customRender: ({ text }) => {
                    return getNowDate(text)?.time;
                },
            },
            {
                title: '记录时长',
                dataIndex: 'FileDuration',
                customRender: ({ text }) => {
                    return showFileDurationText(text);
                },
            },
            {
                title: '处置状态',
                dataIndex: 'IsHandled',
                customRender: ({ text }) => {
                    return text ? '已处置' : '未处置';
                },
            },
            {
                title: '记录时间',
                dataIndex: 'CreateTime',
                minWidth: 120,
                customRender: ({ text }) => {
                    return getNowDate(text)?.time;
                },
            },
            {
                title: '上传时间',
                dataIndex: 'UploadTime',
                minWidth: 120,
                customRender: ({ text }) => {
                    return getNowDate(text)?.time;
                },
            },
            {
                title: '操作',
                type: 'handle',
                minWidth: 240,
                optionFn: ({ record }) => [
                    {
                        name: '点击查看',
                        type: 'view',
                        disabled: !record.FileHref,
                    },
                    {
                        name: '下载',
                        type: 'download',
                        disabled: !record.FileHref,
                    },
                    {
                        name: '删除',
                        hidden: !isAdmin.value,
                        type: 'delete',
                    },
                ],
            },
        ],
        chartData: {},
        selectedRowKeys: [],
    });

watch(
    () => $route.query.type,
    (e) => {
        initFn(e);
    },
    {
        immediate: true,
    }
);
commonMixin(refreshList);
function initFn(_type: any) {
    data.formData.serviceType = _type;
    refreshList();
}

function refreshList() {
    if (
        data.formData.date?.[0] &&
        data.formData.date?.[1] &&
        GetNumberOfDays(data.formData.date[0], data.formData.date[1]) > 7
    ) {
        $message.error('日期区间不能超过7天');
        return;
    }
    getInfoAjax();
    sendRequest.value = true;
}

function getInfoAjax() {
    if (
        data.formData.date?.[0] &&
        data.formData.date?.[1] &&
        GetNumberOfDays(data.formData.date[0], data.formData.date[1]) > 7
    ) {
        // $message.error('日期区间不能超过7天');
        return;
    }
    const req = getReqData(data.formData);
    fetchNursingRecordStat(req).then((res: any) => {
        data.chartData = {
            list: res.data || [],
        };
    });
}

function handleFormClick(e: any) {
    const { label } = e;
    switch (label) {
        case '查询':
            refreshList();
            break;
        default:
    }
}
/**
 * @description: 一键处置
 */
function handleOneClick() {
    if (data.selectedRowKeys?.length === 0) {
        $message.warning('请选择要处置的呼叫记录！');
        return;
    }
    nursingHandle({
        logId: data.selectedRowKeys?.join(','),
    }).then(() => {
        $message.success('一键处置成功.');
        refreshList();
    });
}

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
            handleDownload(rowData.GroupName, rowData.FileHref);
            break;
        case '删除':
            handleDelete(rowData?.FileId);
            break;
        default:
    }
}
function handleToDetail(row: any) {
    console.log(row, '---');
    $router.push(`/nurse-aide/video-detail?id=${row.FileId}`);
}

function handleDelete(fileId: string | number) {
    Modal.confirm({
        content: '确定删除吗？',
        icon: createVNode(ExclamationCircleOutlined),
        onOk() {
            deleteFile({ fileId }).then(() => refreshList());
        },
    });
}
</script>
