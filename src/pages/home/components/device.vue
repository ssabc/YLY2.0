<!--
 * @Author: sZhao
 * @Date: 2023-01-08 16:48:43
 * @LastEditTime: 2023-01-08 19:30:28
 * @LastEditors: sZhao
 * @Description:
-->
<template>
    <div class="cells s1 flex">
        <div v-for="item in data.list" :key="item.name" class="cell flex">
            <img class="device-icon" :src="deviceIcon" />
            <div class="info">
                <div class="label">{{ item.name }}</div>
                <div class="value">
                    {{ item.value }}
                    <span class="unit">{{ item.unit }}</span>
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
        <div v-for="item in data.list2" :key="item.name" class="cell flex">
            <div class="info">
                <div class="label">{{ item.name }}</div>
                <div class="value">
                    {{ item.value }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import deviceIcon from '@/assets/pictures/device.svg';

const data = reactive<any>({
    list: [
        {
            name: '服务记录仪',
            value: '99',
            unit: '个',
        },
        {
            name: '采集站',
            value: '4',
            unit: '台',
        },
        {
            name: '数字哨兵',
            value: '3',
            unit: '台',
        },
    ],
    list2: [
        {
            name: '值班长',
            value: '3',
        },
        {
            name: '服务提供',
            value: '80',
        },
        {
            name: '服务保障',
            value: '8',
        },
        {
            name: '服务安全',
            value: '8',
        },
    ],
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
            padding-left: 6px;
            font-size: 14px;
        }
        color: #fff;
        .value {
            // font-size: 16px;
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
        }
        .value {
            font-weight: bold;
            font-style: italic;
            font-size: 22px;
            color: #ffe400;
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
            background-color: #204AAA;
        }
        &.color2 {
            background-color: #ffe400;
        }
        &.color3 {
            background-color: #CCCCCC;
        }
        &.mid {
            width:50px;
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
