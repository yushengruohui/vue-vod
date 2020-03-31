<template>
    <el-container>
        <el-header>
            <!--================ 头部 ================-->
            <Header></Header>
        </el-header>
        <!--================ 视频详细页 ================-->
        <el-main>
            <div class="main_body">
                <el-row type="flex" style="height: 550px;" :gutter="10">
                    <el-col :span="4">
                        <div>
                        </div>
                    </el-col>
                    <el-col :span="16">
                        <el-card style="background: #f5f5f5;height: 500px">
                            <el-row>
                                <el-col :span="6">
                                    <!--海报-->
                                    <el-image style="height: 450px;width: 80%" fit="fill"
                                              :src="baseUrl+videoInfo.videoPostPath"
                                    >
                                    </el-image>
                                </el-col>
                                <el-col :span="18">
                                    <el-row>
                                        <el-col>

                                            <h1 v-text="videoInfo.videoAlbumName"></h1>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        栏目（{{videoInfo.videoChannel}}）、 地区（{{videoInfo.videoArea}}）、
                                        最新更新（{{videoInfo.videoLastUpdate}}）、标签（<span v-for="tag in videoInfo.videoTags"
                                                                                     :key="tag">{{tag}}&nbsp;</span>）
                                        <el-divider></el-divider>
                                    </el-row>
                                    <el-row>
                                        导演：{{videoInfo.videoDirector}}
                                    </el-row>
                                    <el-row>
                                        演员：{{videoInfo.videoActor}}
                                    </el-row>
                                    <el-row>
                                        上映时间：{{videoInfo.videoReleaseDate}}
                                    </el-row>
                                    <el-row>
                                        更新时间：{{videoInfo.videoUpdateTime}}
                                    </el-row>
                                    <el-row>
                                        上传者：{{videoInfo.videoAddUser}}
                                    </el-row>
                                    <el-row>简介：{{videoInfo.videoSummary}}
                                        <el-divider></el-divider>
                                    </el-row>
                                    <!--视频链接-->
                                    <el-row>播放</el-row>
                                    <el-row :gutter="20" style="overflow-y:auto;">
                                        <el-link v-for="(id,index) in videoInfo.videoUrls" :key="index"
                                                 :href="'/videoPlayer?videoId='+id" style="margin-right: 10px">
                                            <el-button>{{index+1}}</el-button>
                                        </el-link>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-main>
        <!--================ 底部 ================-->
        <el-footer>
            <Foot></Foot>
        </el-footer>
    </el-container>

</template>

<script>
    import Header from '@/components/headend/Header.vue'
    import Foot from '@/components/headend/Foot.vue'
    import ElImageViewer from "element-ui/packages/image/src/image-viewer";
    import {getRequest} from "../../utils/http";

    export default {

        name: "VideoInfo",
        components: {
            ElImageViewer,
            Header,
            Foot,
        },
        data() {
            return {
                baseUrl: "http://127.0.0.1:3888/video/upload",
                videoInfo: {
                    "videoAlbumId": this.$route.query.videoAlbumId || 0,
                    "videoAlbumName": " ",
                    "videoAddUser": "",
                    "videoPostPath": "",
                    "videoReleaseDate": "",
                    "videoSummary": "",
                    "videoChannel": "",
                    "videoDirector": "",
                    "videoArea": "",
                    "videoUpdateTime": "",
                    "videoActor": "",
                    "videoLastUpdate": "",
                    "videoUrls": [],
                    "videoTags": []
                }
            }
        },
        created() {
            getRequest("/api/videoAlbum?videoAlbumId=" + this.videoInfo.videoAlbumId).then(res => {
                this.videoInfo = res;
                console.log(res);
            })
        }
    }
</script>

<style scoped>
    .main_body {
        min-height: 550px;
        min-width: 1200px;
    }
</style>