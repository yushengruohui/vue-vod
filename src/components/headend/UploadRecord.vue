<template>
    <div>
        <el-table
                ref="multipleTable"
                :data="tableInfo"
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
                    prop="gmtCreate"
                    label="上传时间"
            >
            </el-table-column>
            <el-table-column
                    prop="videoStatus"
                    label="审核状态"
            >
            </el-table-column>
            <el-table-column label="操作" width="300px">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click.native.prevent="checkDetail(scope.$index, scope.row)">查看详情
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click.native.prevent="handleDelete(scope.$index, scope.row)">下架视频
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click.native.prevent="handleDeleteUploadRecord(scope.$index, scope.row)">删除记录
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="text-align: center;margin-top: 30px;">
            <el-pagination
                    background
                    :hide-on-single-page="paginationFlag"
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
        name: "UploadRecord",
        data() {
            return {
                tableData: [],
                multipleSelection: [],
                total: 0,
                pageSize: 10,
                currentPage: 1,
                paginationFlag: true,
                uploadRecordInfo: {
                    "videoId": 0,
                    "id": 0,
                    "videoName": "",
                    "videoTitle": "",
                    "videoEpisodes": "",
                    "videoAlbumId": 0,
                    "videoAlbumName": "",
                    "videoLastUpdate": "",
                    "gmtCreate": "",
                    "videoStatus": ""
                },
            }
        },
        methods: {
            getTableInfo() {
                getRequest('/video/upload', {
                    userId: this.$store.getters.userId,
                    pageSize: this.pageSize,
                    currentPage: this.currentPage,
                }).then(res => {
                    if (res) {
                        this.tableInfo = res.list;
                        this.total = res.total;
                        this.total <= this.pageSize ? this.paginationFlag = true : this.paginationFlag = false;
                    }
                }).catch(function (error) {
                });
            },

            //分页处理
            current_change: function (currentPage) {
                this.currentPage = currentPage;
                this.getTableInfo();
            },
            sizeChangeHandle(pageSize) {
                // pageSize 当前一页可以显示多少条数据
                this.pageSize = pageSize;
                this.getTableInfo();
            },

            checkDetail(index, rowData) {
                this.$router.push({
                    name: "VideoInfo",
                    query: {videoAlbumId: rowData.videoAlbumId, playStatus: "未审核"}
                })
            },
            handleDelete(index, rowData) {
                deleteRequest("/video/upload", {
                    id: rowData.id,
                    videoId: rowData.videoId
                }).then(res => {
                    this.getTableInfo();
                });
            },
            handleDeleteUploadRecord(index, rowData) {
                deleteRequest("/video/uploadRecord", {
                    id: rowData.id,
                }).then(res => {
                    this.getTableInfo();
                });
            }
        },
        mounted: function () {
            this.getTableInfo();
        }
    }
</script>

<style scoped>

</style>