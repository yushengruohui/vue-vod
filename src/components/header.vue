<template>
    <div class="header">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">视频点播系统</el-menu-item>
            <el-submenu index="2">
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
                <el-submenu index="2-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="2-4-1">选项1</el-menu-item>
                    <el-menu-item index="2-4-2">选项2</el-menu-item>
                    <el-menu-item index="2-4-3">选项3</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item index="3" disabled>消息中心</el-menu-item>
            <el-menu-item index="4"><a href="#" target="_blank">订单管理</a></el-menu-item>
        </el-menu>

    </div>
</template>

<script>
    import {getRequest} from "../http";

    export default {
        name: 'Header',
        data() {
            return {
                searchKeyWork: '',
                activeIndex: '1'
            }
        },
        props: {
            msg: String
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
                getRequest("/api/cityjson?ie=utf-8").then(res => {
                    console.log(res)
                });
            }

        }
    }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .header {
        margin: 10px;

        div {
            padding-left: 10px;
            padding-right: 10px;
            padding-bottom: 5px;
            margin: 0 auto;
            text-align: center;
        }

    }


</style>

