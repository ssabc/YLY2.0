<!--
 * @Author: sZhao
 * @Date: 2023-01-08 16:48:43
 * @LastEditTime: 2023-01-08 17:01:12
 * @LastEditors: sZhao
 * @Description:
-->
<template>
    <GmTable
        class="table"
        :bordered="false"
        v-model:data="data.tableData"
        v-model:sendRequest="sendRequest"
        :headers="data.columns"
        :request-api="repairList"
    />
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { ColumnProps } from 'GlobComponentsModule';
import { repairList } from '@/api/app';

interface Data {
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

const data = reactive<Data>({
    /** 列表数据 */
    tableData: [],
    /** 列表项 */
    columns: [
        {
            title: '排名',
            type: 'index',
            width: 80,
            dataIndex: 'index',
        },
        {
            title: '养老院',
            dataIndex: 'Dept',
        },
        {
            title: '记录时长(小时）',
            dataIndex: 'Name',
        },
        {
            title: '设备号',
            dataIndex: 'RepairCount',
        },
        {
            title: '记录类型',
            dataIndex: 'Mac',
        },
    ],
});
</script>

<style lang="less" scoped>
.table {
    :deep(.ant-table),
    :deep(.ant-table-placeholder) {
        background-color: rgba(0, 0, 0, 0);
        color: #fff;
    }
    :deep(.ant-empty-description) {
        color: #fff;
    }
    :deep(.ant-table-thead > tr > th) {
        background-color: rgba(12, 34, 55, 0.6980392156862745);
        color: #fff;
    }
}
</style>
