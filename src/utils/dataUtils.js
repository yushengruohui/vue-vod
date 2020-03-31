/**
 * 验证字符是否为空
 */
export const isEmpty = (str) => {
    return str === null || typeof str === "undefined" || str === "";
};

/**
 * 去除字符串中的所有空格（包括空格、制表符、换页符等）
 * @param str
 * @returns {*} 不包含空格的字符串
 */
export const deleteEmpty = (str) => {
    return str.replace(/\s*/g, "");
};

/**
 * 验证字符串不为空
 * @param args
 * @returns {boolean}
 */
export const isNotNullORBlank = (...args) => {
    for (let i = 0; i < args.length; i++) {
        let argument = args[i];
        if (argument == null || argument === "" || argument === undefined) {
            console.log("数据不能为空");
            return false;
        }
    }
    return true;
};

export const formatDateTime = (value) => {
    let date = new Date(value);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const formatDate = (value) => {
    let date = new Date(value);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    return `${year}-${month}-${day}`;
};