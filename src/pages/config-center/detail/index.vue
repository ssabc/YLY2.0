<!--
 * @Author: zhaoshan
 * @Date: 2022-11-30 14:10:30
 * @LastEditTime: 2023-02-01 22:15:59
 * @LastEditors: sZhao
 * @Description:
-->
<template>
    <div class="cm-box">
        <div class="form-wrap">
            <GmForm
                v-model:data="formData"
                :list="list"
                :label-col="{ style: { width: '180px' } }"
                @on-handle="handleClick"
            ></GmForm>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { watch, reactive } from 'vue';
import { feachNurseHomeDetail, saveNurseHome } from '@/api/config-center';
import { message as $message } from 'ant-design-vue';

const $router = useRouter(),
    $route = useRoute(),
    list = reactive<any[]>([
        {
            type: 'input',
            name: 'GroupName',
            label: '养老院名称：',
            props: {
                placeholder: '',
                disabled: true,
            },
        },
        {
            type: 'input',
            name: 'Dean',
            label: '院长/负责人：',
            props: {
                placeholder: '',
            },
        },
        {
            type: 'input',
            name: 'Telephone',
            label: '联系电话：',
            props: {
                placeholder: '',
            },
        },
        {
            type: 'input',
            name: 'Address',
            label: '详细地址：',
            props: {
                placeholder: '',
            },
        },
        {
            type: 'input',
            name: 'time',
            label: '记录仪启用时间：',
            props: {
                placeholder: '',
                disabled: true,
            },
        },
        {
            type: 'input',
            name: 'time',
            label: '采集柜启用时间：',
            props: {
                placeholder: '',
                disabled: true,
            },
        },
        {
            type: 'input',
            name: 'time',
            label: '测温随申码访客机启用时间',
            props: {
                type: 'textarea',
                placeholder: '',
                disabled: true,
            },
        },
        {
            type: 'handle',
            name: 'handle',
            label: '',
            option: [
                {
                    label: '保存',
                    value: 'submit',
                    props: {
                        type: 'primary',
                        hidden: $route.query.type == 1,
                    },
                },
                {
                    label: '返回',
                    value: 'cancel',
                },
            ],
        },
    ]),
    formData = reactive<any>({});

watch(
    () => $route.query.id,
    (e: any) => {
        e && initFn(e);
    },
    {
        immediate: true,
    }
);
function initFn(groupId: string) {
    feachNurseHomeDetail({ groupId }).then((res) => {
        Object.assign(formData, res.data ?? {});
    });
}

function handleClick(e: any) {
    const { label } = e;
    switch (label) {
        case '保存':
            onSubmit();
            break;
        case '返回':
            $router.go(-1);
            break;
        default:
    }
}

/**
 * @description: table 项操作
 */
const onSubmit = () => {
    const keys = ['Address', 'Dean', 'Telephone', 'GroupId'],
        _req = {};

    Object.keys(formData).forEach((_k: string) => {
        if (keys.includes(_k)) {
            _req[_k] = formData[_k];
        }
    });
    saveNurseHome(_req).then(() => {
        $message.success('提交成功');
        $router.go(-1);
    });
};
</script>

<style lang="less" scoped>
.form-wrap {
    padding: 20px 0;
    width: 600px;
}
</style>
