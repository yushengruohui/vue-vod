<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">视频点播系统</span>
            </div>
            <el-form :model="loginUser" :rules="rules" ref="loginForm" class="formCss" label-width="60px">
                <el-form-item label="账号" prop="username">
                    <el-input v-model="loginUser.username" placeholder="请输入账号(手机号码)"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginUser.password" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登 录</el-button>
                </el-form-item>
                <div class="tiparea" style="text-align: center;">
                    <router-link to='/register'>注册</router-link>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <router-link to='/forgetPassword'>找回密码</router-link>
                </div>
                <div class="tiparea">
                </div>
            </el-form>
        </section>
    </div>
</template>

<script>
    import {getRequest} from "../utils/http";

    export default {
        name: "login",
        data() {
            return {
                loginUser: {
                    username: "",
                    password: ""
                },
                rules: {
                    username: [
                        {required: true, message: "账号不能为空", trigger: "blur"},
                    ],
                    password: [
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
                        getRequest("/api/users/login", this.loginUser).then(res => {
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
                        });
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            isEmpty(value) {
                return (
                    value === undefined ||
                    value === null ||
                    (typeof value === "object" && Object.keys(value).length === 0) ||
                    (typeof value === "string" && value.trim().length === 0)
                );
            }
        }
    };
</script>

<style scoped>
    .login {
        position: relative;
        width: 100%;
        height: 100%;
        background: url(../assets/image/bg.jpg) no-repeat center center;
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


