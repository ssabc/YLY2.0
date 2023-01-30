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
    <div class="row">
        <div class="column c1 cm-box mr-15">
            <div>服务记录仪在线统计</div>
            <Chart6 :p-data="chart6Data"></Chart6>
        </div>
        <div class="column c1 c2">
            <div class="cm-box">
                <div>采集柜在线统计</div>
                <Chart4></Chart4>
            </div>
            <div class="cm-box">
                <div>测温随申码访客机在线统计</div>
                <Chart5></Chart5>
            </div>
        </div>
    </div>
    <div class="cm-box">
        <div class="table-title">在线记录</div>
        <a-tabs v-model:active-key="data.activeKey" @change="handleChangeTab">
            <a-tab-pane
                v-for="item in data.tabs"
                :key="item.key"
                :tab="item.name"
            ></a-tab-pane>
        </a-tabs>
        <GmTable
            v-model:data="data.tableData"
            v-model:sendRequest="sendRequest"
            :is-set-null="data.activeKey != '1'"
            :headers="data.columns"
            :request-api="fetchDeviceStatusOnline"
            :send-data="dealReqData(data.formData)"
        />
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref, reactive, computed, onMounted } from 'vue';
import type { ColumnProps, FormListProps } from 'GlobComponentsModule';
import {
    fetchDeviceStatusOnline,
    fetchDeviceStatusRecords,
} from '@/api/device';
import { dealReqData, showFileDurationText } from '@/utils/tools';
import Chart6 from '../compoments/chart6.vue';
import Chart4 from '../compoments/chart4.vue';
import Chart5 from '../compoments/chart5.vue';
import commonMixin from '@/mixins';

interface Data {
    activeKey?: string;
    tabs?: any[];
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
    data = reactive<Array>({
        activeKey: '1',
        tabs: [
            {
                name: '服务记录仪',
                key: '1',
            },
            {
                name: '采集柜',
                key: '2',
            },
            {
                name: '测温随申码访客机',
                key: '3',
            },
        ],
        /** 表单list */
        list: [
            {
                type: 'input',
                name: 'deviceSn',
                label: '',
                props: {
                    placeholder: '请输入设备编号',
                    allowClear: true,
                },
            },
            {
                type: 'select',
                name: 'isAllocated',
                label: '',
                width: 160,
                props: {
                    placeholder: '请选择分配状态',
                    allowClear: true,
                },
                option: $store.getters['config/deviceStatus'],
            },
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
        formData: {},
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
                title: '设备编号',
                dataIndex: 'DevId',
            },
            {
                title: '养老院名称',
                dataIndex: 'GroupId',
                minWidth: 120,
                customRender: ({ text }) => {
                    const _list = $store.getters['common/ylyList'] || [];
                    return (
                        _list?.filter((_e: any) => _e.value == text)?.[0]
                            ?.label || ''
                    );
                },
            },
            {
                title: '在线时间',
                dataIndex: 'OnlineTime',
            },
            {
                title: '离线时间',
                dataIndex: 'OfflineTime',
            },
            {
                title: '在线时长',
                dataIndex: 'OnlineDuration',
                customRender: ({ text }) => {
                    return showFileDurationText(text);
                },
            },
        ],
    });

commonMixin(() => {
    initFn();
});

onMounted(() => {
    getInfoAjax();
});

function initFn() {
    sendRequest.value = true;
    getInfoAjax();
}
let chart6Data = reactive<any>({});
function getInfoAjax() {
    fetchDeviceStatusRecords({}).then((res: any) => {
        chart6Data = res.data?.OnlineCountStat || [];
    });
}

function handleChangeTab() {
    sendRequest.value = true;
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
.mr-15 {
    margin-right: 15px;
}
</style>
