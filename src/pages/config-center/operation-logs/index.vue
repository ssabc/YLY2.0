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
                name: 'name',
                label: '操作类型：',
                props: {
                    placeholder: '请输入资源名称',
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
                title: '系统菜单',
                dataIndex: 'Dept',
                minWidth: 120,
            },
            {
                title: '操作类型',
                dataIndex: 'Name',
            },
            {
                title: '操作账户',
                dataIndex: 'Name',
            },
            {
                title: '请求IP',
                dataIndex: 'Name',
            },
            {
                title: '操作账户类型',
                dataIndex: 'Name',
            },
            {
                title: '操作时间',
                dataIndex: 'Name',
            },
        ],
    });
</script>
