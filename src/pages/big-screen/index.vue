<template>
    <div class="home-wrap big-screen h-full w-full">
        <div class="content">
            <div class="row r1">
                <div class="column c1 flex1">
                    <div class="box">
                        <div class="title">设备情况</div>
                        <Device :p-data="data.info.DeviceStatus"></Device>
                    </div>
                    <div class="box box2">
                        <div class="title">记录时长分类统计</div>
                        <Chart1 :p-data="data.info.FileDurationStat"></Chart1>
                    </div>
                </div>
                <div class="column c2 flex1">
                    <Header></Header>
                    <div class="home-img-wrap flex1">
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
                                <div class="label">总访客数:</div>
                                <div class="value">
                                    <!-- data.CenterStatistic.TotalVisitor -->
                                    {{ data.chartSum }}
                                    <span class="unit">人次</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column flex1">
                    <div class="box">
                        <div class="title">访客情况监测（本周）</div>
                        <div class="visit-num">
                            访客数： <span class="value">{{ data.chartSum }}</span>
                        </div>
                        <Chart2 :p-data="data.chart2Data"></Chart2>
                    </div>
                    <div class="box" style="min-height: 300px">
                        <div class="title">最新服务记录</div>
                        <Chart3
                            :p-data="
                                (data.info.ServiceLastFile || []).slice(0, 5)
                            "
                        ></Chart3>
                    </div>
                </div>
            </div>
            <div class="row r2">
                <div class="column flex1">
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
import { useRouter } from 'vue-router';
import { fetchHomeInfo } from '@/api/app';
import Device from '@/pages/home/components/device.vue';
import Chart1 from '@/pages/home/components/chart1.vue';
import Chart2 from '@/pages/home/components/chart2.vue';
import Chart3 from '@/pages/home/components/chart3.vue';
import Chart4 from '@/pages/home/components/chart4-cc.vue';
import Chart5 from '@/pages/home/components/chart5.vue';
import Chart6 from '@/pages/home/components/chart6-cc.vue';
import { BellOutlined } from '@ant-design/icons-vue';
import { changeHourMinutestr } from '@/utils/tools';
import commonMixin from '@/mixins';
import Header from './header.vue';

const $store = useStore(),
    ylyList = computed(() => $store.getters['common/ylyList']),
    groupId = computed(() => $store.getters['common/groupId']),
    currentYly = computed(() => $store.getters['common/currentYly']),
    isBigPwdOk = computed(() => $store.getters['common/isBigPwdOk']),
    $router = useRouter(),
    data = reactive<any>({
        info: {},
        yly: '',
        CenterStatistic: {},
        deviceInfo: {},
        sosInfo: {},
        chart2Data: [],
        chartSum: 0,
    });

onMounted(() => {
    if (!isBigPwdOk.value) {
        $router.push('/');
        return;
    }
    getHomeInfo();
    $store.dispatch('common/getDefineFileTag');
});

commonMixin(getHomeInfo);

/**
 * @description: 获取首页数据
 */
function getHomeInfo() {
    getChart2Data();
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

function getChart2Data() {
    let _temp = [];
    const _list = [
        [100, 20, 34, 56, 77, 56, 30],
        [50, 30, 24, 36, 47, 76, 90],
        [60, 50, 24, 66, 67, 86, 20],
    ];
    if (!groupId.value) {
        _temp = ylyList.value?.map((_e: any, idx: number) => {
            return {
                name: _e.name,
                data: _list[idx],
            };
        });
    } else {
        const l = currentYly.value.name || '',
            idx = l.substring(l.length, l.length - 1) - 1;
        _temp = [
            {
                name: currentYly.value.name,
                data: _list[idx],
            },
        ];
    }
    data.chart2Data = _temp;

    let sum = 0;
    _temp?.forEach((_e) => {
        _e?.data?.forEach((_s) => sum =  +sum +_s);
    });
    data.chartSum = sum || 0;
}
</script>

<style lang="less" scoped>
.big-screen {
    width: 3840px;
    height: 1080px;
    overflow: hidden;
}
.home-wrap {
    background-color: rgba(25, 39, 76, 1);
    .content {
        padding: 20px 15px;
        height: 100%;
        overflow: auto;
        .row {
            min-width: 1680px;
            display: flex;
            &.r2 .box {
                height: 100%;
                height: 340px;
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
            .c2 {
                display: flex;
                flex-direction: column;
                // margin-top: -50px;
            }
            .home-img-wrap {
                margin-top: -20px;
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
                    height: 80%;
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
