<template>
    <div class="flex">
        <div id="chart1" class="chart chart1"></div>
        <div id="chart2" class="chart chart1"></div>
    </div>
    <div class="flex">
        <div id="chart3" class="chart chart3"></div>
        <div id="chart4" class="chart chart3"></div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { onMounted, computed, watchEffect, nextTick, onActivated } from 'vue';
import * as echarts from 'echarts';

interface Props {
    ylyFlag?: any;
}
const $store = useStore(),
    $props = defineProps<Props>(),
    isAdmin = computed(() => $store.getters['common/isAdmin']);

watchEffect(() => {
    console.log('111111111', $props.ylyFlag);
    initFn();
});

function initFn() {
    console.log($props, '$props.ylyFlag', $props.ylyFlag);
    const { data1, data2, data3, data4 } = getData(
        isAdmin.value,
        $props.ylyFlag
    );
    nextTick(() => {
        renderChart1(data1);
        renderChart2(data2);
        renderChart3(data3);
        // renderChart3Fn();
        renderChart4(data4);
    });
}

onMounted(() => {
    // initFn();
});
onActivated(() => {
    console.log('jpne 执行了actived方法。。。');
    initFn();
});

const renderChart1 = (data: any) => {
    const option = {
        title: {
            text: '昨日设备在线数',
            left: 'center',
        },
        tooltip: {
            trigger: 'item',
        },
        legend: {
            top: 'bottom',
        },
        series: [
            {
                type: 'pie',
                radius: ['40%', '60%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2,
                },
                label: {
                    position: 'left',
                    formatter: '{d}%',
                    position: 'inner',
                },
                labelLine: {
                    show: false,
                },
                data,
            },
        ],
    };
    let myChart = echarts.init(document.getElementById('chart1'));
    // 绘制图表
    myChart.clear();myChart.setOption(option);
};

const renderChart2 = (data: any) => {
    const option = {
        title: {
            text: '昨日班组在线数',
            left: 'center',
        },
        tooltip: {
            trigger: 'item',
        },
        legend: {
            top: 'bottom',
        },
        series: [
            {
                type: 'pie',
                radius: ['60%'],
                data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    };
    let myChart = echarts.init(document.getElementById('chart2'));
    // 绘制图表
    myChart.clear();myChart.setOption(option);
};
const renderChart3 = (data: any) => {
    const maxCount = 100,
        colorList = ['#14A5AB', '#88D903', '#E90B3A', 'red'];
    console.log(data.map((_e) => _e.name));
    const option1 = {
        title: {
            text: '值班长本月开机次数统计',
            left: 'center',
        },
        angleAxis: {
            show: false, //隐藏角度轴（圆心角）
            max: maxCount,
            startAngle: 90, //极坐标从第一象限开始，即平面直角坐标系,用时钟理解，0就是三点钟方向，这里我们从12点钟方向开始，也就是3点钟方向加90度
            splitLine: {
                show: false, //隐藏分隔线
            },
        },
        barMaxWidth: 20, //设置圆环最大宽度
        radiusAxis: {
            show: false, //隐藏径向轴（半径）
            type: 'category',
            data: data.map((_e) => ({ value: _e.name })), //传入每条圆环的径向值
            axisLine: {
                show: false, //隐藏分隔线
            },
        },
        tooltip: {
            trigger: 'item',
        },
        polar: {
            radius: [30, 100], //总体的最小半径，最大半径
        },
        series: [
            {
                //上层的圆环
                type: 'bar',
                data: data.map((_e) => _e.value), //初始值
                coordinateSystem: 'polar', //设置类型为极坐标
                roundCap: true, //柱状图末端呈现圆角
                itemStyle: {
                    //设置每一个圆环的颜色
                    color: (params) => {
                        return colorList[params.dataIndex];
                    },
                },
                animationEasing: 'bounceOut', //初始动画
                barGap: '-100%', //柱间距离,用来将上下两种圆环重合
                z: 200, //圆环层级，和zindex相似
            },
            {
                //下层的圆环
                type: 'bar',
                data: data.map((_e) => _e.value),
                coordinateSystem: 'polar',
                roundCap: true,
                itemStyle: {
                    //设置每一个圆环的颜色
                    color: (params) => {
                        return '#fff';
                    },
                },
                z: 100,
                barGap: '-100%', //柱间距离,用来将上下两种圆环重合
            },
        ],
    };
    let myChart = echarts.init(document.getElementById('chart3'));
    // 绘制图表
    myChart.clear();myChart.setOption(option1);
};
const renderChart4 = (data: any) => {
    const option = {
        title: {
            text: '护工帮当月触发情况',
            left: 'center',
        },
        tooltip: {
            trigger: 'item',
        },
        legend: {
            top: 'bottom',
        },
        series: [
            {
                type: 'pie',
                radius: ['60%'],
                data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    };
    let myChart = echarts.init(document.getElementById('chart4'));
    // 绘制图表
    myChart.clear();myChart.setOption(option);
};
</script>

<style lang="less" scoped>
.chart {
    margin-top: 20px;
}
.chart1 {
    width: 300px;
    height: 300px;
}

.chart3 {
    width: 300px;
    height: 300px;
}
</style>
