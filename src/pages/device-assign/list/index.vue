<template>
    <div class="cm-box">
        <GmForm
            v-model:data="data.formData"
            :list="data.list"
            layout="inline"
            @on-handle="handleFormClick"
        >
        </GmForm>
    </div>
    <div class="cm-box">
        <div class="table-title">视频记录</div>
        <GmTable
            v-model:data="data.tableData"
            v-model:sendRequest="sendRequest"
            :headers="data.columns"
            :request-api="fetchDeviceAssignList"
            :send-data="dealReqData(data.formData)"
            @on-handle="handleClick"
        />
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref, reactive, toRaw, createVNode, onMounted, onActivated } from 'vue';
import type {
    ColumnProps,
    FormListProps,
    TableHandleOptItem,
} from 'GlobComponentsModule';
import { fetchDeviceAssignList } from '@/api/device';
import { getNowDate, dealReqData, GetNumberOfDays } from '@/utils/tools';
import { message as $message } from 'ant-design-vue';
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
    data = reactive<Data>({
        /** 表单list */
        list: [
            {
                type: 'select',
                name: 'status1',
                label: '',
                width: 160,
                props: {
                    placeholder: '请选择设备类别',
                    allowClear: true,
                },
                option: $store.getters['config/deviceClass'],
            },
            {
                type: 'input',
                name: 'name',
                label: '',
                props: {
                    placeholder: '请输入设备编号',
                    allowClear: true,
                },
            },
            {
                type: 'select',
                name: 'status2',
                label: '',
                width: 160,
                props: {
                    placeholder: '请选择设备分类',
                    allowClear: true,
                },
                option: $store.getters['config/recordTypes'],
            },
            {
                type: 'select',
                name: 'isAllocated',
                label: '',
                width: 160,
                props: {
                    placeholder: '请选择分配状态',
                    allowClear: true,
                },
                option: $store.getters['config/deviceAssignStatus'],
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
            serviceType: '值班长',
        },
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
                title: '设备类别',
                dataIndex: 'Name',
                customRender: () => {
                    return '服务记录仪';
                },
            },
            {
                title: '设备编号',
                dataIndex: 'DeviceSn',
            },
            {
                title: '设备分类',
                dataIndex: 'ServiceType',
            },
            {
                title: '所属养老院',
                dataIndex: 'GroupName',
                minWidth: 120,
            },
            {
                title: '分配状态',
                dataIndex: 'ServiceType',
                customRender: ({ text }) => {
                    return text ? '已分配' : '未分配';
                },
            },
            {
                title: '分配日期',
                dataIndex: 'AllocationTime',
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
                        name: '查看详情',
                        type: 'view',
                    },
                    {
                        name: '编辑',
                        type: 'edit',
                    },
                ],
            },
        ],
        chartData: [],
    });

onActivated(() => {
    refreshList();
});
onMounted(() => {
    refreshList();
});
commonMixin(refreshList);
function refreshList() {
    if (
        data.formData.date?.[0] &&
        data.formData.date?.[1] &&
        GetNumberOfDays(data.formData.date[0], data.formData.date[1]) > 7
    ) {
        $message.error('日期区间不能超过7天');
        return;
    }
    sendRequest.value = true;
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
        case '查看详情':
            handleToDetail(rowData);
            break;
        case '编辑':
            handleToEdit(rowData);
            break;
        default:
    }
}
function handleToDetail(row: any) {
    $router.push(`/device-assign/detail?id=${row.DevId}`);
}
function handleToEdit(row: any) {
    $router.push(`/device-assign/edit?id=${row.DevId}&type=1`);
}
</script>
