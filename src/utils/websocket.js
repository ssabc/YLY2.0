/*
 * @Author: liuxin
 * @Date: 2022-07-19 17:20:09
 * @LastEditors: szhao
 * @LastEditTime: 2023-01-18 10:04:11
 * @Description: websocket连接工具
 */
import { message as $message } from 'ant-design-vue';

let socket = null; // 连接对象
let linkFailCount = 0; // 连接次数，目前连接三次
let relinkLoading = null; // 重连全屏loading

/**
 * @description: 初始化websocket
 * @param {*} linkUrl url的地址
 * @return {WebSocket} WebSocket对象
 * @Author: liuxin
 */
function initWebSocket(linkUrl = '') {
    // 正在连接或连接成功
    if (socket && socket.readyState < 2) {
        return socket;
    }

    // 如果地址由上层传递过来，则使用传递的地址
    if (linkUrl) {
        Window.apiConfig[process.env.NODE_ENV].wsUrl = linkUrl;
    }
    const url = Window.apiConfig[process.env.NODE_ENV].wsUrl;
    socket = new WebSocket(url); // 创建对象
    socket.onerror = webSocketOnError; // 连接错误处理
    socket.onclose = closeWebsocket; // 连接关闭处理
    socket.onopen = openWebsocket; // 连接打开处理
    return socket;
}

/**
 * @description: 处理websocket返回的数据
 * @param {*} res 后端返回的数据
 * @return {Object<JSON>}
 * @Author: liuxin
 */
function webscoketDealData(res, type) {
    const data = JSON.parse(res.data);
    if (data.code !== 200) {
        $message.error('服务器错误' + data.message || '');
        return { type: 'error' };
    }
    const returnData = { type: data.type, data: data.data };
    // 打印日志在前端
    // if (type && type == data.type) {
    // console.log('消息回来了-----', returnData);
    // }
    return returnData;
}

/**
 * @description: 连接错误回调函数处理
 * @param {*} e 错误对象
 * @Author: liuxin
 */
function webSocketOnError(e) {
    linkFailCount++; // 连接失败的次数
    if (relinkLoading) {
        relinkLoading.close(); // 关闭重连加载动画
    }
    //连接三次
    if (linkFailCount < 3) {
        initWebSocket();
        // 开启重连加载动画
        // relinkLoading = ElLoading.service({
        //     lock: true,
        //     text: `第${linkFailCount}次连接失败，正在尝试第${linkFailCount + 1}次重新连接，请稍等...`,
        // })
    } else {
        // ElMessageBox.confirm(
        //     '连接失败，是否尝试刷新？',
        //     '警告',
        //     {
        //         confirmButtonText: '刷新',
        //         cancelButtonText: '取消',
        //         type: 'warning',
        //         "close-on-click-modal": false
        //     }
        // )
        //     .then((e) => {
        //         if (e == "confirm") {
        //             location.reload();
        //         }
        //     })
    }
}

/**
 * @description: 打开websocket回调函数处理
 * @return {*}
 * @Author: liuxin
 */
function openWebsocket() {
    console.log('WebSocket连接打开...');
    linkFailCount = 0; // 打开连接，连接次数改为0
    // 加载动画如果开启，则关闭
    if (relinkLoading) {
        relinkLoading.close();
    }
}

/**
 * @description: 关闭websocket回调函数处理
 * @return {*}
 * @Author: liuxin
 */
function closeWebsocket() {
    // 连接关闭时，立刻开启重连机制
    if (linkFailCount < 3 && socket && socket.readyState >= 2) {
        // 开启重连加载动画
        // relinkLoading = ElLoading.service({
        //     lock: true,
        //     text: `连接关闭了，正在重连，请稍等...`,
        // })
        initWebSocket();
    }
}

export { initWebSocket, webscoketDealData };
