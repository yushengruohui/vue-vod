import Vue from 'vue'
import Vuex from 'vuex'
import {isEmpty} from "../utils/dataUtils";

Vue.use(Vuex);

// state相当于数据库
const state = {
    token: window.localStorage.getItem('token') || "",
    loginStatus: !isEmpty(window.localStorage.getItem('token')),
    user: window.localStorage.getItem('userInfo') || {}  // 存储用户信息
};
// getters：获取数据库中数据的api，用于vue的 computed:{ } 中
const getters = {
    token: state => state.token,
    loginStatus: state => state.loginStatus,
    user: state => state.user,
};

//types 代表mutations的方法名，用法：$store.types.xxx.，作用：编译软件有智能提示。
const types = {
    setToken: 'setToken', // 是否认证通过
    setUser: 'setUser',// 用户信息
    setLoginStatus: 'setLoginStatus' // 登陆状态
};
// mutations： 把简单修改完成后的数据，保存到数据库中（同步处理）,用于vue的 methods 中
const mutations = {
    setToken(state, token) {
        if (token != null) {
            state.token = token;
        } else {
            state.token = "";
        }
    },
    setUser(state, userInfo) {
        if (userInfo != null)
            state.user = userInfo;
        else
            state.user = {}
    },
    setLoginStatus(state, loginStatus) {
        state.loginStatus = loginStatus;
    }
};

// actions：mutations的升级版，复杂地处理（异步处理）未提交前的数据，修改完成后，提交到数据库中。用于vue的 methods 中
const actions = {
    logout({commit}) { // 退出登录
        return new Promise((resolve, reject) => {
            // 清除信息
            commit(types.setUser, null);
            commit(types.setLoginStatus, false);
            commit(types.setToken, "");
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('useInfo');
        });
    },
    toLogin({commit}, res) {
        // 账号密码正确后，修改用户状态
        if (!isEmpty(res)) {
            //登陆成功
            let userInfo = {
                "id": "",
                "username": "",
                "roles": [],
            };
            let loginStatus = true;
            userInfo.id = res.data.userId;
            userInfo.username = res.data.userName;
            userInfo.roles = res.data.roleNames;
            commit("setToken", res.data.token); // 存储 token
            commit("setLoginStatus", true); // 改变登录状态为true
            commit("setUser", userInfo);// 存储用户信息
            window.localStorage.setItem('token', res.data.token); // 存储进 localStroage
            window.localStorage.setItem('userInfo', userInfo.toString()); // 存储进 localStroage
        } else {
            //密码或账号错误，登陆失败
            commit(types.setUser, null);
            commit(types.setLoginStatus, false);
            commit(types.setToken, "");
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('userInfo');
        }
    },

};
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {}
})
