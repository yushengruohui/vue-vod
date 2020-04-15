<template>
    <el-row type="flex" style="height: 520px">
        <el-col :span="16">
            <div style="height: 520px;">
                <el-divider>填写视频信息</el-divider>
                <el-form ref="uploadVideoInfo" :model="videoInfo" label-width="80px"
                         size="mini"
                >
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="视频专辑">
                                <el-input v-model="videoInfo.videoAlbumName"
                                          placeholder="如火影影者、也是搜索关键字"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="视频标题">
                                <el-input v-model="videoInfo.videoTitle" placeholder="如：第一集 我是谁？"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="视频类型">
                                <el-select v-model="videoInfo.videoChannel" placeholder="请选择">
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
                                        v-model="videoInfo.videoReleaseDate"
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
                                <el-input v-model="videoInfo.videoEpisodes" placeholder="上传的视频是第几集"></el-input>
                            </el-form-item>

                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="地区">
                                <el-select v-model="videoInfo.videoArea" placeholder="请选择">
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
                                <el-input v-model="videoInfo.videoDirector" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="演员">
                                <el-input v-model="videoInfo.videoActor" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="更新时间">
                                <el-input v-model="videoInfo.videoUpdateTime"
                                          placeholder="每周周几||每月多少号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="最新更新">
                                <el-input v-model="videoInfo.videoLastUpdate" placeholder="填写最新更新的集数"></el-input>
                            </el-form-item>

                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="视频简介">
                                <el-input type="textarea" v-model="videoInfo.videoSummary"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>


                </el-form>
            </div>
        </el-col>
        <el-col :offset="1" :span="6">
            <el-row type="flex" style="height: 250px">
                <el-col style="text-align: center">
                    <el-divider>上传海报</el-divider>
                    <el-row>
                        <div class="my-file">
                            <input type="file" @change="uploadPost">点击选择海报
                        </div>
                    </el-row>
                    <el-row>
                        <el-button type="primary" @click="postBtnEven">上传海报</el-button>
                    </el-row>
                    <el-row>
                        <el-progress :percentage="uploadPostRate" v-show="uploadPostRate!==0"></el-progress>
                    </el-row>
                    <el-row>
                        <span v-text="uploadPostSpan"></span>
                    </el-row>
                </el-col>
            </el-row>
            <el-row type="flex" style="height: 250px">
                <el-col style="text-align: center">
                    <el-divider>上传视频</el-divider>
                    <el-row>
                        <div class="my-file">
                            <input type="file" @change="uploadVideoHandle">点击选择视频
                        </div>
                    </el-row>
                    <el-row>
                        <el-button type="primary" @click.native="videoBtnEven">上传视频</el-button>
                    </el-row>
                    <el-row>
                        <el-progress :percentage="uploadVideoRate" v-show="uploadVideoRate!==0"></el-progress>
                    </el-row>
                    <el-row>
                        <span v-text="uploadVideoSpan"></span>
                    </el-row>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
    import {dateToDatetimeStr} from "../../utils/dataUtils";
    import {postRequest, uploadFileRequest} from "../../utils/http";
    import {Message} from "element-ui";

    export default {
        name: "uploadVideo",
        data() {
            return {
                uploadVideoRate: 0,
                uploadPostRate: 0,
                uploadVideoSpan: "",
                uploadPostSpan: "",
                uploadPostFile: null,
                uploadVideoFile: null,
                userId: this.$store.getters.userId,
                username: this.$store.getters.userName,
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
                videoInfo: {
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
                uploadVideoInfoDTO: null,
                uploadPostInfoDTO: null
            }
        },
        methods: {
            uploadPost(event) {
                // 文件数组
                const files = event.target.files;
                const uploadFile = files[0];
                const postType = uploadFile.name.toString().substring(uploadFile.name.toString().lastIndexOf('.') + 1);
                if (postType !== "jpg") {
                    Message.error("暂时只支持jpg格式的视频海报，请重新选择");
                } else {
                    if (this.videoInfo.videoAlbumName) {
                        if (uploadFile) {
                            this.uploadPostSpan = uploadFile.name;
                            let formData = new FormData();
                            formData.append('postFile', files[0]);
                            this.uploadPostFile = formData;
                            this.uploadPostInfoDTO = {
                                userId: this.$store.getters.userId,
                                videoAlbumName: this.videoInfo.videoAlbumName
                            }
                        }
                    } else {
                        Message.error("上传视频海报需要填写视频专辑名");
                    }
                }
            },
            uploadVideoHandle(event) {
                // 文件数组
                const files = event.target.files;
                const uploadFile = files[0];
                const postType = uploadFile.name.toString().substring(uploadFile.name.toString().lastIndexOf('.') + 1);
                console.log(postType);
                const videoType = "mp4,avi,mpg,wmv,3gp,mov,asf,flv,mkv,rmvb,wmv9";
                if (!videoType.includes(postType)) {
                    Message.error("请上传正确的视频格式文件");
                } else {
                    if (this.videoInfo.videoAlbumName) {
                        if (uploadFile) {
                            this.uploadVideoSpan = uploadFile.name;
                            let formData = new FormData();
                            formData.append('videoFile', files[0]);
                            this.uploadVideoFile = formData;
                            const username = this.$store.getters.userName;
                            const time = dateToDatetimeStr(new Date());
                            const time2 = this.videoInfo.videoReleaseDate;
                            const userId = this.$store.getters.userId;
                            const uploadVideoInfoDTO = {
                                "userId": userId,
                                "videoName": this.videoInfo.videoAlbumName + this.videoInfo.videoEpisodes,
                                "videoPath": "/" + userId + "/" + this.videoInfo.videoAlbumName + "/" + this.videoInfo.videoEpisodes + ".mp4",
                                "videoTitle": this.videoInfo.videoTitle,
                                "videoEpisodes": this.videoInfo.videoEpisodes,
                                "videoAddAt": time,
                                "videoAlbumName": this.videoInfo.videoAlbumName,
                                "videoAddUser": username,
                                "videoPostPath": "/post/" + userId + "/" + this.videoInfo.videoAlbumName + "/post.jpg",
                                "videoReleaseDate": time2.toString(),
                                "videoSummary": this.videoInfo.videoSummary,
                                "videoChannel": this.videoInfo.videoChannel,
                                "videoDirector": this.videoInfo.videoDirector,
                                "videoArea": this.videoInfo.videoArea,
                                "videoUpdateTime": this.videoInfo.videoUpdateTime,
                                "videoLastUpdate": this.videoInfo.videoLastUpdate,
                                "videoActor": this.videoInfo.videoActor
                            };
                            this.uploadVideoInfoDTO = uploadVideoInfoDTO;
                            // uploadFileRequest("/file/upload", formData, uploadVideoInfoDTO);
                        }
                    } else {
                        Message.error("请填写上传信息");
                    }
                }
            },
            postBtnEven() {
                if (this.uploadPostInfoDTO) {
                    let vm = this;
                    // console.log(this.uploadPostInfoDTO);
                    const progressRate = function (e) {
                        console.log(e);
                        //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
                        //如果lengthComputable为false，就获取不到e.total和e.loaded
                        if (e.lengthComputable) {
                            const rate = (e.loaded / e.total) * 100;  //已上传的比例
                            // if (rate < 1) {
                            //这里的进度只能表明文件已经上传到后台，但是后台有没有处理完还不知道
                            //因此不能直接显示为100%，不然用户会误以为已经上传完毕，关掉浏览器的话就可能导致上传失败
                            //等响应回来时，再将进度设为100%
                            vm.uploadPostRate = parseInt(rate);
                            // }
                        }

                    };
                    uploadFileRequest("/file/post", this.uploadPostFile, this.uploadPostInfoDTO).then(flag => {
                        if (flag === true) {
                            vm.uploadPostRate = 100;
                            Message.success("上传海报完成");
                            this.uploadVideoFile = null;
                            this.uploadVideoSpan = "";
                            setTimeout(vm.uploadPostRate = 0, 3000);
                        }
                    });
                } else {
                    Message.error("请选择海报")
                }
            },
            videoBtnEven() {
                let vm = this;
                const progressRate = function (e) {
                    console.log(e);
                    //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
                    //如果lengthComputable为false，就获取不到e.total和e.loaded
                    if (e.lengthComputable) {
                        const rate = (e.loaded / e.total) * 100;  //已上传的比例
                        // 这里的进度只能表明文件已经上传到后台，但是后台有没有处理完还不知道
                        // if (rate < 1) {
                        // 因此不能直接显示为100%，不然用户会误以为已经上传完毕，关掉浏览器的话就可能导致上传失败
                        // 等响应回来时，再将进度设为100%
                        vm.uploadVideoRate = parseInt(rate);
                        // }
                    }

                };
                uploadFileRequest("/file/video", this.uploadVideoFile, this.uploadVideoInfoDTO, progressRate).then(flag => {
                    if (flag === true) {
                        vm.uploadVideoRate = 100;
                        Message.success("上传视频完成");
                        this.uploadVideoFile = null;
                        this.uploadVideoSpan = "";
                        setTimeout(vm.uploadVideoRate = 0, 3000);
                    }
                });
            }
        },
    }
</script>

<style scoped>
    .my-upload {
        padding: 4px 10px;
        height: 20px;
        line-height: 20px;
        position: relative;
        cursor: pointer;
        color: #888;
        background: #fafafa;
        border: 1px solid #ddd;
        border-radius: 4px;
        overflow: hidden;
        display: inline-block;
        *display: inline;
        *zoom: 1
    }

    .my-upload input {
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
        filter: alpha(opacity=0);
        cursor: pointer
    }

    .my-upload:hover {
        color: #444;
        background: #eee;
        border-color: #ccc;
        text-decoration: none
    }

    .my-file {
        position: relative;
        display: inline-block;
        background: #D0EEFF;
        border: 1px solid #99D3F5;
        border-radius: 4px;
        padding: 4px 12px;
        overflow: hidden;
        color: #1E88C7;
        text-decoration: none;
        text-indent: 0;
        line-height: 20px;
    }

    .my-file input {
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
    }

    .my-file:hover {
        background: #AADFFD;
        border-color: #78C3F3;
        color: #004974;
        text-decoration: none;
    }
</style>