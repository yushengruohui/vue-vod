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
        component: Index,
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/headend/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/headend/Register.vue')
    },
    {
        path: '/videoPlayer',
        name: 'VideoPlayer',
        component: () => import('@/views/headend/VideoPlayer.vue')
    },
    {
        path: '/videoList',
        name: 'VideoList',
        component: () => import('@/views/headend/VideoList.vue')
    },
    {
        path: '/userInfo',
        name: 'UserInfo',
        component: () => import('@/views/headend/UserInfo.vue')
    },
    {
        path: '/history',
        name: 'History',
        component: () => import('@/views/headend/History.vue')
    },
    {
        path: '/favorite',
        name: 'Favorite',
        component: () => import('@/views/headend/Favorite.vue')
    },
    {
        path: '/userBackground',
        name: 'UserBackground',
        component: () => import('@/views/headend/UserBackground.vue'),
        children: [
            // {
            //     // 默认下，userBackground <rounter-view>加载的组件
            //     path: '',
            //     name: "SearchUserInfo",
            //     component: () => import('@/components/headend/SearchUserInfo.vue'),
            //     meta: {title: '查看用户信息'},
            // },
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
                path: 'deleteVideo',
                name: "DeleteVideo",
                component: () => import('@/components/headend/DeleteVideo.vue'),
                meta: {title: '删除视频'},
            },
            {
                path: 'feedback',
                name: "Feedback",
                component: () => import('@/components/headend/Feedback.vue'),
                meta: {title: '问题反馈'},
            },
        ]
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
