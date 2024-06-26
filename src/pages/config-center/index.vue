<template>
    <div class="cm-box">
        <GmForm
            v-model:data="data.formData"
            :list="data.list"
            layout="inline"
            @on-handle="data.sendRequest = true"
        >
        </GmForm>
    </div>
    <div class="cm-box">
        <GmTable
            v-model:data="data.tableData"
            v-model:sendRequest="data.sendRequest"
            :headers="data.columns"
            :request-api="fetchConfigNursingHome"
            :send-data="dealReqData(data.formData)"
            @on-handle="handleClick"
        />
    </div>
</template>

<script setup lang="ts" name="CareHomeManagement">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref, reactive, toRaw, createVNode, computed, onActivated } from 'vue';
import type {
    ColumnProps,
    FormListProps,
    TableHandleOptItem,
} from 'GlobComponentsModule';
import { fetchConfigNursingHome } from '@/api/config-center';
import { getNowDate, dealReqData, handleDownload } from '@/utils/tools';
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
interface Data {
    formData: {
        inputName?: string;
    };
    list: FormListProps[];
    tableData: Item[];
    columns: ColumnProps[];
    sendRequest: boolean;
}
interface Item {
    deviceId: string;
    sn: string;
    groupId: string;
    upgradeStatus: string;
}

const $store = useStore(),
    isAdmin = computed(() => $store.getters['common/isAdmin']),
    $router = useRouter(),
    data = reactive<Data>({
        sendRequest: false,
        /** 表单list */
        list: [
            {
                type: 'input',
                name: 'groupName',
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
                dataIndex: 'GroupName',
                minWidth: 120,
            },
            {
                title: '地址',
                dataIndex: 'Address',
            },
            {
                title: '院长/负责人',
                dataIndex: 'Dean',
            },
            {
                title: '联系电话',
                dataIndex: 'Telephone',
                minWidth: 120,
            },
            {
                title: '记录仪启用时间',
                dataIndex: 'time',
                minWidth: 120,
                customRender: ({ text }) => {
                    return getNowDate(text)?.time;
                },
            },
            {
                title: '采集柜启用时间',
                dataIndex: 'time',
                minWidth: 120,
                customRender: ({ text }) => {
                    return getNowDate(text)?.time;
                },
            },
            {
                title: '测温随申码访客机启用时间：',
                dataIndex: 'time',
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
                        type: 'view',
                    },
                    {
                        name: '编辑',
                        type: 'edit',
                    },
                    {
                        name: '删除',
                        hidden: !isAdmin.value,
                        type: 'edit',
                    },
                ],
            },
        ],
    });

onActivated(() => {
    console.log('执行了actived方法。。。');
    data.sendRequest = true;
});

/**
 * @description: table 项操作
 */
function handleClick(item: TableHandleOptItem, row: any) {
    const { name } = item;
    const rowData = toRaw(row);
    switch (name) {
        case '详情':
            handleToDetail(rowData);
            break;
        case '编辑':
            handleToEdit(rowData);
            break;
        case '删除':
            handleDelete();
            break;
        default:
    }
}
function handleToDetail(row: any) {
    $router.push(`/config-center/detail?id=${row.GroupId}&type=1`);
}

function handleToEdit(row: any) {
    $router.push(`/config-center/edit?id=${row.GroupId}&type=2`);
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
</script>
