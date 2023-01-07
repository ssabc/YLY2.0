
<template>
    <GmTable
        v-model:data="data.tableData"
        :headers="data.columns"
        @on-handle="handleClick"
    />
</template>

<script setup lang="ts">
import type { ColumnProps, TableHandleOptItem } from 'GlobComponentsModule';
import { reactive } from 'vue';

interface Item {
    id: number | string;
    name: string;
    age: number;
}
interface Data {
    tableData: Item[];
    columns: ColumnProps[];
}

const data = reactive<Data>({
    tableData: [
        {
            id: 1,
            name: '胡彦斌',
            age: 32,
        },
        {
            id: 2,
            name: 'Maple',
            age: 42,
        },
    ],
    columns: [
        {
            title: '姓名',
            dataIndex: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
        },
        {
            title: '操作',
            type: 'handle',
            option: [
                {
                    name: '详情',
                },
                {
                    name: '删除',
                    disabled: true,
                },
            ],
        },
    ],
});

function handleClick(item: TableHandleOptItem) {
    console.log(item, '表格操作一列点击事件勾子');
}
</script>
