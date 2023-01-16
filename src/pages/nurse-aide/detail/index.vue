<!--
 * @Author: szhao
 * @Date: 2023-01-10 10:59:12
 * @LastEditTime: 2023-01-16 16:15:11
 * @LastEditors: szhao
 * @Description:
-->
<template>
    <div class="row cm-box">
        <div class="column c1">
            <video style="width: 100%; height: 100%" controls>
                <source :src="data.videoUrl" type="video/mp4" />
                <source :src="data.videoUrl" type="video/ogg" />
                您的浏览器不支持Video标签。
            </video>
        </div>
        <div class="column c2">
            <GmForm
                v-model:data="data.formData"
                :list="data.list"
                :label-col="{ style: { width: '100px' } }"
                @on-handle="handleClick"
            ></GmForm>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { FormListProps } from 'GlobComponentsModule';

interface Data {
    formData: any;
    list: FormListProps[];
    videoUrl: string;
}

const $store = useStore(),
    $router = useRouter(),
    data = reactive<Data>({
        formData: {},
        /** 表单list */
        list: [
            {
                type: 'input',
                name: 'name',
                label: '设备编号：',
                props: {
                    placeholder: '',
                    disabled: true,
                },
            },
            {
                type: 'input',
                name: 'name',
                label: '养老院名称：',
                props: {
                    placeholder: '',
                    disabled: true,
                },
            },
            {
                type: 'input',
                name: 'name',
                label: '记录时长：',
                props: {
                    placeholder: '',
                    disabled: true,
                },
            },
            {
                type: 'input',
                name: 'name',
                label: '记录时间：',
                props: {
                    placeholder: '',
                    disabled: true,
                },
            },
            {
                type: 'input',
                name: 'name',
                label: '上传时间：',
                props: {
                    placeholder: '',
                    disabled: true,
                },
            },
            {
                type: 'input',
                name: 'name',
                label: '上传人员：',
                props: {
                    placeholder: '',
                    disabled: true,
                },
            },
            {
                type: 'input',
                name: 'name',
                label: '文件大小：',
                props: {
                    placeholder: '',
                    disabled: true,
                },
            },
            {
                type: 'select',
                name: 'service-type',
                label: '服务内容：',
                width: 300,
                props: {
                    placeholder: '请选择服务内容',
                    allowClear: true,
                    disabled: true,
                },
                option: $store.getters['config/serviceTypes'],
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
                        },
                    },
                    {
                        label: '取消',
                        value: 'cancel',
                    },
                ],
            },
        ],
        videoUrl: `http://119.3.126.12:8064/streams
/001000101/20230106/20230106205039-00N.MP4`,
    });

function handleClick(e: any) {
    const { label } = e;
    switch (label) {
        case '保存':
            console.log('保存');
            break;
        case '取消':
            console.log('取消');
            $router.go(-1);
            break;
        default:
    }
}
</script>

<style lang="less" scoped>
.row {
    display: flex;
    .column {
        &.c1 {
            flex: 1;
            min-width: 200px;
            background-color: #efefef;
            margin-right: 15px;
            max-width: 500px;
        }
        &.c2 {
            width: 400px;
        }
    }
}
</style>
