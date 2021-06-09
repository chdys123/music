<template>
    <div id="songdetailCon">
        <div id="songdetailCon-l">
            <div id="sdc-l-t">
                <div id="sdc-l-t-l"><img :src="songData.songs[0].al.picUrl" alt=""></div>
                <div id="sdc-l-t-r">
                    <div id="sdc-l-t-r-1">
                        <div id="sdc-l-t-r-1-l">{{isVipsong}}</div>
                        <div id="sdc-l-t-r-1-r">
                            <span>
                                {{songData.songs[0].name}}
                                <span v-show="songData.songs[0].mv!=0"></span>
                            </span>
                        </div>
                        <br style="clear:both">
                    </div>
                    <div id="sdc-l-t-r-2">
                        歌手：
                        <span v-for="(item,index) in songData.songs[0].ar">
                            <span v-if="index>0" class="xiegang">/</span>
                            <span @click="toAr(item.id)" class="sdetailar">{{item.name}}</span>
                        </span>
                    </div>
                    <div id="sdc-l-t-r-3">
                        所属专辑：<span @click="toAl(songData.songs[0].al.id)">{{songData.songs[0].al.name}}</span>
                    </div>
                    <div id="sdc-l-t-r-4">
                        <span @click="playMusic(this.songId)">播放</span>
                        <span @click="addMusic(this.songId)"></span>
                        <span>收藏</span>
                        <span>分享</span>
                        <span>下载</span>
                        <span>12345</span>
                    </div>
                    <div id="sdc-l-t-r-5" :class="{'isClose':!isClose}">
                        {{lyric}}
                    </div>
                    <div id="sdc-l-t-r-6" v-if="this.lyric.length==0">纯音乐 无歌词</div>
                    <p class='sdisclose' @click="isClosefunc()" id="sdisclose" v-if="this.lyric.length!=0">{{isOpen()}}
                    </p>


                </div>
                <br style="clear:both">
            </div>



            <div class="sdc-cty">
                <div class="sdc-cty-t">评论
                    <span>共{{allComments.total}}条评论</span>
                </div>
                <div class="sdc-cty-m">
                    <img src="http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50" alt="">
                    <textarea placeholder="评论"></textarea>
                    <button>评论</button>
                </div>
                <!-- 精彩评论 -->
                <div class="sdc-cty-g-body-titile" v-if="this.currentPage==1">
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
                        <span>总页数：{{Math.ceil(this.allComments.total/20)}}</span>
                        <span>跳转到：<input type="text" @keydown="jumpPage($event)"
                                oninput="value=value.replace(/[^\d]/g,'')" />页</span>
                    </div>
                </div>

                <br style="clear:both">

            </div>

            <br style="clear:both">
        </div>
        <div id="songdetailCon-r">
            <div id="sdc-r-simi-pl-title" v-if="playlists.length!=0">
                包含这首歌曲的歌单
            </div>
            <div id="sdc-r-simi-pl-body" v-if="playlists.length!=0">
                <div id="sdc-r-simi-pl-body-item" v-for="item in playlists">
                    <img :src="item.coverImgUrl" alt="" :title="item.name" @click="toPlatListDetail(item.id)">
                    <div>
                        <p :title="item.name" @click="toPlatListDetail(item.id)">{{item.name}}</p>
                        <p>by <span :title="item.creator.nickname">{{item.creator.nickname}}</span></p>
                    </div>
                </div>
            </div>
            <div id="sdc-r-simi-s-title">
                相似歌曲
            </div>
            <div id="sdc-r-simi-s-body">
                <div id="sdc-r-simi-s-body-item" v-for="item in songs">
                    <p @click="toSongDetail(item.id)" :title="item.name">{{item.name}}</p>
                    <p :title="item.artists[0].name">{{item.artists[0].name}}</p>
                    <div>
                        <span @click="playMusic(item.id)" title="播放"></span>
                        <span @click="addMusic(item.id)" title="加入播放列表"></span>
                    </div>
                </div>

            </div>
        </div>

        <br style="clear:both">
    </div>
