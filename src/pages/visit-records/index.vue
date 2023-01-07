<template>
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
        :request-api="repairList"
        :send-data="dealReqData(data.formData)"
        @on-handle="handleClick"
    />
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref, reactive, computed, toRaw } from 'vue';
import type {
    ColumnProps,
    FormListProps,
    TableHandleOptItem,
} from 'GlobComponentsModule';
import { repairList, oneRepair, repaiConfirm } from '@/api/app';
import { getNowDate, dealReqData } from '@/utils/tools';
import { message as $message } from 'ant-design-vue';

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
                type: 'range-picker',
                name: 'date',
                label: '可用时间',
                props: {
                    valueFormat: 'YYYY-MM-DD',
                },
            },
            {
                type: 'select',
                name: 'status',
                label: '类型',
                width: 120,
                props: {
                    placeholder: '类型选择',
                    allowClear: true,
                },
                option: $store.getters['common/statusTypes'] || [],
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
                type: 'input',
                name: 'name',
                label: '工作人员',
                props: {
                    placeholder: '请输入工作人员名称',
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
                title: '序号',
                type: 'index',
                width: 80,
                dataIndex: 'index',
            },
            {
                title: '报修时间',
                dataIndex: 'RepairTime',
                minWidth: 120,
                customRender: ({ text }) => {
                    return getNowDate(text)?.date;
                },
            },
            {
                title: '报修人',
                dataIndex: 'Name',
            },
            {
                title: '报修次数',
                dataIndex: 'RepairCount',
                minWidth: 120,
            },
            {
                title: '报修设备号',
                dataIndex: 'Mac',
                minWidth: 120,
            },
            {
                title: '养老院',
                dataIndex: 'Dept',
                hidden: !isAdmin.value,
                minWidth: 120,
            },
            {
                title: '操作',
                type: 'handle',
                minWidth: 120,
                hidden: isAdmin.value,
                option: [
                    {
                        name: '自主工单地址',
                        type: 'edit',
                        likeBtn: true,
                    },
                ],
            },
            {
                title: '报修情况',
                hidden: !isAdmin.value,
                dataIndex: 'RepairStatus',
                minWidth: 120,
                customRender: ({ text }) => {
                    return text == 0 ? '已修复' : '未修复';
                },
            },
            {
                title: '报修情况',
                hidden: isAdmin.value,
                type: isAdmin.value ? '' : 'switch',
                dataIndex: 'RepairStatus',
                minWidth: 120,
            },
        ],
    });
/**
 * @description: table 项操作
 */
function handleClick(item: TableHandleOptItem, row: any) {
    console.log(item, row);
    const { name } = item;
    const rowData = toRaw(row);
    switch (name) {
        case '自主工单地址':
            console.log('自主工单地址', rowData);
            // oneRepairFn(rowData);
            window.open(
                'https://pgsqltest.cube.lenovo.com/webchat/ticket/index.html'
            );
            break;
        case '已修复':
            rowData.RepairStatus = 0;
            console.log('已修复', rowData);
            handleRepairFn(rowData);
            break;
        case '未修复':
            console.log('未修复', rowData);
            rowData.RepairStatus = 1;
            oneRepairFn2(rowData);
            break;
        default:
    }
}

function oneRepairFn({ MemId }: any) {
    oneRepair({
        mem_id: MemId,
    }).then((res: any) => {
        console.log('mem_id1', res);
        $message.success('操作成功.');
        sendRequest = ref(true);
        $router.push('/repair/customer-plat');
    });
}

function oneRepairFn2({ MemId }: any) {
    oneRepair({
        mem_id: MemId,
    }).then((res: any) => {
        console.log('mem_id1', res);
        $message.success('操作成功.');
        sendRequest = ref(true);
    });
}

function handleRepairFn({ MemId }: any) {
    repaiConfirm({
        mem_id: MemId,
    }).then((res: any) => {
        console.log('mem_id2', res);
        $message.success('操作成功.');
        sendRequest = ref(true);
    });
}
</script>
