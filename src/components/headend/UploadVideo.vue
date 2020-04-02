<template>
    <el-row>
        <el-col>
            <div style="height: 500px;margin-left: 20px;margin-right: 30%">
                <el-divider>填写视频信息</el-divider>
                <el-form ref="uploadVideoInfo" :model="uploadVideoInfo" label-width="80px"
                         size="mini"
                >
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="视频专辑">
                                <el-input v-model="uploadVideoInfo.videoAlbumName"
                                          placeholder="如火影影者、也是搜索关键字"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="视频标题">
                                <el-input v-model="uploadVideoInfo.videoTitle" placeholder="如：第一集 我是谁？"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="视频类型">
                                <el-select v-model="uploadVideoInfo.videoChannel" placeholder="请选择">
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
                                        v-model="uploadVideoInfo.videoReleaseDate"
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
                                <el-input v-model="uploadVideoInfo.videoEpisodes" placeholder="上传的视频是第几集"></el-input>
                            </el-form-item>

                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="地区">
                                <el-select v-model="uploadVideoInfo.videoArea" placeholder="请选择">
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
                                <el-input v-model="uploadVideoInfo.videoDirector" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="演员">
                                <el-input v-model="uploadVideoInfo.videoActor" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="更新时间">
                                <el-input v-model="uploadVideoInfo.videoUpdateTime"
                                          placeholder="每周周几||每月多少号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="最新更新">
                                <el-input v-model="uploadVideoInfo.videoLastUpdate" placeholder="填写最新更新的集数"></el-input>
                            </el-form-item>

                        </el-col>
                    </el-row>
                    <el-form-item label="视频简介">
                        <el-input type="textarea" v-model="uploadVideoInfo.videoSummary"></el-input>
                    </el-form-item>

                </el-form>
                <el-divider>上传视频</el-divider>
                <el-upload
                        ref="elUpload"
                        name="multipartFiles"
                        class="upload-demo"
                        action="/api/file/upload"
                        multiple
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :on-exceed="handleExceed"
                        :on-progress="showProgressBar"
                        :before-remove="beforeRemove"
                        :before-upload="beforeUploadVideo"
                        :file-list="fileList"
                        :auto-upload="false"
                        :limit="1"
                        :data="uploadVideoInfo"
                        :headers="headers"
                >
                    <el-button slot="trigger" size="small" type="primary">选取视频</el-button>
                    <el-button style="margin-left: 10px;" size="small" type="success"
                               @click.native.prevent="submitUpload">
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
                uploadVideoInfo: {
                    "userId": "",
                    "videoName": "",
                    "videoPath": "",
                    "videoTitle": "",
                    "videoEpisodes": "",
                    "videoAddAt": "",
                    "videoAlbumName": "",
                    "videoAddUser": "",
                    "videoPostPath": "",
                    "videoReleaseDate": "",
                    "videoSummary": "",
                    "videoChannel": "",
                    "videoDirector": "",
                    "videoArea": "",
                    "videoUpdateTime": "",
                    "videoLastUpdate": "",
                    "videoActor": ""
                },
                // 请求头处理
                headers: {
                    "Authorization": "Bearer " + this.$store.getters.token || ""
                }
            }
        },
        methods: {
            // 上传视频相关操作
            handlePreview(fileInfo) {
                // fileInfo:{
                // name: "什么是Vue.flv"
                // percentage: 0
                // raw: File
                // size: 8775097
                // status: "ready"
                // uid: 1585810075043
                // }
                // 点击文件列表中文件时的钩子函数
                console.log(fileInfo);
            },
            handleExceed(fileInfo, fileInfoList) {
                // fileInfo 准备上传的文件数，fileList文件列表
                // 超出上传文件数限制时的钩子函数
                this.$message.warning(`当前限制选择 ${fileInfoList.length} 个文件，本次选择了 ${fileInfo.length} 个文件，共选择了 ${fileInfo.length + fileInfoList.length} 个文件`);
            },
            beforeRemove(fileInfo, fileInfoList) {
                // 删除上传文件之前的钩子函数
                return this.$confirm(`确定移除 ${fileInfo.name}？`);
                // 确定则删除上传文件列表中的文件
            },
            beforeUploadVideo(file) {
                // 每个文件上传之前都调用一次这个方法
                // file:{
                // lastModified: 1584693299766
                // lastModifiedDate: Fri Mar 20 2020 16:34:59 GMT+0800 (中国标准时间)
                // name: "什么是Vue.flv"
                // size: 8775097
                // type: ""
                // uid: 1585810075043
                // webkitRelativePath: ""
                // }
                let videoType = "video/mp4,video/avi,video/mpg,video/wmv,video/3gp,video/mov,video/asf,video/flv,video/mkv,video/rmvb,video/wmv9";
                if (!videoType.includes(file.type)) {
                    this.$message.error('请上传正确的视频格式');
                    //终止上传
                    return false;
                }
                const username = this.$store.state.user.username;
                const time = formatDateTime(new Date());
                const time2 = this.uploadVideoInfo.videoReleaseDate;
                const id = this.$store.getters.user.id;
                this.uploadVideoInfo = {
                    "userId": this.userId,
                    "videoName": this.uploadVideoInfo.videoAlbumName + this.uploadVideoInfo.videoEpisodes,
                    "videoPath": "/" + this.userId + "/" + this.uploadVideoInfo.videoAlbumName + "/" + this.uploadVideoInfo.videoEpisodes + ".mp4",
                    "videoTitle": this.uploadVideoInfo.videoTitle,
                    "videoEpisodes": this.uploadVideoInfo.videoEpisodes,
                    "videoAddAt": time,
                    "videoAlbumName": this.uploadVideoInfo.videoAlbumName,
                    "videoAddUser": username,
                    "videoPostPath": "/post/" + this.uploadVideoInfo.videoAlbumName + ".jpg",
                    "videoReleaseDate": time2.toString(),
                    "videoSummary": this.uploadVideoInfo.videoSummary,
                    "videoChannel": this.uploadVideoInfo.videoChannel,
                    "videoDirector": this.uploadVideoInfo.videoDirector,
                    "videoArea": this.uploadVideoInfo.videoArea,
                    "videoUpdateTime": this.uploadVideoInfo.videoUpdateTime,
                    "videoLastUpdate": this.uploadVideoInfo.videoLastUpdate,
                    "videoActor": this.uploadVideoInfo.videoActor
                };
                console.log(this.uploadVideoInfo);
                if (this.uploadVideoInfo)
                    return file;
            },
            handleRemove(file, fileList) {
                // 删除上传文件时的钩子函数
            },
            submitUpload() {
                this.$refs.elUpload.submit();
            },
            showProgressBar(event, file, fileList) {
            },
        },
    }
</script>

<style scoped>

</style>