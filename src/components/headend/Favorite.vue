<template>
    <div class="favorite">
        <!--================ 主体区域 ================-->
        <el-main>
            <div style="min-height: 480px">
                <el-table
                        :data="tableData"
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
                                    @click.native.prevent="operateHandle(scope.$index, scope.row)"
                                    type="text"
                                    size="small">
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
                tableData: []
            }
        },
        methods: {
            operateHandle(index, rowdata) {
                deleteRequest("/api/video/favorite", {id: rowdata.videoFavoriteId});
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
            //    获取收藏信息
            getFavoriteInfo() {
                getRequest("/api/video/favorite", {
                    userId: this.$store.getters.user.id,
                    currentPage: this.currentPage,
                    pageSize: this.pageSize
                }).then(resp => {
                    console.log(resp);
                    this.tableData = resp.list;
                    this.total = resp.total;
                })
            }
        },
        mounted() {
            this.getFavoriteInfo();
        }
    }
</script>
<style scoped>
    .favorite {
    }
</style>
