<template>
    <div class="index">
        <el-container>
            <!--视频网页-->
            <!--================ 头部区域 ================-->
            <el-header>
                <Header msg="header"/>
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
                            @select="handleSelect"
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
                                <el-menu-item index="/userBackground/uploadRecord">
                                    <i class="el-icon-time"></i>
                                    <span>上传记录</span></el-menu-item>
                                <el-menu-item index="/userBackground/uploadVideo">
                                    <i class="el-icon-upload"></i>
                                    <span>上传视频</span>
                                </el-menu-item>
                                <el-menu-item index="/userBackground/deleteVideo">
                                    <i class="el-icon-delete"></i>
                                    <span>删除视频</span>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-menu-item index="/userBackground/feedback">
                            <i class="el-icon-date"></i>
                            <span>问题反馈</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <!--================ 主体区域 ================-->
                <el-main style="height: 570px">
                    <!--<component :is="componentName">-->
                    <!--</component>-->
                    <router-view></router-view>
                </el-main>
            </el-container>
            <!--================ 底部区域 ================-->
            <el-footer>
                <Foot msg="Foot"></Foot>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Header from '@/components/headend/Header.vue'
    import Foot from '@/components/headend/Foot.vue'
    import UploadVideo from '@/components/headend/UploadVideo.vue'
    import UploadRecord from '@/components/headend/UploadRecord.vue'

    export default {
        name: 'UserBackground',
        components: {
            Header,
            Foot,
            // UploadVideo,
            // UploadVideoInfo
        },
        data() {
            return {
                activeIndex: this.$route.path,
                // componentName: "UploadVideo"
            };
        },
        methods: {
            // 侧边栏相关操作
            changeComponets(str) {
                this.componentName = str;
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
                // activeIndex = key;
                // this.$router.push({
                //     path: key,
                //     params: {data: 'query'}
                // })
            }

        }
    }
</script>
<style scoped>
    .index {
    }

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
