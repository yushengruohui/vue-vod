<template xmlns:el-col="http://www.w3.org/1999/html">
    <div class="indexHeader">
        <el-row type="flex" style="padding-top: 10px;padding-bottom: 10px">
            <el-col :span="4" class="myCenter"><span class="font-color">后台管理系统</span></el-col>
            <el-col :offset="16" :span="3" class="myCenter"><span class="font-color">欢迎你，管理员：{{this.$store.getters.userName}}</span>
            </el-col>
            <el-col :span="1">
                <router-link to="/index" class="font-color">退出</router-link>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
    .indexHeader {
        width: 100%;
        height: 100%;
        padding: 5px;
        background: #324057;
        border-bottom: 1px solid #1f2d3d;
        border-radius: 2px;
    }

    .font-color {
        color: #ffffff;
    }
</style>