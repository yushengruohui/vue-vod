import Vue from 'vue'
import Vuex from 'vuex'
import jwt from 'jsonwebtoken'

Vue.use(Vuex);

const state = {
    token: "",
    userId: "",
    userAccount: "",
    userName: "",
    userRoles: [],
    loginStatus: false,
    isVIP: false,
    isAdmin: false,
    adminOperator: {},
    //资源地址基本链接
    resourceUrl: "http://127.0.0.1:3888/vod/resource"
};
const getters = {
    token: state => state.token,
    userId: state => state.userId,
    userAccount: state => state.userAccount,
    userName: state => state.userName,
    userRoles: state => state.userRoles,
    loginStatus: state => state.loginStatus,
    isVIP: state => state.isVIP,
    isAdmin: state => state.isAdmin,
    adminOperator: state => state.adminOperator,
    resourceUrl: state => state.resourceUrl,
};

const types = {
    setToken: 'setToken',
    setUserId: 'setUserId',
    setUserAccount: 'setUserAccount',
    setUserName: 'setUserName',
    setUserRoles: 'setUserRoles',
    setLoginStatus: 'setLoginStatus',
    setVip: 'setVip',
    setAdmin: 'setAdmin',
    setAdminOperator: "setAdminOperator",
    setResourceUrl: "setResourceUrl",
};

const mutations = {
    setToken(state, param) {
        state.token = param;
    },
    setLoginStatus(state, param) {
        state.loginStatus = param;
    },
    setVip(state, status) {
        state.isVIP = status;
    },
    setAdmin(state, status) {
        state.isAdmin = status;
    },
    setUserAccount(state, param) {
        state.userAccount = param;
    },
    setUserRoles(state, param) {
        state.userRoles = param;
    },
    setUserId(state, param) {
        state.userId = param;
    },
    setAdminOperator(state, param) {
        state.adminOperator = param;
    },
    setUserName(state, param) {
        state.userName = param;
    },
    setResourceUrl(state, param) {
        state.resourceUrl = param;
    },
};

const actions = {
    logout({commit}) { // 退出登录
        return new Promise((resolve, reject) => {
            // 清除信息
            commit(types.setToken, "");
            commit(types.setUserId, "");
            commit(types.setLoginStatus, false);
            commit(types.setAdminOperator, null);
            commit(types.setVip, false);
            commit(types.setAdmin, false);
            commit(types.setUserAccount, "");
            commit(types.setUserRoles, []);
            commit(types.setUserName, "");
            localStorage.removeItem('token');
        });
    },
    toLogin({commit}, token) {
        if (token) {
            //登陆成功处理
            commit(types.setToken, token);
            const tokenInfo = jwt.decode(token);
            const userRoles = tokenInfo.roles;
            const vip = userRoles.toString().includes("VIP");
            const admin = userRoles.toString().includes("ADMIN");
            // console.log(tokenInfo);
            commit(types.setUserId, tokenInfo.id);
            commit(types.setLoginStatus, true);
            commit(types.setVip, vip);
            commit(types.setAdmin, admin);
            commit(types.setUserAccount, tokenInfo.account);
            commit(types.setUserRoles, userRoles);
            commit(types.setUserName, tokenInfo.username);
            localStorage.setItem("token", token);
        }
    },
    initInfo({commit}, token) {
        if (token) {
            const tokenInfo = jwt.decode(token);
            const expTime = tokenInfo.exp;
            const createTime = tokenInfo.createdTime;
            const currentTime = new Date().getTime();
            const isExp = (currentTime - createTime) > expTime;
            if (isExp) {
                commit(types.setToken, "");
                commit(types.setUserId, "");
                commit(types.setUserAccount, "");
                commit(types.setUserName, "");
                commit(types.setUserRoles, []);
                commit(types.setLoginStatus, false);
                commit(types.setVip, false);
                commit(types.setAdmin, false);
                localStorage.removeItem("token");
            } else {
                const userRoles = tokenInfo.roles;
                const vip = userRoles.toString().includes("VIP");
                const admin = userRoles.toString().includes("ADMIN");
                commit(types.setUserId, tokenInfo.id);
                commit(types.setLoginStatus, true);
                commit(types.setVip, vip);
                commit(types.setAdmin, admin);
                commit(types.setUserAccount, tokenInfo.account);
                commit(types.setUserRoles, userRoles);
                commit(types.setUserName, tokenInfo.username);
                localStorage.setItem("token", token);
            }
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
