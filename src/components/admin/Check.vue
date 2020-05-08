<template>
    <div class="myUser">
        <!--视频审核-->
        <el-table
                ref="userTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%;height: 540px"
        >
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
                    prop="videoAddAt"
                    label="上传时间"
            >
            </el-table-column>
            <el-table-column
                    prop="videoStatus"
                    label="视频状态"
            >
            </el-table-column>
            <el-table-column label="操作" width="350px">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            icon="el-icon-user"
                            @click.native.prevent="checkDetail(scope.$index, scope.row)">查看视频
                    </el-button>
                    <el-button
                            size="mini"
                            type="primary"
                            icon="el-icon-edit"
                            @click.native.prevent="handleEdit(scope.$index, scope.row)">审核通过
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            icon="el-icon-delete"
                            @click.native.prevent="handleDelete(scope.$index, scope.row)">禁播
                    </el-button>
                </template>
            </el-table-column>

        </el-table>
        <div style="text-align: center;margin-top: 10px;">
            <el-pagination
                    background
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
    import {getRequest, putRequest} from "../../utils/http";

    export default {
        name: "Check",
        data() {
            return {
                tableData: [],
                total: 0,
                pageSize: 10,
                currentPage: 1,
            }
        },
        methods: {
            //分页处理
            current_change: function (currentPage) {
                this.currentPage = currentPage;
                this.getVideoUploadInfo();
            },
            sizeChangeHandle(pageSize) {
                // pageSize 当前一页可以显示多少条数据
                this.pageSize = pageSize;
                this.getVideoUploadInfo();
            },

            //编辑信息处理
            checkDetail(index, rowData) {
                // rowData.videoId
                this.$router.push({
                    path: '/videoInfo',
                    query: {
                        videoAlbumId: rowData.videoAlbumId,
                        playStatus: '未审核'
                    }
                })
            },
            // 审核通过
            handleEdit(index, rowData) {
                putRequest("/admin/videoAlbum", {
                    videoAlbumId: rowData.videoAlbumId,
                    videoApprovalStatus: '审核通过',
                    videoId: rowData.videoId
                }).then(flag => {
                    if (flag) {
                        this.getVideoUploadInfo();
                    }
                });
            },
            // 禁播
            handleDelete(index, rowData) {
                putRequest("/admin/videoAlbum", {
                    videoAlbumId: rowData.videoAlbumId,
                    videoApprovalStatus: '禁播',
                    videoId: rowData.videoId
                }).then(flag => {
                    if (flag) {
                        this.getVideoUploadInfo();
                    }
                });
            },
            // 获取表单信息
            getVideoUploadInfo() {
                getRequest("/admin/video", {
                    pageSize: this.pageSize,
                    currentPage: this.currentPage,
                }).then(res => {
                    if (res) {
                        this.tableData = res.list;
                        this.total = res.total;
                    }
                })
            }
        },
        created() {
            this.getVideoUploadInfo();
        }
    }

</script>

<style scoped>
    .myUser {
        margin: 10px;
    }
</style>