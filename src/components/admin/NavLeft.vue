<template>
    <el-menu
            :default-active="activeIndex"
            router
            class="el-menu-vertical-demo"
            background-color="#324057"
            text-color="#fff"
            active-text-color="#ffd04b"
            style="height: 620px;margin-left: 20px;margin-top: 10px"
    >
        <el-menu-item index="/admin/user">
            <i class="el-icon-user-solid"></i>
            <span>用户管理</span>
        </el-menu-item>
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-video-camera"></i>
                <span>视频管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/admin/check">
                    <i class="el-icon-view"></i>
                    <span>待审核视频</span>
                </el-menu-item>
                <el-menu-item index="/admin/uploadVideo">
                    <i class="el-icon-upload"></i>
                    <span>上传视频</span>
                </el-menu-item>

            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        name: "NavLeft",
        data() {
            return {
                activeIndex: this.$route.path,
            }
        }
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