<template>
    <pageHead></pageHead>
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
        :request-api="fetchCarerWarning"
        :send-data="dealReqData(data.formData)"
        @on-handle="handleClick"
    />
    <div class="label-div">
        <span>护工帮告警记录</span>
        <a-popover title="告警列表" placement="topRight" trigger="hover">
            <template #content>
                <p>黄浦老年公寓 张三 告警 时间</p>
                <p>黄浦老年公寓 张三 告警 时间</p>
            </template>
            <exclamation-outlined class="tip" />
        </a-popover>
    </div>
    <div class="iframe-wrap">
        <IframeComp></IframeComp>
    </div>
    <VideoModal
        v-if="data.infoModal.visible"
        :modal-data="data.infoModal"
        @cancel="data.infoModal.visible = false"
    ></VideoModal>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { ref, reactive, toRaw, createVNode, computed } from 'vue';
import { r as $router } from '@/routes';
import { Modal } from 'ant-design-vue';
import {
    ExclamationCircleOutlined,
    ExclamationOutlined,
} from '@ant-design/icons-vue';
import { message as $message } from 'ant-design-vue';
import type {
    ColumnProps,
    FormListProps,
    TableHandleOptItem,
    ModalData,
} from 'GlobComponentsModule';
import { fetchCarerWarning } from '@/api/app';
import { getOpsOptions, dealReqData, getNowDate } from '@/utils/tools';

interface Data {
    formData: {
        inputName?: string;
    };
    list: FormListProps[];
    tableData: Item[];
    columns: ColumnProps[];
    infoModal: ModalData;
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
        /** 表单list */
        list: [
            {
                type: 'select',
                name: 'upgradeStatus',
                label: '处理情况',
                width: 130,
                props: {
                    placeholder: '处理情况选择',
                    allowClear: true,
                },
                option: $store.getters['common/dealTypes'] || [],
            },
            {
                type: 'range-picker',
                name: 'date',
                label: '告警日期',
                props: {
                    valueFormat: 'YYYY-MM-DD',
                },
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
                name: 'Dept',
                label: '告警养老院',
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
                title: '序号',
                type: 'index',
                width: 80,
                dataIndex: 'index',
            },
            {
                title: '告警时间',
                dataIndex: 'WarningTime',
                minWidth: 120,
                customRender: ({ text }) => {
                    return getNowDate(text)?.date;
                },
            },
            {
                title: '告警人',
                dataIndex: 'WarningName',
            },
            {
                title: '设备编号',
                dataIndex: 'Mac',
            },
            {
                title: '处理情况',
                dataIndex: 'Content',
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
        case '下载本地':
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
    data.infoModal.data = Object.assign({}, row || {}, {
        FileName: row.WarningName,
    });
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

function handleToDetail(row: any) {
    console.log(row, '---');
    $router.push('/nurse-aide/detail');
}
</script>
<style lang="less" scoped>
.iframe-wrap {
    padding: 20px 0;
    height: 500px;
    min-height: 300px;
}
.hd-wrap {
    padding: 0 0 20px;
}
.label-div {
    height: 40px;
    background-color: rgb(219, 173, 160);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    color: rgb(251, 17, 16);
    font-size: 20px;
    font-weight: bolder;
}
.tip {
    cursor: pointer;
}
</style>
