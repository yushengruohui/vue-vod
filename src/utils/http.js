// 专门处理请求的配置文件
import axios from 'axios';
import {Message} from 'element-ui';


// 连接超过5s就超时
axios.defaults.timeout = 5000;

// 请求拦截
axios.interceptors.request.use(
    config => {
        if (window.localStorage.getItem('token')) {
            config.headers['Authorization'] = `Bearer ` + window.localStorage.getItem('token')
        }
        return config;
    },
    error => {
        Message.error({message: '请求超时!'});
        return Promise.reject(error);
    }
);

// 响应拦截
axios.interceptors.response.use(
    res => {
        // 成功响应
        let data;
        if (res.data) {
            //看个人习惯，是否直接接受res.data
            data = res.data
        } else if (typeof (res.data) === "undefined" && res.request.responseText) {
            // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
            data = res.request.responseText
        } else {
            data = res;
        }
        return data;
    },
    err => {
        // 错误响应
        if (err && err.response) {
            switch (err.response.status) {
                case 400: {
                    err.message = '请求参数错误(400)';
                    break;
                }
                case 401: {
                    // 未登录，跳转到登陆页面
                    localStorage.removeItem("token");
                    err.message = '未登陆，拒绝访问(401)';
                    break;
                }
                case 403: {
                    err.message = '没有访问权限，拒绝访问(403)';
                    break;
                }
                case 404: {
                    err.message = '请求路径错误(404)';
                    break;
                }
                case 408: {
                    err.message = '请求超时(408)';
                    break;
                }
                case 500: {
                    err.message = '服务器内部错误(500)';
                    break;
                }
                case 501:
                    err.message = '服务未实现(501)';
                    break;
                case 502: {
                    err.message = '网络错误(502)';
                    break;
                }
                case 503: {
                    err.message = '服务不可用(503)';
                    break;
                }
                case 504: {
                    err.message = '网络超时(504)';
                    break;
                }
                case 505: {
                    err.message = 'HTTP版本不受支持(505)';
                    break;
                }
                default: {
                    err.message = `连接出错(${err.response.status})!`;
                }
            }
        } else {
            err.message = '连接服务器失败!'
        }
        Message.error(err.message);
        return Promise.reject(err);
    }
);
// let baseUrl = 'http://localhost:3888/video/';
// let baseUrl = '';
let baseUrl = '/api';
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${baseUrl}${url}`,
        data: params || {},
        // 发送数据前的数据处理，就是对params进行格式处理，再发送，默认处理为转换成json格式。
        transformRequest: [function (data) {
            let ret = '';
            for (const item in data) {
                ret += encodeURIComponent(item) + '=' + encodeURIComponent(data[item]) + '&'
            }
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};
export const uploadFileRequest = (url, file, param, progressRate) => {
    return axios({
        method: 'post',
        url: `${baseUrl}${url}`,
        data: file || {},
        params: param,
        onUploadProgress: progressRate || null,
        timeout: -1,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
export const downloadFileRequest = (url, param, fileName) => {
    return axios({
        method: 'get',
        url: `${baseUrl}${url}`,
        params: param || {},
        timeout: -1,
        responseType: 'blob'
    }).then((response) => {
        const blob = new Blob([response]);
        if ('download' in document.createElement('a')) {
            const tag_a = document.createElement('a');
            tag_a.download = fileName;
            tag_a.style.display = 'none';
            tag_a.href = URL.createObjectURL(blob);
            document.body.appendChild(tag_a);
            tag_a.click();
            URL.revokeObjectURL(tag_a.href);// 释放URL 对象
            document.body.removeChild(tag_a)
        } else {
            navigator.msSaveBlob(blob, fileName)
        }
        return Promise.resolve(response);
    }).catch((err) => {
        return Promise.reject(err)
    });
};
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${baseUrl}${url}`,
        data: params || {},
        transformRequest: [function (data) {
            let ret = '';
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

export const getRequest = (url, param) => {
    return axios({
        method: 'get',
        url: `${baseUrl}${url}`,
        params: param || {}
    });
};

export const deleteRequest = (url, param) => {
    return axios({
        method: 'delete',
        url: `${baseUrl}${url}`,
        params: param || {}
    });
};

export default axios;