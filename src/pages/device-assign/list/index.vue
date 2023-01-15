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
import { useRoute, useRouter } from 'vue-router';
import { ref, reactive, computed, toRaw, createVNode, watch } from 'vue';
import type {
    ColumnProps,
    FormListProps,
    TableHandleOptItem,
} from 'GlobComponentsModule';
import { fetchDeviceAssignList } from '@/api/device-assign';
import {
    getOpsOptions,
    getNowDate,
    dealReqData,
    GetNumberOfDays,
} from '@/utils/tools';
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
    isAdmin = computed(() => $store.getters['common/isAdmin']),
    typeList = computed(() => $store.getters['common/recordTypes'] || []),
    $router = useRouter(),
    $route = useRoute(),
    data = reactive<Data>({
        /** 表单list */
        list: [
            {
                type: 'select',
                name: 'status',
                label: '',
                width: 160,
                props: {
                    placeholder: '请选择设备类别',
                    allowClear: true,
                },
                option: $store.getters['common/deviceClass'] || [],
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
                name: 'status',
                label: '',
                width: 160,
                props: {
                    placeholder: '请选择设备分类',
                    allowClear: true,
                },
                option: $store.getters['common/recordTypes'] || [],
            },
            {
                type: 'select',
                name: 'type',
                label: '',
                width: 160,
                props: {
                    placeholder: '请选择分配状态',
                    allowClear: true,
                },
                option: $store.getters['common/deviceAssignStatus'] || [],
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
                dataIndex: 'Sn',
            },
            {
                title: '设备分类',
                dataIndex: 'ServiceType',
            },
            {
                title: '所属养老院',
                dataIndex: 'GroupName',
                // hidden: !isAdmin.value,
                minWidth: 120,
            },
            {
                title: '运行状态',
                dataIndex: 'Name',
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

watch(
    () => $route.query.type,
    (e) => {
        initFn(e);
    },
    {
        immediate: true,
    }
);

function initFn(_type: any) {
    data.formData.type = _type;
    refreshList();
}
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
            handleDelete();
            break;
        default:
    }
}
function handleToDetail(row: any) {
    console.log(row, '---');
    $router.push('/device-assign/detail');
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
