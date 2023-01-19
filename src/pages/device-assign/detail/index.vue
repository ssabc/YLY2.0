<!--
 * @Author: szhao
 * @Date: 2023-01-07 16:18:32
 * @LastEditTime: 2023-01-19 11:11:23
 * @LastEditors: szhao
 * @Description:
-->
<template>
    <div class="cm-box">
        <a-form
            ref="refForm"
            class="gm-form"
            :label-col="{ style: { width: '80px' } }"
            :model="data.formData"
            :disabled="true"
            :rules="rules"
        >
            <div class="row flex">
                <div class="column c1">
                    <div>设备基本信息：</div>
                    <div class="box">
                        <div class="sub-form">
                            <a-form-item label="设备类型：" prop="deviceType">
                                <a-input
                                    v-model:value="data.formData.deviceType"
                                    disabled
                                ></a-input>
                            </a-form-item>
                            <a-form-item label="设备编号：" prop="DeviceSn">
                                <a-input
                                    v-model:value="data.formData.DeviceSn"
                                    disabled
                                ></a-input>
                            </a-form-item>
                        </div>
                        <!-- <img :src="''" /> -->
                        <div class="img">设备照片</div>
                    </div>
                </div>
                <div class="column c2">
                    <div>分配信息：</div>
                    <div class="box">
                        <div class="sub-form">
                            <a-form-item label="分配类型：" prop="serviceType">
                                <a-select
                                    v-model:value="data.formData.serviceType"
                                >
                                    <a-select-option
                                        v-for="ele of typeList"
                                        :key="ele['value']"
                                        :value="ele['value']"
                                    >
                                        {{ ele['label'] }}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item label="养老院：" prop="groupId">
                                <a-select
                                    v-model:value="data.formData.groupId"
                                    disabled
                                >
                                    <a-select-option
                                        v-for="ele of ylyList"
                                        :key="ele['value']"
                                        :value="ele['value']"
                                    >
                                        {{ ele['label'] }}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                            <!-- <a-form-item label="开始时间：" prop="startTime">
                                <a-date-picker
                                    v-model:value="data.formData.startTime"
                                    :format="'YYYY-MM-DD'"
                                />
                            </a-form-item>
                            <a-form-item label="结束时间：" prop="endTime">
                                <a-date-picker
                                    v-model:value="data.formData.endTime"
                                    :format="'YYYY-MM-DD'"
                                />
                            </a-form-item> -->
                        </div>
                        <a-table
                            :data-source="data.tableData"
                            :columns="data.columns"
                        />
                    </div>
                </div>
            </div>
            <div style="padding: 20px 0">
                <a-form-item :wrapper-col="{ span: 14, offset: 10 }">
                    <a-button v-show="isEdit" type="primary" @click="onSubmit"
                        >保存</a-button
                    >
                    <a-button style="margin-left: 10px" @click="handleBack"
                        >返回</a-button
                    >
                </a-form-item>
            </div>
        </a-form>
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { ref, reactive, toRaw, computed, watch } from 'vue';
import { message as $message } from 'ant-design-vue';
import type { ColumnProps } from 'GlobComponentsModule';
import { useRouter, useRoute } from 'vue-router';
import {
    fetchDeviceDetailById,
    fetchDeviceAssignAllocation,
    fetchDeviceAssignAllocationHistory,
} from '@/api/device';
import { getNowDate } from '@/utils/tools';

interface Data {
    formData: {
        inputName?: string;
    };
    tableData: Item[];
    columns: ColumnProps[];
    rules: object;
    info: object;
    historyList: [];
}
interface Item {
    deviceId: string;
    sn: string;
    groupId: string;
    upgradeStatus: string;
}

const $store = useStore(),
    $route = useRoute(),
    $router = useRouter(),
    ylyList = computed(() => $store.getters['common/ylyList']),
    typeList = computed(() => $store.getters['config/recordTypes']),
    data = reactive<Data>({
        /** 表单数据 */
        formData: {},
        rules: {
            serviceType: {
                required: true,
                message: '请输入设备类型',
                trigger: 'blur',
            },
            devId: {
                required: true,
                message: '请输入设备编号',
                trigger: 'blur',
            },
            groupId: {
                required: true,
                message: '请选择养老院',
                trigger: 'blur',
            },
            startTime: {
                required: true,
                message: '请输入开始时间',
                trigger: 'blur',
            },
            endTime: {
                required: true,
                message: '请输入结束时间',
                trigger: 'blur',
            },
        },
        /** 列表数据 */
        tableData: [],
        /** 列表项 */
        columns: [
            {
                title: '设备编号',
                dataIndex: 'DeviceSn',
            },
            {
                title: '分配类型',
                dataIndex: 'ServiceType',
            },
            {
                title: '分配时间',
                dataIndex: 'AllocationTime',
                minWidth: 120,
            },
        ],
        info: {},
        historyList: [],
    });

let isEdit = ref<boolean>(false);
watch(
    () => $route.query.id,
    (e) => {
        isEdit.value = $route.query.type == 1;
        e && initFn(e);
    },
    {
        immediate: true,
    }
);

function initFn(devId: any) {
    fetchDeviceDetailById({ devId }).then((res) => {
        const _d = (data.info = res.data ?? {});
        data.formData = {
            deviceType: '服务记录仪',
            // startTime: _d.AllocationTime
            //     ? getNowDate(+_d.AllocationTime * 1000)?.time
            //     : '',
            // endTime: getNowDate(+_d.LastOnlineTime * 1000)?.time,
            devId: _d.DevId,
            groupId: _d.GroupId,
            serviceType: _d.ServiceType,
            DeviceSn: _d.DeviceSn,
        };
    });

    fetchDeviceAssignAllocationHistory({ devId }).then((res) => {
        console.log(res);
        data.tableData = res.data ?? [];
    });
}
/**
 * @description: table 项操作
 */
const onSubmit = () => {
    const { serviceType } = data.formData;
    if (!serviceType) {
        $message.error('存在必填项未填');
        return;
    }
    // if (startTime && endTime && new Date(startTime) > new Date(endTime)) {
    //     $message.error('开始日期不能大于结束日期');
    //     return;
    // }
    const _q = Object.assign({}, toRaw(data.formData), {
        // startTime: getNowDate(data.formData.startTime)?.time,
        // endTime: getNowDate(data.formData.endTime)?.time,
    });
    console.log('submit!', _q);
    fetchDeviceAssignAllocation(_q).then(() => {
        $message.success('提交成功');
        handleBack();
    });
};
const handleBack = () => {
    $router.go(-1);
};
</script>
<style lang="less" scoped>
.cm-box {
    padding-top: 20px;
}
.sub-form {
    max-width: 400px;
}
.img {
    width: 100%;
    background-color: #999;
    height: 200px;
    text-align: center;
    color: #fff;
}
.row {
    display: flex;
    .column {
        min-width: 300px;
        padding: 0 10px;
        &.c1 {
            flex: 1;
            margin-right: 15px;
        }
        &.c2 {
            flex: 2;
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
.box {
    border: 1px solid #efefef;
    border-radius: 10px;
    padding: 20px;
}
</style>
