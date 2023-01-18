<template>
    <div class="cm-box">
        <GmForm
            v-model:data="data.formData"
            :list="data.list"
            layout="inline"
            @on-handle="sendRequest = true"
        >
        </GmForm>
    </div>
    <GmTable
        v-model:data="data.tableData"
        v-model:sendRequest="sendRequest"
        :headers="data.columns"
        :request-api="fetchServiceRecord"
        :send-data="dealReqData(data.formData)"
        @on-handle="handleClick"
    />
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
import { fetchServiceRecord } from '@/api/service-records';
import { getOpsOptions, getNowDate, dealReqData } from '@/utils/tools';
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
    data = reactive<Data>({
        /** 表单list */
        list: [
            {
                type: 'input',
                name: 'name',
                label: '养老院名称：',
                props: {
                    placeholder: '养老院名称',
                    allowClear: true,
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
                title: '养老院名称',
                dataIndex: 'Dept',
                minWidth: 120,
            },
            {
                title: '地址',
                dataIndex: 'Name',
            },
            {
                title: '院长/负责人',
                dataIndex: 'Name',
            },
            {
                title: '联系电话',
                dataIndex: 'RepairTime',
                minWidth: 120,
                customRender: ({ text }) => {
                    return getNowDate(text)?.time;
                },
            },
            {
                title: '记录仪启用时间',
                dataIndex: 'RepairTime',
                minWidth: 120,
                customRender: ({ text }) => {
                    return getNowDate(text)?.time;
                },
            },
            {
                title: '采集柜启用时间',
                dataIndex: 'RepairTime',
                minWidth: 120,
                customRender: ({ text }) => {
                    return getNowDate(text)?.time;
                },
            },
            {
                title: '数字哨兵启用时间',
                dataIndex: 'RepairTime',
                minWidth: 120,
                customRender: ({ text }) => {
                    return getNowDate(text)?.time;
                },
            },
            {
                title: '操作',
                type: 'handle',
                minWidth: 240,
                option: [
                    {
                        name: '详情',
                        type: 'edit',
                    },
                    {
                        name: '删除',
                        type: 'edit',
                    },
                ],
            },
        ],
    });
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
</script>
