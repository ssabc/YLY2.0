<!--
 * @Author: szhao
 * @Date: 2023-01-07 16:18:32
 * @LastEditTime: 2023-01-19 11:02:32
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
            :rules="rules"
        >
            <div class="row flex">
                <div class="column c1">
                    <div>设备基本信息：</div>
                    <div class="box">
                        <div class="sub-form">
                            <a-form-item label="设备类型：" prop="deviceAType">
                                <a-input
                                    v-model:value="data.formData.deviceType"
                                    disabled
                                ></a-input>
                            </a-form-item>
                            <a-form-item label="设备编号：" prop="devId">
                                <a-input
                                    v-model:value="data.formData.devId"
                                    disabled
                                ></a-input>
                            </a-form-item>
                        </div>
                        <!-- <img :src="''" /> -->
                        <div class="img">设备照片</div>
                    </div>
                </div>
                <div class="column c2">
                    <div>报修信息：</div>
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
                                <a-select v-model:value="data.formData.groupId">
                                    <a-select-option
                                        v-for="ele of ylyList"
                                        :key="ele['value']"
                                        :value="ele['value']"
                                    >
                                        {{ ele['label'] }}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item label="故障描述：" prop="describe">
                                <a-input
                                    v-model:value="data.formData.describe"
                                    type="textarea"
                                ></a-input>
                            </a-form-item>
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
import type { FormListProps } from 'GlobComponentsModule';
import type { ColumnProps } from 'GlobComponentsModule';
import { useRouter, useRoute } from 'vue-router';
import {
    fetchDeviceDetailById,
    fetchDeviceAssignRepair,
    fetchDeviceAssignRepairHistory,
} from '@/api/device';

interface Data {
    formData: {
        deviceType?: string;
    };
    list: FormListProps[];
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
                option: $store.getters['config/recordTypes'],
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
                name: 'status',
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
                    placeholder: '请选择设备分配状态',
                    allowClear: true,
                },
                option: $store.getters['config/recordTypes'],
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
            deviceType: '服务记录仪',
        },
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
                title: '报修时间',
                dataIndex: 'RepairTime',
            },
            {
                title: '修复时间',
                dataIndex: 'FinishTime',
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
            describe: _d.Describe,
            devId: _d.DevId,
            groupId: _d.GroupId,
            serviceType: _d.ServiceType,
            DeviceSn: _d.DeviceSn,
        };
    });

    fetchDeviceAssignRepairHistory({ devId }).then((res) => {
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
    console.log('submit!', toRaw(data.formData));
    fetchDeviceAssignRepair(data.formData).then((res) => {
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
