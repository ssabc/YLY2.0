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
    <div class="info-wrap">
        <div><PhoneOutlined /><span>全国售后服务热线：021-69772165</span></div>
        <div><CreditCardOutlined /><span>邮政编码：201705</span></div>
        <div><UserOutlined /><span>联系人：刘小姐</span></div>
    </div>
    <div class="cm-box">
        <div class="table-title">在线记录</div>
        <a-tabs v-model:active-key="data.activeKey" @change="handleChangeTab">
            <a-tab-pane
                v-for="item in data.tabs"
                :key="item.key"
                :tab="item.name"
            ></a-tab-pane>
        </a-tabs>
        <GmTable
            v-model:data="data.tableData"
            v-model:sendRequest="sendRequest"
            :is-set-null="data.activeKey != '1'"
            :headers="data.columns"
            :request-api="fetchDeviceAssignList"
            :send-data="dealReqData(data.formData)"
            @on-handle="handleClick"
        />
    </div>
</template>

<script setup lang="ts" name="DeviceRepairIndex">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref, reactive, toRaw, createVNode, onMounted, onActivated } from 'vue';
import type {
    ColumnProps,
    FormListProps,
    TableHandleOptItem,
} from 'GlobComponentsModule';
import { deleteFile } from '@/api/app';
import { fetchDeviceAssignList } from '@/api/device';
import { getNowDate, dealReqData, showFileDurationText } from '@/utils/tools';
import { Modal } from 'ant-design-vue';
import {
    ExclamationCircleOutlined,
    PhoneOutlined,
    UserOutlined,
    CreditCardOutlined,
} from '@ant-design/icons-vue';
import commonMixin from '@/mixins';

interface Data {
    activeKey?: string;
    tabs?: any[];
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
    $router = useRouter(),
    data = reactive<Data>({
        activeKey: '1',
        tabs: [
            {
                name: '服务记录仪',
                key: '1',
            },
            {
                name: '采集柜',
                key: '2',
            },
            {
                name: '测温随申码访客机',
                key: '3',
            },
        ],
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
                title: '设备编号',
                dataIndex: 'DeviceSn',
            },
            {
                title: '所属养老院',
                dataIndex: 'GroupName',
                minWidth: 120,
            },
            {
                title: '在线时长',
                dataIndex: 'OnlineDuration',
                customRender: ({ text }) => {
                    return showFileDurationText(text);
                },
            },
            {
                title: '最近一次在线时间',
                dataIndex: 'LastOnlineTime',
                minWidth: 120,
                customRender: ({ text }) => {
                    return getNowDate(text)?.time;
                },
            },
            {
                title: '维修次数',
                dataIndex: 'RepairCount',
            },
            {
                title: '操作',
                type: 'handle',
                minWidth: 240,
                option: [
                    {
                        name: '点击查看',
                        type: 'view',
                    },
                    {
                        name: '报修',
                        type: 'edit',
                    },
                ],
            },
        ],
    });
onActivated(() => {
    refreshList();
});
onMounted(() => {
    refreshList();
});
commonMixin(refreshList);
function refreshList() {
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

function handleChangeTab() {
    sendRequest.value = true;
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
        case '报修':
            handleToEdit(rowData);
            break;
        case '删除':
            handleDelete(rowData?.FileId);
            break;
        default:
    }
}
function handleToDetail(row: any) {
    console.log(row, '---');
    $router.push(`/device-repair/detail?id=${row.DevId}`);
}
function handleToEdit(row: any) {
    $router.push(`/device-repair/edit?id=${row.DevId}&type=1`);
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
.info-wrap {
    display: flex;
    // flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    padding-bottom: 30px;
    font-size: 28px;
    color: #000;
    & > div {
        // flex: 1;
        margin-right: 80px;
        &:last-child {
            margin-right: 0;
        }
        text-align: center;
        span {
            margin-left: 10px;
        }
    }
}
</style>
