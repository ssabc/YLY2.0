
<template>
    <GmForm
        v-model:data="data.formData"
        :list="data.list"
        :rules="data.rules"
        @on-handle="handleClick"
    >
        <template #testSlot="{ data: d }">
            <a-rate v-model:value="data.formData.testSlot" />
        </template>
    </GmForm>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { FormListProps } from 'GlobComponentsModule';

interface Data {
    formData: {
        inputName?: string;
    };
    list: FormListProps[];
    rules: object;
}

const data = reactive<Data>({
    list: [
        {
            type: 'input',
            name: 'inputName',
            label: '输入框',
            required: true,
        },
        {
            type: 'select',
            name: 'select',
            label: '选择框',
            option: [
                {
                    label: 'label',
                    value: 1,
                },
            ],
        },
        {
            type: 'slot',
            name: 'testSlot',
            label: '插槽',
        },
        {
            type: 'date-picker',
            name: 'date-picker',
            label: '日期选择',
        },
        {
            type: 'range-picker',
            name: 'range-picker',
            label: '日期时间选择',
        },
        {
            type: 'switch',
            name: 'switch',
            label: '开关切换',
        },
        {
            type: 'checkbox-group',
            name: 'checkbox-group',
            label: '多选框组',
            option: [
                {
                    label: 'label',
                    value: 1,
                },
            ],
        },
        {
            type: 'radio-group',
            name: 'radio-group',
            label: '单选框组',
            option: [
                {
                    label: 'label',
                    value: 1,
                },
            ],
        },
        {
            type: 'textarea',
            name: 'textarea',
            label: '文本',
            option: [
                {
                    label: 'label',
                    value: 1,
                },
            ],
        },
        {
            type: 'handle',
            name: 'handle',
            label: '操作',
            option: [
                {
                    label: '提交',
                    value: 'submit',
                },
                {
                    label: '重置',
                    value: 'reset',
                },
            ],
        },
    ],
    formData: {},
    rules: {
        inputName: [
            {
                required: true,
                message: 'Please input Activity name',
                trigger: 'blur',
            },
            {
                min: 3,
                max: 5,
                message: 'Length should be 3 to 5',
                trigger: 'blur',
            },
        ],
    },
});

function handleClick(item: any) {
    console.log(item, '表单点击事件回调');
}
</script>
