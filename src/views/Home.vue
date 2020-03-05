<template>
    <div class="home">
        <el-container>
            <!--视频网页-->
            <!--================ 头部区域 ================-->
            <el-header>
                <Header msg="header"/>
            </el-header>
            <!--================ 主体区域 ================-->
            <el-main>主体区域</el-main>
            <!--================ 底部区域 ================-->
            <el-footer>底部区域</el-footer>
        </el-container>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Header from '@/components/header.vue'

    export default {
        name: 'Home',
        components: {
            Header
        }
    }
</script>
