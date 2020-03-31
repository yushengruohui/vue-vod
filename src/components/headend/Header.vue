<template>
    <div class="indexHeader">
        <el-row type="flex" align="middle" justify="space-around" :gutter="20">
            <el-col :span="1" :offset="1">
                <el-link href="/"><span class="font-color">首页</span></el-link>
            </el-col>
            <el-col :span="2">
                <el-dropdown @command="handleCinemaChannel">
                    <span class="el-dropdown-link" style="color: #fff;">电影<i
                            class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="中国" divided>中国电影</el-dropdown-item>
                        <el-dropdown-item command="日本" divided>日本电影</el-dropdown-item>
                        <el-dropdown-item command="美国" divided>美国电影</el-dropdown-item>
                        <el-dropdown-item command="韩国" divided>韩国电影</el-dropdown-item>
                        <el-dropdown-item command="泰国" divided>泰国电影</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <el-col :span="2">
                <el-dropdown @command="handleTVChannel">
                    <span class="el-dropdown-link" style="color: #fff;">电视剧<i
                            class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="中国" divided>中国电视剧</el-dropdown-item>
                        <el-dropdown-item command="日本" divided>日本电视剧</el-dropdown-item>
                        <el-dropdown-item command="美国" divided>美国电视剧</el-dropdown-item>
                        <el-dropdown-item command="韩国" divided>韩国电视剧</el-dropdown-item>
                        <el-dropdown-item command="泰国" divided>泰国电视剧</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <el-col :span="2">
                <el-dropdown @command="handleCartoonChannel">
                    <span class="el-dropdown-link" style="color: #fff;">动漫<i
                            class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="中国" divided>中国动漫</el-dropdown-item>
                        <el-dropdown-item command="日本" divided>日本动漫</el-dropdown-item>
                        <el-dropdown-item command="美国" divided>美国动漫</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <el-col :span="2">
                <el-dropdown @command="handleVIPChannel">
                    <span class="el-dropdown-link" style="color: #fff;">生活<i
                            class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="中国" divided>中国生活</el-dropdown-item>
                        <el-dropdown-item command="日本" divided>日本生活</el-dropdown-item>
                        <el-dropdown-item command="美国" divided>美国生活</el-dropdown-item>
                        <el-dropdown-item command="韩国" divided>韩国生活</el-dropdown-item>
                        <el-dropdown-item command="泰国" divided>泰国生活</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-link href="#"><span class="font-color"></span></el-link>
            </el-col>
            <el-col :span="8">
                <el-input @keyup.enter.native="handleSearch()" v-model="searchKeyWork" suffix-icon="el-icon-search"
                          placeholder="请输入视频名称"></el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" icon="el-icon-search" @click="handleSearch()">搜索</el-button>
            </el-col>
            <!--未登录-->
            <el-col :span="2" v-if="!loginStatus">
                <el-link href="/register" :underline="false"><span class="font-color">注册</span></el-link>
                <el-link href="/login" :underline="false"><span class="font-color" style="padding-left: 20px">登陆</span>
                </el-link>
            </el-col>
            <!--登陆成功-->
            <el-col :span="2" v-if="loginStatus">
                <el-dropdown
                        trigger="hover"
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

    export default {
        name: 'Header',
        inject: ['reload'],
        data() {
            return {
                // loginFlag: true,
                searchKeyWork: this.msg || '',
            }
        },
        props: {
            msg: String
        },
        computed: {
            loginStatus() {
                return this.$store.getters.loginStatus;
            }
        },
        methods: {
            // 跳转到对应视频频道
            handleCinemaChannel(command) {
                this.$router.push({
                    name: 'VideoList',
                    query: {
                        videoChannel: '电影',
                        videoArea: command.toString()
                    }
                });
                this.reload();
            },
            handleTVChannel(command) {
                this.$router.push({
                    name: 'VideoList',
                    query: {
                        videoChannel: '电视剧',
                        videoArea: command.toString()
                    }
                });
                this.reload();
            },
            handleCartoonChannel(command) {
                this.$router.push({
                    name: 'VideoList',
                    query: {
                        videoChannel: '动漫',
                        videoArea: command.toString()
                    }
                });
                this.reload();
            },
            handleVIPChannel(command) {
                this.$router.push({
                    name: 'VideoList',
                    query: {
                        videoChannel: '生活',
                        videoArea: command.toString()
                    }
                });
                this.reload();
            },

            // 处理搜索事件
            handleSearch() {
                this.$router.push({
                    name: 'VideoSearch',
                    query: {
                        keyword: this.searchKeyWork
                    }
                });
                this.reload();
            },

            // 用户中心的相关事件
            setDialogInfo(cmditem) {
                if (!cmditem) {
                    this.$message("菜单选项缺少command属性");
                    return;
                }
                switch (cmditem) {
                    case "userInfo":
                        this.$router.push("/userBackground/searchUserInfo");
                        break;
                    case "logout":
                        this.$store.dispatch("logout");
                        break;
                }
            }
            ,
        }
    }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .indexHeader {
        width: 100%;
        height: 40px;
        min-width: 1200px;
        padding: 5px;
        background: #324057;
        border-bottom: 1px solid #1f2d3d;
        border-radius: 2px;
        vertical-align: middle;
    }

    .font-color {
        color: #ffffff;
    }


</style>

