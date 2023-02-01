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
    <div class="cm-box">
        <GmTable
            v-model:data="data.tableData"
            v-model:sendRequest="sendRequest"
            :headers="data.columns"
            :request-api="fetchConfigAccount"
            :send-data="dealReqData(data.formData)"
            @on-handle="handleClick"
        />
    </div>
</template>

<script setup lang="ts" name="AccountManagement">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref, reactive, computed, toRaw, createVNode } from 'vue';
import type {
    ColumnProps,
    FormListProps,
    TableHandleOptItem,
} from 'GlobComponentsModule';
import { fetchConfigAccount } from '@/api/config-center';
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
                name: 'groupName',
                label: '所属机构：',
                props: {
                    placeholder: '请输入机构名称',
                    allowClear: true,
                },
            },
            {
                type: 'select',
                name: 'accountType',
                label: '账户类型：',
                width: 160,
                props: {
                    placeholder: '请选择账户类型',
                    allowClear: true,
                },
                option: $store.getters['config/accountTypes'],
            },
            {
                type: 'select',
                name: 'isValid',
                label: '启用状态：',
                width: 160,
                props: {
                    placeholder: '请选择启用状态',
                    allowClear: true,
                },
                option: $store.getters['config/enabledStatus'],
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
                title: '所属机构',
                dataIndex: 'Account',
                minWidth: 120,
            },
            {
                title: '账户类型',
                dataIndex: 'AccountType',
            },
            {
                title: '启用状态',
                dataIndex: 'IsValid',
                customRender: ({ text }) => {
                    return text ? '启用' : '禁用';
                },
            },
            {
                title: '设置者账号',
                dataIndex: 'Name',
            },
            {
                title: '联系人',
                dataIndex: 'Contact',
            },
            {
                title: '联系电话',
                dataIndex: 'Telephone',
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
        `/config-center/account-management/detail?id=${row.GroupId}&type=1`
    );
}

function handleToEdit(row: any) {
    $router.push(
        `/config-center/account-management/edit?id=${row.GroupId}&type=2`
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
