<template>
    <el-container>
        <!--头部-->
        <el-header>
            <Header></Header>
        </el-header>
        <el-container>
            <!--左侧导航-->
            <el-aside width="300px">
                <NavLeft></NavLeft>
            </el-aside>
            <!--主体-->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    // @ is an alias to /src
    import Header from '@/components/admin/Header.vue'
    import NavLeft from '@/components/admin/NavLeft.vue'

    export default {
        name: 'Admin',
        components: {
            Header,
            NavLeft
        },
        methods: {}
    }
</script>
<style scoped>
</style>
