<template>
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
    <div class="row">
        <div class="column c1 cm-box mr-15">
            <div>采集柜在线统计</div>
            <Chart2 :yly-flag="true"></Chart2>
        </div>
        <div class="column c1 cm-box">
            <div>数字哨兵在线统计</div>
            <Chart3 :yly-flag="true"></Chart3>
        </div>
    </div>
    <div class="row">
        <div class="column c1 cm-box">
            <div>访客数量统计（每周）</div>
            <Chart1 :yly-flag="true"></Chart1>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref, reactive, computed, onMounted } from 'vue';
import type { FormListProps } from 'GlobComponentsModule';
import { DiffOutlined } from '@ant-design/icons-vue';
import Chart1 from './compoments/chart1.vue';
import Chart2 from './compoments/chart2.vue';
import Chart3 from './compoments/chart3.vue';
import { fetchDeviceStatus } from '@/api/app';
import commonMixin from '@/mixins';

interface Data {
    formData: {
        inputName?: string;
    };
    list: FormListProps[];
}
let sendRequest = ref(false);

const $store = useStore(),
    isAdmin = computed(() => $store.getters['common/isAdmin']),
    $router = useRouter(),
    data = reactive<Data>({
        /** 表单list */
        list: [
            {
                type: 'select',
                name: 'status',
                label: '',
                width: 160,
                props: {
                    placeholder: '请选择记录类型',
                    allowClear: true,
                },
                option: $store.getters['common/recordTypes'] || [],
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
    }),
    statisList = computed(() => [
        {
            name: '设备总数',
            value: 113,
            color: '#1d66d6',
            icon: DiffOutlined,
            unit: '',
        },
        {
            name: '服务记录仪',
            value: 99,
            color: '#28d094',
            icon: DiffOutlined,
            unit: '',
        },
        {
            name: '采集柜',
            value: 4,
            color: '#FDDB78',
            icon: DiffOutlined,
            unit: '',
        },
        {
            name: '数字哨兵',
            value: 10,
            color: '#FA746B',
            icon: DiffOutlined,
            unit: '',
        },
    ]);

onMounted(() => {
    getInfoAjax();
});
commonMixin(getInfoAjax);
function handleView() {
    $router.push(`/devices-status/usage-record`);
}

function getInfoAjax() {
    const req = data.formData;
    fetchDeviceStatus(req).then((res: any) => {
        data.info = res.data;
    });
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
.mr-15 {
    margin-right: 15px;
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
