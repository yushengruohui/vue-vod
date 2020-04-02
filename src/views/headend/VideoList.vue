<template>
    <div>
        <el-container>
            <!--视频网页-->
            <!--================ 头部区域 ================-->
            <el-header>
                <Header/>
            </el-header>
            <!--================ 主体区域 ================-->
            <el-main>
                <el-row>
                    <el-col :span="24" class="bgTitle">
                        <span v-text="videoListInfo.videoArea+videoListInfo.videoChannel"></span>
                    </el-col>
                </el-row>
                <!--视频列表-->
                <el-row type="flex" :gutter="10" style="padding-bottom: 10px">
                    <el-col :span="4" v-for="(videoInfo, row_index) in videoListVOList.row1"
                            :key="videoInfo.videoAlbumId"
                            v-show="videoListVOList.row1">
                        <el-card body-style="height: 200px;">
                            <el-image :src="baseUrl+videoInfo.videoPostPath"
                                      fit="fill"
                                      style="height: 150px;width: 200px;border-radius: 4px"
                            >
                            </el-image>
                            <div style="padding: 10px;text-align: center">
                                <router-link :to="{name: 'VideoInfo',query: {videoAlbumId:videoInfo.videoAlbumId}}">
                                    <span v-text="videoInfo.videoAlbumName"></span>
                                </router-link>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row type="flex" :gutter="10">
                    <el-col :span="4" v-for="(videoInfo, row_index) in videoListVOList.row2"
                            :key="videoInfo.videoAlbumId"
                            v-show="videoListVOList.row2">
                        <el-card body-style="height: 200px;">
                            <el-image :src="baseUrl+videoInfo.videoPostPath"
                                      fit="fill"
                                      style="height: 150px;width: 200px;border-radius: 4px"
                            >
                            </el-image>
                            <div style="padding: 10px;text-align: center">
                                <router-link :to="{name: 'VideoInfo',query: {videoAlbumId:videoInfo.videoAlbumId}}">
                                    <span v-text="videoInfo.videoAlbumName"></span>
                                </router-link>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <!--分页-->
                <el-row>
                    <el-col :span="24" style="text-align: center;padding-top: 10px">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-size="pageSize"
                                layout="total, prev, pager, next"
                                :total="total">
                        </el-pagination>
                    </el-col>
                </el-row>
            </el-main>
            <!--================ 底部区域 ================-->
            <el-footer height="30">
                <Foot msg="Foot"></Foot>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Header from '@/components/headend/Header.vue'
    import Foot from '@/components/headend/Foot.vue'
    import {getRequest} from "../../utils/http";

    export default {
        name: 'VideoList',
        components: {
            Header,
            Foot
        },
        data() {
            return {
                videoListVOList: {
                    row1: [],
                    row2: []
                },
                currentPage: 1,
                pageSize: 12,
                total: 0,
                baseUrl: "http://121.36.2.172:3999",
                videoListInfo: {
                    "videoChannel": this.$route.query.videoChannel || "",
                    "videoArea": this.$route.query.videoArea || "",
                    "currentPage": 1,
                    "pageSize": 12,
                },
            }
        },
        methods: {
            handleSizeChange(val) {
                this.pageSize = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            }
        },
        mounted() {
            getRequest("/api/video/list", {
                "videoChannel": this.$route.query.videoChannel || "",
                "videoArea": this.$route.query.videoArea || "",
                "currentPage": this.currentPage || 1,
                "pageSize": this.currentPage || 12,
            }).then(resp => {
                if (resp) {
                    console.log(resp);
                    let temp = resp.list;
                    for (let i = 0, len = temp.length; i < len; i++) {
                        if (i < 6) {
                            this.videoListVOList.row1.push(temp[i]);
                        } else {
                            this.videoListVOList.row2.push(temp[i]);
                        }
                    }
                    this.total = resp.total;
                }

            })
        }
    }
</script>
<style scoped>
    .bgTitle {
        height: 30px;
        width: 100%;
        min-width: 1200px;
        padding: 5px;
        background: #324057;
        color: #ffffff;
        border-bottom: 1px solid #1f2d3d;
        border-radius: 2px;
        vertical-align: middle;
        text-align: center;
    }
</style>
