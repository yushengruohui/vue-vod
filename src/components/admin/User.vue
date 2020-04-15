<template>
    <div class="myUser">
        <el-row type="flex" style="margin-bottom: 10px">
            <el-col :span="2">
                <el-button @click.native.prevent="addUser">添加用户</el-button>
            </el-col>
            <el-col :span="4" :offset="16">
                <el-input v-model="keyword" placeholder="输入用户名搜索用户" @keyup.enter.native.prevent="searchUserInfo()"
                          suffix-icon="el-icon-search"></el-input>
            </el-col>
        </el-row>
        <el-table
                ref="userTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%;height: 500px"
        >
            <el-table-column
                    prop="userId"
                    label="用户编号"
            >
            </el-table-column>
            <el-table-column
                    prop="userName"
                    label="用户姓名"
            >
            </el-table-column>
            <el-table-column
                    prop="userEmail"
                    label="用户邮箱"
            >
            </el-table-column>
            <el-table-column
                    prop="userIdcard"
                    label="身份号码"
            >
            </el-table-column>
            <el-table-column
                    prop="userPhone"
                    label="手机号码"
            >
            </el-table-column>
            <el-table-column label="操作" width="300px">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            icon="el-icon-user"
                            @click.native.prevent="checkDetail(scope.$index, scope.row)">查看
                    </el-button>
                    <el-button
                            size="mini"
                            icon="el-icon-edit"
                            @click.native.prevent="handleEdit(scope.$index, scope.row)">修改
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            icon="el-icon-delete"
                            @click.native.prevent="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="text-align: center;margin-top: 10px;">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    @current-change="current_change"
                    @size-change="sizeChangeHandle"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {deleteRequest, getRequest} from "../../utils/http";

    export default {
        name: "User",
        inject: ['reload'],
        data() {
            return {
                tableData: [],
                total: 0,
                pageSize: 10,
                currentPage: 1,
                keyword: ''
            }
        },
        methods: {
            // 添加用户
            addUser() {
                this.$router.push({
                    name: 'AdminRegister'
                })
            },
            // 搜索用户信息
            searchUserInfo() {
                getRequest("/admin/users/userName", {
                    userName: this.keyword,
                    pageSize: this.pageSize,
                    currentPage: 1,
                }).then(res => {
                    if (res) {
                        this.tableData = res.list;
                        this.total = res.total;
                    }
                });
            },
            //分页处理
            current_change: function (currentPage) {
                this.currentPage = currentPage;
                this.getUsersInfo();
            },
            sizeChangeHandle(pageSize) {
                // pageSize 当前一页可以显示多少条数据
                this.pageSize = pageSize;
                this.getUsersInfo();
            },

            //编辑信息处理
            checkDetail(index, rowData) {
                // rowData.videoId
                this.$store.commit("setAdminOperator", rowData);
                this.$router.push({
                    path: '/admin/checkUserInfo'
                })
            },
            handleEdit(index, rowData) {
                this.$store.commit("setAdminOperator", rowData);
                this.$router.push({
                    path: '/admin/editUser'
                })
            },
            handleDelete(index, rowData) {
                deleteRequest("/admin/user", {userId: rowData.userId}).then(flag => {
                    if (flag) {
                        this.reload();
                    }
                });
            },
            // 获取用户信息
            getUsersInfo() {
                getRequest('/admin/users', {
                    pageSize: this.pageSize,
                    currentPage: this.currentPage,
                }).then(res => {
                    console.log(res);
                    if (res) {
                        this.tableData = res.list;
                        this.total = res.total;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }
        },
        mounted() {
            this.getUsersInfo();
        }
    }
</script>

<style scoped>
    .myUser {
        margin: 10px;
    }
</style>