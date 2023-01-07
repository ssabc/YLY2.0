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
        :send-data="dealReqData(data.formData)"
        @on-handle="handleClick"
    />
    <!-- :request-api="fetchHistoryRecords" -->
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { ref, reactive, toRaw, computed, onActivated } from 'vue';
import type {
    ColumnProps,
    FormListProps,
    TableHandleOptItem,
} from 'GlobComponentsModule';
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

function getTbData(isAdmin, deptId) {
    if (isAdmin) {
        return [
            {
                SubmitTime: '2022-12-01 18：30：00 ',
                Dept: '黄浦老年公寓',
                FileName: '张院长',
                Duration: '2',
                status: 0,
                Type: '869294040140138',
            },
            {
                SubmitTime: '2022-12-01 18：30：00 ',
                Dept: '千鹤老年公寓 （昌里路）',
                FileName: '光明',
                Duration: '2',
                status: 0,
                Type: '869294040156977',
            },
            {
                SubmitTime: '2022-12-01 18：30：00 ',
                Dept: '鹤老年公寓 （乳山路分院）',
                FileName: '吴巡',
                Duration: '1',
                status: 1,
                Type: '869294040156753',
            },
        ]
    }
    if (deptId == 4) {
        return [
            {
                SubmitTime: '2022-12-03 11：12：00',
                Dept: '黄浦老年公寓',
                FileName: '张院长',
                Duration: '1',
                status: 1,
                Type: '869294040140138',
            },
            {
                SubmitTime: '2022-12-01 18：30：00',
                Dept: '黄浦老年公寓',
                FileName: '王医生',
                Duration: '1',
                status: 1,
                Type: '869294040155714',
            },
        ]
    }

    if (deptId == 5) {
        return [
            {
                SubmitTime: '2022-12-03 11：12：00',
                Dept: '千鹤老年公寓 （乳山路分院）',
                FileName: '光明',
                Duration: '1',
                status: 1,
                Type: '869294040156977',
            },
        ]
    }

    if (deptId == 6) {
        return [
            {
                SubmitTime: '2022-12-03 11：12：00',
                Dept: '黄浦老年千鹤老年公寓 （昌里路）公寓',
                FileName: '吴巡',
                Duration: '1',
                status: 1,
                Type: '869294040156753',
            },
            {
                SubmitTime: '2022-11-30 18：30：00',
                Dept: '黄浦老年千鹤老年公寓 （昌里路）公寓',
                FileName: '王五',
                Duration: '1',
                status: 1,
                Type: '869294040156738',
            },
        ]
    }
    return []
}
const $store = useStore(),
    isAdmin = computed(() => $store.getters['common/isAdmin']),
    deptId = computed(() => $store.getters['common/deptId']),
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
                name: 'type',
                label: '类型',
                width: 120,
                props: {
                    placeholder: '类型选择',
                    allowClear: true,
                },
                option: $store.getters['common/statusTypes3'] || [],
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
        tableData: getTbData(isAdmin.value, deptId.value),
        /** 列表项 */
        columns: [
            {
                title: '序号',
                type: 'index',
                width: 80,
                dataIndex: 'index',
            },
            {
                title: isAdmin.value ? '时间' : '领取时间',
                dataIndex: 'SubmitTime',
                width: 120,
                customRender: ({ text }) => {
                    return text?.split(' ')?.[0];
                },
            },
            {
                title: '养老院名称',
                hidden: !isAdmin.value,
                dataIndex: 'Dept',
                width: 120,
            },
            {
                title: '领取人',
                hidden: isAdmin.value,
                dataIndex: 'FileName',
                width: 120,
            },
            {
                title: '领取数量',
                dataIndex: 'Duration',
                width: 120,
            },
            {
                title: '领取状态',
                hidden: !isAdmin.value,
                dataIndex: 'status',
                width: 120,
                customRender: ({ text }) => {
                    return text == 0 ? '待分配' : '已分配';
                },
            },
            {
                title: '领取设备号',
                hidden: isAdmin.value,
                dataIndex: 'Type',
                width: 120,
            },
            {
                title: '领取情况',
                hidden: isAdmin.value,
                dataIndex: 'status',
                width: 120,
                customRender: ({ text }) => {
                    return text == 0 ? '待分配' : '已分配';
                },
            },
            {
                title: '操作',
                type: 'handle',
                hidden: !isAdmin.value,
                width: 100,
                optionFn: ({ record }) => [
                    {
                        name: '一键分配',
                        type: 'edit',
                        disabled: record.status != 0,
                    },
                ],
            },
        ],
    });

onActivated(() => {
    console.log('执行了actived方法。。。');
});
/**
 * @description: table 项操作
 */
function handleClick(item: TableHandleOptItem, row: any) {
    const { name } = item;
    const rowData = toRaw(row);
    switch (name) {
        case '一键分配':
            console.log('一键分配', rowData);
            row.status = 1;
            break;
        default:
    }
}
</script>
