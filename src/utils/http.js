// 专门处理请求的配置文件
import axios from 'axios';
import {Message, Loading} from 'element-ui'

// 全局配置axios
// 全局根域名
// axios.defaults.baseURL = 'http://localhost:8080';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 5000;

// 请求拦截
axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        Message.error({message: '请求超时!'});
        // return Promise.reject(error);
    }
);

// 响应拦截
axios.interceptors.response.use(
    result => {
        // 成功响应
        if (result.status && result.status === 200 && result.data.status === 500) {
            Message.error({message: result.data.msg});
            return;
        }
        if (result.data.msg) {
            Message.success({message: result.data.msg});
        }
        return result;
    },
    result => {
        // 错误响应
        console.log(result.response.request.responseURL);
        if (result.response.status === 500) {
            Message.error({message: '请求路径不存在!'});
        } else if (result.response.status === 404) {
            Message.error({message: '服务器被吃了⊙﹏⊙∥'});
        } else if (result.response.status === 403) {
            Message.error({message: '权限不足,请联系管理员!'});
        } else if (result.response.status === 401) {
            Message.error({message: result.response.data.msg});
        } else {
            if (result.response.data.msg) {
                Message.error({message: result.response.data.msg});
            } else {
                Message.error({message: '未知错误!'});
            }
        }
        // return Promise.reject(error);
    }
);
let base = '';
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
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
        url: `${base}${url}`,
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = ''
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
        url: `${base}${url}`
    });
};
export const getRequest = (url) => {
    return axios({
        method: 'get',
        url: `${base}${url}`
    });
};
export default axios;