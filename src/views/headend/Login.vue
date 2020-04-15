<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">视频点播系统</span>
            </div>
            <el-form :model="loginForm" :rules="validationRules" ref="loginForm" class="formCss" label-width="60px">
                <el-form-item label="账号" prop="username">
                    <el-input v-model="loginForm.username" placeholder="请输入账号(手机号码)"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginForm.password" placeholder="请输入密码" type="password"></el-input>
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

    import {postRequest} from "../../utils/http";
    import {isEmpty} from "../../utils/dataUtils";

    export default {
        name: "Login",
        inject: ['reload'],
        data() {
            return {
                loginForm: {
                    username: "",
                    password: ""
                },
                validationRules: {
                    username: [
                        {required: true, message: "账号不能为空", trigger: "blur"},
                    ],
                    password: [
                        {required: true, message: "密码不能为空", trigger: "blur"},
                        {min: 6, max: 30, message: "密码长度在 6 到 30 个字符", trigger: "blur"}
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                let _this = this;
                this.$refs[formName].validate(valid => {
                        if (valid) {
                            // 验证成功
                            postRequest("/auth/login", this.loginForm).then(res => {
                                if (res.data) {
                                    // 账号密码正确,服务器会返回一个token
                                    _this.$store.dispatch("toLogin", res.data);
                                    let nextPage = decodeURIComponent(_this.$route.query.redirect);
                                    if (isEmpty(nextPage) || nextPage === "/login") {
                                        _this.$router.replace({
                                            name: 'Index'
                                        })
                                    } else {
                                        _this.$router.push({
                                            path: decodeURIComponent(_this.$route.query.redirect)
                                        })
                                    }
                                }
                            }).catch(err => {
                                // 账号密码错误
                                alert("账号或者密码错误");
                                _this.reload();
                            })
                        } else {
                            console.log("error submit!!");
                            return false;
                        }

                    }
                );
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

    w
    .tiparea p a {
        color: #409eff;
    }
</style>


