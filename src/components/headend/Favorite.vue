<template>
    <div class="favorite">
        <!--================ 主体区域 ================-->
        <el-main>
            <div style="min-height: 480px">
                <el-table
                        :data="tableInfo"
                        style="width: 100%"
                        max-height="400">
                    <el-table-column
                            fixed
                            prop="videoFavoriteTime"
                            label="收藏时间"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="videoAlbumName"
                            label="视频名称"
                    >
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button
                                    type="primary"
                                    size="mini"
                                    @click.native.prevent="handlePlay(scope.$index, scope.row)">继续观看
                            </el-button>
                            <el-button
                                    @click.native.prevent="operateHandle(scope.$index, scope.row)"
                                    type="danger"
                                    size="mini">
                                移除收藏
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="text-align: center;margin-top: 30px;">
                    <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="total"
                            :hide-on-single-page="paginationFlag"
                            @current-change="current_change"
                            @size-change="sizeChangeHandle"
                    >
                    </el-pagination>
                </div>
            </div>
        </el-main>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Header from '@/components/headend/Header.vue'
    import Foot from '@/components/headend/Foot.vue'
    import {deleteRequest, getRequest} from "../../utils/http";

    export default {
        name: 'Favorite',
        components: {
            Header,
            Foot
        },
        inject: ['reload'],
        data() {
            return {
                total: 0,
                currentPage: 1,
                pageSize: 12,
                paginationFlag: true,
                tableData: []
            }
        },
        methods: {
            operateHandle(index, rowdata) {
                deleteRequest("/video/favorite", {id: rowdata.videoFavoriteId});
                this.reload()
            },
            //分页处理
            current_change: function (currentPage) {
                this.currentPage = currentPage;
                this.getFavoriteInfo();
            },
            sizeChangeHandle(pageSize) {
                // pageSize 当前一页可以显示多少条数据
                this.pageSize = pageSize;
                this.getFavoriteInfo();
            },
            //编辑信息处理
            handlePlay(index, rowData) {
                // rowData.videoId
                this.$router.push({
                    name: "VideoPlayer",
                    query: {videoId: rowData.videoId}
                })
            },
            //    获取收藏信息
            getFavoriteInfo() {
                getRequest("/video/favorite", {
                    userId: this.$store.getters.userId,
                    currentPage: this.currentPage,
                    pageSize: this.pageSize
                }).then(resp => {
                    console.log(resp);
                    this.tableInfo = resp.list;
                    this.total = resp.total;
                    this.total < this.pageSize ? this.paginationFlag = true : this.paginationFlag = false;
                })
            }
        },
        mounted() {
            this.getFavoriteInfo();
        }
    }
</script>
<style scoped>
</style>