</template>

<script>
    export default {
        name: "songDetail",
        data() {
            return {
                songId: 0,
                // 歌曲详情
                songData: {
                    songs: [
                        {
                            al: {
                                picUrl: '',
                                id: "",
                                name: ''
                            },
                            name: '',
                            dt: 0,
                            ar: [
                                {
                                    id: "",
                                    name: ''
                                }
                            ],
                            mv: 0
                        },
                    ],
                    privileges: [
                        {
                            chargeInfoList: [{ chargeType: 0 }]
                        }
                    ]
                },
                // 相似歌单
                playlists: [{ coverImgUrl: '', name: '', creator: { nickname: '' } }],
                // 相似歌曲
                songs: [],


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

                // 歌词
                lyric: '',
                // 判断显示展开还是收起
                isClose: false
            }
        },
        methods: {
            // 获取歌曲详情数据
            getSongData() {
                this.axios({
                    method: "get",
                    url: '/song/detail?ids=' + this.songId
                }).then(res => {
                    this.songData = res.data

                }).catch(err => {
                    console.log("获取歌曲详情信息失败")
                })
            },
            // 获取相似歌单
            getSimiPlaylist() {
                this.axios({
                    method: "get",
                    url: '/simi/playlist?id=' + this.songId
                }).then(res => {
                    this.playlists = res.data.playlists
                }).catch(err => {
                    console.log("获取相似歌单失败")
                })
            },

            // 获取相似歌曲
            getSimiSongs() {
                this.axios({
                    method: "get",
                    url: '/simi/song?id=' + this.songId
                }).then(res => {
                    this.songs = res.data.songs
                    // console.log(this.songs)
                }).catch(err => {
                    console.log("获取相似歌曲失败")
                })
            },
            // 获取评论
            getComments(num) {
                if (num == 1) {
                    this.axios({
                        method: 'get',
                        url: '/comment/music?id=' + this.songId
                    }).then(res => {
                        this.allComments = res.data
                        this.currentPage = 1
                    }).catch(err => {
                        console.log("获取评论失败")
                    })
                } else {
                    this.axios({
                        method: 'get',
                        url: '/comment/music?id=' + this.songId + '&offset=' + (num - 1) * 20 + '&before=' + this.allComments.comments[19].time
                    }).then(res => {
                        this.allComments = res.data
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

            // 日期格式化
            contentTime(num) {
                let time = new Date(num)
                let str = time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + "日"
                return str
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
            
            
           
            // 获取歌词
            getlyric() {
                this.axios({
                    method: 'get',
                    url: '/lyric?id=' + this.songId
                }).then(res => {

                    if (res.data.nolyric) {
                        this.lyric = ''
                    } else {
                        this.lyric = res.data.lrc.lyric
                        this.chulilyric()
                    }
                }).catch(err => {
                    console.log("获取歌词失败")
                })
            },
            // 对歌词进行处理
            chulilyric() {
                this.lyric = this.lyric.replace(/\[.*?\][ ]*/g, "")
            },
            // 点击收起或者展开时执行的函数
            isClosefunc() {
                this.isClose = !this.isClose
            },
            // 显示收起或者展开
            isOpen() {
                if (!this.isClose) {
                    return '展开'
                } else {
                    return '收起'
                }
            },
            
            
        },
        computed: {
            isVipsong() {
                if (this.songData.privileges[0].chargeInfoList[0].chargeType == 0) {
                    return '单曲'
                } else {
                    return 'VIP单曲'
                }
            },
            // 总页数
            totalPage() {
                return Math.ceil(this.allComments.total / 20)
            }
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
            // 根据id获取歌曲信息
            this.getSongData()
            // 获取相似歌单
            this.getSimiPlaylist()
            // 获取相似歌曲
            this.getSimiSongs()
            // 获取评论
            this.getComments(1)
            // 获取歌词
            this.getlyric()
            
        }
    }
</script>

<style>
    #songdetailCon {
        width: 980px;
        /* height: 1200px; */
        margin: 0 auto;
        border: 1px solid #D3D3D3;
        border-top: none;
        background-color: #FFFFFF;
    }

    #songdetailCon-l {
        width: 640px;
        /* height: 1000px; */
        float: left;
        border-right: 1px solid #D3D3D3;
        padding: 47px 30px 40px 39px;

    }

    #songdetailCon-r {
        width: 200px;
        height: 100%;
        float: left;
        padding: 20px 40px 40px 30px;
    }

    #sdc-l-t {
        background-color: #FFFFFF;
    }

    #sdc-l-t-l {
        float: left;
        height: 205px;
        width: 205px;
    }

    #sdc-l-t-l img {
        width: 205px;
        height: 205px;
    }

    #sdc-l-t-r {
        float: right;
        width: 414px;
    }

    #sdc-l-t-r-1 {
        position: relative;
    }

    #sdc-l-t-r-1-l {
        float: left;
        width: 70px;
        height: 27px;
        line-height: 27px;
        color: white;
        font-size: 13px;
        text-align: left;
        background: url("https://p1.music.126.net/UPFxeFR61Kw_JzK69hIy-A==/109951164007455283.png") no-repeat -2px 2px;
        background-size: 100%;
    }

    #sdc-l-t-r-1-r {
        float: right;
        width: 330px;
        line-height: 26px;
        font-size: 20px;
        font-weight: 500;
    }

    #sdc-l-t-r-1-r span span {
        cursor: pointer;
        display: inline-block;
        vertical-align: middle;
        width: 21px;
        height: 22px;
        background-color: pink;
        background: url("https://s2.music.126.net/style/web2/img/icon.png?4f0dc585177245959cf853bf25d86a17") no-repeat 0px -17px;
    }

    #sdc-l-t-r-2,
    #sdc-l-t-r-3 {
        font-size: 12px;
        color: #999999;
        margin-top: 12px;

    }

    #sdc-l-t-r-2 span .sdetailar,
    #sdc-l-t-r-3 span {
        color: #0E75BF;
        cursor: pointer;
    }

    #sdc-l-t-r-2 span .xiegang {
        color: #999999;
    }

    #sdc-l-t-r-2 span .sdetailar:hover,
    #sdc-l-t-r-3 span:hover {
        text-decoration: underline;
    }

    /* 一排按钮 收藏分享... */
    #sdc-l-t-r-4 {
        height: 31px;
        margin-top: 12px;
        margin-bottom: 25px;
    }

    #sdc-l-t-r-4 span {
        float: left;
        line-height: 31px;
        height: 31px;
        font-size: 12px;
        cursor: pointer;
    }

    #sdc-l-t-r-4 span:nth-child(1) {
        width: 25px;
        padding-left: 35px;
        padding-right: 5px;
        background: url("https://s2.music.126.net/style/web2/img/button2.png?521a1ed38fd91718f2919dde13cb0ecf") no-repeat 0px -632px;
        color: white;
        line-height: 33px;
    }

    #sdc-l-t-r-4 span:nth-child(2) {
        width: 31px;
        background: url("https://s2.music.126.net/style/web2/img/button2.png?521a1ed38fd91718f2919dde13cb0ecf") no-repeat 0px -1587px;

    }

    #sdc-l-t-r-4 span:nth-child(3),
    #sdc-l-t-r-4 span:nth-child(4),
    #sdc-l-t-r-4 span:nth-child(5),
    #sdc-l-t-r-4 span:nth-child(6) {
        padding: 0 9px 0 24px;
        margin-left: 8px;
        font-size: 12px;
        border-left: 1px solid #C4C4C4;
        border-right: 1px solid #C4C4C4;
        border-radius: 4px;
        font-weight: 400;
        background: #C8C6C6 url("https://s2.music.126.net/style/web2/img/button2.png?521a1ed38fd91718f2919dde13cb0ecf") no-repeat;
    }

    #sdc-l-t-r-4 span:nth-child(3) {
        background-position: -2px -1062px;
    }

    #sdc-l-t-r-4 span:nth-child(4) {
        background-position: -2px -1267px;
    }

    #sdc-l-t-r-4 span:nth-child(5) {
        background-position: -2px -2760px;
    }

    #sdc-l-t-r-4 span:nth-child(6) {
        background-position: -2px -1507px;
    }




    #sdc-l-t-r-5 {
        /* background-color: gray; */
        white-space: pre-wrap;
        /* height: 312px; */
        font-size: 12px;
        line-height: 24px;
        overflow: hidden;
        /* text-overflow: ellipsis; */


    }

    #sdc-l-t-r-6 {
        font-size: 12px;
        line-height: 24px;
        color: #666666;
    }

    .isClose {
        display: -webkit-box;
        -webkit-line-clamp: 13;
        -webkit-box-orient: vertical;
    }

    .sdisclose {
        font-size: 12px;
        cursor: pointer;
        color: #0C73CE;
    }

    .sdisclose:hover {
        text-decoration: underline;
    }


    #sdc-r-simi-pl-title,
    #sdc-r-simi-s-title {
        height: 24px;
        font-size: 12px;
        font-weight: 700;
        border-bottom: 1px solid #CCCCCC;
        margin-bottom: 20px;
    }

    #sdc-r-simi-pl-body {
        margin-bottom: 50px;
    }

    #sdc-r-simi-pl-body-item {
        height: 50px;
        margin: 15px 0;
    }

    #sdc-r-simi-pl-body-item img {
        float: left;
        width: 50px;
        height: 50px;
    }

    #sdc-r-simi-pl-body-item div {
        width: 150px;
        height: 50px;
        float: left;
    }

    #sdc-r-simi-pl-body-item div p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 14px;
        cursor: pointer;
        padding: 5px 0px 5px 5px;
    }

    #sdc-r-simi-pl-body-item div p:nth-child(1):hover {
        text-decoration: underline;
    }

    #sdc-r-simi-pl-body-item div p:nth-child(2) {
        font-size: 12px;
        color: #999B99;
    }

    #sdc-r-simi-pl-body-item div p:nth-child(2) span {
        color: #666666;
    }

    #sdc-r-simi-pl-body-item div p:nth-child(2) span:hover {
        text-decoration: underline;
    }



    #sdc-r-simi-s-body-item {
        position: relative;
        height: 32px;
        margin-top: 10px;
        font-size: 12px;

    }

    #sdc-r-simi-s-body-item p {
        float: left;
        width: 160px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
    }

    #sdc-r-simi-s-body-item p:hover {
        text-decoration: underline;
    }

    #sdc-r-simi-s-body-item p:nth-child(2) {
        color: #999B99;
    }

    #sdc-r-simi-s-body-item div {
        position: absolute;
        top: 0px;
        right: 0px;
        width: 40px;
        height: 32px;
    }

    #sdc-r-simi-s-body-item div span {
        cursor: pointer;
        display: inline-block;
        width: 10px;
        height: 11px;
        margin-top: 11px;
        margin-left: 7px;
        background: url("https://s2.music.126.net/style/web2/img/icon2.png?f38e594a8c38f6bcee017b1f45290e10") no-repeat 0px 0px;
    }

    #sdc-r-simi-s-body-item div span:nth-child(1) {
        background-position: -69px -455px;
    }

    #sdc-r-simi-s-body-item div span:nth-child(2) {
        background-position: -87px -454px;
    }

    /* 评论样式 */
</style>