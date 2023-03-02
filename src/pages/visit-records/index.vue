<template>
    <div class="cm-box">
        <GmForm
            v-model:data="data.formData"
            :list="data.list"
            layout="inline"
            @on-handle="sendRequest = true"
        >
        </GmForm>
        <br />
        <div class="row">
            <div class="column c1">
                <div>访客数量统计（每周）</div>
                <Chart1 :p-data="data.chart1Data"></Chart1>
            </div>
            <div class="column c1">
                <div>分时段访客统计（7日）</div>
                <Chart2 :p-data="data.chart2Data"></Chart2>
            </div>
        </div>
    </div>
    <div class="cm-box">
        <div class="table-title">访客近7日明细</div>
        <GmTable
            v-model:data="data.tableData"
            v-model:sendRequest="sendRequest"
            :headers="data.columns"
            :request-api="fetchServiceFileList"
            :send-data="dealReqData(data.formData)"
        />
    </div>
</template>

<script setup lang="ts" name="NurseAideIndex">
import { useStore } from 'vuex';
import { ref, reactive, computed, onMounted } from 'vue';
import type { ColumnProps, FormListProps } from 'GlobComponentsModule';
import { fetchServiceFileList } from '@/api/service-records';
import { dealReqData } from '@/utils/tools';
import Chart1 from './compoments/chart1.vue';
import Chart2 from './compoments/chart2.vue';
import commonMixin from '@/mixins';

interface Data {
    formData: {
        serviceType?: string;
    };
    list: FormListProps[];
    tableData: Item[];
    columns: ColumnProps[];
    chart1Data: any[];
    chart2Data: any[];
}
interface Item {
    deviceId: string;
    sn: string;
    groupId: string;
    upgradeStatus: string;
}
let sendRequest = ref(false);

const $store = useStore(),
    ylyList = computed(() => $store.getters['common/ylyList']),
    groupId = computed(() => $store.getters['common/groupId']),
    currentYly = computed(() => $store.getters['common/currentYly']),
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
        chart1Data: [],
        chart2Data: [],
    });
commonMixin(() => initfn());

onMounted(() => {
    initfn();
});

function initfn() {
    sendRequest.value = true;

    let _temp = [];
    const _list = [
        [100, 20, 34, 56, 77, 56, 30],
        [50, 30, 24, 36, 47, 76, 90],
        [60, 50, 24, 66, 67, 86, 20],
    ];
    if (!groupId.value) {
        _temp = ylyList.value?.map((_e: any, idx: number) => {
            return {
                name: _e.label,
                data: _list[idx],
            };
        });
    } else {
        const l = currentYly.value.name || '',
            idx = l.substring(l.length, l.length - 1) - 1;
        _temp = [
            {
                name: currentYly.value.name,
                data: _list[idx],
            },
        ];
    }
    data.chart1Data = data.chart2Data = _temp;
}
</script>
<style lang="less" scoped>
.row {
    display: flex;
    .column {
        &.c1 {
            flex: 1;
        }
    }
}
</style>
