<template>
    <div class="cm-box">
        <GmForm
            v-model:data="data.formData"
            :list="data.list"
            layout="inline"
            @on-handle="handleSearch"
        >
        </GmForm>
    </div>
    <div class="cells">
        <div
            v-for="(item, idx) in data.statisList"
            :key="item.name"
            class="cell"
        >
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
    <div class="row cm-box">
        <div class="column c1">
            <div>数据记录</div>
            <Chart2 :p-data="data.chartData"></Chart2>
        </div>
    </div>
    <div class="cm-box">
        <div class="table-title">24小时新增记录</div>
        <GmTable
            v-model:data="data.fileRank"
            :custom-row="onRow"
            :pagination="false"
            :headers="data.columns"
        />
    </div>
</template>

<script setup lang="ts" name="ServiceRecordsIndex">
import { useStore } from 'vuex';
import { reactive, onMounted } from 'vue';
import type { FormListProps } from 'GlobComponentsModule';
import { DiffOutlined } from '@ant-design/icons-vue';
import Chart2 from './compoments/chart2.vue';
import { fetchServiceRecord } from '@/api/service-records';
import {
    getReqData,
    GetNumberOfDays,
    second2minutes,
    showFileDurationText,
} from '@/utils/tools';
import { message as $message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import commonMixin from '@/mixins';

interface Data {
    formData: {
        serviceType?: string;
        date?: any[];
        columns?: any[];
    };
    list: FormListProps[];
    statisList?: any[];
    chartData?: any;
    fileRank?: any[];
}

const $store = useStore(),
    data = reactive<Data>({
        /** 表单list */
        list: [
            {
                type: 'select',
                name: 'serviceType',
                label: '',
                width: 160,
                props: {
                    placeholder: '请选择记录类型',
                    allowClear: true,
                },
                option: $store.getters['config/recordTypes'],
            },
            {
                type: 'select',
                name: 'FileTag',
                label: '服务内容：',
                props: {
                    placeholder: '请选择服务内容',
                    allowClear: true,
                },
                option: $store.getters['common/fileTags'],
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
        statisList: [],
        chartData: [],
        fileRank: [],
        /** 列表项 */
        columns: [
            {
                title: '序号',
                type: 'index',
                width: 80,
                dataIndex: 'index',
            },
            {
                title: '养老院',
                dataIndex: 'GroupName',
            },
            {
                title: '记录时长',
                dataIndex: 'FileDuration',
                customRender: ({ text }) => {
                    return showFileDurationText(text);
                },
            },
            {
                title: '设备号',
                dataIndex: 'DeviceSn',
            },
            {
                title: '记录类型',
                dataIndex: 'ServiceType',
            },
        ],
    }),
    $router = useRouter();

onMounted(() => {
    getInfoAjax();
});
commonMixin(getInfoAjax);

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
    fetchServiceRecord(req).then((res: any) => {
        setStatisList(res.data?.TotalDuration || {});
        data.chartData = {
            chart1: {
                legend: data.statisList
                    ?.filter(
                        (_e) =>
                            !data.formData.serviceType ||
                            _e.aliseName === data.formData.serviceType
                    )
                    ?.map((_e) => ({
                        name: _e.aliseName,
                        color: _e.color,
                    })),
                list: res.data?.DataRecord || [],
            },
        };
        data.fileRank = res.data.LastFile || [];
    });
}
function onRow(item: any) {
    return {
        onClick: () => {
            if (!item.ServiceType) {
                return;
            }
            const fileId = item.FileId;
            fileId &&
                $router.push(`/service-records/video-detail?id=${fileId}&type=1`);
        }, // 点击行
    };
}

function setStatisList(_t: any) {
    const _fn1 = (_d: any) => {
        const _fn = (_e: any, _key: string) => {
            return second2minutes(
                _e?.filter((_s: any) => _s?.ServiceType === _key)?.[0]
                    ?.TotalFileDuration || 0
            );
        };
        return [
            {
                name: '值班长记录总时长',
                aliseName: '值班长',
                value: _fn(_d, '值班长'),
                color: '#1d66d6',
                icon: DiffOutlined,
                unit: '分钟',
            },
            {
                name: '服务提供记录总时长',
                aliseName: '服务提供',
                value: _fn(_d, '服务提供'),
                color: '#28d094',
                icon: DiffOutlined,
                unit: '分钟',
            },
            {
                name: '服务保障记录总时长',
                aliseName: '服务保障',
                value: _fn(_d, '服务保障'),
                color: '#FDDB78',
                icon: DiffOutlined,
                unit: '分钟',
            },
            {
                name: '服务安全记录总时长',
                aliseName: '服务安全',
                value: _fn(_d, '服务安全'),
                color: '#FA746B',
                icon: DiffOutlined,
                unit: '分钟',
            },
        ];
    };
    data.statisList = _fn1(_t);
}

function handleSearch() {
    getInfoAjax();
}

function handleView(idx: number) {
    $router.push(`/service-records/list/${idx}`);
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
                max-height: 400px;
                overflow-y: auto;
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
                        width: 12px;
                        height: 12px;
                        background-color: red;
                        border-radius: 50%;
                    }
                }
            }
        }
    }
}
</style>
