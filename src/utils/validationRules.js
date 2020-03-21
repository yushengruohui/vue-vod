/**
 * 验证字符是否为空（不判断空格、制符、换页符等）
 * @param str
 * @returns {boolean}
 */
const isEmpty = (str) => {
    return str === null || typeof str === "undefined" || str === "";
};

/**
 * 验证邮箱
 * @param rule element-ui的验证项的相关属性，里面有属性 field,trigger,
 * @param str
 * @param callback
 */
export const isEmail = (rule, str, callback) => {
    if (isEmpty(str)) {
        callback("请输入你的邮箱")
    }
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(str)) {
        callback();
    } else {
        callback("请输入正确的邮箱")
    }
};

/**
 * 验证手机号码
 * @param rule
 * @param str
 * @param callback
 */
export const isMobilePhoneNumber = (rule, str, callback) => {
    if (isEmpty(str)) {
        callback(new Error("请输入你的手机号码"));
    }
    let reg = /^1[34578][0-9]{9}$/;
    if (reg.test(str)) {
        callback();
    } else {
        callback(new Error("请输入正确手机号码"));
    }
};

/**
 * 验证身份证号码
 * @param rule
 * @param str
 * @param callback
 */
export const isIdCard = (rule, str, callback) => {
    if (isEmpty(str)) {
        callback("请输入你的身份证号码")
    }
    let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    if (reg.test(str)) {
        callback();
    } else {
        callback("请输入正确的身份证号码")
    }
};

/**
 * 验证密码
 * @param rule
 * @param str
 * @param callback
 */
export const isPassword3 = (rule, str, callback) => {
    if (isEmpty(str)) {
        callback("请输入你的密码")
    }
    //密码强度正则，最少6位，最多18位，而且同时要有字母和数字。
    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
    if (reg.test(str)) {
        callback();
    } else {
        callback("请输入正确的密码");
    }
}

/**
 * 验证用户名
 * @param rule
 * @param str
 * @param callback
 */
export const isUserName = (rule, str, callback) => {
    if (isEmpty(str)) {
        callback("请输入你的名称")
    }
    //最少1位，最多16位，可以为字母,数字,汉字,下划线。
    let reg = /^([a-zA-Z0-9_\u4e00-\u9fa5]{1,16})$/;
    if (reg.test(str)) {
        callback();
    } else {
        callback("最少1位，最多16位，可以为字母,数字,汉字,下划线");
    }
};