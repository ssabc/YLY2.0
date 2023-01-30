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
                <Chart1></Chart1>
            </div>
            <div class="column c1">
                <div>分时段访客统计（7日）</div>
                <Chart2></Chart2>
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
import { useRouter } from 'vue-router';
import { ref, reactive, computed } from 'vue';
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
    });
commonMixin(() => (sendRequest.value = true));
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
