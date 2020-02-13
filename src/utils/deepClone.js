// 浅拷贝封装
export function clone(origin, target) {
    let tar = target || {};
    for(let key in origin) {
        // 排除原型
        if (origin.hasOwnProperty(key)) {
            tar[key] = origin[key];
        }
    }
    return tar;
}

// 深拷贝封装
export function deepClone(origin, target) {
    let tar = target || {},
        toStr = Object.prototype.toString,
        arrType = '[object Array]';

    for(let key in origin) {
        // 排除原型
        if (origin.hasOwnProperty(key)) {
            // 判断是否为引用值，要排除 null， 得到：数组 或 对象
            if (typeof(origin[key]) === 'object' && origin[key] !== null) {
                // 判断数组 还是 对象
                // if (toStr.call(origin[key]) === arrType) {
                //     tar[key] = [];
                // } else {
                //     tar[key] = {};
                // }
                // 三目运算
                toStr.call(origin[key]) === arrType ? tar[key] = []
                    : tar[key] = {};

                // 递归
                deepClone(origin[key], tar[key]);
            } else {
                // 原始值
                tar[key] = origin[key];
            }
        }
    }
    return tar;
}

/*
// 深拷贝2：json实现-无法copy方法 - 会忽略掉函数和 undefined 。
var str = JSON.stringify(person1);
var person2 = JSON.parse(str);
*/
