<template>
    <div>
        <div class="con">
            <div class="con-l">
                <div id="al-l-t">
                    <img :src="albumData.album.picUrl+'?param=177y177'" alt="">
                    <div id="al-l-t-r">
                        <p><span class="albumLogo"></span>{{albumData.album.name}}</p>
                        <p>
                            歌手：
                            <span v-for="item in albumData.album.artists">
                                {{item.name}}
                            </span>
                        </p>
                        <p>
                            发行时间：{{getPulishTime(albumData.album.publishTime)}}
                        </p>
                        <p>
                            发行公司：{{albumData.album.company}}
                        </p>
                        <div id="al-l-t-r-btn">
                            <span>播放</span>
                            <span></span>
                            <span>收藏</span>
                            <span>({{albumData.album.info.shareCount}})</span>
                            <span>下载</span>
                            <span>({{albumData.album.info.commentCount}})</span>
                        </div>
                    </div>
                    <br style="clear: both;">
                </div>
                <!-- 专辑介绍 -->
                <div id="al-desc">
                    <h5 v-if="albumData.album.description!=null">专辑介绍:</h5>
                    <p>{{albumData.album.description}}</p>
                </div>
                <!-- 包含歌曲列表 -->
                <div id="al-song">
                    <span>包含歌曲列表</span>
                    <span>
                        {{albumData.album.size}}首歌
                    </span>
                    <div id="al-song-body">
                        <!-- 表头 -->
                        <div id="al-s-b-h">
                            <span></span>
                            <span>歌曲标题</span>
                            <span>时长</span>
                            <span>歌手</span>
                            <br style="clear: both;">
                        </div>

                        <!-- 歌曲列表 -->
                        <div id="al-s-b-b">
                            <div class="a-h-w-b-item" v-for="(item,index) in albumData.songs">
                                <span>{{index+1}} <span class="playLogo"></span></span>
                                <span :title="item.name">
                                    {{item.name}}
                                    <span class="mvLogo" v-if="item.mv!=0" title="播放mv"></span>
                                </span>
                                <span>
                                    <span class="a-h-w-dt">{{this.getDt(item.dt)}}</span>
                                    <span class="a-h-w-func">
                                        <span title="添加到播放列表" class="addSongLogo"></span>
                                        <span title="收藏" class="collectLogo"></span>
                                        <span title="分享" class="shareLogo"></span>
                                        <span title="下载" class="downloadLogo"></span>
                                        <br style="clear: both;">
                                    </span>
                                </span>
                                <span :title="item.ar[0].name">{{item.ar[0].name}}</span>
                                <br style="clear:both">
                            </div>
                        </div>

                    </div>
                </div>
                <!-- 评论模块 -->



            </div>
            <div class="con-r">

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'aldetail',
        data() {
            return {
                albumId: '',
                albumData: {
                    songs: [],
                    album: {
                        publishTime: '',
                        company: '',
                        artists: [
                            {
                                id: '',
                                name: ''
                            }
                        ],
                        picUrl: '',
                        description: '',
                        name: '',
                        size: 0,
                        info: {
                            liked: '',
                            commentCount: 0,
                            shareCount: 0
                        }
                    }
                },
                // 专辑信息
                albums: [],


            }
        },
        methods: {
            // 获取专辑id
            getAlbumId() {
                this.albumId = this.$route.query.id
            },
            // 获取专辑信息
            getAlbumData() {
                this.axios({
                    method: 'get',
                    url: '/album?id=' + this.albumId
                }).then(res => {
                    this.albumData = res.data
                    this.getotherAl()
                }).catch(err => {
                    console.log("获取专辑信息失败")
                })
            },

            // 获取歌手其他热门专辑
            getotherAl(){
                this.axios({
                    method:'get',
                    url: '/artist/album?limit=6&id=' + this.albumData.album.artists[0].id
                }).then(res=>{
                    console.log(res.data.hotAlbums)
                    for(let i=0;i<res.data.hotAlbums.length;i++){
                        if(res.data.hotAlbums[i].id!=this.albumData.album.artists[0].id){
                            this.albums.push(res.data.hotAlbums[i])
                        }
                    }
                    if(this.albums.length>5){
                        this.albums.pop()
                    }
                    console.log(this.albums)
                }).catch(err=>{
                    console.log("获取其他专辑失败")
                })
            },
            


            // 获取评论信息


            // 专辑出版日期格式化
            getPulishTime(num) {
                let time = new Date(num)
                let str = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + " "
                return str
            },
            // 格式化歌曲时长
            getDt(num) {
                let a = Math.floor(num / 1000)//总秒数
                let b = Math.floor(a / 60)//分钟数
                let c = a % 60//秒数
                let str1, str2
                if (b < 10 && b > 0) {
                    str1 = '0' + b
                } else if (b == 0) {
                    str1 = '00'
                } else {
                    str1 = b
                }
                if (c == 0) {
                    str2 = '00'
                } else if (c < 10) {
                    str2 = '0' + c
                } else {
                    str2 = c
                }
                return str1 + ':' + str2
            },



        },
        created() {
            window.scrollTo(0, 0)
            //获取歌曲id
            this.songId = parseInt(this.$route.query.id)
            //去掉header的背景
            let li = document.getElementById("discoverlittleList").childNodes
            for (let i = 0; i < li.length; i++) {
                li[i].setAttribute("class", '')
            }
            // 获取专辑id
            this.getAlbumId()
            // 获取专辑信息
            this.getAlbumData()


        },
    }
