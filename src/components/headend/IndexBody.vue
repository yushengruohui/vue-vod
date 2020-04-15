<template>
    <div class="indexBody">
        <!--================ 推荐视频 ================-->
        <el-divider><span style="font-size: 18px">推荐视频</span></el-divider>
        <el-row type="flex" :gutter="10" style="height: 240px;">
            <el-col :span="4" v-for="item in firstRow" :key="item.videoUrl">
                <el-card body-style="height: 200px;">
                    <el-image :src="item.videoPostPath"
                              fit="fill"
                              style="height: 150px;width: 200px; border-radius: 4px"
                    >
                        <div slot="placeholder" class="image-slot">
                            <span>加载中</span>
                        </div>
                    </el-image>
                    <div style="padding: 10px;text-align: center">
                        <el-link :href="item.videoUrl">{{item.videoAlbumName}}</el-link>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row type="flex" :gutter="10" style="height: 240px;">
            <el-col :span="4" v-for="item in secondRow" :key="item.videoUrl">
                <el-card body-style="height: 200px;">
                    <el-image :src="item.videoPostPath"
                              fit="fill"
                              style="height: 150px;width: 200px; border-radius: 4px"
                    >
                        <div slot="placeholder" class="image-slot">
                            <span>加载中</span>
                        </div>
                    </el-image>
                    <div style="padding: 10px;text-align: center">
                        <el-link :href="item.videoUrl">{{item.videoAlbumName}}</el-link>
                    </div>
                </el-card>
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
                firstRow: [],
                secondRow: [],
            }
        },
        methods: {},

        mounted() {
            getRequest("/redis/videoAlbum/hot").then(res => {
                if (res) {
                    const resourceUrl = this.$store.getters.resourceUrl;
                    for (let i = 0, len = res.length; i < len; i++) {
                        if (i < 6) {
                            const videoInfo = {
                                videoUrl: "/videoInfo?videoAlbumId=" + res[i].videoAlbumId,
                                videoAlbumName: res[i].videoAlbumName,
                                videoPostPath: resourceUrl + res[i].videoPostPath,
                            };
                            this.firstRow.push(videoInfo);
                        } else {
                            let videoInfo = {
                                videoUrl: "/videoInfo?videoAlbumId=" + res[i].videoAlbumId,
                                videoAlbumName: res[i].videoAlbumName,
                                videoPostPath: res[i].videoPostPath,
                            };
                            this.secondRow.push(videoInfo);
                        }
                    }

                }
            })
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .indexBody {
        width: 100%;
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
