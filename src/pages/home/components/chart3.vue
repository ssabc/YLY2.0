<!--
 * @Author: sZhao
 * @Date: 2023-01-08 16:48:43
 * @LastEditTime: 2023-01-19 01:29:05
 * @LastEditors: sZhao
 * @Description:
-->
<template>
    <div class="like-table">
        <div class="hd">
            <div class="tr">
                <div class="th">序号</div>
                <div class="th">养老院</div>
                <div class="th" style="width: 80px">记录时长</div>
                <div class="th">设备号</div>
                <div class="th">记录类型</div>
            </div>
        </div>
        <div class="bd">
            <div
                v-for="(item, index) in scrollList.slice(0, 5)"
                :key="item.DeviceSn"
                class="tr"
                @click="handleNaviFn(item)"
            >
                <div class="td">{{ index + 1 }}</div>
                <div class="td">{{ item.GroupName }}</div>
                <div class="td" style="width: 80px">
                    {{ showFileDurationText(item.FileDuration) }}
                </div>
                <div class="td">{{ item.DeviceSn }}</div>
                <div class="td">{{ item.ServiceType }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { computed } from 'vue';
import { showFileDurationText } from '@/utils/tools';
import { useRouter } from 'vue-router';

interface Props {
    ylyFlag?: any;
    pData?: any;
}

const $router = useRouter(),
    $props = defineProps<Props>(),
    $store = useStore(),
    scrollList = computed(() => {
        const cardList = $props.pData || [];
        return cardList;
    });

function handleNaviFn(item: any) {
    if (!item.ServiceType) {
        return;
    }
    const recordTypes = $store.getters['config/recordTypes'],
        id = recordTypes?.findIndex((_e: any) => _e.label === item.ServiceType);
    id != undefined && $router.push(`/service-records/list/${id}`);
}
</script>

<style lang="less" scoped>
.like-table {
    // min-height: 260px;
    width: 100%;
    overflow: hidden;
    text-align: center;
    .hd {
        .tr {
            border: none;
        }
    }
    .tr {
        display: flex;
        padding: 10px;
        border-bottom: 1px solid #666;
        & > div {
            &:first-child {
                width: 50px;
            }
            &:nth-child(2n) {
                flex: 1;
            }
            &:nth-child(3n) {
                width: 60px;
            }
            &:nth-child(4n) {
                width: 140px;
            }
            &:nth-child(5n) {
                width: 80px;
            }
            // flex: 1;
        }
    }
    .bd {
        .tr {
            cursor: pointer;
        }
    }
}
</style>
