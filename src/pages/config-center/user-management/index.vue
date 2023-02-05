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
            :request-api="feachUserList"
            :send-data="dealReqData(data.formData)"
            @on-handle="handleClick"
        />
    </div>
</template>

<script setup lang="ts" name="UserManagement">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref, reactive, computed, toRaw, createVNode, onActivated } from 'vue';
import type {
    ColumnProps,
    FormListProps,
    TableHandleOptItem,
} from 'GlobComponentsModule';
import { feachUserList } from '@/api/config-center';
import { dealReqData } from '@/utils/tools';
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
                name: 'name',
                label: '用户姓名：',
                props: {
                    placeholder: '请输入用户姓名',
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
                title: '用户类型',
                dataIndex: 'ServiceType',
                minWidth: 120,
            },
            {
                title: '用户机构',
                dataIndex: 'GroupName',
            },
            {
                title: '所持设备编号',
                dataIndex: 'DeviceSn',
            },
            {
                title: '所持设备类型',
                dataIndex: 'ServiceType',
                customRender: ({ text }) => {
                    return '记录仪';
                },
            },
            {
                title: '联系人',
                dataIndex: 'Contacts',
            },
            {
                title: '联系电话',
                dataIndex: 'Telephone',
            },
            {
                title: '设置账号',
                dataIndex: 'Setter',
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
    $router.push(
        `/config-center/user-management/detail2?id=${row.DevId}&type=1`
    );
}

function handleToEdit(row: any) {
    $router.push(
        `/config-center/user-management/edit2?id=${row.DevId}&type=2`
    );
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
