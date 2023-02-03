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
            :request-api="fetchConfigSystemLog"
            :send-data="dealReqData(data.formData)"
        />
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref, reactive, computed } from 'vue';
import type { ColumnProps, FormListProps } from 'GlobComponentsModule';
import { fetchConfigSystemLog } from '@/api/config-center';
import { dealReqData } from '@/utils/tools';

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
                dataIndex: 'SystemMenu',
                minWidth: 120,
            },
            {
                title: '操作类型',
                dataIndex: 'OperateType',
            },
            {
                title: '操作账户',
                dataIndex: 'Account',
            },
            {
                title: '请求IP',
                dataIndex: 'RemoteIp',
            },
            {
                title: '操作账户类型',
                dataIndex: 'AccountType',
            },
            {
                title: '操作时间',
                dataIndex: 'OperateTime',
            },
        ],
    });
</script>
