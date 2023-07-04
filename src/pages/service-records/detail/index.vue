<!--
 * @Author: szhao
 * @Date: 2023-01-10 10:59:12
 * @LastEditTime: 2023-07-03 21:32:16
 * @LastEditors: sZhao
 * @Description:
-->
<template>
    <div class="row cm-box">
        <div class="column c1">
            <div id="Player" style="width: 100%; height: 100%"></div>
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
import { reactive, watch, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { FormListProps } from 'GlobComponentsModule';
import { serviceFileSave } from '@/api/service-records';
import { fetchRealTimeInfo } from '@/api/app';
import { message as $message } from 'ant-design-vue';
import { showFileDurationText } from '@/utils/tools';

interface Data {
    formData: any;
    list: FormListProps[];
    videoUrl: string;
    player: any;
}

const $store = useStore(),
    $route = useRoute(),
    $router = useRouter(),
    isFlv = computed(() => $route.query.type != '1'),
    data = reactive<Data>({
        player: null,
        formData: {},
        /** 表单list */
        list: [
            {
                type: 'input',
                name: 'DeviceSn',
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
                label: '记录时长(分钟)：',
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
                type: 'select',
                name: 'FileTag',
                label: '服务内容：',
                width: 300,
                props: {
                    placeholder: '请选择服务内容',
                    allowClear: true,
                },
                option: $store.getters['common/fileTags'],
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
            //     option: $store.getters['config/serviceTypes'],
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
                        value: 'cancel',
                    },
                ],
            },
        ],
        videoUrl: '',
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
function initVideoFn(url: string, domId: string) {
    // 实例化播放器
    data.player = new WasmPlayer(null, domId, callbackfun);

    console.log('data.player=', data.player);
    // 调用播放
    data.player.play(url, 1);
}

onMounted(() => {
    window.onbeforeunload = function () {
        closePage();
        return false;
    };
});
onBeforeUnmount(() => {
    closePage();
});
function closePage() {
    console.log('执行了 player.destroy()', data.player?.destroy);
    data.player?.destroy();
    window.onbeforeunload = null;
}

function callbackfun(e: any) {
    console.log('实例化播放器 callbackfun', e);
}
function initFn(fileId: any) {
    fetchRealTimeInfo({ fileId }).then((res: any) => {
        res.data.FileDuration = showFileDurationText(+res.data.FileDuration);
        data.formData = res.data ?? {};
        let videoUrl = isFlv.value
            ? data.formData.FilePath2
            : data.formData.FilePath;
        // videoUrl = videoUrl.replace('http://119.3.126.12:8064/', 'videofile/');
        // videoUrl = videoUrl.replace(
        //     'http://119.3.126.12:10010/',
        //     'videoflvfile/'
        // );
        data.videoUrl = videoUrl;
        console.log('isFlv.value', isFlv.value ? '2' : ' 1', data.videoUrl);
        initVideoFn(data.videoUrl, 'Player');
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
    if (!data.formData?.FileTag) {
        $message.error('服务内容必填！');
        return;
    }
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
            display: flex;
            align-items: center;
        }
        &.c2 {
            width: 400px;
        }
    }
}

</style>
<style lang="less">
.iconqingxiLOGO {
    display: none !important;
}
</style>
