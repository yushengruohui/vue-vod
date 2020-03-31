<template>
    <el-row>
        <el-col>
            <div style="height: 500px;margin-left: 20px;margin-right: 30%">
                <el-divider>填写视频信息</el-divider>
                <el-form ref="uploadForm" :model="uploadForm" label-width="80px" size="mini">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="视频专辑">
                                <el-input v-model="uploadForm.videoAlbumName" placeholder="如火影影者、也是搜索关键字"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="视频标题">
                                <el-input v-model="uploadForm.videoTitle" placeholder="如：第一集 我是谁？"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="视频类型">
                                <el-select v-model="uploadForm.videoChannel" placeholder="请选择">
                                    <el-option
                                            v-for="item in videoChannels"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="上映时间">
                                <el-date-picker
                                        v-model="uploadForm.videoReleaseDate"
                                        type="date"
                                        placeholder="选择日期"
                                        value-format="yyyy-MM-dd"
                                >
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="集数">
                                <el-input v-model="uploadForm.videoEpisodes" placeholder="上传的视频是第几集"></el-input>
                            </el-form-item>

                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="地区">
                                <el-select v-model="uploadForm.videoArea" placeholder="请选择">
                                    <el-option
                                            v-for="item in videoAreas"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="导演">
                                <el-input v-model="uploadForm.videoDirector" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="演员">
                                <el-input v-model="uploadForm.videoActor" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="更新时间">
                                <el-input v-model="uploadForm.videoUpdateTime" placeholder="每周周几||每月多少号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="最新更新">
                                <el-input v-model="uploadForm.videoLastUpdate" placeholder="填写最新更新的集数"></el-input>
                            </el-form-item>

                        </el-col>
                    </el-row>
                    <el-form-item label="视频简介">
                        <el-input type="textarea" v-model="uploadForm.videoSummary"></el-input>
                    </el-form-item>

                </el-form>
                <el-divider>上传视频</el-divider>
                <el-upload
                        ref="upload"
                        name="file"
                        class="upload-demo"
                        action="/api/file/upload"
                        multiple
                        accept="video/mp4,video/avi,video/mpg,video/wmv,video/3gp,video/mov,video/asf,video/flv,video/mkv,video/rmvb,video/wmv9"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :on-exceed="handleExceed"
                        :on-progress="showProgressBar"
                        :before-remove="beforeRemove"
                        :before-upload="beforeUploadVideo"
                        :file-list="fileList"
                        :auto-upload="false"
                        :limit="1"
                        :data="uploadData"
                        :headers="headers"
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
    import {formatDateTime} from "../../utils/dataUtils";

    export default {
        name: "uploadVideo",
        data() {
            return {
                userId: this.$store.state.user.id,
                username: this.$store.state.user.username,
                // 视频类型选项
                videoChannels: [
                    {
                        label: "动漫",
                        value: "动漫"
                    },
                    {
                        label: "电影",
                        value: "电影"
                    },
                    {
                        label: "电视剧",
                        value: "电视剧"
                    },
                    {
                        label: "生活",
                        value: "生活"
                    },
                ],
                // 地区选择
                videoAreas: [
                    {
                        label: "中国",
                        value: "中国"
                    },
                    {
                        label: "日本",
                        value: "日本"
                    },
                    {
                        label: "美国",
                        value: "美国"
                    },
                    {
                        label: "韩国",
                        value: "韩国"
                    },
                    {
                        label: "泰国",
                        value: "泰国"
                    },
                ],
                fileList: [],
                uploadForm: {
                    "videoAlbumName": "",
                    "videoAddUser": this.$store.getters.user.username,
                    "videoReleaseDate": "",
                    "videoSummary": "",
                    "videoChannel": "",
                    "videoDirector": "",
                    "videoArea": "",
                    "videoUpdateTime": "",
                    "videoLastUpdate": "",
                    "videoActor": "",
                    "videoName": "",
                    "videoPath": "",
                    "videoTitle": "",
                    "videoEpisodes": "",
                    "videoAddAt": ""
                },
                uploadData: {},
                // 请求头处理
                headers: {
                    "Authorization": "Bearer " + this.$store.getters.token
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
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                // 删除上传文件之前的钩子函数
                return this.$confirm(`确定移除 ${file.name}？`);
                // 确定则删除上传文件列表中的文件
            },
            beforeUploadVideo(file) {
                let time = formatDateTime(new Date());
                let time2 = this.uploadForm.videoReleaseDate;
                let id = this.$store.getters.user.id;
                this.uploadData = {
                    "userId": this.userId,
                    "videoName": this.uploadForm.videoAlbumName + this.uploadForm.videoEpisodes,
                    "videoPath": "/" + this.userId + "/" + this.uploadForm.videoAlbumName + "/" + this.uploadForm.videoEpisodes + ".mp4",
                    "videoTitle": this.uploadForm.videoTitle,
                    "videoEpisodes": this.uploadForm.videoEpisodes,
                    "videoAddAt": time,
                    "videoAlbumName": this.uploadForm.videoAlbumName,
                    "videoAddUser": this.username,
                    "videoPostPath": "/post/" + this.uploadForm.videoAlbumName + ".jpg",
                    "videoReleaseDate": time2.toString(),
                    "videoSummary": this.uploadForm.videoSummary,
                    "videoChannel": this.uploadForm.videoChannel,
                    "videoDirector": this.uploadForm.videoDirector,
                    "videoArea": this.uploadForm.videoArea,
                    "videoUpdateTime": this.uploadForm.videoUpdateTime,
                    "videoLastUpdate": this.uploadForm.videoLastUpdate,
                    "videoActor": this.uploadForm.videoActor
                };
                let videoType = "video/mp4,video/avi,video/mpg,video/wmv,video/3gp,video/mov,video/asf,video/flv,video/mkv,video/rmvb,video/wmv9";
                if (!videoType.includes(file.type)) {
                    this.$message.error('请上传正确的视频格式');
                    return false;
                }
            },
            handleRemove(file, fileList) {
                // 删除上传文件时的钩子函数
                console.log(file, fileList);
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            showProgressBar(event, file, fileList) {
                // console.log(event);
            },
            onSubmit() {
                console.log('submit!');
            }
        },
    }
</script>

<style scoped>

</style>