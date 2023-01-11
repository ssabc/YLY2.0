<!--
 * @Author: szhao
 * @Date: 2023-01-07 16:18:32
 * @LastEditTime: 2023-01-11 19:16:50
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
            :rules="{}"
        >
            <div class="row flex">
                <div class="column c1">
                    <div>设备基本信息：</div>
                    <div class="box">
                        <div class="sub-form">
                            <a-form-item label="设备类型：" prop="inputName">
                                <a-input
                                    v-model:value="data.formData.inputName"
                                ></a-input>
                            </a-form-item>
                            <a-form-item label="设备编号：" prop="inputName">
                                <a-input
                                    v-model:value="data.formData.inputName"
                                ></a-input>
                            </a-form-item>
                        </div>
                        <img :src="''" />
                    </div>
                </div>
                <div class="column c2">
                    <div>分配信息：</div>
                    <div class="box">
                        <div class="sub-form">
                            <a-form-item label="分配类型：" prop="inputName">
                                <a-input
                                    v-model:value="data.formData.inputName"
                                ></a-input>
                            </a-form-item>
                            <a-form-item label="养老院：" prop="inputName">
                                <a-input
                                    v-model:value="data.formData.inputName"
                                ></a-input>
                            </a-form-item>
                            <a-form-item label="时间：" prop="inputName">
                                <a-range-picker
                                    v-model:value="data.formData.inputName"
                                />
                            </a-form-item>
                        </div>
                        <a-table
                            :data-source="data.tableData"
                            :columns="data.columns"
                        />
                    </div>
                </div>
            </div>
            <a-form-item :wrapper-col="{ span: 14, offset: 10 }">
                <a-button type="primary" @click="onSubmit">保存</a-button>
                <a-button style="margin-left: 10px" @click="handleBack"
                    >返回</a-button
                >
            </a-form-item>
        </a-form>
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { reactive, toRaw } from 'vue';
import type { FormListProps } from 'GlobComponentsModule';
import type { ColumnProps } from 'GlobComponentsModule';
import { useRouter } from 'vue-router';

interface Data {
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

const $store = useStore(),
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
                    placeholder: '请选择设备类别',
                    allowClear: true,
                },
                option: $store.getters['common/recordTypes'] || [],
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
                option: $store.getters['common/recordTypes'] || [],
            },
            {
                type: 'select',
                name: 'status',
                label: '',
                width: 160,
                props: {
                    placeholder: '请选择设备分配状态',
                    allowClear: true,
                },
                option: $store.getters['common/recordTypes'] || [],
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
                title: '设备编号',
                dataIndex: 'Sn',
            },
            {
                title: '分配类型',
                dataIndex: 'Name',
            },
            {
                title: '分配时间',
                dataIndex: 'Dept',
                minWidth: 120,
            },
        ],
    });

/**
 * @description: table 项操作
 */
const onSubmit = () => {
    console.log('submit!', toRaw(data.formData));
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
