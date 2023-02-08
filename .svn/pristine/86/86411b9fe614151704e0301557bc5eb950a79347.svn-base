//获取某个范围内的随机整数
export function random(min, max) {
    let range = max - min;
    let rand = Math.random();
    let num = min + Math.round(rand * range);
    return num;
}

// 时间栅格化
export function DateGrid(date, type) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minute = date.getMinutes();
    var secend = date.getSeconds();
    var week = date.getDay();

    var grid = function (num) {
        if (parseInt(num) > 9) {
            return num;
        } else {
            return "0" + num;
        }
    }

    var getWeek = function (num) {
        switch (num) {
            case 0:
                return "周日";
            case 1:
                return "周一";
            case 2:
                return "周二";
            case 3:
                return "周三";
            case 4:
                return "周四";
            case 5:
                return "周五";
            case 6:
                return "周六";
        }
    }

    type = type.replace("yyyy", year);
    type = type.replace("MM", grid(month));
    type = type.replace("dd", grid(day));
    type = type.replace("HH", grid(hours));
    type = type.replace("mm", grid(minute));
    type = type.replace("ss", grid(secend));
    type = type.replace("ww", getWeek(week));

    type = type.replace("M", month);
    type = type.replace("d", day);
    type = type.replace("H", hours);
    type = type.replace("m", minute);
    type = type.replace("s", secend);
    type = type.replace("w", week);

    return type
}
// 时间栅格化
export function DateGridmy(date, type) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours() - 1;
    var minute = date.getMinutes();
    var secend = date.getSeconds();
    var week = date.getDay();

    var grid = function (num) {
        if (parseInt(num) > 9) {
            return num;
        } else {
            return "0" + num;
        }
    }

    var getWeek = function (num) {
        switch (num) {
            case 0:
                return "周日";
            case 1:
                return "周一";
            case 2:
                return "周二";
            case 3:
                return "周三";
            case 4:
                return "周四";
            case 5:
                return "周五";
            case 6:
                return "周六";
        }
    }

    type = type.replace("yyyy", year);
    type = type.replace("MM", grid(month));
    type = type.replace("dd", grid(day));
    type = type.replace("HH", grid(hours));
    type = type.replace("mm", grid(minute));
    type = type.replace("ss", grid(secend));
    type = type.replace("ww", getWeek(week));

    type = type.replace("M", month);
    type = type.replace("d", day);
    type = type.replace("H", hours);
    type = type.replace("m", minute);
    type = type.replace("s", secend);
    type = type.replace("w", week);

    return type
}
