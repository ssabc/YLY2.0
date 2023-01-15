<!--
 * @Author: szhao
 * @Date: 2023-01-10 10:59:12
 * @LastEditTime: 2023-01-15 19:54:04
 * @LastEditors: sZhao
 * @Description:
-->
<template>
    <div class="row cm-box">
        <div class="column c1">
            <video
                v-if="data.videoUrl"
                style="width: 100%; height: 100%"
                controls
            >
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
import { reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { FormListProps } from 'GlobComponentsModule';
import { fetchServiceInfo, serviceFileSave } from '@/api/service-records';
import { message as $message } from 'ant-design-vue';

interface Data {
    formData: any;
    list: FormListProps[];
    videoUrl: string;
}

const $store = useStore(),
    $route = useRoute(),
    $router = useRouter(),
    data = reactive<Data>({
        formData: {},
        /** 表单list */
        list: [
            {
                type: 'input',
                name: 'Sn',
                label: '设备编号：',
                props: {
                    placeholder: '',
                    disabled: true,
                },
            },
            {
                type: 'select',
                name: 'GroupId',
                label: '养老院名称：',
                width: 300,
                props: {
                    placeholder: '请选择养老院',
                    allowClear: true,
                    disabled: true,
                },
                option: $store.getters['common/ylyList'],
            },
            {
                type: 'input',
                name: 'FileDuration',
                label: '记录时长：',
                props: {
                    placeholder: '',
                    disabled: true,
                },
            },
            {
                type: 'input',
                name: 'CreateTime',
                label: '记录时间：',
                props: {
                    placeholder: '',
                    disabled: true,
                },
            },
            {
                type: 'input',
                name: 'UploadTime',
                label: '上传时间：',
                props: {
                    placeholder: '',
                    disabled: true,
                },
            },
            {
                type: 'input',
                name: 'UserName',
                label: '上传人员：',
                props: {
                    placeholder: '',
                    disabled: true,
                },
            },
            {
                type: 'input',
                name: 'FileSize',
                label: '文件大小：',
                props: {
                    placeholder: '',
                    disabled: true,
                },
                unit: {
                    text: 'M',
                },
            },
            {
                type: 'input',
                name: 'FileTag',
                label: '服务内容：',
                props: {
                    placeholder: '请输入服务内容',
                    allowClear: true,
                    // disabled: true,
                },
            },
            // {
            //     type: 'select',
            //     name: 'fileTag',
            //     label: '服务内容：',
            //     width: 300,
            //     props: {
            //         placeholder: '请选择服务内容',
            //         allowClear: true,
            //     },
            //     option: $store.getters['common/serviceTypes'] || [],
            // },
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
                        value: 'resetFields',
                    },
                ],
            },
        ],
        videoUrl: '',
        //         `http://119.3.126.12:8064/streams
        // /001000101/20230106/20230106205039-00N.MP4`
    });

watch(
    () => $route.query.id,
    (e) => {
        e && initFn(e);
    },
    {
        immediate: true,
    }
);

function initFn(fileId: any) {
    fetchServiceInfo({ fileId }).then((res) => {
        data.formData = res.data ?? {};
        data.videoUrl = data.formData.FilePath;
    });
}

function handleClick(e: any) {
    const { label } = e;
    switch (label) {
        case '保存':
            console.log('保存');
            onSubmit();
            break;
        case '取消':
            console.log('取消');
            $router.go(-1);
            break;
        default:
    }
}

/**
 * @description: table 项操作
 */
const onSubmit = () => {
    serviceFileSave({
        fileId: data.formData?.FileId,
        fileTag: data.formData?.FileTag,
    }).then(() => {
        $message.success('提交成功');
        $router.go(-1);
    });
};
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
