<template>
    <div class="info">
        <el-divider>修改用户信息</el-divider>
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
            <el-form-item label="角色:" prop="roleId">
                <el-select v-model="userForm.roleId" placeholder="请选择">
                    <el-option label="普通用户" value="3"></el-option>
                    <el-option label="会员" value="2"></el-option>
                    <el-option label="管理员" value="1"></el-option>
                </el-select>
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
    import {putRequest, getRequest} from "../../utils/http";

    export default {
        name: "AdminEditUserInfo",
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
                    "roleId": ""
                },
                userForm: {
                    "userName": "",
                    "userNickname": "",
                    "userGender": "",
                    "userPhone": "",
                    "userIdcard": "",
                    "userEmail": "",
                    "roleId": ""
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
                let userInfo = this.$store.getters.editInfo || {};
                let roleName = this.$store.getters.user.roles || null;
                let roleId;
                switch (roleName) {
                    case 'ADMIN': {
                        roleId = '1';
                        break;
                    }
                    case 'VIP': {
                        roleId = '2';
                        break;
                    }
                    case 'USER': {
                        roleId = '3';
                        break;
                    }
                    default: {
                    }
                }
                this.userForm = {
                    "userName": userInfo.userName,
                    "userNickname": userInfo.userNickname,
                    "userGender": userInfo.userGender,
                    "userPhone": userInfo.userPhone,
                    "userIdcard": userInfo.userIdcard,
                    "userEmail": userInfo.userEmail,
                    "roleId": roleId || ""
                };
                this.oldUserForm = {
                    "userName": userInfo.userName,
                    "userNickname": userInfo.userNickname,
                    "userGender": userInfo.userGender,
                    "userPhone": userInfo.userPhone,
                    "userIdcard": userInfo.userIdcard,
                    "userEmail": userInfo.userEmail,
                    "roleId": roleId || ""
                }
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
                                "userId": this.$store.getters.editInfo.userId,
                                "userName": this.userForm.userName,
                                "userNickname": this.userForm.userNickname,
                                "userGender": this.userForm.userGender,
                                "userPhone": this.userForm.userPhone,
                                "userIdcard": this.userForm.userIdcard,
                                "userEmail": this.userForm.userEmail,
                                "roleId": this.userForm.roleId,
                            };
                            putRequest("/api/admin/user", updateInfo).then(
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
        mounted() {
            this.getInitInfo();
        }
    }
</script>

<style scoped>
    .info {
        padding: 10px;
        height: 500px;
        margin-right: 60%;
    }
</style>