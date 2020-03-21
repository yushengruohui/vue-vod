<template>
    <div class="videoPlayer">
        <el-container>
            <!--视频网页-->
            <!--================ 头部区域 ================-->
            <el-header>
                <Header msg="header"/>
            </el-header>
            <!--================ 主体区域 ================-->
            <el-main>
                <el-row>
                    <el-col :span="24" class="bgTitle">
                        <span>国产动漫</span>
                    </el-col>
                </el-row>
                <!--选择排序方式-->
                <el-row>
                    <el-col :span="24" style="padding-left: 90px;padding-top: 10px">
                        <span>排序：</span>
                        <el-radio-group v-model="sortKeyWord">
                            <el-radio-button label="hot">最热</el-radio-button>
                            <el-radio-button label="new">最新</el-radio-button>
                            <el-radio-button label="commentNumber">评论数</el-radio-button>
                            <el-radio-button label="lastNew">最近更新</el-radio-button>
                        </el-radio-group>
                    </el-col>
                </el-row>
                <!--视频列表-->
                <el-row type="flex" :gutter="10" v-for="(row_item, row_index) in 2" :key="row_item"
                        style="padding-top: 10px">
                    <el-col :span="4" v-for="(col_item, col_index) in 6" :key="col_item">
                        <el-card body-style="height: 200px;">
                            <el-image :src="imageUrl"
                                      :fit="imageFit"
                                      style="height: 150px;width: 200px;border-radius: 4px"
                            >
                            </el-image>
                            <div style="padding: 10px;text-align: center">
                                <el-link>舌尖上的中国</el-link>
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
                                :page-sizes="[100, 200, 300, 400]"
                                :page-size="100"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="400">
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

    export default {
        name: 'Index',
        components: {
            Header,
            Foot
        },
        data() {
            console.log("asdf" + "fsadf");
            return {
                currentPage: 4,
                sortKeyWord: 'hot',
                imageUrl: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
                imageFit: 'fill',
                imageNumber: 36,
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        }
    }
</script>
<style scoped>
    .videoPlayer {

    }

    .bgTitle {
        width: 100%;
        height: 30px;
        min-width: 1100px;
        padding: 5px;
        background: #324057;
        color: #ffffff;
        border-bottom: 1px solid #1f2d3d;
        border-radius: 2px;
        vertical-align: middle;
        text-align: center;
    }
</style>
