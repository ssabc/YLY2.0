<template>
    <a-table
        v-bind="$props"
        :id="rowKey"
        :data-source="tableData"
        :row-key="rowKey || 'id'"
        class="gm-table"
        :pagination="pagination"
        bordered
        :loading="loading"
        @change="handleChange"
    >
        <a-table-column
            v-for="(item, idx) in cols"
            :key="item.dataIndex || item.type"
            :title="item.title"
            :data-index="item.dataIndex"
            :width="item.width"
            :custom-render="item.customRender"
            :fixed="item.fixed"
        >
            <template #default="{ record, index }">
                <div v-if="item.type === 'handle'">
                    <template
                        v-for="ele of typeof item.optionFn === 'function'
                            ? item.optionFn({ record })
                            : item.option"
                        :key="ele.name"
                    >
                        <button
                            v-if="!ele.hidden"
                            class="text-blue-500"
                            :disabled="ele.disabled"
                            :class="{
                                'cursor-not-allowed': ele.disabled,
                                'text-zinc-300': ele.disabled,
                                'ant-btn ant-btn-primary btn': ele.likeBtn,
                            }"
                            @click="$emit('on-handle', ele, record)"
                            v-text="ele.name"
                        />
                        <a-divider
                            v-if="!ele.hidden"
                            class="divider"
                            type="vertical"
                        />
                    </template>
                </div>
                <div v-else-if="item.type === 'index'">
                    {{ getCurrentIdx(index) }}
                </div>
                <div v-else>
                    <div v-if="item.type === 'switch'" style="font-size: 12px">
                        <a-switch
                            :checked="!+record[item.dataIndex || '_']"
                            style="padding: 0 4px"
                            checked-children="已修复"
                            un-checked-children="未修复"
                            @click="
                                (e: any) => $emit('on-handle', { name: e ? '已修复' : '未修复', value: e }, record)
                            "
                        />
                    </div>
                    <span v-else>{{ record[item.dataIndex || '_'] }}</span>
                </div>
            </template>
        </a-table-column>
    </a-table>
</template>

<script setup lang="ts">
import type { ColumnProps, TableHandleOptItem } from 'GlobComponentsModule';
import {
    computed,
    ref,
    reactive,
    onBeforeMount,
    watch,
    watchEffect,
} from 'vue';
import { PaginationProps } from 'ant-design-vue/es/pagination';
import type { AxiosPromise } from 'axios';

interface Props {
    rowKey?: number | string; // 行唯一key名
    headers: ColumnProps[]; // 表头
    data: object[]; // 表格数据
    current?: number; // 当前页码-分页
    pageSize?: number; // 当前分页条数-分页
    currentName?: string; // 当前页码发送给后端的字段名-分页配置，default：pageNo
    pageSizeName?: string; // 当前分页条数发送给后端的字段名-分页配置，default：pageSize
    initRequest?: boolean; // 初始化是否自动请求数据，default：true
    requestApi?: (d: object) => AxiosPromise<any>; // 请求api
    sendData?: object; // 发送api的请求数据
    sendRequest?: boolean; // 是否触发请求api操作
    loadStatus?: string; // 当前加载状态 isloading： 加载中， loaded： 加载完成
}

const $props = defineProps<Props>(),
    $emit = defineEmits<{
        (event: 'update:data', v: Array<object>): void;
        (event: 'on-handle', v: TableHandleOptItem, row: any): void;
        (event: 'update:sendRequest', v: boolean): void;
    }>();
// 分页配置
const pagination = reactive<PaginationProps>({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number) => `总共 ${total} 条`,
    total: 0,
});

let cols = ref<ColumnProps[]>([]),
    tableData = ref<Array<object>>([]),
    loading = ref<boolean>(false);

// 获取表头
cols = computed(() => $props.headers.filter((_e: any) => !_e.hidden));
// 获取表格数据
tableData = computed({
    get: () => $props.data,
    set(v) {
        $emit('update:data', v);
    },
});
// 监听是否发生api请求操作
watch(
    () => $props.sendRequest,
    (v) => v && fetchTableData()
);

// 监听props是否传入加载状态，改变表格loading值
watchEffect(() => {
    if ($props.loadStatus != undefined) {
        loading.value = $props.loadStatus === 'isloading' ? true : false;
    }
});

// 初始化
onBeforeMount(() => !$props.initRequest && fetchTableData());
/**
 * @description: 统一处理change
 */
function handleChange(p: PaginationProps) {
    pagination.current = p.current;
    pagination.pageSize = p.pageSize;
    fetchTableData();
}
/**
 * @description: 请求更新表格数据api
 */
function fetchTableData() {
    const { requestApi, sendData = {}, currentName, pageSizeName } = $props,
        current = currentName ?? 'page',
        pageSize = pageSizeName ?? 'page-size';

    if (typeof requestApi === 'function' && !loading.value) {
        loading.value = true;
        requestApi({
            ...sendData,
            [current]: pagination.current,
            [pageSize]: pagination.pageSize,
        })
            .then((res) => {
                console.log('es.data', res.data);
                if (res.data?.Data) {
                    tableData.value = res.data?.Data ?? [];
                    pagination.total = res.data?.Total || 0;
                } else if (res.data?.DataRecord) {
                    tableData.value = res.data?.DataRecord ?? [];
                    pagination.total = res.data?.DataRecord.length || 0;
                } else {
                    tableData.value = res.data ?? [];
                    pagination.total = res.data?.length || 0;
                }
                $emit('update:sendRequest', false);
                loading.value = false;
            })
            .catch(() => {
                $emit('update:sendRequest', false);
                loading.value = false;
            });
    }
}

// 获取序号
function getCurrentIdx(idx: number) {
    const current = pagination?.current || 1,
        size = +(pagination?.size || 10);
    return (current - 1) * size + idx + 1;
}
</script>

<style lang="less" scoped>
.gm-table {
    .divider:last-child {
        display: none;
    }

    :deep(.ant-table-pagination) {
        float: initial;
        text-align: center;
    }
}
</style>
