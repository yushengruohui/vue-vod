<template>
    <div class="index">
        <el-container>
            <!--视频网页-->
            <!--================ 头部区域 ================-->
            <el-header>
                <Header msg="header"/>
            </el-header>
            <!--================ 主体区域 ================-->
            <el-main>
                <Body msg="body"></Body>
            </el-main>
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
    import Body from '@/components/headend/Body.vue'
    import Foot from '@/components/headend/Foot.vue'

    export default {
        name: 'Index',
        components: {
            Header,
            Body,
            Foot
        },
        methods: {}
    }
</script>
<style scoped>
    .index {
        background: #324057;
        color: #ffffff;
    }
</style>
