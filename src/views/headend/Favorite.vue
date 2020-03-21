<template>
    <div class="favorite">
        <el-container>
            <!--视频网页-->
            <!--================ 头部区域 ================-->
            <el-header>
                <Header msg="header"/>
            </el-header>
            <!--================ 主体区域 ================-->
            <el-main>
                <div style="min-height: 550px">
                    <el-divider>我的收藏</el-divider>
                    <el-table
                            :data="tableData"
                            style="width: 100%"
                            max-height="550">
                        <el-table-column
                                fixed
                                prop="favoriteTime"
                                label="收藏时间"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="videoName"
                                label="视频名称"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="videoEpisode"
                                label="观看集数"
                        >
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作"
                        >
                            <template slot-scope="scope">
                                <el-button
                                        @click.native.prevent="operateHandle(scope.$index, tableData)"
                                        type="text"
                                        size="small">
                                    移除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-main>
            <!--================ 底部区域 ================-->
            <el-footer>
                <Foot msg="Foot"></Foot>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Header from '@/components/headend/Header.vue'
    import Body from '@/components/headend/Body.vue'
    import Foot from '@/components/headend/Foot.vue'

    export default {
        name: 'Index',
        components: {
            Header,
            Body,
            Foot
        },
        methods: {
            operateHandle(index, rows) {
                rows.splice(index, 1);
            }
        },
        data() {
            return {
                tableData: [{
                    favoriteTime: '2016-05-07',
                    videoName: '王小虎',
                    videoEpisode: '10',
                }]
            }
        }
    }
</script>
<style scoped>
    .favorite {
    }
</style>
