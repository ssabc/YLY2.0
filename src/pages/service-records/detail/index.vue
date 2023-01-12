<!--
 * @Author: szhao
 * @Date: 2023-01-10 10:59:12
 * @LastEditTime: 2023-01-12 10:04:21
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
import { reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { FormListProps } from 'GlobComponentsModule';
import { fetchDeviceDetailById } from '@/api/device-assign';

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
                name: 'groupId',
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
                name: 'onlineDuration',
                label: '记录时长：',
                props: {
                    placeholder: '',
                    disabled: true,
                },
            },
            {
                type: 'input',
                name: 'allocationTime',
                label: '记录时间：',
                props: {
                    placeholder: '',
                    disabled: true,
                },
            },
            {
                type: 'input',
                name: 'allocationTime',
                label: '上传时间：',
                props: {
                    placeholder: '',
                    disabled: true,
                },
            },
            {
                type: 'input',
                name: 'userName',
                label: '上传人员：',
                props: {
                    placeholder: '',
                    disabled: true,
                },
            },
            {
                type: 'input',
                name: 'repairCount',
                label: '文件大小：',
                props: {
                    placeholder: '',
                    disabled: true,
                },
            },
            {
                type: 'select',
                name: 'serviceType',
                label: '服务内容：',
                width: 300,
                props: {
                    placeholder: '请选择服务内容',
                    allowClear: true,
                },
                option: $store.getters['common/serviceTypes'] || [],
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
                        value: 'resetFields',
                    },
                ],
            },
        ],
        videoUrl: `http://119.3.126.12:8064/streams
/001000101/20230106/20230106205039-00N.MP4`,
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

function initFn(devId: any) {
    fetchDeviceDetailById({ devId }).then((res) => {
        const _d = (data.info = res.data ?? {});
        data.formData = {
            deviceType: '服务记录仪',
            allocationTime: '2023-01-03',
            describe: _d.Describe,
            devId: _d.DevId,
            groupId: _d.GroupId,
            serviceType: _d.ServiceType,
            Sn: _d.Sn,
            onlineDuration: '21',
            repairCount: 4.3,
            userName: _d.UserName,
        };
    });
}

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
        }
        &.c2 {
            width: 400px;
        }
    }
}
</style>