</script>

<style>
    #al-l-t img,
    #al-l-t-r {
        float: left;
    }

    #al-l-t-r {
        margin-left: 50px;
    }

    #al-l-t-r p {
        font-size: 12px;
        margin-bottom: 10px;
        color: #6B7283;
    }

    #al-l-t-r p:nth-child(1) {
        font-size: 20px;
        color: #000000;
    }

    #al-l-t-r p:nth-child(2) span {
        cursor: pointer;
        color: #0C73C2;
    }

    #al-l-t-r p:nth-child(2) span:hover {
        text-decoration: underline;
    }

    /* 一排按钮 收藏 分享... */
    /* 一排按钮 收藏分享... */
    #al-l-t-r-btn {
        height: 31px;
        margin-top: 12px;
        margin-bottom: 25px;
        /* background-color: #fff; */
    }

    #al-l-t-r-btn span {
        float: left;
        line-height: 31px;
        height: 31px;
        font-size: 12px;
        cursor: pointer;
    }

    #al-l-t-r-btn span:nth-child(1) {
        width: 25px;
        padding-left: 35px;
        padding-right: 5px;
        background: url("https://s2.music.126.net/style/web2/img/button2.png?521a1ed38fd91718f2919dde13cb0ecf") no-repeat 0px -632px;
        color: white;
        line-height: 33px;
    }

    #al-l-t-r-btn span:nth-child(2) {
        width: 31px;
        background: url("https://s2.music.126.net/style/web2/img/button2.png?521a1ed38fd91718f2919dde13cb0ecf") no-repeat 0px -1587px;

    }

    #al-l-t-r-btn span:nth-child(3),
    #al-l-t-r-btn span:nth-child(4),
    #al-l-t-r-btn span:nth-child(5),
    #al-l-t-r-btn span:nth-child(6) {
        padding: 0 9px 0 24px;
        margin-left: 8px;
        font-size: 12px;
        border-left: 1px solid #C4C4C4;
        border-right: 1px solid #C4C4C4;
        border-radius: 4px;
        font-weight: 400;
        background: #C8C6C6 url("https://s2.music.126.net/style/web2/img/button2.png?521a1ed38fd91718f2919dde13cb0ecf") no-repeat;
    }

    #al-l-t-r-btn span:nth-child(3) {
        background-position: -2px -1062px;
    }

    #al-l-t-r-btn span:nth-child(4) {
        background-position: -2px -1267px;
    }

    #al-l-t-r-btn span:nth-child(5) {
        background-position: -2px -2760px;
    }

    #al-l-t-r-btn span:nth-child(6) {
        background-position: -2px -1507px;
    }

    /* 专辑介绍 */
    #al-desc {
        margin-top: 30px;
    }

    #al-desc p {
        margin-top: 20px;
        white-space: pre-wrap;
        font-size: 12px;
        padding-left: 30px;
        line-height: 20px;
        color: #666;
    }

    /* 包含歌曲列表 */
    #al-song {
        margin-top: 20px;
    }

    #al-song>span:nth-child(1) {
        font-size: 20px;
    }

    #al-song>span:nth-child(2) {
        margin-left: 20px;
        font-size: 12px;
        color: #666;
    }

    #al-song-body {
        height: 300px;
        border-top: 2px solid #C20C0C;
        margin-top: 6px;
    }

    #al-s-b-h span {
        padding: 8px 10px;
        height: 18px;
        float: left;
        background-color: #F5F5F5;
        border-bottom: 2px solid #D8D8D8;


    }

    #al-s-b-h span:nth-child(1) {
        width: 73px;
        border-left: 1px solid #D8D8D8;
    }

    #al-s-b-h span:nth-child(2) {
        width: 277px;
        border-left: 1px solid #D8D8D8;


    }

    #al-s-b-h span:nth-child(3) {
        text-align: center;
        width: 99px;
        border-left: 1px solid #D8D8D8;

    }

    #al-s-b-h span:nth-child(4) {
        width: 106px;
        border-left: 1px solid #D8D8D8;
        border-right: 1px solid #D8D8D8;

    }

    #al-s-b-b {
        border-bottom: 1px solid #D8D8D8;
    }
</style>