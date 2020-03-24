// 专门处理请求的配置文件
import axios from 'axios';
import {Message, Loading} from 'element-ui';
import router from '../router/router.js';


// 链接超过5s就超时
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
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (typeof (res.data) == "undefined") {
            data = res.request.responseText
        } else {
            data = res.data
        }
        return data;
    },
    err => {
        // 错误响应
        if (err && err.response) {
            switch (err.response.status) {
                case 400:
                    err.message = '请求错误(400)';
                    break;
                case 401: { // 未登录，跳转到登陆页面
                    return history.push('/login')
                }
                case 403:
                    err.message = '拒绝访问(403)';
                    break;
                case 404:
                    err.message = '请求出错(404)';
                    break;
                case 408:
                    err.message = '请求超时(408)';
                    break;
                case 500:
                    err.message = '服务器错误(500)';
                    break;
                case 501:
                    err.message = '服务未实现(501)';
                    break;
                case 502:
                    err.message = '网络错误(502)';
                    break;
                case 503:
                    err.message = '服务不可用(503)';
                    break;
                case 504:
                    err.message = '网络超时(504)';
                    break;
                case 505:
                    err.message = 'HTTP版本不受支持(505)';
                    break;
                default:
                    err.message = `连接出错(${err.response.status})!`;
            }
        } else {
            err.message = '连接服务器失败!'
        }
        Message.error(err.message);
        return Promise.reject(err);
    }
);
// let baseUrl = 'http://localhost:3888/video/';
// let baseUrl = 'http://127.0.0.1:3888/video';
let baseUrl = '';
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${baseUrl}${url}`,
        data: params,
        // 发送数据前的数据处理，就是对params进行格式处理，再发送。
        transformRequest: [function (data) {
            let ret = '';
            for (let item in data) {
                ret += encodeURIComponent(item) + '=' + encodeURIComponent(data[item]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};
export const uploadFileRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${baseUrl}${url}`,
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${baseUrl}${url}`,
        data: params,
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
export const deleteRequest = (url) => {
    return axios({
        method: 'delete',
        url: `${baseUrl}${url}`
    });
};

export const getRequest = (url) => {
    return axios({
        method: 'get',
        url: `${baseUrl}${url}`
    });
};

export const getRequestWithParam = (url, params) => {
    return axios({
        method: 'get',
        data: params,
        url: `${baseUrl}${url}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

export default axios;