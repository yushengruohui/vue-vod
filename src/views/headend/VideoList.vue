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
                <el-row type="flex" :gutter="10" style="height: 240px;">
                    <el-col :span="4" v-for="videoInfo in firstRow"
                            :key="videoInfo.videoAlbumId"
                            v-show="firstRow">
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
                <el-row type="flex" :gutter="10" style="height: 240px;padding-top: 10px;">
                    <el-col :span="4" v-for="videoInfo in secondRow"
                            :key="videoInfo.videoAlbumId"
                            v-show="secondRow">
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
                firstRow: [],
                secondRow: [],
                currentPage: 1,
                pageSize: 12,
                total: 0,
                baseUrl: this.$store.getters.resourceUrl || "",
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
                this.getInitInfo();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getInitInfo();
            },
            getInitInfo() {
                getRequest("/video/list", {
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
                                this.firstRow.push(temp[i]);
                            } else {
                                this.secondRow.push(temp[i]);
                            }
                        }
                        this.total = resp.total;
                    }
                })
            }
        },
        mounted() {
            this.getInitInfo();
        }
    }
</script>
<style scoped>
    .bgTitle {
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
