<template>
    <div class="indexBody">
        <el-row>
            <el-col :span="24">
                <!--================ 推荐视频 ================-->
                <el-divider><span style="font-size: 18px">推荐视频</span></el-divider>
                <el-row type="flex" :gutter="10" style="padding-bottom: 10px; " v-for="(item, row_index) in 2"
                        :key="item">

                    <el-col :span="4" v-for="(item, col_index) in 6" :key="item">
                        <el-card body-style="height: 200px;">
                            <el-image :src="videoInfo.videoPostPath"
                                      fit="fill"
                                      style="height: 150px;width: 200px; border-radius: 4px"
                            >
                                <div slot="placeholder" class="image-slot">
                                    <span>加载中</span>
                                </div>
                            </el-image>
                            <div style="padding: 10px;text-align: center">
                                <el-link :href="videoInfo.videoUrl">{{videoInfo.videoAlbumName}}</el-link>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>

    import {getRequest} from "../../utils/http";

    export default {
        name: 'Body',
        props: {
            msg: String
        },
        data() {
            return {
                videoInfos: [],
                videoInfo: {
                    videoUrl: "",
                    videoAlbumName: "舌尖上的中国",
                    videoPostPath: '',
                },

            }
        },
        methods: {},

        mounted() {
            getRequest("/api/video/hot").then(res => {
                if (res) {
                    console.log(res);
                    res.forEach(returnVideoInfo => {
                        let videoInfo = {
                            videoUrl: "/videoInfo?videoAlbumId=" + returnVideoInfo.videoAlbumId,
                            videoAlbumName: returnVideoInfo.videoAlbumName,
                            videoPostPath: returnVideoInfo.videoPostPath,
                            // videoPostPath: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
                        };
                        this.videoInfos.push(videoInfo);
                    });
                    console.log(this.videoInfos);
                }
            })
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .indexBody {
        width: 100%;
        min-width: 1100px;
        padding: 5px;
        border-bottom: 1px solid #1f2d3d;
        border-radius: 2px;
        vertical-align: middle;
    }

    img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
    }

    .announcement {
        height: 60px;
        width: 100%;
        border-radius: 4px;
    }

    .image-slot {
        display: flex;
        justify-content: center; /*实现水平居中*/
        align-items: center; /*实现垂直居中*/
    }
</style>
