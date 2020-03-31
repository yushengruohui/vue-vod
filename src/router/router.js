import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/headend/Index.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/videoList',
    },
    {
        path: '/index',
        name: 'Index',
        meta: {title: '主页'},
        component: Index,
    },
    {
        path: '/test',
        name: 'Test',
        meta: {title: '测试'},
        component: () => import('@/views/test.vue')
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
