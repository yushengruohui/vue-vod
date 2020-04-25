<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">找回密码</span>
            </div>
            <el-form :model="userInfo" :rules="validationRules" ref="loginForm" class="formCss" label-width="60px">
                <el-form-item label="账号" prop="account">
                    <el-input v-model="userInfo.account" placeholder="请输入账号(手机号码)"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="userInfo.email" placeholder="请输入邮箱"></el-input>
                    <el-button type="primary" @click="getValidateCode" class="submit_btn">获取验证码</el-button>
                </el-form-item>
                <el-form-item label="验证码" prop="validateCode">
                    <el-input v-model="userInfo.validateCode" placeholder="请输入邮箱中的验证码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getPassword" class="submit_btn">获取密码</el-button>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>
    import {getRequest} from "@/utils/http";
    import {isEmail, isMobilePhoneNumber} from "@/utils/validationRules";

    export default {
        name: "ForgetPassword",
        components: {},
        data() {
            return {
                userInfo: {
                    account: "",
                    password: "",
                    email: "",
                    validateCode: ""
                },
                validationRules: {
                    account: [
                        {required: true, message: "账号不能为空", trigger: "blur"},
                        {validator: isMobilePhoneNumber, trigger: "blur"}
                    ],
                    email: [
                        {required: true, message: "邮箱不能为空", trigger: "blur"},
                        {validator: isEmail, trigger: "blur"}
                    ],
                }
            };
        },
        methods: {
            getPassword() {
                const vm = this;
                getRequest("auth/forgetPassword", {account: vm.userInfo.account}).then(password => {
                    if (password) {
                        vm.$message.success(password.toString())
                    } else {
                        vm.$message.error("验证码错误")
                    }
                }).catch(err => {
                    console.log(err.toString());
                });
            },
            getValidateCode() {
                const vm = this;
                vm.$message.success("验证码已经发到你的邮箱，请在60秒内完成验证");
            }

        },
        created() {
            const vm = this;
        }
    }
</script>

<style scoped>
    .login {
        position: relative;
        width: 100%;
        height: 100%;
        background: url(../../assets/image/bg.jpg) no-repeat center center;
        background-size: 100% 100%;
    }

    .form_container {
        position: absolute;
        top: 10%;
        left: 38%;
        padding: 10px;
        border-radius: 5px;
        text-align: center;
    }

    .form_container .manage_tip .title {
        font-weight: bold;
        font-size: 26px;
        color: #fff;
    }

    .formCss {
        margin-top: 20px;
        background-color: #fff;
        padding: 20px 40px 20px 20px;
        border-radius: 5px;
        box-shadow: 0px 5px 10px #cccc;
    }

    .submit_btn {
        width: 100%;
    }

    .tiparea {
        text-align: right;
        font-size: 12px;
        color: #333;
    }

    .tiparea p a {
        color: #409eff;
    }
</style>