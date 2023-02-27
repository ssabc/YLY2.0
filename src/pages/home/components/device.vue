<!--
 * @Author: sZhao
 * @Date: 2023-01-08 16:48:43
 * @LastEditTime: 2023-02-27 19:18:46
 * @LastEditors: szhao
 * @Description:
-->
<template>
    <div class="cells s1 flex">
        <div class="cell flex">
            <img class="device-icon" :src="deviceIcon" />
            <div class="info">
                <div class="label">服务记录仪</div>
                <div class="value">
                    {{ info.DeviceCount }}
                    <span class="unit">个</span>
                </div>
            </div>
        </div>
        <div class="cell flex">
            <img class="device-icon" :src="deviceIcon" />
            <div class="info">
                <div class="label">采集站</div>
                <div class="value">
                    {{ info.StationCount }}
                    <span class="unit">台</span>
                </div>
            </div>
        </div>
        <div class="cell flex">
            <img class="device-icon" :src="deviceIcon" />
            <div class="info">
                <div class="label">测温随申码访客机</div>
                <div class="value">
                    {{ info.SentryCount }}
                    <span class="unit">台</span>
                </div>
            </div>
        </div>
    </div>
    <div class="lines flex">
        <span class="line mid color1"></span>
        <span class="line small color3"></span>
        <span class="line large color3"></span>
        <span class="line color1"></span>
        <span class="line color1"></span>
        <span class="line color1"></span>
        <span class="line color2"></span>
        <span class="line color2"></span>
        <span class="line color1"></span>
    </div>
    <div class="cells s2 flex">
        <div class="cell flex">
            <div class="info">
                <div class="label">值班长</div>
                <div class="value">
                    {{ info.Foreman }}
                </div>
            </div>
        </div>
        <div class="cell flex">
            <div class="info">
                <div class="label">服务提供</div>
                <div class="value">
                    {{ info.Provision }}
                </div>
            </div>
        </div>
        <div class="cell flex">
            <div class="info">
                <div class="label">服务保障</div>
                <div class="value">
                    {{ info.Guarantee }}
                </div>
            </div>
        </div>
        <div class="cell flex">
            <div class="info">
                <div class="label">服务安全</div>
                <div class="value">
                    {{ info.Security }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watchEffect, computed } from 'vue';
import deviceIcon from '@/assets/pictures/device.svg';

interface Props {
    pData?: any;
}
const $props = defineProps<Props>(),
    info = computed(() => $props.pData || {});

watchEffect(() => {
    console.log('111111111', $props.pData);
});
</script>

<style lang="less" scoped>
.cells.s1 {
    justify-content: space-between;
    .cell {
        background-color: rgba(12, 34, 55, 1);
        flex: 1;
        margin-right: 10px;
        padding: 4px;
        display: flex;
        justify-content: space-around;
        &:last-child {
            margin-right: 0;
        }
        display: flex;
        align-items: center;
        .device-icon {
            width: 26px;
            height: 23px;
        }
        .info {
            padding: 4px 0;
            font-size: 14px;
        }
        color: #fff;
        .value {
            // font-size: 16px;
            padding: 4px 0;
            .unit {
                font-size: 12px;
            }
        }
    }
}
.cells.s2 {
    .cell {
        flex: 1;
        margin-right: 10px;
        &:last-child {
            margin-right: 0;
        }
    }
    .info {
        width: 100%;
        text-align: center;
        .label {
            padding: 5px 0;
            background-image: url('@/assets/pictures/bg1.svg');
            background-size: 100% 100%;
        }
        .value {
            font-weight: bold;
            font-style: italic;
            font-size: 22px;
            color: #ffe400;
            padding: 4px 0;
        }
    }
}

.lines {
    align-items: center;
    padding: 20px 0;
    .line {
        height: 2px;
        width: 8px;
        margin-right: 2px;
        &:last-child {
            margin-right: 0;
        }
        &.color1 {
            background-color: #204aaa;
        }
        &.color2 {
            background-color: #ffe400;
        }
        &.color3 {
            background-color: #cccccc;
        }
        &.mid {
            width: 50px;
        }
        &.small {
            width: 2px;
        }
        &.large {
            flex: 1;
        }
    }
}
</style>
