<template>
    <div class="videoPlayer">
        <el-container>
            <!--视频网页-->
            <!--================ 头部区域 ================-->
            <el-header>
                <Header msg="header"/>
            </el-header>
            <!--================ 主体区域 ================-->
            <el-main>
                <div class="player">
                    <el-row :gutter="10" style="height: 550px;">
                        <el-col :span="17">
                            <video-player class="vjs-custom-skin"
                                          ref="videoPlayer"
                                          :options="playerOptions"
                                          :playsinline="true"
                                          @ready="playerIsReady"
                                          customEventName="changed"
                                          @changed="playerStateChanged($event)"
                            >
                            </video-player>
                        </el-col>
                        <el-col :span="7">
                            <el-tabs type="border-card" :stretch="true" style="height: 500px;">
                                <el-tab-pane label="视频列表">
                                    <div>
                                        第几集
                                    </div>
                                    <el-divider></el-divider>
                                    <div>收藏视频</div>
                                    <div>视频下载</div>
                                </el-tab-pane>
                                <el-tab-pane label="视频详情">
                                    视频简洁：巴拉巴拉……
                                    <el-divider>

                                    </el-divider>
                                    视频……
                                </el-tab-pane>
                            </el-tabs>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="17">
                            <el-card class="box-card" style="height: 550px;">
                                <div>
                                    <el-form label-width="80px" :inline="true">
                                        <el-form-item label="视频评论">
                                            <el-input v-model="currentComment" placeholder="输入你的评论"></el-input>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button @click="submitComment">提交评论</el-button>
                                        </el-form-item>
                                    </el-form>
                                </div>
                                <el-divider></el-divider>
                                <div>
                                    <span>置顶内容</span>
                                    <el-divider></el-divider>
                                </div>
                                <el-table
                                        :data="commentArea"
                                        height="330"
                                        border
                                        style="width: 100%"
                                >
                                    <el-table-column
                                            prop="commentContent"
                                            label="评论内容">
                                    </el-table-column>
                                    <el-table-column
                                            prop="commentTime"
                                            label="评论时间"
                                            width="180">
                                    </el-table-column>
                                    <el-table-column
                                            prop="username"
                                            label="评论人"
                                            width="180">
                                    </el-table-column>
                                </el-table>
                            </el-card>
                        </el-col>
                        <el-col :span="7">
                            <el-card class="box-card">
                                <div>
                                    <span>视频评分</span>
                                    <el-divider></el-divider>
                                </div>
                                <span>
                                    你觉得视频应该打几分呢？
                                </span>
                                <el-divider></el-divider>
                                <el-rate v-model="videoScore"></el-rate>
                                <el-divider></el-divider>
                                <el-button style="padding-top: 10px">提交</el-button>
                            </el-card>
                        </el-col>
                    </el-row>
                </div>
            </el-main>
            <!--================ 底部区域 ================-->
            <el-footer>
                <Foot msg="Foot"></Foot>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Header from '@/components/headend/Header.vue'
    import Foot from '@/components/headend/Foot.vue'
    import {videoPlayer} from 'vue-video-player'
    import 'video.js/dist/video-js.css'
    import 'vue-video-player/src/custom-theme.css'
    // videojs热键支持
    import 'videojs-flash'
    import 'videojs-hotkeys'

    export default {
        name: 'VideoPlayer',
        components: {
            Header,
            Foot,
            videoPlayer,
        },
        data() {
            // data中的数据相当于声明变量，不能做运算等操作，而且不能相互调用，如果要进行数据操作，请在mounted或者computed中进行
            return {
                // 视频评论
                currentComment: '',
                commentArea: [{
                    commentTime: '2016-05-03 11:20',
                    username: '王小虎',
                    commentContent: '这个电影不错'
                }, {
                    commentTime: '2016-05-03 11:20',
                    username: '王小虎',
                    commentContent: '这个电影不错'
                }, {
                    commentTime: '2016-05-03 11:20',
                    username: '王小虎',
                    commentContent: '这个电影不错'
                }, {
                    commentTime: '2016-05-03 11:20',
                    username: '王小虎',
                    commentContent: '这个电影不错'
                }, {
                    commentTime: '2016-05-03 11:20',
                    username: '王小虎',
                    commentContent: '这个电影不错'
                }, {
                    commentTime: '2016-05-03 11:20',
                    username: '王小虎',
                    commentContent: '这个电影不错'
                }, {
                    commentTime: '2016-05-03 11:20',
                    username: '王小虎',
                    commentContent: '这个电影不错'
                }, {
                    commentTime: '2016-05-03 11:20',
                    username: '王小虎',
                    commentContent: '这个电影不错'
                }],
                // 视频评分的分值
                videoScore: 0,
                // videojs options
                playerOptions: {
                    height: '500',
                    autoplay: false,
                    muted: false,
                    loop: false,
                    preload: true,
                    language: 'zh-CN',
                    playbackRates: [0.7, 1.0, 1.5, 2.0],
                    sources: [{
                        type: "video/mp4",
                        // mp4
                        // src: "http://vjs.zencdn.net/v/oceans.mp4",
                        src: "",
                        // webm
                        // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
                    }],
                    // poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
                    poster: "",
                }
            }
        },
        mounted() {
            // 给视频路径赋值
            this.$set(this.playerOptions.sources, 0, {
                type: "video/mp4",
                src: "/api/upload/1111/什么是Vue.mp4",
            });
            this.playerOptions.poster = "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg";
            // console.log('this is current player instance object', this.player)
            // setTimeout(() => {
            //     console.log('dynamic change options', this.player)

            // change src
            // this.playerOptions.sources[0].src = 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm';

            // change item
            // this.$set(this.playerOptions.sources, 0, {
            //   type: "video/mp4",
            //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
            // })

            // change array
            // this.playerOptions.sources = [{
            //   type: "video/mp4",
            //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
            // }]
            //     this.player.muted(false)
            // }, 5000)
        },
        computed: {
            player() {
                return this.$refs.videoPlayer.player
            }
        },
        methods: {
            // listen event
            // player is ready
            playerStateChanged(playerCurrentState) {
            },
            playerIsReady(player) {
                // console.log('example 2 ready!', player);
                player.currentTime(0);
                player.hotkeys({
                    volumeStep: 0.1,
                    seekStep: 3,
                    enableModifiersForNumbers: false,
                    fullscreenKey: function (event, player) {
                        // override fullscreen to trigger when pressing the F key or Ctrl+Enter
                        return ((event.which === 70) || (event.ctrlKey && event.which === 13));
                    }
                })
            },
            submitComment() {
                console.log("提交评论")
            }
        }
    }
</script>
<style scoped>
    .videoPlayer {
        margin-top: 30px;
        margin-bottom: 30px;
        margin-right: 60px;
        margin-left: 60px;
    }
</style>
