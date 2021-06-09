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
                            <span v-for="item in albumData.album.artists" @click="toAr(item.id)">
                                {{item.name}}&nbsp;
                            </span>
                        </p>
                        <p>
                            发行时间：{{getPulishTime(albumData.album.publishTime)}}
                        </p>
                        <p v-if="albumData.album.company==''">
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
                                <!-- 播放按钮 -->
                                <span>{{index+1}} <span class="playLogo" title="播放" @click="playMusic(item.id)"></span></span>
                                <!-- 歌曲标题 和mv图标 -->
                                <span>
                                    <span :title="item.name" @click="toSongDetail(item.id)">{{item.name}}</span>
                                    <span class="mvLogo" v-if="item.mv!=0" title="播放mv" @click="toMv(item.mv)"></span>
                                </span>

                                <span>
                                    <!-- 歌曲时间 -->
                                    <span class="a-h-w-dt">{{this.getDt(item.dt)}}</span>
                                    <!-- 各种功能 -->
                                    <span class="a-h-w-func">
                                        <span title="添加到播放列表" class="addSongLogo" @click="addMusic(item.id)"></span>
                                        <span title="收藏" class="collectLogo"></span>
                                        <span title="分享" class="shareLogo"></span>
                                        <span title="下载" class="downloadLogo"></span>
                                        <br style="clear: both;">
                                    </span>
                                </span>
                                <!-- 歌手 -->
                                <span :title="item.ar[0].name" @click="toAr(item.ar[0].id)">{{item.ar[0].name}}</span>
                                <br style="clear:both">
                            </div>
                        </div>
                    </div>
                    <!-- 歌曲列表end -->

                </div>

                <!-- 评论模块 -->
                <!-- 评论 -->
                <div class="sdc-cty-t">评论
                    <span>共{{allComments.total}}条评论</span>
                </div>
                <div class="sdc-cty-m">
                    <img src="http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50" alt="">
                    <textarea placeholder="评论"></textarea>
                    <button>评论</button>
                </div>
                <!-- 精彩评论 -->
                <div class="sdc-cty-g-body-titile" v-if="allComments.hotComments!='' ">
                    精彩评论
                </div>
                <div class="sdc-cty-g-body-item" v-for="item in allComments.hotComments">
                    <img :src="item.user.avatarUrl" alt="">
                    <div class="sdc-cty-g-b-i-b">
                        <a>{{item.user.nickname}}</a> ：{{item.content}}
                        <p v-if="item.beReplied.length!=0">
                            <a>{{item.beReplied[0].user.nickname}}</a> ： {{item.beReplied[0].content}}
                            <br style="clear:both">
                        </p>
                        <div>
                            <span>{{contentTime(item.time)}}</span>
                            <span>回复</span>
                            <span><span :class="{'content-like':item.liked==false,'content-liked':item.liked==true}">
                                </span> ({{item.likedCount}})</span>
                            <br style="clear:both">

                        </div>
                    </div>

                    <br style="clear:both">
                </div>
                <!-- 最新评论 -->
                <div class="sdc-cty-n-body-titile" v-if="this.currentPage==1">
                    最新评论({{allComments.total}})
                </div>
                <div class="sdc-cty-g-body-item" v-for="item in allComments.comments">
                    <img :src="item.user.avatarUrl" alt="">
                    <div class="sdc-cty-g-b-i-b">
                        <a>{{item.user.nickname}}</a> ：{{item.content}}
                        <p v-if="item.beReplied.length!=0">
                            <a>{{item.beReplied[0].user.nickname}}</a> ： {{item.beReplied[0].content}}
                            <br style="clear:both">
                        </p>
                        <div>
                            <span>{{contentTime(item.time)}}</span>
                            <span>回复</span>
                            <span><span :class="{'content-like':item.liked==false,'content-liked':item.liked==true}">
                                </span> ({{item.likedCount}})</span>
                            <br style="clear:both">

                        </div>
                    </div>
                    <br style="clear:both">
                </div>
                <!-- 分页 -->
                <div class="f-page">
                    <div class="f-page-c">

                        <a @click="toFirstPage()" :class="{'disable':this.currentPage==1}">首页</a>
                        <a @click="toPrePage()" :class="{'disable':this.currentPage==1}">&lt;上一页</a>
                        <a @click="toNextPage()"
                            :class="{'disable':this.currentPage==this.totalPage||this.totalPage==1}">下一页&gt;</a>
                        <a @click="toTailPage()"
                            :class="{'disable':this.currentPage==this.totalPage||this.totalPage==1}">尾页</a>
                        <span>当前页：{{this.currentPage}}</span>
                        <span>总页数：{{totalPage}}</span>
                        <span>跳转到：<input type="text" @keydown="jumpPage($event)"
                                oninput="value=value.replace(/[^\d]/g,'')" />页</span>
                    </div>
                </div>
                <!-- 分页结束 -->

            </div>
            <div class="con-r">
                <!-- 右侧其他专辑 -->
                <h5 id="al-r-t">ta的其他热门专辑</h5>
                <div class="al-r-item" v-for="item in albums">
                    <img :src="item.picUrl+'?param=50y50'" alt="" @click="toAl(item.id)" :title="item.name">
                    <div>
                        <p class="ellipsis al-name" :title="item.name" @click="toAl(item.id)">{{item.name}}</p>
                        <p class="al-pt">{{getPulishTime(item.publishTime)}}</p>
                    </div>
                    <br style="clear:both;">

                </div>

            </div>
            <br style="clear:both">
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
                // 评论
                allComments: {
                    // 热门评论
                    hotComments: [
                        {
                            user: { avatarUrl: '' },
                            beReplied: [{ user: { nickname: '', userId: '' }, content: '' }]
                        }
                    ],
                    // 最新评论
                    comments: [
                        {
                            user: { userId: '', nickname: '', avatarUrl: '' },
                            commentId: '',
                            comment: '',
                            time: '',
                            likedCount: '',
                            liked: false,
                            beReplied: [{ user: { nickname: '', userId: '' }, content: '' }],
                        }
                    ],
                    // 评论总数
                    total: '',
                    more: true
                },
                // 当前页数
                currentPage: 1,


            }
        },
        computed: {
            // 总页数
            totalPage() {
                return Math.ceil(this.allComments.total / 20)
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
            getotherAl() {
                this.axios({
                    method: 'get',
                    url: '/artist/album?limit=6&id=' + this.albumData.album.artists[0].id
                }).then(res => {
                    for (let i = 0; i < res.data.hotAlbums.length; i++) {
                        if (res.data.hotAlbums[i].id != this.albumId) {
                            this.albums.push(res.data.hotAlbums[i])
                        }
                    }
                    if (this.albums.length > 5) {
                        this.albums.pop()
                    }
                }).catch(err => {
                    console.log("获取其他专辑失败")
                })
            },



            // 获取评论信息
            getComments(num) {
                if (num == 1) {
                    this.axios({
                        method: 'get',
                        url: '/comment/album?id=' + this.albumId
                    }).then(res => {
                        this.allComments = res.data
                        // console.log(res.data)
                        this.currentPage = 1
                    }).catch(err => {
                        console.log("获取评论失败")
                    })
                } else {
                    this.axios({
                        method: 'get',
                        url: '/comment/album?id=' + this.albumId + '&offset=' + (num - 1) * 20
                            + '&before=' + this.allComments.comments[19].time
                    }).then(res => {
                        this.allComments = res.data
                        // console.log(res.data)
                        this.currentPage = num
                    }).catch(err => {
                        console.log("获取评论失败")
                    })
                }
            },

            // 前一页
            toPrePage() {
                console.log("点击了前一页")
                this.currentPage -= 1
                this.getComments(this.currentPage)
            },
            toNextPage() {

                console.log("点击了后一页")
                this.currentPage += 1
                this.getComments(this.currentPage)
            },
            toFirstPage() {
                console.log("点击了首页")
                this.getComments(1)

            },
            toTailPage() {
                console.log("点击了尾页")
                this.getComments(this.totalPage)
            },
            //跳转页面
            jumpPage(e) {
                if (e.keyCode == 13) {
                    let num = parseInt(e.target.value)
                    e.target.value = ''
                    if (num == this.currentPage) {
                        return
                    } else if (num >= this.totalPage) {
                        this.getComments(this.totalPage)
                    } else if (num <= 1) {
                        this.getComments(1)
                    } else {
                        this.getComments(num)
                    }
                }
            },
            // 日期格式化
            contentTime(num) {
                let time = new Date(num)
                let str = time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + "日"
                return str
            },



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
            // 获取评论
            this.getComments(1)


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
        width: 410px;
        /* background-color: pink; */
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


        word-wrap: break-word;
        word-break: break-all;

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
        /* height: 300px; */
        border-top: 2px solid #C20C0C;
        margin-top: 6px;
    }

    /* 歌曲列表 表头样式 */
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

    /* 表头end */


    #al-s-b-b {
        border-bottom: 1px solid #D8D8D8;
    }

    /* 右侧其他热门专辑 */
    #al-r-t {
        border-bottom: 1px solid #CCCCCC;
        padding-bottom: 10px;
        margin-bottom: 20px;
    }

    .al-r-item {
        margin-bottom: 15px;
    }

    .al-r-item img,
    .al-r-item div {
        float: left;
    }

    .al-r-item div p {
        padding-left: 10px;
        margin-bottom: 10px;
    }

    .al-r-item div p:nth-child(1) {
        font-size: 14px;
        cursor: pointer;
        width: 140px;
    }

    .al-r-item div p:nth-child(1):hover {
        text-decoration: underline;

    }

    .al-r-item div p:nth-child(2) {
        font-size: 12px;
        color: #666666;
    }
</style>