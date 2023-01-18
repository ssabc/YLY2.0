<template>
    <div class="cm-box">
        <GmForm
            v-model:data="data.formData"
            :list="data.list"
            layout="inline"
            @on-handle="handleFormClick"
        >
        </GmForm>
    </div>
    <div class="cells">
        <div v-for="(item, idx) in statisList" :key="item.name" class="cell">
            <div
                class="lf icon-wrap"
                :style="{ 'background-color': item.color }"
            >
                <component :is="item.icon"></component>
            </div>
            <div class="ct">
                <div class="label">{{ item.name }}</div>
                <div class="value">
                    <span class="main" :style="{ color: item.color }">{{
                        item.value
                    }}</span>
                    <div class="unit">{{ item.unit }}</div>
                </div>
                <div class="bt" @click="handleView(idx)">查看 〉〉</div>
            </div>
        </div>
    </div>
    <div class="cm-box">
        <div class="table-title">分配明细</div>
        <GmTable
            v-model:data="data.tableData"
            v-model:sendRequest="sendRequest"
            :headers="data.columns"
            :request-api="fetchDeviceAssignList"
            :send-data="dealReqData(data.formData)"
            @on-handle="handleClick"
        />
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref, reactive, computed, toRaw, onMounted } from 'vue';
import type { FormListProps } from 'GlobComponentsModule';
import { DiffOutlined } from '@ant-design/icons-vue';
import type { ColumnProps, TableHandleOptItem } from 'GlobComponentsModule';
import { fetchDeviceAssignList, fetchDeviceAssignStat } from '@/api/device';
import { getNowDate, dealReqData } from '@/utils/tools';
import commonMixin from '@/mixins';

interface Data {
    formData: {
        inputName?: string;
    };
    list: FormListProps[];
    tableData: Item[];
    columns: ColumnProps[];
    info: any;
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
    typeList = computed(() => $store.getters['config/deviceAssignStatus']),
    data = reactive<Data>({
        /** 表单list */
        list: [
            {
                type: 'select',
                name: 'status1',
                label: '',
                width: 160,
                props: {
                    placeholder: '请选择设备类别',
                    allowClear: true,
                },
                option: $store.getters['config/deviceClass'],
            },
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
                name: 'status2',
                label: '',
                width: 160,
                props: {
                    placeholder: '请选择设备分类',
                    allowClear: true,
                },
                option: $store.getters['config/recordTypes'],
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
                option: $store.getters['config/deviceAssignStatus'],
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
                title: '设备类别',
                dataIndex: 'Name',
                customRender: () => {
                    return '服务记录仪';
                },
            },
            {
                title: '设备编号',
                dataIndex: 'DeviceSn',
            },
            {
                title: '设备分类',
                dataIndex: 'ServiceType',
            },
            {
                title: '所属养老院',
                dataIndex: 'GroupName',
                minWidth: 120,
            },
            {
                title: '运行状态',
                dataIndex: 'Name',
            },
            {
                title: '分配日期',
                dataIndex: 'AllocationTime',
                customRender: ({ text }) => {
                    return getNowDate(text)?.time;
                },
            },
            {
                title: '操作',
                type: 'handle',
                minWidth: 120,
                option: [
                    {
                        name: '点击查看',
                        type: 'view',
                    },
                    {
                        name: '编辑',
                        type: 'edit',
                    },
                ],
            },
        ],
        info: {
            Total: 0,
            Allocated: 0,
        },
    }),
    statisList = computed(() => [
        {
            name: '设备总数',
            value: 100,
            color: '#1d66d6',
            icon: DiffOutlined,
            unit: '',
        },
        {
            name: '已分配',
            value: data.info?.Allocated,
            color: '#28d094',
            icon: DiffOutlined,
            unit: '',
        },
        {
            name: '未分配',
            value: data.info?.Total - data.info?.Allocated,
            color: '#FDDB78',
            icon: DiffOutlined,
            unit: '',
        },
    ]);

onMounted(() => {
    refreshList();
});
commonMixin(refreshList);
function getInfoAjax() {
    const req = data.formData;
    fetchDeviceAssignStat(req).then((res: any) => {
        data.info = res.data;
    });
}

function refreshList() {
    getInfoAjax();
    sendRequest.value = true;
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

/**
 * @description: table 项操作
 */
function handleClick(item: TableHandleOptItem, row: any) {
    const { name } = item;
    const rowData = toRaw(row);
    switch (name) {
        case '点击查看':
            handleToDetail(rowData);
            break;
        case '编辑':
            handleToDetail(rowData);
            break;
        default:
    }
}
function handleToDetail(row: any) {
    console.log(row, '---');
    $router.push(`/device-assign/detail?id=${row.DevId}`);
}

function handleView(idx: number) {
    const _t = statisList.value?.[idx];

    if (
        _t?.name &&
        typeList.value?.map((_e: any) => _e.label).includes(_t?.name)
    ) {
        const type = typeList.value?.filter(
            (_e: any) => _e.label === _t?.name
        )?.[0]?.value;
        $router.push(`/device-assign/list?type=${type}`);
        return;
    }
    $router.push(`/device-assign/list`);
}
</script>
<style lang="less" scoped>
.cells {
    display: flex;
    padding: 10px 0;
    .cell {
        flex: 1;
        background-color: #fff;
        border-radius: 4px;
        margin-right: 10px;
        display: flex;
        align-items: center;
        padding: 10px;
        &:last-child {
            margin-right: 0;
        }
        .icon-wrap {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            font-size: 22px;
            margin-right: 10px;
        }
        .ct {
            padding-top: 5px;
            color: #999;
            font-size: 12px;
            flex: 1;
            .value {
                padding: 10px 0;
                display: flex;
                align-items: flex-end;
                .main {
                    font-size: 22px;
                    font-weight: bold;
                    margin-right: 10px;
                }
            }
            .bt {
                color: #02a7f0;
                cursor: pointer;
                text-align: right;
            }
        }
    }
}
.row {
    display: flex;
    .column {
        &.c1 {
            flex: 1;
        }
        &.c2 {
            width: 300px;
            height: 100%;
            .time-desc {
                padding: 20px 0;
            }
            .time-cells {
                .time-cell {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-top: 1px solid #efefef;
                    padding: 20px 0;
                    .value {
                        font-size: 18px;
                    }
                    .label {
                        color: #999;
                    }
                    .icon {
                        width: 6px;
                        height: 6px;
                        background-color: red;
                        border-radius: 50%;
                    }
                }
            }
        }
    }
}
</style>
