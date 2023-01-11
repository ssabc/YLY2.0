<template>
    <a-tabs v-model:activeKey="data.activeKey">
        <a-tab-pane key="1" tab="拍摄视频"></a-tab-pane>
        <a-tab-pane key="2" tab="云眼视频" force-render></a-tab-pane>
    </a-tabs>
    <GmForm
        v-model:data="data.formData"
        :list="data.list"
        layout="inline"
        @on-handle="sendRequest = true"
    >
    </GmForm>
    <br />
    <GmTable
        v-model:data="data.tableData"
        v-model:sendRequest="sendRequest"
        :headers="data.columns"
        :request-api="fetchHistoryRecords"
        :send-data="getReqData(data.formData, data.activeKey)"
        @on-handle="handleClick"
    />
    <VideoModal
        v-if="data.infoModal.visible"
        :modal-data="data.infoModal"
        @cancel="data.infoModal.visible = false"
    ></VideoModal>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { ref, reactive, toRaw, createVNode, computed } from 'vue';
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { message as $message } from 'ant-design-vue';
import type {
    ColumnProps,
    FormListProps,
    TableHandleOptItem,
    ModalData,
} from 'GlobComponentsModule';
import { fetchHistoryRecords } from '@/api/app';
import { getOpsOptions, getReqData } from '@/utils/tools';

interface Data {
    formData: {
        inputName?: string;
    };
    list: FormListProps[];
    tableData: Item[];
    columns: ColumnProps[];
    infoModal: ModalData;
    activeKey: string;
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
    data = reactive<Data>({
        activeKey: '1',
        /** 表单list */
        list: [
            {
                type: 'range-picker',
                name: 'date',
                label: '可用时间',
                props: {
                    valueFormat: 'YYYY-MM-DD',
                },
            },
            {
                type: 'select',
                name: 'time-range',
                label: '时段',
                props: {
                    placeholder: '时段选择',
                    allowClear: true,
                },
                option: $store.getters['common/statusTypes4'] || [],
            },
            {
                type: 'input',
                name: 'name',
                label: '工作人员',
                props: {
                    placeholder: '请输入工作人员名称',
                    allowClear: true,
                },
            },
            {
                type: 'select',
                name: 'dept-id',
                label: '养老院选择',
                hidden: !isAdmin.value,
                props: {
                    placeholder: '养老院选择',
                    allowClear: true,
                },
                option: $store.getters['common/ylyList'] || [],
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
                title: '文件名',
                dataIndex: 'FileName',
            },
            {
                title: '工作时间',
                dataIndex: 'SubmitTime',
                minWidth: 120,
                // customRender: ({ text }) => {
                //     return text?.split(' ')?.[0];
                // },
            },
            {
                title: '文件时长',
                dataIndex: 'Duration',
                minWidth: 120,
            },
            {
                title: '类型',
                dataIndex: 'Type',
                minWidth: 100,
            },
            {
                title: '工作人员',
                dataIndex: 'Staff',
                minWidth: 120,
            },
            {
                title: '操作',
                type: 'handle',
                width: 240,
                option: getOpsOptions(isAdmin),
            },
        ],
        /** 弹窗信息 */
        infoModal: {
            visible: false,
            title: '',
            type: 'add', // add: 新增， edit: 编辑
            data: {},
        },
    });
/**
 * @description: table 项操作
 */
function handleClick(item: TableHandleOptItem, row: any) {
    const { name } = item;
    const rowData = toRaw(row);
    switch (name) {
        case '点击查看':
            handleInfoModal({
                type: 'view',
                row: rowData,
            });
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
interface HandleParams {
    type: string; // 弹窗类型
    row?: any;
}
function handleInfoModal({ type, row }: HandleParams) {
    data.infoModal.type = type;
    data.infoModal.data = row || {};
    data.infoModal.visible = true;
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
</script>
<style lang="less" scoped>
.cells {
    margin: -65px 0 40px 60px;
    .cell {
        margin-right: 10px;
    }
}
</style>
