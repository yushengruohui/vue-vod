<template>
    <div class="index">
        <el-container>
            <!--视频网页-->
            <!--================ 头部区域 ================-->
            <el-header>
                <Header/>
            </el-header>
            <el-container style="height: 580px;border: 1px solid #eee ;margin-bottom: 10px">
                <!--================ 侧边栏 ================-->
                <el-aside style="height: 572px">
                    <el-menu
                            :default-active="activeIndex"
                            router
                            class="el-menu-vertical-demo"
                            background-color="#324057"
                            text-color="#fff"
                            active-text-color="#ffd04b"
                            style="height: 550px;margin-left: 20px;margin-top: 10px"
                    >
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-user"></i>
                                <span>用户中心</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/userBackground/searchUserInfo">
                                    <i class="el-icon-search"></i>
                                    <span>查看个人信息</span>
                                </el-menu-item>
                                <el-menu-item index="/userBackground/editUserInfo">
                                    <i class="el-icon-edit"></i>
                                    <span>修改个人信息</span></el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-video-camera"></i>
                                <span>视频管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/userBackground/uploadRecord"
                                              v-show="isUpload">
                                    <i class="el-icon-time"></i>
                                    <span>上传记录</span></el-menu-item>
                                <el-menu-item index="/userBackground/uploadVideo"
                                              v-show="isUpload">
                                    <i class="el-icon-upload"></i>
                                    <span>上传视频</span>
                                </el-menu-item>
                                <el-menu-item index="/userBackground/history">
                                    <i class="el-icon-time"></i>
                                    <span>历史记录</span>
                                </el-menu-item>
                                <el-menu-item index="/userBackground/favorite">
                                    <i class="el-icon-star-off"></i>
                                    <span>收藏视频</span>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>

                    </el-menu>
                </el-aside>
                <!--================ 主体区域 ================-->
                <el-main style="height: 570px">
                    <!--<component :is="componentName">-->
                    <!--</component>-->
                    <keep-alive include="UploadVideo">
                        <router-view></router-view>
                    </keep-alive>
                </el-main>
            </el-container>
            <!--================ 底部区域 ================-->
            <el-footer>
                <Foot></Foot>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Header from '@/components/headend/Header.vue'
    import Foot from '@/components/headend/Foot.vue'

    export default {
        name: 'UserBackground',
        components: {
            Header,
            Foot,
        },
        data() {
            return {
                activeIndex: this.$route.path,
                isUpload: this.$store.getters.user.roles.includes('VIP') || this.$store.getters.user.roles.includes('ADMIN') || false,
            };
        },
        methods: {}
    }
</script>
<style scoped>

    .navLink {
        height: 50px;
        display: flex;
        background-color: #324057;
        color: #ffffff;
        flex-direction: column; /*元素的排列方向为垂直*/
        justify-content: center; /*水平居中对齐*/
        align-items: center; /*垂直居中对齐*/
    }


    .navLink:hover {
        color: #000;
        background-color: #409EFF;
    }
</style>
