<template>
    <div class="home-wrap">
        <div v-if="isAdmin" class="label-div">
            <span>选择养老院：</span>
            <a-select
                v-model:value="data.yly"
                style="width: 200px"
                :options="ylyList"
                allow-clear
            />
        </div>
        <div class="content">
            <div class="row">
                <div class="column">
                    <div class="box cells flex">
                        设备情况
                        <div
                            v-for="item in data.list"
                            :key="item.name"
                            class="cell"
                        >
                            <div class="label">{{ item.name }}</div>
                            <div class="value">
                                {{ item.value }} {{ item.unit }}
                            </div>
                        </div>
                    </div>
                    <div class="box">
                        记录时长分类统计
                        <div id="ylyChart1" class="chart1"></div>
                    </div>
                </div>
                <div class="column home-img-wrap">
                    <div class="info">总时长 今日新增时长 总访客人数</div>
                </div>
                <div class="column">
                    <div class="box">访客情况监测（本周）</div>
                    <div class="box">服务记录排名（本月）</div>
                </div>
            </div>
            <div class="row">
                <div class="column" style="flex: 1.3">
                    <div class="box">记录总时长统计</div>
                </div>
                <div class="column">
                    <div class="box">护工帮</div>
                </div>
                <div class="column">
                    <div class="box">设备状态（今日）</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { reactive, computed, onMounted } from 'vue';
import * as echarts from 'echarts';

const $store = useStore(),
    ylyList = computed(() => {
        const ylyList = $store.getters['common/ylyList'];
        return [{ label: '全部', value: '' }, ...ylyList];
    }),
    isAdmin = computed(() => $store.getters['common/isAdmin']),
    deptId = computed(() => $store.getters['common/deptId']),
    data = reactive<any>({
        list: [
            {
                name: '设备总数',
                value: '100',
                unit: '台',
            },
            {
                name: '今日应在线',
                value: '80',
                unit: '台',
            },
            {
                name: '今日实际在线',
                value: '67',
                unit: '台',
            },
            {
                name: '设备故障',
                value: '0',
                unit: '',
            },
            {
                name: '累计访客',
                value: '26',
                unit: '',
            },
        ],
        yly: '',
    });

onMounted(() => {
    console.log('home');
    // data.yly = $store.getters['common/deptId'];
    renderChart1([
        { value: 10, name: '张小五' },
        { value: 8, name: '李小六' },
        { value: 10, name: '周医生' },
        { value: 24, name: '宋医生' },
    ]);
});

const renderChart1 = (data: any) => {
    const option = {
        title: {
            text: '最近7日访客累计',
            left: 'center',
        },
        legend: {
            top: 'bottom',
        },
        grid: {
            containLabel: true,
            left: 20,
            right: 20,
            bottom: 40,
            top: 40,
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0,0,0,0.7)',
            borderColor: 'rgba(0,0,0,0.7)',
            textStyle: {
                color: '#fff',
            },
        },
        xAxis: {
            data: data?.map((_e: any) => _e.name),
            splitLine: {
                show: true,
                lineStyle: {
                    width: 2,
                },
            },
            axisLabel: {
                show: true,
                margin: 14,
                fontSize: 12,
            },
        },
        yAxis: [
            {
                name: '人次',
                type: 'value',
                splitNumber: 5,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#fff'],
                        opacity: 0.06,
                    },
                },
            },
        ],
        series: [
            {
                name: '访客数量(人次)',
                type: 'line',
                data: data?.map((_e: any) => _e.value),
                lineStyle: {
                    color: '#7E2DFF',
                },
                itemStyle: {
                    color: '#7E2DFF',
                },
            },
        ],
    };
    // 绘制图表
    let myChart = echarts.init(document.getElementById('ylyChart1'));
    myChart.setOption(option);
};
</script>

<style lang="less" scoped>
.home-wrap {
    background-color: rgba(25, 39, 76, 1);
    min-height: 100vh;
}
.charts {
    padding: 10px 0;
}
.chart1 {
    width: 300px;
    height: 200px;
    margin-top: 20px;
}
.content {
    padding: 20px 15px;
}
.row {
    display: flex;
    .column {
        flex: 1;
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
    }
    .home-img-wrap {
        margin-bottom: 15px;
        flex: 1.2;
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
        .info {
            position: absolute;
            height: 100%;
            width: 100%;
            z-index: 9;
        }
    }
}
.cells {
    width: 100%;
    justify-content: space-between;
    .cell {
        background-color: rgb(192, 170, 128);
        flex: 1;
        height: 80px;
        margin-right: 10px;
        &:last-child {
            margin-right: 0;
        }
        color: #fff;
        position: relative;
        .label {
            position: absolute;
            top: 16px;
            left: 10px;
        }

        .value {
            width: 50%;
            height: 50%;
            right: 0;
            bottom: 0;
            position: absolute;
            font-size: 18px;
        }
    }
}
.label-div {
    height: 50px;
    background-color: rgba(65, 92, 133, 1);
    display: flex;
    align-items: center;
    color: #fff;
    padding: 0 15px;
}
</style>
