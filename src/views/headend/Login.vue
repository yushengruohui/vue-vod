<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">视频点播系统</span>
            </div>
            <el-form :model="loginUser" :rules="rules" ref="loginForm" class="formCss" label-width="60px">
                <el-form-item label="账号" prop="username">
                    <el-input v-model="loginUser.userName" placeholder="请输入账号(手机号码)"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginUser.userPassword" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登 录</el-button>
                </el-form-item>
                <el-form-item>
                    <router-link to='/register' style="margin-right: 20px">注册</router-link>
                    <router-link to='/forgetPassword' style="margin-left: 20px">找回密码</router-link>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>
    import {getRequest} from "../../utils/http";

    export default {
        name: "login",
        data() {
            return {
                registerForm: {
                    userName: "",
                    userPassword: ""
                },
                validationRules: {
                    userName: [
                        {required: true, message: "账号不能为空", trigger: "blur"},
                    ],
                    userPassword: [
                        {required: true, message: "密码不能为空", trigger: "blur"},
                        {min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur"}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        getRequest("/api/users/login", this.registerForm).then(res => {
                            // 登录成功
                            // const {token} = res.data;
                            // localStorage.setItem("eleToken", token);
                            //
                            // // 解析token
                            // const decode = jwt_decode(token);
                            //
                            // // 存储数据
                            // this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
                            // this.$store.dispatch("setUser", decode);

                            // 页面跳转
                            this.$router.push("/");
                        }).catch(err => {
                            console.log(err)
                        });
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
        }
    };
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
        font-family: "Microsoft YaHei";
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


