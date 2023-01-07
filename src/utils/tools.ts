/*
 * @Author: szhao
 * @Date: 2022-12-02 19:32:00
 * @LastEditTime: 2022-12-05 19:55:07
 * @LastEditors: szhao
 * @Description:
 */

export const getOpsOptions = function (_v: any) {
    const _b = [
        {
            name: '点击查看',
            type: 'edit',
        },
        {
            name: '下载本地',
            type: 'edit',
        },
    ];
    if (_v.value) {
        return [
            ..._b,
            {
                name: '删除',
                type: 'edit',
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
        _r.date[0] = _r.date[0] + 'T00:00:00';
        _r.date[1] = _r.date[1] + 'T23:59:59';
        _r['date-range'] = _r.date?.join('~');
        delete _r.date;
    }
    return _r;
};
