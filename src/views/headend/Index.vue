<template>
    <div class="index">
        <el-container>
            <!--视频网页-->
            <!--================ 头部区域 ================-->
            <el-header>
                <Header/>
            </el-header>
            <!--================ 主体区域 ================-->
            <el-main>
                <IndexBody></IndexBody>
            </el-main>
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
    import IndexBody from '@/components/headend/IndexBody.vue'
    import Foot from '@/components/headend/Foot.vue'

    export default {
        name: 'Index',
        components: {
            Header,
            IndexBody,
            Foot
        },
        methods: {}
    }
</script>
<style scoped>
</style>
