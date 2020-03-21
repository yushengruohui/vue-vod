<template>
    <!--个人信息-->
    <div class="userInfo">
        <el-container>
            <!--================ 头部区域 ================-->
            <el-header>
                <Header msg="header"/>
            </el-header>
            <!--================ 主体区域 ================-->
            <el-main>
                <div class="info">
                    <el-divider>用户个人信息</el-divider>
                    <el-form ref="userForm" :model="userForm" label-width="100px" size="mini">
                        <el-form-item label="昵称:">
                            <el-input v-model="userForm.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码:">
                            <el-input v-model="userForm.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="生日:">
                            <el-input v-model="userForm.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="性别:">
                            <el-input v-model="userForm.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="地址:">
                            <el-input v-model="userForm.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱:">
                            <el-input v-model="userForm.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="会员:">
                            <el-input v-model="userForm.userName"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-divider>操作</el-divider>
                    <el-button type="primary" style="width: 100%;">提交修改</el-button>
                </div>
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
    import Foot from '@/components/headend/Foot.vue'

    export default {
        name: 'UserInfo',
        components: {
            Header,
            Foot
        },
        data() {
            return {
                userForm: {
                    userName: '',
                    userAge: ''
                }
            };
        },
        methods: {}
    }
</script>
<style scoped>
    .userInfo {
    }

    .info {
        padding: 10px;
        min-height: 550px;
        margin-left: 30%;
        margin-right: 30%;
    }
</style>
