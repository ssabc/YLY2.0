<template>
    <RouteBreadcrumb
        :current-menu="breadcrumbData"
        :current-route="breadcrumbData"
    />
    <div class="px-4">
        <div class="cm-box">
            <GmForm
                v-model:data="data.formData"
                :list="data.list"
                layout="inline"
                @on-handle="handleFormClick"
            >
            </GmForm>
            <div class="row flex">
                <div class="cm-box flex-1">
                    <recordTimeChart :p-data="data.chartData"></recordTimeChart>
                </div>
                <div class="cm-box c2">
                    <div class="one-btn">
                        <div class="inner">
                            <a target="_blank" :href="gisUrl" class="span">
                                <div>一键开始</div>
                                <div>实时调度</div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="cm-box">
            <div class="table-title">调度记录</div>
            <GmTable
                v-model:data="data.tableData"
                v-model:sendRequest="sendRequest"
                :headers="data.columns"
                :request-api="fetchRealTimeList"
                :send-data="dealReqData(data.formData)"
                @on-handle="handleClick"
            />
        </div>
    </div>
</template>

<script setup lang="ts" name="TimeScheduling">
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { ref, reactive, computed, toRaw, createVNode, watch } from 'vue';
import type {
    ColumnProps,
    FormListProps,
    TableHandleOptItem,
} from 'GlobComponentsModule';
import { deleteFile } from '@/api/app';
import { fetchRealTimeStat, fetchRealTimeList } from '@/api/time-scheduling';
import {
    getNowDate,
    showFileDurationText,
    dealReqData,
    getReqData,
    GetNumberOfDays,
    handleDownload,
} from '@/utils/tools';
import { message as $message } from 'ant-design-vue';
import recordTimeChart from './compoments/record-time-chart.vue';
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import commonMixin from '@/mixins';
import RouteBreadcrumb from '@/components/breadcrumb/index.vue';

interface Data {
    formData: {
        date?: any[];
    };
    list: FormListProps[];
    tableData: Item[];
    columns: ColumnProps[];
    chartData?: any;
}
interface Item {
    deviceId: string;
    sn: string;
    groupId: string;
    upgradeStatus: string;
}
let sendRequest = ref(false);

const $store = useStore(),
    typeList = computed(() => $store.getters['config/recordTypes']),
    $router = useRouter(),
    $route = useRoute(),
    breadcrumbData = computed(() => $route),
    isAdmin = computed(() => $store.getters['common/isAdmin']),
    gisUrl = computed(() => $store.getters['common/gisMapUrl']),
    data = reactive<Data>({
        /** 表单list */
        list: [
            {
                type: 'range-picker',
                name: 'date',
                label: '调度时间',
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
        formData: {
        },
        /** 列表数据 */
        tableData: [],
        /** 列表项 */
        columns: [
            {
                title: '设备编号',
                dataIndex: 'DevSn',
            },
            {
                title: '养老院名称',
                dataIndex: 'GroupName',
                minWidth: 120,
            },
            {
                title: '调度时长',
                dataIndex: 'FileDuration',
                customRender: ({ text }) => {
                    return showFileDurationText(text);
                },
            },
            {
                title: '调度时间',
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
        chartData: [],
    });

watch(
    () => $route.params.type,
    (e) => {
        initFn(e);
    },
    {
        immediate: true,
    }
);

commonMixin(refreshList);

function initFn(_type: any) {
    const _d = typeList.value?.[_type];
    data.formData.serviceType = _d?.label;
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
    // !data.formData.serviceType && (data.formData.serviceType = '服务提供');
    const req = getReqData(data.formData);
    fetchRealTimeStat(req).then((res: any) => {
        data.chartData = {
            name: '调度统计',
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
            handleDelete(rowData.FileId);
            break;
        default:
    }
}
function handleToDetail(row: any) {
    console.log(row, '---');
    $router.push(`/service-records/video-detail?id=${row.FileId}`);
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

<style lang="less" scoped>
.padding-16 {
    padding: 16px;
}
.c2 {
    width: 200px;
}

.one-btn {
    width: 150px;
    height: 150px;
    margin: 60px auto;
    border-radius: 50%;
    background: #1890ff;
    background: linear-gradient(#1890ff, #0725aa);
    position: relative;
    cursor: pointer;
    padding: 20px;
    box-shadow: inset 0 2px 3px rgba(255, 255, 255, 0.13),
        0 5px 8px rgba(0, 0, 0, 0.5), 0 10px 10px 4px rgba(0, 0, 0, 0.3);
}

.one-btn:after {
    content: '';
    position: absolute;
    left: -20px;
    right: -20px;
    top: -20px;
    bottom: -20px;
    z-index: -2;
    border-radius: inherit;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1),
        0 1px 2px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 0, 0, 0.15);
}

.one-btn:before {
    content: '';
    position: absolute;
    left: -10px;
    right: -10px;
    top: -10px;
    bottom: -10px;
    z-index: -1;
    border-radius: inherit;
    box-shadow: inset 0 10px 10px rgba(0, 0, 0, 0.13);
    -webkit-filter: blur(1px);
    filter: blur(1px);
}

.inner {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(#0d5da8, #178bf8);
    display: block;
    box-shadow: 0 -2px 5px rgba(255, 255, 255, 0.05),
        0 2px 5px rgba(255, 255, 255, 0.1);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        background: linear-gradient(#178bf8, #0d5da8);
    }
}
.inner .span {
    color: #fff;
    font-size: 18px;
}
</style>
