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
    <div class="cm-box">
        <div class="table-title">在线记录</div>
        <a-tabs v-model:active-key="data.activeKey">
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
            @on-handle="handleClick"
        />
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref, reactive, computed, toRaw, createVNode, onMounted } from 'vue';
import type {
    ColumnProps,
    FormListProps,
    TableHandleOptItem,
} from 'GlobComponentsModule';
import { fetchDeviceAssignList } from '@/api/device-assign';
import { getOpsOptions, getNowDate, dealReqData } from '@/utils/tools';
import { message as $message } from 'ant-design-vue';
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
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
                type: 'select',
                name: 'status',
                label: '',
                width: 160,
                props: {
                    placeholder: '请选择设备类别',
                    allowClear: true,
                },
                option: $store.getters['common/deviceClass'] || [],
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
                title: '所属养老院',
                dataIndex: 'GroupName',
                // hidden: !isAdmin.value,
                minWidth: 120,
            },
            {
                title: '在线时长',
                dataIndex: 'OnlineDuration',
            },
            {
                title: '最近一次在线时间',
                dataIndex: 'LastOnlineTime',
                minWidth: 120,
                customRender: ({ text }) => {
                    return getNowDate(text)?.time;
                },
            },
            {
                title: '维修次数',
                dataIndex: 'RepairCount',
            },
            {
                title: '操作',
                type: 'handle',
                minWidth: 240,
                option: [
                    {
                        name: '点击查看',
                        type: 'view',
                    },
                    {
                        name: '报修',
                        type: 'edit',
                    },
                ],
            },
        ],
    });

onMounted(() => {
    refreshList();
});
commonMixin(refreshList);
function refreshList() {
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
        case '报修':
            handleToDetail(rowData);
            break;
        case '删除':
            handleDelete();
            break;
        default:
    }
}
function handleToDetail(row: any) {
    console.log(row, '---');
    $router.push(`/device-repair/detail?id=${row.DevId}`);
}

function handleDelete() {
    Modal.confirm({
        content: '确定删除吗？',
        icon: createVNode(ExclamationCircleOutlined),
        onCancel() {
            Modal.destroyAll();
        },
    });
}

// 浏览器下载
function handleDownload(row: any) {
    let fileName = row.FileName;
    let x = new XMLHttpRequest();
    $message.loading('视频下载中，请稍后...', 0);
    x.open('GET', row.Video, true);
    x.responseType = 'blob';
    x.onload = () => {
        console.log('link', row.Video);
        $message.destroy();
        $message.success('下载完成');
        let url = window.URL.createObjectURL(x.response);
        let a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
    };
    x.send();
}
</script>
