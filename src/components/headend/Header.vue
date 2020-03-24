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
                        <el-dropdown-item command="action" divided>动作片</el-dropdown-item>
                        <el-dropdown-item command="scienceFiction" divided>科幻片</el-dropdown-item>
                        <el-dropdown-item command="war" divided>战争片</el-dropdown-item>
                        <el-dropdown-item command="love" divided>爱情片</el-dropdown-item>
                        <el-dropdown-item command="comedy" divided>喜剧片</el-dropdown-item>
                        <el-dropdown-item command="terror" divided>恐怖片</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <el-col :span="2">
                <el-dropdown @command="handleTVChannel">
                    <span class="el-dropdown-link" style="color: #fff;">电视剧<i
                            class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="DomesticDrama" divided>国产剧</el-dropdown-item>
                        <el-dropdown-item command="HongKongAndTaiwanDrama" divided>港台剧</el-dropdown-item>
                        <el-dropdown-item command="EuropeanAndAmericanDramas" divided>欧美剧</el-dropdown-item>
                        <el-dropdown-item command="KoreanDramas" divided>韩剧</el-dropdown-item>
                        <el-dropdown-item command="JapaneseDramas" divided>日剧</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <el-col :span="2">
                <el-dropdown @command="handleCartoonChannel">
                    <span class="el-dropdown-link" style="color: #fff;">动漫<i
                            class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="ChineseCartoon" divided>中国动漫</el-dropdown-item>
                        <el-dropdown-item command="JapaneseCartoon" divided>日本动漫</el-dropdown-item>
                        <el-dropdown-item command="EuropeanAndAmericanCartoon" divided>欧美动漫</el-dropdown-item>
                        <el-dropdown-item command="KoreanCartoon" divided>韩国动漫</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <el-col :span="2">
                <el-dropdown @command="handleVIPChannel">
                    <span class="el-dropdown-link" style="color: #fff;">会员上传<i
                            class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="Education" divided>教学</el-dropdown-item>
                        <el-dropdown-item command="Entertainment" divided>娱乐</el-dropdown-item>
                        <el-dropdown-item command="Life" divided>生活</el-dropdown-item>
                        <el-dropdown-item command="Game" divided>游戏</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-link href="#"><span class="font-color"></span></el-link>
            </el-col>
            <el-col :span="8">
                <el-input v-model="searchKeyWork" suffix-icon="el-icon-search" placeholder="请输入视频名称"></el-input>
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
    import {getRequest, getRequestWithParam} from "../../utils/http";
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
                },
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

                console.log(command)
            },
            handleTVChannel(command) {

                console.log(command)
            },
            handleCartoonChannel(command) {

                console.log(command)
            },
            handleVIPChannel(command) {

                console.log(command)
            },

            // 处理搜索事件
            handleSearch() {
                let sendData = {videoName: this.searchKeyWork};
                getRequestWithParam("/api/video", sendData).then(res => {
                    console.log(res)
                });
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

