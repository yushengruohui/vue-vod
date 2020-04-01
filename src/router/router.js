import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/headend/Index.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/index',
    },
    {
        path: '/index',
        name: 'Index',
        meta: {title: '主页'},
        component: Index,
    },
    {
        path: '/login',
        name: 'Login',
        meta: {title: '登陆'},
        component: () => import('@/views/headend/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        meta: {title: '注册'},
        component: () => import('@/views/headend/Register.vue')
    },
    {
        path: '/videoInfo',
        name: 'VideoInfo',
        meta: {title: '视频详细'},
        component: () => import('@/views/headend/VideoInfo.vue')
    },
    {
        path: '/videoSearch',
        name: 'VideoSearch',
        meta: {title: '视频搜索结果'},
        component: () => import('@/views/headend/VideoSearch.vue')
    },
    {
        path: '/videoPlayer',
        name: 'VideoPlayer',
        component: () => import('@/views/headend/VideoPlayer.vue'),
        meta: {title: '视频播放'},
    },
    {
        path: '/videoList',
        name: 'VideoList',
        component: () => import('@/views/headend/VideoList.vue'),
        meta: {title: '视频列表'},
    },
    {
        path: '/money',
        name: 'Money',
        component: () => import('@/views/headend/Money.vue'),
        meta: {title: '充值'},
    },
    {
        path: '/userBackground',
        name: 'UserBackground',
        component: () => import('@/views/headend/UserBackground.vue'),
        children: [
            {
                // 注意path不要再加斜杆
                path: 'searchUserInfo',
                name: "SearchUserInfo",
                component: () => import('@/components/headend/SearchUserInfo.vue'),
                meta: {title: '查看用户信息'},
            },
            {
                path: 'editUserInfo',
                name: "EditUserInfo",
                component: () => import('@/components/headend/EditUserInfo.vue'),
                meta: {title: '编辑用户信息'},
            },
            {
                path: 'uploadRecord',
                name: "UploadRecord",
                component: () => import('@/components/headend/UploadRecord.vue'),
                meta: {title: '上传记录'},
            },
            {
                path: 'uploadVideo',
                name: "UploadVideo",
                component: () => import('@/components/headend/UploadVideo.vue'),
                meta: {title: '上传视频'},
            },
            {
                path: 'history',
                name: "History",
                component: () => import('@/components/headend/History.vue'),
                meta: {title: '历史记录'},
            },
            {
                path: 'favorite',
                name: 'Favorite',
                meta: {title: "视频收藏记录"},
                component: () => import('@/components/headend/Favorite.vue')
            },

        ]
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import('@/views/admin/Index.vue'),
        children: [
            {
                path: 'user',
                name: 'AdminUser',
                meta: {title: "用户管理"},
                component: () => import('@/components/admin/User.vue')
            },
            {
                path: 'check',
                name: 'AdminCheck',
                meta: {title: "视频审核"},
                component: () => import('@/components/admin/Check.vue')
            },
            {
                path: 'editUser',
                name: 'AdminEditUser',
                meta: {title: "修改用户信息"},
                component: () => import('@/components/admin/EditUserInfo.vue')
            },
            {
                path: 'checkUserInfo',
                name: 'CheckUserInfo',
                meta: {title: "查看用户信息"},
                component: () => import('@/components/admin/UserInfo.vue')
            },
            {
                path: 'uploadVideo',
                name: 'AdminUploadVideo',
                meta: {title: "视频上传"},
                component: () => import('@/components/admin/UploadVideo.vue')
            }
        ]
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});
// 添加路由守卫
router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if (to.path === "/" || to.path === "/test" || to.path === "/login" || to.path === "/register" || to.path === "/index") {
        next()
    } else {
        if (to.path === "/undefined") {
            next({
                path: '/index',
            });
        }
        let loginStatus = window.localStorage.getItem('token');
        if (loginStatus) {
            next();
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.path
                }
            });
        }
    }
});
export default router
