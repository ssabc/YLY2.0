<template>
    <a-form
        ref="refForm"
        class="gm-form"
        v-bind="$props"
        :model="formData"
        :rules="rules"
    >
        <a-form-item
            class="gm-form-item"
            v-for="item of list.filter((_e: any) => !_e.hidden)"
            v-bind="item.itemProps"
            :key="item.name"
            :name="item.name"
            :label="item.label"
            :required="item.required"
            :colon="item.colon == null ? false : item.colon"
            label-align="left"
        >
            <a-input
                v-if="item.type === 'input'"
                v-model:value.trim="formData[item.name]"
                v-bind="item.props"
                allow-clear
                @change="
                    handleChage({ key: item.name, value: formData[item.name] })
                "
                @blur="
                    handleChage({
                        key: item.name,
                        value: formData[item.name],
                        type: 'blur',
                    })
                "
                @press-enter="$emit('press-enter', $event)"
            />
            <a-input-password
                v-else-if="item.type === 'input-password'"
                v-bind="item.props"
                v-model:value="formData[item.name]"
                @change="
                    handleChage({ key: item.name, value: formData[item.name] })
                "
                @blur="
                    handleChage({
                        key: item.name,
                        value: formData[item.name],
                        type: 'blur',
                    })
                "
                @press-enter="$emit('press-enter', $event)"
            />
            <a-select
                v-else-if="item.type === 'select'"
                v-bind="item.props"
                v-model:value="formData[item.name]"
                :style="{ width: item.width ? item.width + 'px' : 'auto' }"
            >
                <a-select-option
                    v-for="ele of item.option"
                    :key="ele[item.valueName || 'value']"
                    :value="ele[item.valueName || 'value']"
                >
                    {{ ele[item.labelName || 'label'] }}
                </a-select-option>
            </a-select>
            <a-date-picker
                v-else-if="item.type === 'date-picker'"
                v-bind="item.props"
                v-model:value="formData[item.name]"
            />
            <a-range-picker
                v-else-if="item.type === 'range-picker'"
                v-bind="item.props"
                v-model:value="formData[item.name]"
            />
            <a-switch
                v-else-if="item.type === 'switch'"
                v-bind="item.props"
                v-model:checked="formData[item.name]"
            />
            <a-checkbox-group
                v-else-if="item.type === 'checkbox-group'"
                v-bind="item.props"
                v-model:value="formData[item.name]"
            >
                <a-checkbox
                    v-for="ele of item.option"
                    :key="ele[item.valueName || 'value']"
                    :value="ele[item.valueName || 'value']"
                >
                    {{ ele[item.labelName || 'label'] }}
                </a-checkbox>
            </a-checkbox-group>
            <a-radio-group
                v-else-if="item.type === 'radio-group'"
                v-bind="item.props"
                v-model:value="formData[item.name]"
            >
                <a-radio
                    v-for="ele of item.option"
                    :key="ele[item.valueName || 'value']"
                    :value="ele[item.valueName || 'value']"
                >
                    {{ ele[item.labelName || 'label'] }}
                </a-radio>
            </a-radio-group>
            <a-textarea
                v-else-if="item.type === 'textarea'"
                v-bind="item.props"
                v-model:value="formData[item.name]"
            />
            <div
                v-else-if="item.type === 'text'"
                v-text="formData[item.name]"
            ></div>
            <template v-else-if="item.type === 'slot'">
                <slot :data="item" :name="item.name" />
            </template>
            <div v-else-if="item.type === 'handle'">
                <a-button
                    v-for="ele of item.option"
                    :key="ele[item.valueName || 'value']"
                    class="btn"
                    v-bind="ele.props"
                    @click="handleClick(ele, ele[item.valueName || 'value'])"
                >
                    {{ ele[item.labelName || 'label'] }}
                </a-button>
            </div>
            <template v-if="item.type === 'slot'">
                <slot :data="item" :name="`${item.name}-label`" />
            </template>
            <div class="unit" v-if="item.unit">
                {{ item.unit?.text }}
            </div>
        </a-form-item>
        <!-- 额外的按钮操作 -->
        <slot name="externalBtns"></slot>
    </a-form>
</template>

<script setup lang="ts">
import type { FormListProps } from 'GlobComponentsModule';
import { ref, computed } from 'vue';
import { Moment } from 'moment';

interface Props {
    data: any; // 表单数据对象
    list: FormListProps[]; // 表单项集合
    rules?: object; // 表单验证规则
}

const dates = ref<Moment[]>([]);
const disabledDate = (current: Moment) => {
    if (!dates.value || dates.value.length === 0) {
        return false;
    }
    const diffDate = current.diff(dates.value[0], 'days');
    return Math.abs(diffDate) > 7;
};

const $props = defineProps<Props>(),
    $emit = defineEmits<{
        (event: 'update:data', v: object): void;
        (event: 'on-handle', v: object): void;
        (event: 'press-enter', v: object): void;
    }>();
// 表单ref
const refForm = ref();

let formData = ref<any>({});

formData = computed({
    get: () => $props.data,
    set(v) {
        $emit('update:data', v);
    },
});
/**
 * @description: 统一处理click
 */
function handleClick(item: any, type: string) {
    switch (type) {
        case 'submit':
            refForm.value
                .validate()
                .then(() => {
                    $emit('on-handle', item);
                })
                .catch((error: any) => {
                    console.log('error', error);
                });
            break;
        case 'reset':
            refForm.value.resetFields();
            $emit('on-handle', item);
            break;
        case 'resetFields':
            refForm.value.resetFields();
            break;
        default:
            $emit('on-handle', item);
    }
}
/**
 * @description: 统一处理change
 */
function handleChage({
    key,
    value,
    type,
}: {
    key: string;
    value: any;
    type?: 'blur';
}) {
    formData.value = {
        ...formData.value,
        [key]: type === 'blur' ? value?.trim() : value?.trimStart(),
    };
}

defineExpose({
    handleClick,
    refForm,
});
</script>

<style lang="less" scoped>
.ant-form-inline .ant-form-item {
    margin-bottom: 8px;
}

.gm-form {
    .btn {
        margin-right: 16px;

        &:last-of-type {
            margin-right: 0;
        }
    }
}
:deep(.gm-form-item .ant-form-item-control-input-content) {
    display: flex;
    align-items: flex-end;
    .unit {
        color: #666;
        margin-left: 4px;
    }
}
</style>
