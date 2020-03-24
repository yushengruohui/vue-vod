<template>
    <!--个人信息-->
    <div class="info">
        <el-divider>修改个人信息</el-divider>
        <el-form ref="userForm" :model="userForm" :rules="validationRules" label-width="100px" size="small">
            <el-form-item label="姓名:" prop="userName">
                <el-input v-model="userForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="昵称:" prop="userNickname">
                <el-input v-model="userForm.userNickname"></el-input>
            </el-form-item>
            <el-form-item label="手机号码:" prop="userPhone">
                <el-input v-model="userForm.userPhone"></el-input>
            </el-form-item>
            <el-form-item label="性别:" prop="userGender">
                <el-input v-model="userForm.userGender"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码:" prop="userIdcard">
                <el-input v-model="userForm.userIdcard"></el-input>
            </el-form-item>
            <el-form-item label="邮箱:" prop="userEmail">
                <el-input v-model="userForm.userEmail"></el-input>
            </el-form-item>
            <el-form-item label-width="0px">
                <el-button type="primary" round @click="submitForm('userForm')"
                           style="margin-right: 10px;width: 100%;">
                    修改
                </el-button>
            </el-form-item>
        </el-form>
        <el-divider></el-divider>
    </div>
</template>

<script>
    import {isMobilePhoneNumber, isUserName, isEmail, isIdCard} from "../../utils/validationRules.js";
    import {getRequestWithParam, putRequest, getRequest} from "../../utils/http";

    export default {
        name: "EditUserInfo",
        data() {
            //检查是否存在
            const checkExist = async (rule, str, callback) => {
                if (str === null || typeof str === "undefined" || str === "") {
                    callback("不能为空");
                } else {
                    if (str !== this.oldUserForm[rule.field]) {
                        await getRequest("/api/user/exist?" + rule.field + "=" + str).then(function (reason) {
                            if (reason === true) {
                                callback("已存在");
                            }
                        });
                    }
                    callback();
                }
            };
            return {
                oldUserForm: {
                    "userName": "",
                    "userNickname": "",
                    "userGender": "",
                    "userPhone": "",
                    "userIdcard": "",
                    "userEmail": "",
                },
                userForm: {
                    "userName": "",
                    "userNickname": "",
                    "userGender": "",
                    "userPhone": "",
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
            }
        },
        methods: {
            //获取用户信息
            getInitInfo() {
                let userInfo = this.$store.getters.user;
                getRequestWithParam("/api/user", {id: userInfo.userId}).then(res => {
                    let returnInfo = res;
                    this.userForm = {
                        "userName": returnInfo.userName,
                        "userNickname": returnInfo.userNickname,
                        "userGender": returnInfo.userGender,
                        "userPhone": returnInfo.userPhone,
                        "userIdcard": returnInfo.userIdcard,
                        "userEmail": returnInfo.userEmail,
                    };
                    this.oldUserForm = {
                        "userName": returnInfo.userName,
                        "userNickname": returnInfo.userNickname,
                        "userGender": returnInfo.userGender,
                        "userPhone": returnInfo.userPhone,
                        "userIdcard": returnInfo.userIdcard,
                        "userEmail": returnInfo.userEmail,
                    }
                });
            },
            //提交表单处理
            submitForm: function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.$confirm('此操作将修改你的用户信息, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            let updateInfo = {
                                "userId": this.$store.getters.user.userId,
                                "userName": this.userForm.userName,
                                "userNickname": this.userNickname,
                                "userGender": this.userGender,
                                "userPhone": this.userPhone,
                                "userIdcard": this.userIdcard,
                                "userEmail": this.userEmail,
                            };
                            putRequest("/api/user", updateInfo).then(
                                res => {
                                    console.log(res);
                                }
                            );
                            this.$message({
                                type: 'success',
                                message: '修改成功!'
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消修改'
                            });
                        });
                    } else {
                        return false;
                    }
                })

            },

        },
        created() {
            this.getInitInfo();
            this.oldUserForm = this.userForm;
        }
    }
</script>

<style scoped>
    .info {
        padding: 10px;
        min-height: 550px;
        margin-right: 60%;
    }
</style>