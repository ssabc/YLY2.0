/*
 * @Author: szhao
 * @Date: 2022-12-02 19:32:00
 * @LastEditTime: 2023-01-11 16:30:47
 * @LastEditors: szhao
 * @Description:
 */

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
    return {
        date: year + '-' + month + '-' + day,
        week,
        day,
        hour,
    };
    // return year + "-" + month + "-" + day + " " + hour + sign2 + minutes + sign2 + seconds;
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

export const groupBy = function (arr: any, fn: any) {
    const group: any = {};
    arr?.map((item: any) => {
        const type = JSON.stringify(fn(item));
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

export const toLine = function (name) {
    return name.replace(/([A-Z])/g, '-$1').toLowerCase();
};
