<template>
    <div class="videoPlayer">
        <el-container>
            <!--视频网页-->
            <!--================ 头部区域 ================-->
            <el-header>
                <Header/>
            </el-header>
            <!--================ 主体区域 ================-->
            <el-main>
                <div class="playerBody">
                    <el-row :gutter="10" style="height: 550px;">
                        <el-col :span="17">
                            <video-player class="vjs-custom-skin"
                                          ref="videoPlayer"
                                          :options="playerOptions"
                                          :playsinline="true"
                                          @ready="playerIsReady"
                                          @timeupdate="onPlayerTimeupdate($event)"
                            >
                            </video-player>
                        </el-col>
                        <el-col :span="7">
                            <el-tabs type="border-card" :stretch="true" style="height: 500px;">
                                <el-tab-pane label="视频列表">
                                    <el-row type="flex">
                                        <h1 v-text="videoAlbum.videoAlbumName"></h1>
                                    </el-row>
                                    <el-divider></el-divider>
                                    <el-row style="text-align: center" type="flex">
                                        <el-col :span="12">
                                            <el-button icon="el-icon-star-off" v-show="!isFavorite"
                                                       @click.native.prevent="favoriteVideo">收藏视频
                                            </el-button>
                                            <el-button icon="el-icon-star-off" v-show="isFavorite">已收藏</el-button>
                                        </el-col>
                                        <el-col :span="12"
                                                v-show="isVIP||isAdmin">
                                            <el-button icon="el-icon-download" @click.native.prevent="downloadFile">
                                                视频下载
                                            </el-button>
                                        </el-col>
                                    </el-row>
                                    <el-divider></el-divider>
                                    <!--视频选集播放-->
                                    <el-row type="flex">
                                        <el-link v-for="(item) in videoListInfo" :key="item.videoId"
                                                 :href="'/videoPlayer?videoId='+item.videoId"
                                                 style="margin-right:10px ">
                                            <el-popover
                                                    placement="top-start"
                                                    trigger="hover"
                                                    :content="item.videoTitle">
                                                <el-button slot="reference" v-text="item.videoEpisodes"></el-button>
                                            </el-popover>
                                        </el-link>
                                    </el-row>
                                </el-tab-pane>
                                <el-tab-pane label="视频详情">
                                    <el-row type="flex">
                                        <span v-text="videoAlbum.videoAlbumName"></span>
                                    </el-row>
                                    <el-divider>
                                    </el-divider>
                                    <el-row>
                                        <!--视频评分-->
                                        <el-col :span="8">视频评分：</el-col>
                                        <el-rate v-model="videoScore"></el-rate>
                                        <el-divider></el-divider>
                                    </el-row>
                                    <el-row type="flex">
                                        <el-col :span="4"><span>类型:</span></el-col>
                                        <el-col><span v-text="videoAlbum.videoChannel"></span></el-col>
                                    </el-row>
                                    <el-row type="flex">
                                        <el-col :span="4"><span>地区:</span></el-col>
                                        <el-col><span v-text="videoAlbum.videoArea"></span></el-col>
                                    </el-row>
                                    <el-row type="flex">
                                        <el-col :span="4"><span>导演:</span></el-col>
                                        <el-col><span v-text="videoAlbum.videoDirector"></span></el-col>
                                    </el-row>
                                    <el-row type="flex">
                                        <el-col :span="4"><span>演员:</span></el-col>
                                        <el-col><span v-text="videoAlbum.videoActor"></span></el-col>
                                    </el-row>

                                    <el-row type="flex">
                                        <el-col :span="4"><span>简介:</span></el-col>
                                        <el-col><span v-text="videoAlbum.videoSummary"></span></el-col>
                                    </el-row>
                                </el-tab-pane>
                            </el-tabs>
                        </el-col>
                    </el-row>
                    <el-row type="flex">
                        <el-col :span="24">
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
                                <el-table
                                        :data="commentArea"
                                        height="330"
                                        border
                                        style="width: 100%"
                                >
                                    <el-table-column
                                            prop="videoCommentContent"
                                            label="评论内容">
                                    </el-table-column>
                                    <el-table-column
                                            prop="videoCommentTime"
                                            label="评论时间"
                                            width="180">
                                    </el-table-column>
                                    <el-table-column
                                            prop="userNickName"
                                            label="评论人"
                                            width="180">
                                    </el-table-column>
                                </el-table>
                            </el-card>
                        </el-col>
                    </el-row>
                </div>
            </el-main>
            <!--================ 底部区域 ================-->
            <el-footer>
                <Foot></Foot>
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
    import {downloadFileRequest, getRequest, postRequest} from "../../utils/http";
    import {dateToDatetimeStr} from "../../utils/dataUtils";

    export default {
        name: 'VideoPlayer',
        components: {
            Header,
            Foot,
            videoPlayer,
        },
        data() {
            return {
                isVIP: this.$store.getters.isVIP || false,
                isAdmin: this.$store.getters.isAdmin || false,
                // 视频收藏
                isFavorite: false,
                // 视频评论
                currentComment: '',
                videoId: this.$route.query.videoId || 0,
                commentArea: [{
                    "videoCommentId": 0,
                    "videoCommentContent": "",
                    "videoCommentTime": "",
                    "userNickName": "",
                }],
                // 视频评分的分值
                videoScore: 4,
                //视频信息
                videoListInfo: [{
                    "videoId": 0,
                    "videoTitle": "",
                    "videoEpisodes": ""
                }],
                downloadUrl: '',
                videoAlbum: {
                    "videoAlbumId": 0,
                    "videoAlbumName": "",
                    "videoSummary": "",
                    "videoChannel": "",
                    "videoDirector": "",
                    "videoArea": "",
                    "videoActor": ""
                },
                // 视频播放
                playerOptions: {
                    height: '500',
                    autoplay: false,
                    muted: false,
                    loop: false,
                    preload: 'auto',
                    notSupportedMessage: '视频正在努力加载中',
                    language: 'zh-CN',
                    playbackRates: [0.7, 1.0, 1.5, 2.0],
                    sources: [{
                        type: "video/mp4",
                        src: "",
                    }],
                    poster: "",
                },
                // 历史记录
                historyInfo: {
                    "videoPlayTime": 0,
                    "userId": this.$store.getters.userId || 0,
                    "videoId": this.$route.query.videoId || 0
                }
            }
        },

        computed: {
            player() {
                return this.$refs.videoPlayer.player
            }
        },
        methods: {
            // listen event
            // player is ready
            onPlayerTimeupdate(player) {
                this.historyInfo.videoPlayTime = player.cache_.currentTime;
                // console.log(this.historyInfo.videoPlayTime);
            },
            playerIsReady(player) {
                // console.log('example 2 ready!', player);
                player.currentTime(this.historyInfo.videoPlayTime);
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
                const time = dateToDatetimeStr(new Date());
                const comment = {
                    videoCommentTime: time,
                    userNickName: this.$store.getters.userName,
                    videoCommentContent: this.currentComment
                };
                const comment2 = {
                    "videoCommentContent": this.currentComment,
                    "videoCommentTime": time,
                    "userId": this.$store.getters.userId,
                    "videoId": this.$route.query.videoId || 0
                };
                this.commentArea.push(comment);
                postRequest("/video/comment", comment2);
                this.currentComment = "";
            },
            favoriteVideo() {
                const vm = this;
                //收藏视频
                const time = dateToDatetimeStr(new Date());
                const favoriteInfo = {
                    "videoFavoriteTime": time,
                    "videoAlbumName": vm.videoAlbum.videoAlbumName + vm.videoId,
                    "userId": parseInt(vm.$store.getters.userId),
                    "videoId": parseInt(vm.videoId)
                };
                postRequest("/video/favorite", favoriteInfo);
                this.isFavorite = true;
            },
            downloadFile() {
                let filename = this.downloadUrl.substring(this.downloadUrl.lastIndexOf('/') + 1);
                downloadFileRequest("/file/video", {filePath: this.downloadUrl}, filename).catch(err => {
                    this.$message.error("下载文件失败");
                });
            }
        },
        created() {
            // 获取当前视频信息
            const videoId = this.$route.query.videoId || 0;
            const userId = this.$store.getters.userId || 0;
            //获取集数
            getRequest("/video/episode?videoId=" + videoId).then(resp => {
                if (resp) {
                    // 给视频路径赋值
                    this.videoListInfo = resp;
                }

            });
            // 获取视频专辑名
            getRequest("/video/album?videoId=" + videoId).then(resp => {
                if (resp) {
                    this.videoAlbum = resp;
                    getRequest("/video/url?videoId=" + videoId).then(videoUrl => {
                        if (videoUrl) {
                            const baseUrl = this.$store.getters.resourceUrl;
                            // 给视频路径赋值
                            this.$set(this.playerOptions.sources, 0, {
                                type: "video/mp4",
                                src: baseUrl + videoUrl,
                            });
                            this.downloadUrl = videoUrl;
                            // 设置海报路径
                            this.playerOptions.poster = baseUrl + videoUrl.toString().substring(0, videoUrl.toString().lastIndexOf(".")) + ".jpg";
                            postRequest("/video/clicks", {videoAlbumId: this.videoAlbum.videoAlbumId});
                        }
                    });
                }
            });
            // 获取历史播放时间
            let history = {
                userId: parseInt(userId),
                videoId: parseInt(videoId),
            };
            getRequest("/video/history/time", history).then(resp => {
                this.historyInfo.videoPlayTime = resp || 0;
            });
            // 获取当前视频评论
            getRequest("/video/comment?videoId=" + videoId).then(resp => {
                if (resp) {
                    this.commentArea = resp;
                }
            });

            //一分钟保存一次播放时间
            setInterval(() => {
                let history = this.historyInfo;
                postRequest("/video/history", history);
            }, 60000);
        },
    }
</script>
<style scoped>
    .videoPlayer {
        margin-top: 30px;
        margin-bottom: 30px;
        margin-right: 60px;
        margin-left: 60px;
    }

    .playerBody {
        min-height: 550px;
        min-width: 1200px;
    }
</style>
