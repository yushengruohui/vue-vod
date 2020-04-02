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
                    prop="videoLastUpdate"
                    label="最新集数"
            >
            </el-table-column>
            <el-table-column
                    prop="videoApprovalStatus"
                    label="审核状态"
            >
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click.native.prevent="handleCheck(scope.$index, scope.row)">查看详情
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click.native.prevent="handleDelete(scope.$index, scope.row)">下架视频
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
        name: "UploadRecord",
        data() {
            return {
                tableData: [],
                multipleSelection: [],
                total: 0,
                pageSize: 10,
                currentPage: 1,
                hidePagination: false,
                uploadRecordInfo: {
                    "videoAlbumId": 0,
                    "videoAlbumName": "",
                    "videoAddUser": "",
                    "videoLastUpdate": "",
                    "videoApprovalStatus": ""
                },
            }
        },
        methods: {
            getUserList() {
                getRequest('/api/video/upload', {
                    userName: this.$store.getters.user.username,
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
                this.getUserList();
            },
            sizeChangeHandle(pageSize) {
                // pageSize 当前一页可以显示多少条数据
                this.pageSize = pageSize;
                this.getUserList();
            },

            //编辑信息处理
            handleCheck(index, rowData) {
                // rowData.videoId
                this.$router.push({
                    name: "VideoInfo",
                    query: {videoAlbumId: rowData.videoAlbumId}
                })
            },
            handleDelete(index, rowData) {
                deleteRequest("/api/video/upload", {videoAlbumId: rowData.videoAlbumId}).then(res => {
                    deleteRequest("/api/es/video/search", {videoAlbumId: rowData.videoAlbumId})
                });
                this.getUserList();
            }
        },
        mounted: function () {
            this.getUserList();
        }
    }
</script>

<style scoped>

</style>