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
    response => {
        if (response.status && response.status === 200 && response.data.status === 500) {
            Message.error({message: response.data.msg});
            return;
        }
        if (response.data.msg) {
            Message.success({message: response.data.msg});
        }
        return response;
    },
    error => {
        //错误提醒
        console.log(error.response.request.responseURL);
        if (error.response.status === 500) {
            Message.error({message: '请求路径错误!' + error.response.request.responseURL + '不存在!'});
        } else if (error.response.status === 404) {
            Message.error({message: '服务器被吃了⊙﹏⊙∥'});
        } else if (error.response.status === 403) {
            Message.error({message: '权限不足,请联系管理员!'});
        } else if (error.response.status === 401) {
            Message.error({message: error.response.data.msg});
        } else {
            if (error.response.data.msg) {
                Message.error({message: error.response.data.msg});
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