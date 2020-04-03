<template>
    <!--个人信息-->
    <div class="info">
        <el-divider>个人信息</el-divider>
        <el-form ref="userForm" :model="userForm" label-width="100px" size="small">
            <el-form-item label="姓名:">
                <el-input v-model="userForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="昵称:">
                <el-input v-model="userForm.userNickname"></el-input>
            </el-form-item>
            <el-form-item label="手机号码:">
                <el-input v-model="userForm.userPhone"></el-input>
            </el-form-item>
            <el-form-item label="性别:">
                <el-input v-model="userForm.userGender"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码:">
                <el-input v-model="userForm.userIdcard"></el-input>
            </el-form-item>
            <el-form-item label="邮箱:">
                <el-input v-model="userForm.userEmail"></el-input>
            </el-form-item>
            <el-form-item label="余额:">
                <el-input v-model="userForm.userMoney"></el-input>
            </el-form-item>
            <el-form-item label="用户状态:">
                <el-input v-model="userForm.role"></el-input>
            </el-form-item>
            <el-form-item label="注册时间:">
                <el-input v-model="userForm.userAddTime"></el-input>
            </el-form-item>
        </el-form>
        <el-divider></el-divider>
    </div>
</template>

<script>
    // @ is an alias to /src
    import {getRequest} from "../../utils/http";

    export default {
        name: 'SearchUserInfo',

        data() {
            return {
                userForm: {
                    "userName": "",
                    "userNickname": "",
                    "userGender": "",
                    "userPhone": "",
                    "userIdcard": "",
                    "userEmail": "",
                    "userAddTime": "",
                    "userMoney": "",
                    "role": ""
                }
            };
        },
        methods: {
            getInitInfo() {
                let userInfo = this.$store.getters.user;
                getRequest("/api/user", {id: userInfo.id}).then(res => {
                    let returnInfo = res;
                    console.log(res);
                    this.userForm = {
                        "userName": returnInfo.userName,
                        "userNickname": returnInfo.userNickname,
                        "userGender": returnInfo.userGender,
                        "userPhone": returnInfo.userPhone,
                        "userIdcard": returnInfo.userIdcard,
                        "userEmail": returnInfo.userEmail,
                        "userAddTime": returnInfo.userAddTime,
                        "userMoney": returnInfo.userMoney,
                        "role": this.$store.getters.user.roles.toString()
                    };
                    console.log(this.$store.getters.user);
                });
            }
        },
        created() {
            this.getInitInfo();
        },
    }
</script>
<style scoped>

    .info {
        padding: 10px;
        height: 500px;
        margin-left: 10%;
        margin-right: 50%;
    }
</style>
