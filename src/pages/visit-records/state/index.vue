<template>
    <div class="cm-box">
        <GmForm
            v-model:data="data.formData"
            :list="data.list"
            layout="inline"
            @on-handle="handleFormClick"
        >
        </GmForm>
        <br />
        <recordTimeChart :p-data="data.chartData"></recordTimeChart>
    </div>
    <div class="cm-box">
        <div class="table-title">访客明细</div>
        <GmTable
            v-model:data="data.tableData"
            v-model:sendRequest="sendRequest"
            :headers="data.columns"
            :request-api="fetchServiceFileList"
            :send-data="dealReqData(data.formData)"
        />
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { ref, reactive, computed, onMounted } from 'vue';
import type { ColumnProps, FormListProps } from 'GlobComponentsModule';
import { fetchServiceStat, fetchServiceFileList } from '@/api/service-records';
import { dealReqData, getReqData, GetNumberOfDays } from '@/utils/tools';
import { message as $message } from 'ant-design-vue';
import recordTimeChart from '@/pages/service-records/compoments/record-time-chart.vue';
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
    typeList = computed(() => $store.getters['config/recordTypes']),
    $route = useRoute(),
    data = reactive<Data>({
        /** 表单list */
        list: [
            {
                type: 'range-picker',
                name: 'date',
                label: '记录时间',
                props: {
                    valueFormat: 'YYYY-MM-DD',
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
        formData: {
            serviceType: '服务提供',
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
                title: '日期',
                dataIndex: 'CreateTime',
            },
            {
                title: '养老院名称',
                dataIndex: 'GroupName',
                minWidth: 120,
            },
            {
                title: '访问人数',
                dataIndex: 'FileDuration',
            },
        ],
        chartData: [],
    });

onMounted(() => {
    initFn();
});

function initFn() {
    const _type = 0;
    const _d = typeList.value?.[_type];
    data.formData.serviceType = _d?.label;
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
    getInfoAjax();
    sendRequest.value = true;
}

function getInfoAjax() {
    if (
        data.formData.date?.[0] &&
        data.formData.date?.[1] &&
        GetNumberOfDays(data.formData.date[0], data.formData.date[1]) > 7
    ) {
        $message.error('日期区间不能超过7天');
        return;
    }
    const req = getReqData(data.formData);
    fetchServiceStat(req).then((res: any) => {
        data.chartData = {
            name: '访客数量统计（每周）',
            list: res.data || [],
        };
    });
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
</script>
