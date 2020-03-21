<template>
    <el-row>
        <el-col>
            <div style="height: 550px;margin: 20px;">
                <el-divider>视频信息</el-divider>
                <el-form ref="form" :model="form" label-width="80px" size="mini">
                    <el-form-item label="活动名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="活动区域">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="活动时间">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                            style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-time-picker placeholder="选择时间" v-model="form.date2"
                                            style="width: 100%;"></el-time-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="即时配送">
                        <el-switch v-model="form.delivery"></el-switch>
                    </el-form-item>
                    <el-form-item label="活动性质">
                        <el-checkbox-group v-model="form.type">
                            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                            <el-checkbox label="地推活动" name="type"></el-checkbox>
                            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="特殊资源">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="线上品牌商赞助"></el-radio>
                            <el-radio label="线下场地免费"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="活动形式">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即创建</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
                <el-divider>上传视频</el-divider>
                <el-upload
                        ref="upload"
                        name="file"
                        class="upload-demo"
                        action="api/upload"
                        multiple
                        accept="image/jpeg,image/jpeg,image/gif,image/png"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :on-exceed="handleExceed"
                        :on-progress="showProgressBar"
                        :before-remove="beforeRemove"
                        :file-list="fileList"
                        :auto-upload="false"
                >
                    <el-button slot="trigger" size="small" type="primary">选取视频</el-button>
                    <el-button style="margin-left: 10px;" size="small" type="success"
                               @click="submitUpload">
                        上传视频
                    </el-button>
                    <div slot="tip" class="el-upload__tip">先选取你的视频，确认后再点击上传</div>
                </el-upload>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "uploadVideo",
        data() {
            return {
                fileList: [],
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        methods: {
            // 上传视频相关操作
            handlePreview(file) {
                // 点击文件列表中文件时的钩子函数
                console.log(file);
            },
            handleExceed(files, fileList) {
                // 超出上传文件数限制时的钩子函数
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                // 删除上传文件之前的钩子函数
                return this.$confirm(`确定移除 ${file.name}？`);
                // 确定则删除上传文件列表中的文件
            },
            handleRemove(file, fileList) {
                // 删除上传文件时的钩子函数
                console.log(file, fileList);
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            showProgressBar(event, file, fileList) {
                console.log(event);
                if (file.status === "ready") {
                    // 显示进度条
                    console.log(file);
                    event.percent({percent: file.percentage});
                }
            },
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>

<style scoped>

</style>