<template>
    <div>
        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
        >
            <el-table-column
                    prop="videoAlbumName"
                    label="视频专辑"
            >
            </el-table-column>
            <el-table-column
                    prop="videoName"
                    label="视频名称"
            >
            </el-table-column>
            <el-table-column
                    prop="videoTitle"
                    label="视频标题"
            >
            </el-table-column>
            <el-table-column
                    prop="videoEpisodes"
                    label="视频集数"
            >
            </el-table-column>
            <el-table-column
                    prop="videoPlayTime"
                    label="观看时间"
            >
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handlePlay(scope.$index, scope.row)">继续观看
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="text-align: center;margin-top: 30px;">
            <el-pagination
                    background
                    :hide-on-single-page="hidePagination"
                    layout="prev, pager, next"
                    :total="total"
                    @current-change="current_change"
                    @size-change="sizeChangeHandle"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {deleteRequest, getRequest} from "../../utils/http";

    export default {
        name: "History",
        data() {
            return {
                tableData: [],
                multipleSelection: [],
                total: 0,
                pageSize: 10,
                currentPage: 1,
                hidePagination: false,
                historyInfo: {
                    "videoHistoryId": 0,
                    "videoPlayTime": "",
                    "userId": 0,
                    "videoId": 0,
                    "videoName": "",
                    "videoTitle": "",
                    "videoEpisodes": "",
                    "videoAlbumName": ""
                },
            }
        },
        methods: {
            getUserList() {
                getRequest('/api/video/history', {
                    userId: this.$store.getters.user.id,
                    pageSize: this.pageSize,
                    currentPage: this.currentPage,
                }).then(res => {
                    console.log(res);
                    if (res) {
                        this.tableData = res.list;
                        this.total = res.total;
                        this.total <= this.pageSize ? this.hidePagination = true : this.hidePagination = false;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },

            //分页处理
            current_change: function (currentPage) {
                this.currentPage = currentPage;
            },
            sizeChangeHandle(pageSize) {
                // pageSize 当前一页可以显示多少条数据
                this.pageSize = pageSize;
            },

            handleSelectionChange() {

            },
            //编辑信息处理
            handlePlay(index, rowData) {
                // rowData.videoId
                this.$router.push({
                    name: "VideoPlayer",
                    query: {videoId: rowData.videoId}
                })
            },
            handleDelete(index, rowData) {
                deleteRequest("/api/video/history", {videoHistoryId: rowData.videoHistoryId})
            }
        },
        mounted: function () {
            this.getUserList();
        }

    }
</script>

<style scoped>

</style>