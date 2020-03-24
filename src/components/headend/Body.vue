<template>
    <div class="indexBody">
        <el-row>
            <el-col :span="24">
                <el-divider><span style="font-size: 18px">推荐视频</span></el-divider>
                <el-row type="flex" :gutter="10" v-for="(row_item, row_index) in 2" :key="row_item"
                        style="padding-bottom: 10px; ">
                    <el-col :span="4" v-for="(col_item, col_index) in 6" :key="col_item">
                        <el-card body-style="height: 200px;">
                            <el-image :src="imageUrl"
                                      :fit="imageFit"
                                      style="height: 150px;width: 200px; border-radius: 4px"
                            >
                            </el-image>
                            <div style="padding: 10px;text-align: center">
                                <el-link>舌尖上的中国</el-link>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>

    export default {
        name: 'Body',
        props: {
            msg: String
        },
        data() {
            return {
                currentDate: new Date(),
                imageUrl: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
                imageFit: 'fill',
                imageNumber: 36,
                imageRow: Math.floor(this.imageNumber / 6),
            }
        },
        methods: {
            handleSearch() {
                console.log("你好")
            },
            load() {
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .indexBody {
        width: 100%;
        min-width: 1100px;
        padding: 5px;
        border-bottom: 1px solid #1f2d3d;
        border-radius: 2px;
        vertical-align: middle;
    }

    img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
    }

    .announcement {
        height: 60px;
        width: 100%;
        border-radius: 4px;
    }
</style>
