/*
 * @Author: szhao
 * @Date: 2022-12-02 19:32:00
 * @LastEditTime: 2023-01-19 10:31:04
 * @LastEditors: szhao
 * @Description:
 */
import { message as $message } from 'ant-design-vue';

export const getOpsOptions = function (_v: any) {
    const _b = [
        {
            name: '点击查看',
            type: 'view',
        },
        {
            name: '下载',
            type: 'download',
        },
    ];
    if (_v.value) {
        return [
            ..._b,
            {
                name: '删除',
                type: 'delete',
            },
        ];
    }
    return _b;
};

export const getNowDate = function (_t: any) {
    const date = _t ? new Date(_t) : new Date();
    const year = date.getFullYear(); // 年
    let month = date.getMonth() + 1; // 月
    let day = date.getDate(); // 日
    let hour = date.getHours(); // 时
    let minutes = date.getMinutes(); // 分
    let seconds = date.getSeconds(); //秒
    const weekArr = [
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
        '星期天',
    ];
    const week = weekArr[date.getDay()];
    // 给一位数的数据前面加 “0”
    if (month >= 1 && month <= 9) {
        month = '0' + month;
    }
    if (day >= 0 && day <= 9) {
        day = '0' + day;
    }
    if (hour >= 0 && hour <= 9) {
        hour = '0' + hour;
    }
    if (minutes >= 0 && minutes <= 9) {
        minutes = '0' + minutes;
    }
    if (seconds >= 0 && seconds <= 9) {
        seconds = '0' + seconds;
    }
    const sign2 = ':';
    return {
        time:
            year +
            '-' +
            month +
            '-' +
            day +
            ' ' +
            hour +
            sign2 +
            minutes +
            sign2 +
            seconds,
        date: year + '-' + month + '-' + day,
        week,
        day,
        hour,
    };
};

export const getReqData = function (_d: any, activeKey: string) {
    const _r = JSON.parse(JSON.stringify(_d));
    if (_r.date?.[0]) {
        _r['date-range'] = _r.date?.join('~');
        delete _r.date;
    }
    if (activeKey == '2') {
        _r['is-eye'] = 1;
    }
    return _r;
};

export const dealReqData = function (_d: any) {
    const _r = JSON.parse(JSON.stringify(_d));
    if (_r.date?.[0]) {
        // _r.date[0] = _r.date[0] + 'T00:00:00';
        // _r.date[1] = _r.date[1] + 'T23:59:59';
        _r['date-range'] = _r.date?.join('~');
        delete _r.date;
    }
    return _r;
};

export const groupBy = function (arr: any, key: string) {
    const group: any = {},
        _fn = function (_e: any) {
            return _e[key];
        };
    arr?.filter((_e: any) => _e[key])?.map((item: any) => {
        const type = JSON.stringify(_fn(item));
        group[type] = group[type] || [];
        group[type].push(item);
    });

    return Object.keys(group).map((item) => {
        return group[item];
    });
};

export const GetNumberOfDays = function (date1: any, date2: any) {
    //获得天数
    //date1：开始日期，date2结束日期
    const a1 = Date.parse(new Date(date1));
    const a2 = Date.parse(new Date(date2));
    const day = parseInt((a2 - a1) / (1000 * 60 * 60 * 24)); //核心：时间戳相减，然后除以天数
    return day;
};

export const toLine = function (name: string) {
    const _t = name.replace(/([A-Z])/g, '-$1').toLowerCase();
    if (_t.substring(0, 1) === '-') {
        return _t.substring(1);
    }
    return _t;
};

export const changeHourMinutestr = function (str: number) {
    let _h = '0',
        _m = '0';
    if (str) {
        _h =
            Math.floor(str / 60).toString().length < 2
                ? '0' + Math.floor(str / 60).toString()
                : Math.floor(str / 60).toString();
        _m =
            (str % 60).toString().length < 2
                ? '0' + (str % 60).toString()
                : (str % 60).toString();
    }
    return {
        h: _h,
        m: _m,
        text: +_m > 0 ? `${_h} 小时 ${_m} 分` : `${_h} 小时`,
        htmlText:
            +_m > 0
                ? `${_h} <span style="font-size: 14px">小时</span> ${_m} <span style="font-size: 14px">分</span>`
                : `${_h} <span style="font-size: 14px">小时</span>`,
    };
};

/** 秒转分 分钟（小于1分钟）取整数  */
export const showFileDurationText = function (_s: number) {
    _s = +_s;
    if (!_s) {
        return '';
    }
    const _m = _s / 60;
    return _m < 1 ? '< 1分钟' : Math.floor(_m) + ' 分钟';
};

export const second2minutes = function (_s: number) {
    return Math.floor(_s / 60);
};

export const handleDownload = function (fileName: string, videoUrl: string) {
    const x = new XMLHttpRequest();
    $message.loading('视频下载中，请稍后...', 0);
    x.open('GET', videoUrl, true);
    x.responseType = 'blob';
    x.onload = () => {
        console.log('link', videoUrl);
        $message.destroy();
        $message.success('下载完成');
        const url = window.URL.createObjectURL(x.response);
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.download = fileName;
        a.click();
    };
    x.send();
};
