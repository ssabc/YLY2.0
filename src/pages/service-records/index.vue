<template>
    <GmForm
        v-model:data="data.formData"
        :list="data.list"
        layout="inline"
        @on-handle="sendRequest = true"
    >
    </GmForm>
    <div class="cells">
        <div v-for="item in statisList" :key="item.name" class="cell">
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
                <div class="bt">查看 〉〉</div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column c1">
            <div>数据记录</div>
            <Chart2 :yly-flag="true"></Chart2>
        </div>
        <div class="column c2">
            <div>
                <div class="time-desc">24小时新增时长排名</div>
                <div class="time-cells">
                    <div
                        v-for="item in timeList"
                        :key="item.name"
                        class="time-cell"
                    >
                        <div>
                            <div class="value">
                                {{ item.name }}{{ item.unit }}
                            </div>
                            <div class="label">{{ item.name }}</div>
                        </div>
                        <div class="icon"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref, reactive, computed } from 'vue';
import type { FormListProps } from 'GlobComponentsModule';
import { DiffOutlined } from '@ant-design/icons-vue';
import Chart2 from './compoments/chart2.vue';

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
                label: '可用时间',
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
            name: '值班长记录总时长',
            value: 100,
            color: '#1d66d6',
            icon: DiffOutlined,
            unit: '分钟',
        },
        {
            name: '服务提供记录总时长',
            value: 100,
            color: '#28d094',
            icon: DiffOutlined,
            unit: '分钟',
        },
        {
            name: '服务保障记录总时长',
            value: 100,
            color: '#FDDB78',
            icon: DiffOutlined,
            unit: '分钟',
        },
        {
            name: '服务安全记录总时长',
            value: 100,
            color: '#FA746B',
            icon: DiffOutlined,
            unit: '分钟',
        },
    ]),
    timeList = computed(() => [
        {
            name: '养老院1',
            value: 56,
            unit: '分钟',
        },
        {
            name: '养老院2',
            value: 56,
            unit: '分钟',
        },
        {
            name: '养老院3',
            value: 56,
            unit: '分钟',
        },
        {
            name: '养老院14',
            value: 56,
            unit: '分钟',
        },
        {
            name: '养老院5',
            value: 56,
            unit: '分钟',
        },
    ]);
</script>
<style lang="less" scoped>
.cells {
    display: flex;
    padding: 10px 0;
    .cell {
        flex: 1;
        background-color: #efefef;
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
