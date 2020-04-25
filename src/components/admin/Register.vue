<template>
    <div style="height: 500px;">
        <div>
            <span style="margin-right: 50%;text-align: center;margin-bottom: 10px">添加用户</span>
        </div>
        <section>
            <el-form :model="registerForm" :rules="validationRules" ref="registerForm" class="formCss"
                     label-width="100px"
                     status-icon size="mini">
                <el-form-item label="姓名：" prop="userName">
                    <el-input v-model="registerForm.userName" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="昵称：" prop="userNickname">
                    <el-input v-model="registerForm.userNickname" placeholder="请输入昵称"></el-input>
                </el-form-item>
                <el-form-item label="性别：" prop="userGender">
                    <el-radio v-model="registerForm.userGender" label="男">男</el-radio>
                    <el-radio v-model="registerForm.userGender" label="女">女</el-radio>
                </el-form-item>
                <el-form-item label="身份证：" prop="userIdcard">
                    <el-input v-model="registerForm.userIdcard" placeholder="请输入身份证"></el-input>
                </el-form-item>
                <el-form-item label="邮箱：" prop="userEmail">
                    <el-input v-model="registerForm.userEmail" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="手机号：" prop="userPhone">
                    <el-input v-model="registerForm.userPhone" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input v-model="registerForm.password" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码：" prop="RePassword">
                    <el-input v-model="registerForm.RePassword" placeholder="确认密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label-width="0px">
                    <el-button type="primary" round @click="submitForm('registerForm')" style="margin-right: 10px">
                        注册
                    </el-button>
                    <el-button native-type="reset" type="primary" style="margin-left: 10px" round>重置</el-button>
                </el-form-item>
                <el-form-item>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>
    import {isMobilePhoneNumber, isPassword} from "../../utils/validationRules";
    import {isUserName} from "../../utils/validationRules";
    import {isEmail} from "../../utils/validationRules";
    import {isIdCard} from "../../utils/validationRules";
    import {getRequest, postRequest} from "../../utils/http";

    export default {
        name: "AdminRegister",
        inject: ['reload'],
        data() {
            const confirmPassword = (rule, str, callback) => {
                if (str === null || typeof str === "undefined" || str === "") {
                    callback("请输入密码");
                } else if (str !== this.registerForm.password) {
                    callback('两次输入密码不一致!');
                } else {
                    callback();
                }
            };

            const checkExist = (rule, str, callback) => {
                if (str === null || typeof str === "undefined" || str === "") {
                    callback("不能为空");
                } else {
                    getRequest("/auth/user/exist?" + rule.field + "=" + str).then(reason => {
                        if (reason === true) {
                            callback("已存在");
                        } else {
                            callback();
                        }
                    })
                }
            };
            return {
                registerForm: {
                    "userPhone": "",
                    "userName": "",
                    "userNickname": "",
                    "password": "",
                    "RePassword": "",
                    "userGender": "",
                    "userIdcard": "",
                    "userEmail": "",
                },
                validationRules: {
                    userName: [
                        {required: true, message: "用户名不能为空", trigger: "blur"},
                        {validator: isUserName, trigger: "blur"},
                        {validator: checkExist, trigger: "blur"}
                    ],
                    userPhone: [
                        {required: true, message: "手机号码不能为空", trigger: "blur"},
                        {validator: isMobilePhoneNumber, trigger: "blur"},
                        {validator: checkExist, trigger: "blur"}
                    ],
                    password: [
                        {required: true, message: "密码不能为空", trigger: "blur"},
                        {min: 6, max: 20, message: "密码长度在 6 到 20 个字符", trigger: "blur"},
                        {validator: isPassword, trigger: "blur"}
                    ],
                    RePassword: [
                        {required: true, message: "密码不能为空", trigger: "blur"},
                        {validator: confirmPassword, trigger: ["change", "blur"]}
                    ],
                    userNickname: [
                        {required: true, message: "昵称不能为空", trigger: "blur"},
                        {validator: isUserName, trigger: "blur"},
                        {validator: checkExist, trigger: "blur"}
                    ],
                    userGender: [
                        {required: true, message: "性别不能为空", trigger: "blur"},
                    ],
                    userIdcard: [
                        {required: true, message: "身份证不能为空", trigger: "blur"},
                        {validator: isIdCard, trigger: "blur"},
                        {validator: checkExist, trigger: "blur"}
                    ],
                    userEmail: [
                        {required: true, message: "邮箱不能为空", trigger: "blur"},
                        {validator: isEmail, trigger: "blur"},
                        {validator: checkExist, trigger: "blur"},
                    ]
                }
            };
        },
        methods: {
            // 提交表单事件
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        // 格式没问题，提交注册信息
                        postRequest("/auth/user", this.registerForm).then(res => {
                            if (res === false) {
                                // 注册失败
                                this.$message.error("注册失败，请重新注册");
                                this.reload();
                            } else {
                                this.$message.success("注册成功");
                                this.reload();
                            }
                        }).catch(err => {
                            message.error(err)
                        });
                    } else {
                        this.$message.error("表单验证失败");
                        return false;
                    }
                });
            },
        }
    };
</script>

<style scoped>
    .formCss {
        margin-right: 50%;
    }
</style>


