<template>
    <div class="indexHeader">
        <el-row type="flex" align="middle" justify="center" :gutter="20">
            <el-col :span="3">
                <el-link href="/"><span class="font-color">视频点播系统</span></el-link>
            </el-col>
            <el-col :span="2">
                <el-link href="#"><span class="font-color">电影</span></el-link>
            </el-col>
            <el-col :span="2">
                <el-link href="#"><span class="font-color">电视剧</span></el-link>
            </el-col>
            <el-col :span="2">
                <el-link href="#"><span class="font-color">动漫</span></el-link>
            </el-col>
            <el-col :span="2">
                <el-link href="#"><span class="font-color">教学</span></el-link>
            </el-col>
            <el-col :span="6">
                <el-input v-model="searchKeyWork" suffix-icon="el-icon-search" placeholder="请输入视频名称"></el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" icon="el-icon-search" @click="handleSelect()">搜索</el-button>
            </el-col>
            <!--未登录-->
            <el-col :span="2" v-if="!this.$store.state.loginFlag">
                <el-link href="#" :underline="false"><span class="font-color">注册</span></el-link>
                <el-link href="#" :underline="false"><span class="font-color" style="padding-left: 20px">登陆</span>
                </el-link>
            </el-col>
            <!--登陆成功-->
            <el-col :span="2" v-if="this.$store.state.loginFlag">
                <el-dropdown
                        trigger="click"
                        @command='setDialogInfo'
                >
                            <span class="el-dropdown-link">
                                <i class="el-icon-user-solid font-color">用户中心</i>
                            </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command='userInfo' icon="el-icon-user-solid">个人信息
                        </el-dropdown-item>
                        <el-dropdown-item command='history' icon='el-icon-time'>历史记录</el-dropdown-item>
                        <el-dropdown-item command='favorites' icon="el-icon-star-off">收藏夹</el-dropdown-item>
                        <el-dropdown-item command='upload' icon="el-icon-upload2">上传视频</el-dropdown-item>
                        <el-dropdown-item command='logout' icon="el-icon-close">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>

        </el-row>

    </div>
</template>

<script>
    import {getRequest} from "../../utils/http";
    import {isNotNullORBlank} from "../../utils/dataUtils";

    export default {
        name: 'Header',
        data() {
            return {
                // loginFlag: true,
                searchKeyWork: '',
                user: {
                    name: '张三',
                    age: 18
                }
            }
        },
        props: {
            msg: String
        },
        methods: {
            handleSelect() {
                getRequest("/api/cityjson?ie=utf-8").then(res => {
                    console.log(res)
                });
            }
            ,
            setDialogInfo(cmditem) {
                if (!cmditem) {
                    console.log("test");
                    this.$message("菜单选项缺少command属性");
                    return;
                }
                switch (cmditem) {
                    case "info":
                        this.$router.push("/");
                        break;
                    case "logout":
                        this.$router.push("/");
                        break;
                }
            }
            ,
        }
    }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .indexHeader {
        width: 100%;
        height: 50px;
        min-width: 1100px;
        padding: 5px;
        border-bottom: 1px solid #1f2d3d;
        border-radius: 2px;
        vertical-align: middle;
    }

    .font-color {
        color: #ffffff;
    }

    .logo-container {
        line-height: 60px;
        min-width: 400px;
    }

    .logo {
        height: 50px;
        width: 50px;
        margin-right: 5px;
        vertical-align: middle;
        display: inline-block;
    }

    .title {
        vertical-align: middle;
        font-size: 14px;
        letter-spacing: 3px;
    }


</style>

