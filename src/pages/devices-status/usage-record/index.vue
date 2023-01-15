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
            <div>访客数量统计（每周）</div>
            <Chart1 :yly-flag="true"></Chart1>
        </div>
        <div class="column c1 c2">
            <div class="cm-box">
                <div>采集柜在线统计</div>
                <Chart4 :yly-flag="true"></Chart4>
            </div>
            <div class="cm-box">
                <div>数字哨兵在线统计</div>
                <Chart5 :yly-flag="true"></Chart5>
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
            :headers="data.columns"
            :request-api="fetchDeviceAssignList"
            :send-data="dealReqData(data.formData)"
        />
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref, reactive, computed } from 'vue';
import type { ColumnProps, FormListProps } from 'GlobComponentsModule';
import { fetchDeviceAssignList } from '@/api/device-assign';
import { dealReqData } from '@/utils/tools';
import Chart1 from '../compoments/chart1.vue';
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
    data = reactive<Data>({
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
                name: '数字哨兵',
                key: '3',
            },
        ],
        /** 表单list */
        list: [
            {
                type: 'input',
                name: 'name',
                label: '',
                props: {
                    placeholder: '请输入设备编号',
                    allowClear: true,
                },
            },
            {
                type: 'select',
                name: 'status',
                label: '',
                width: 160,
                props: {
                    placeholder: '请选择运行状态',
                    allowClear: true,
                },
                option: $store.getters['common/deviceStatus'] || [],
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
                dataIndex: 'Sn',
            },
            {
                title: '养老院名称',
                dataIndex: 'GroupName',
                minWidth: 120,
            },
            {
                title: '在线时间',
                dataIndex: 'AllocationTime',
            },
            {
                title: '离线时间',
                dataIndex: 'AllocationTime',
            },
            {
                title: '在线时长',
                dataIndex: 'OnlineDuration',
            },
        ],
    });
commonMixin(() => (sendRequest.value = true));
function handleChangeTab(e) {
    console.log(e);
    if (e != 1) {
        data.tableData = [];
        return;
    }
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
