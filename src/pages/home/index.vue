<template>
    <div class="home-wrap">
        <div class="content">
            <div class="row r1">
                <div class="column c1 flex1">
                    <div class="box">
                        <div class="title">设备情况</div>
                        <Device :p-data="data.info.DeviceStatus"></Device>
                    </div>
                    <div class="box box2">
                        <div class="title">记录时长分类统计</div>
                        <Chart1
                            :p-data="data.info.FileDurationStat"
                            :yly-flag="true"
                        ></Chart1>
                    </div>
                </div>
                <div class="column home-img-wrap flex1">
                    <div class="cells">
                        <div class="cell">
                            <div class="label">总时长:</div>
                            <div
                                class="value"
                                v-html="
                                    changeHourMinutestr(
                                        data.CenterStatistic.TotalFileDuration
                                    )?.htmlText
                                "
                            ></div>
                        </div>
                        <div class="cell">
                            <div class="label">今日新增时长:</div>
                            <div
                                class="value"
                                v-html="
                                    changeHourMinutestr(
                                        data.CenterStatistic.TodayFileDuration
                                    )?.htmlText
                                "
                            ></div>
                        </div>
                        <div class="cell">
                            <div class="label">总访客人数:</div>
                            <div class="value">
                                {{ data.CenterStatistic.TotalVisitor }}
                                <span class="unit">次</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column flex1">
                    <div class="box">
                        <div class="title">访客情况监测（本周）</div>
                        <div class="visit-num">
                            访问次： <span class="value">{{ 65 }}</span>
                        </div>
                        <Chart2 :yly-flag="true"></Chart2>
                    </div>
                    <div class="box" style="min-height: 300px">
                        <div class="title">最新服务记录</div>
                        <Chart3
                            :p-data="data.info.ServiceLastFile"
                            :yly-flag="true"
                        ></Chart3>
                    </div>
                </div>
            </div>
            <div class="row r2">
                <div class="column">
                    <div class="box">
                        <div class="title">记录总时长统计</div>
                        <Chart4
                            :p-data="data.info.FileDurationTotalStat"
                        ></Chart4>
                    </div>
                </div>
                <div class="column flex1">
                    <div class="box hgb-wrap">
                        <div class="title bell-wrap flex">
                            护工帮
                            <BellOutlined style="color: #16d4e3" />
                        </div>
                        <Chart5 :p-data="data.sosInfo"></Chart5>
                    </div>
                </div>
                <div class="column flex1">
                    <div class="box">
                        <div class="title">设备状态（今日）</div>
                        <Chart6 :p-data="data.deviceInfo"></Chart6>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { reactive, computed, onMounted } from 'vue';
import { fetchHomeInfo } from '@/api/app';
import Device from './components/device.vue';
import Chart1 from './components/chart1.vue';
import Chart2 from './components/chart2.vue';
import Chart3 from './components/chart3.vue';
import Chart4 from './components/chart4.vue';
import Chart5 from './components/chart5.vue';
import Chart6 from './components/chart6.vue';
import { BellOutlined } from '@ant-design/icons-vue';
import { changeHourMinutestr } from '@/utils/tools';
import commonMixin from '@/mixins';

const $store = useStore(),
    data = reactive<any>({
        info: {},
        yly: '',
        CenterStatistic: {},
        deviceInfo: {},
        sosInfo: {},
    });

onMounted(() => {
    getHomeInfo();
    $store.dispatch('common/getDefineFileTag');
});

commonMixin(getHomeInfo);

/**
 * @description: 获取首页数据
 */
function getHomeInfo() {
    const _req = {};
    fetchHomeInfo(_req).then((res: any) => {
        data.info = res?.data || {};
        data.CenterStatistic = data.info?.CenterStatistic || {};
        const { DeviceStatus, OnlineStatus, SosCount, SosIn24h } = data.info;
        data.deviceInfo = {
            DeviceStatus,
            OnlineStatus,
        };
        data.sosInfo = {
            SosCount,
            SosIn24h,
        };
    });
}
</script>

<style lang="less" scoped>
.home-wrap {
    background-color: rgba(25, 39, 76, 1);
    .content {
        padding: 20px 15px;
        overflow: auto;
        .row {
            min-width: 1680px;
            display: flex;
            &.r2 .box {
                height: 100%;
            }
            .column {
                // flex: 1;
                margin-right: 15px;
                &:last-child {
                    margin-right: 0;
                }
            }
            .box {
                background-color: rgba(12, 34, 55, 0.6980392156862745);
                border: 1px solid rgba(121, 121, 121, 1);
                box-sizing: border-box;
                border-radius: 10px;
                padding: 10px 15px;
                color: #fff;
                margin-bottom: 15px;
                .title {
                    font-size: 18px;
                    padding: 0 0 10px;
                    height: 40px;
                }
            }
            .home-img-wrap {
                margin-bottom: 15px;
                // flex: 1.2;
                position: relative;
                background-image: url('@/assets/pictures/home-img.png');
                background-size: 100% 100%;
                &::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    width: 100%;
                    background-color: rgba(255, 255, 255, 0.3);
                    background-image: url('@/assets/pictures/home-img-masker.svg');
                    background-size: 100% 100%;
                }
                .cells {
                    padding: 0 40px;
                    position: absolute;
                    height: 100%;
                    width: 100%;
                    z-index: 9;
                    color: #fff;
                    font-size: 18px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    .cell {
                        margin-bottom: 40px;
                        &:last-child {
                            margin-bottom: 0;
                        }
                        .value {
                            font-size: 40px;
                            color: #16d4e3;
                            span {
                                font-size: 14px;
                            }
                        }
                    }
                }
            }
        }
    }
}
.charts {
    padding: 10px 0;
}
.flex1 {
    flex: 1;
}
.chart1 {
    width: 300px;
    height: 200px;
    margin-top: 20px;
}

.bell-wrap {
    align-items: center;
}
.visit-num {
    display: flex;
    align-items: center;
    color: #56d9ff;
    .value {
        font-size: 28px;
    }
}
.hgb-wrap {
    display: flex;
    flex-direction: column;
}
.r1 .c1 {
    display: flex;
    flex-direction: column;
    .box2 {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
}
</style>
