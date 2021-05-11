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
                            <span @click="toArtist(item.id)">{{item.name}}</span> /
                        </span>
                    </div>
                    <div id="sdc-l-t-r-3">
                        所属专辑：<span>{{songData.songs[0].al.name}}</span>
                    </div>
                    <div id="sdc-l-t-r-4">
                        <span @click="musicPlay()">播放</span>
                        <span @click="addQueue()"></span>
                        <span>收藏</span>
                        <span>分享</span>
                        <span>下载</span>
                        <span>12345</span>
                    </div>
                    <div id="sdc-l-t-r-5">
                        歌词部分
                    </div>
                </div>
                <br style="clear:both">
            </div>

            <div id="sdc-cty">
                <div id="sdc-cty-t">评论
                    <span>共{{allComments.total}}条评论</span>
                </div>
                <div id="sdc-cty-m">
                    <img src="http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50" alt="">
                    <textarea placeholder="评论"></textarea>
                    <button>评论</button>
                </div>
                <!-- 精彩评论 -->
                <div id="sdc-cty-g-body-titile" v-if="this.currentPage==1">
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
                <div id="sdc-cty-n-body-titile" v-if="this.currentPage==1">
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
            <div id="sdc-r-simi-pl-title">
                包含这首歌曲的歌单
            </div>
            <div id="sdc-r-simi-pl-body">
                <div id="sdc-r-simi-pl-body-item" v-for="item in playlists">
                    <img :src="item.coverImgUrl" alt="">
                    <div>
                        <p>{{item.name}}</p>
                        <p>by <span>{{item.creator.nickname}}</span></p>
                    </div>
                </div>
            </div>
            <div id="sdc-r-simi-s-title">
                相似歌曲
            </div>
            <div id="sdc-r-simi-s-body">
                <div id="sdc-r-simi-s-body-item" v-for="item in songs">
                    <p @click="toSongDetail(item.id)">{{item.name}}</p>
                    <p>{{item.artists[0].name}}</p>
                    <div>
                        <span @click="musicPlay2(item)"></span>
                        <span @click="addQueue2(item)"></span>
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
            // 点击播放按钮
            musicPlay() {
                console.log("点击了播放")
                let songname = this.songData.songs[0].name
                let songId = this.songId
                let arname = []
                let arid = []
                for (let i = 0; i < this.songData.songs[0].ar.length; i++) {
                    arname.push(this.songData.songs[0].ar[i].name)
                    arid.push(this.songData.songs[0].ar[i].id)
                }
                let time = this.songData.songs[0].dt
                let imgsrc = this.songData.songs[0].al.picUrl + '?param=34y34'
                let src = 'https://music.163.com/song/media/outer/url?id=' + this.songId + '.mp3'

                // 创建歌曲信息对象
                let song = {
                    songname: songname,
                    songid: songId,
                    arname: arname,
                    arid: arid,
                    time: time,
                    imgsrc: imgsrc,
                    src: src
                }
                // 放进本地存储
                this.addSong(song)
            },
            // 点击播放按钮
            musicPlay2(item) {
                // console.log("点击了")
                // 歌曲名
                let songname = item.name
                // 歌曲id
                let songid = item.id
                // 可能有多个歌手
                // 歌手名
                let arname = []
                // 歌手id
                let arid = []
                for (let i = 0; i < item.artists.length; i++) {
                    arname.push(item.artists[i].name)
                    arid.push(item.artists[i].id)
                }
                // 歌曲时长
                let time = item.bMusic.playTime
                // 歌曲图片
                let imgsrc = item.album.picUrl + '?param=34y34'
                // 歌曲地址
                let src = 'https://music.163.com/song/media/outer/url?id=' + item.id + '.mp3'

                // 创建歌曲信息对象
                let song = {
                    songname: songname,
                    songid: songid,
                    arname: arname,
                    arid: arid,
                    time: time,
                    imgsrc: imgsrc,
                    src: src
                }
                // 放进本地存储
                this.addSong(song)
            },
            // 点击加入播放列表按钮
            addQueue(){
                console.log("点击了加入播放列表按钮")
                let songname = this.songData.songs[0].name
                let songId = this.songId
                let arname = []
                let arid = []
                for (let i = 0; i < this.songData.songs[0].ar.length; i++) {
                    arname.push(this.songData.songs[0].ar[i].name)
                    arid.push(this.songData.songs[0].ar[i].id)
                }
                let time = this.songData.songs[0].dt
                let imgsrc = this.songData.songs[0].al.picUrl + '?param=34y34'
                let src = 'https://music.163.com/song/media/outer/url?id=' + this.songId + '.mp3'

                // 创建歌曲信息对象
                let song = {
                    songname: songname,
                    songid: songId,
                    arname: arname,
                    arid: arid,
                    time: time,
                    imgsrc: imgsrc,
                    src: src
                }
                // 放进本地存储
                this.addtoQueue(song)

            },
            // 加入播放按钮2
            addQueue2(item){
                console.log("点击了添加按钮")
                // 歌曲名
                let songname = item.name
                // 歌曲id
                let songid = item.id
                // 可能有多个歌手
                // 歌手名
                let arname = []
                // 歌手id
                let arid = []
                for (let i = 0; i < item.artists.length; i++) {
                    arname.push(item.artists[i].name)
                    arid.push(item.artists[i].id)
                }
                // 歌曲时长
                let time = item.bMusic.playTime
                // 歌曲图片
                let imgsrc = item.album.picUrl + '?param=34y34'
                // 歌曲地址
                let src = 'https://music.163.com/song/media/outer/url?id=' + item.id + '.mp3'

                // 创建歌曲信息对象
                let song = {
                    songname: songname,
                    songid: songid,
                    arname: arname,
                    arid: arid,
                    time: time,
                    imgsrc: imgsrc,
                    src: src
                }
                // 放进本地存储
                this.addtoQueue(song)

            },
            // 进入歌曲详情
            toSongDetail(id){
                this.$router.push({path:'/discover/song',query:{id:id}})
            },
            // 进入歌手详情
            toArtist(id){
                // console.log("点击了歌手",id)
                this.$router.push({path:'/discover/artist',query:{id:id}})
            }
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
            // console.log("hello")

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
        /* background-color: pink; */

    }

    #songdetailCon-r {
        width: 200px;
        height: 100%;
        float: left;
        padding: 20px 40px 40px 30px;
        /* background-color: yellow; */
    }

    #sdc-l-t {
        /* height: 594px; */
        background-color: #FFFFFF;
    }

    #sdc-l-t-l {
        float: left;
        height: 205px;
        width: 205px;
        /* background-color: red; */
    }

    #sdc-l-t-l img {
        width: 205px;
        height: 205px;
    }

    #sdc-l-t-r {
        float: right;
        width: 414px;
        /* height: 486px; */
        /* background-color: green; */
    }

    #sdc-l-t-r-1 {
        /* height: 31px; */
        position: relative;
        /* background-color: #fff; */
    }

    #sdc-l-t-r-1-l {
        float: left;
        width: 70px;
        height: 27px;
        line-height: 27px;
        /* background-color: pink; */
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
        /* background-color: blue; */
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
        /* background-color: #fff; */

    }

    #sdc-l-t-r-2 span span,
    #sdc-l-t-r-3 span {
        color: #0E75BF;
        cursor: pointer;
    }

    #sdc-l-t-r-2 span span:hover,
    #sdc-l-t-r-3 span:hover {
        text-decoration: underline;
    }

    /* 一排按钮 收藏分享... */
    #sdc-l-t-r-4 {
        height: 31px;
        margin-top: 12px;
        margin-bottom: 25px;
        /* background-color: #fff; */
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
        height: 200px;
        background-color: gray;
    }

    #sdc-r-simi-pl-title,
    #sdc-r-simi-s-title {
        height: 24px;
        /* background-color: #fff; */
        font-size: 12px;
        font-weight: 700;
        border-bottom: 1px solid #CCCCCC;
        margin-bottom: 20px;
    }

    #sdc-r-simi-pl-body-item {
        height: 50px;
        /* background-color: skyblue; */
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
        /* background-color: gray; */
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

    #sdc-r-simi-s-title {
        margin-top: 50px;
    }

    #sdc-r-simi-s-body-item {
        position: relative;
        height: 32px;
        /* background-color: pink; */
        margin-top: 10px;
        font-size: 12px;

    }

    #sdc-r-simi-s-body-item p {
        float: left;
        /* background-color: red; */
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
        /* background-color: green; */
    }

    #sdc-r-simi-s-body-item div span {
        cursor: pointer;
        display: inline-block;
        width: 10px;
        height: 11px;
        /* background-color: pink; */
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

    #sdc-cty-t {
        height: 35px;
        margin-top: 40px;
        margin-bottom: 20px;
        /* background-color: yellow; */
        font-size: 20px;
        border-bottom: 2px solid #C20C0C;
    }

    #sdc-cty-t span {
        font-size: 12px;
        color: #B57E66;
        margin-left: 20px;
    }

    #sdc-cty-m {
        height: 98px;
        /* background-color: blue; */
    }

    #sdc-cty-m img {
        float: left;
        width: 50px;
        height: 50px;
        margin-bottom: 12px;

    }

    #sdc-cty-m textarea {
        float: right;
        height: 50px;
        width: 570px;
        padding: 5px 5px;
    }

    #sdc-cty-m button {
        float: right;
        margin-top: 4px;
        padding: 5px 10px;
        font-size: 12px;
        color: white;
        border: 1px solid #999B99;
        background-color: #3383CF;
    }

    #sdc-cty-m button:hover {
        background-color: #5AA4E9;
    }

    #sdc-cty-g-body-titile {
        height: 20px;
        font-size: 12px;
        font-weight: 700;
        border-bottom: 1px solid #999B99;
        margin-bottom: 10px;
    }

    .sdc-cty-g-body-item {
        border-bottom: 1px solid #999B99;
        margin-bottom: 10px;
    }

    .sdc-cty-g-body-item img {
        width: 50px;
        height: 50px;
        margin-bottom: 10px;
        vertical-align: bottom;
    }

    .sdc-cty-g-b-i-b {
        float: right;
        width: 580px;
        /* height: 60px; */
        font-size: 12px;
        margin-bottom: 10px;
        white-space: pre-wrap;
    }

    .sdc-cty-g-b-i-b a {
        cursor: pointer;
        font-size: 12px;
        color: #0C73C2;

    }

    .sdc-cty-g-b-i-b a:hover {
        text-decoration: underline;
    }

    .sdc-cty-g-b-i-b p {
        /* height: 40px; */
        margin-top: 20px;
        padding: 10px 20px;
        color: #666666;
        background-color: #F4F4F4;
    }

    .sdc-cty-g-b-i-b p a {
        color: #0C73C2;
    }

    .sdc-cty-g-b-i-b div {
        margin-top: 20px;

    }

    .sdc-cty-g-b-i-b div span:nth-child(1) {
        float: left;
        color: #999999;
    }

    .sdc-cty-g-b-i-b div span:nth-child(2),
    .sdc-cty-g-b-i-b div span:nth-child(3) {
        float: right;
        cursor: pointer;
    }

    .sdc-cty-g-b-i-b div span:nth-child(3) {
        /* background-color: green; */
        margin-right: 20px;
        /* padding-left: 10px; */

    }

    .sdc-cty-g-b-i-b div span:nth-child(3) span {
        display: inline-block;
        vertical-align: bottom;
        width: 15px;
        height: 14px;
        background: url("https://s2.music.126.net/style/web2/img/icon2.png?96981c0650f794f754167a874229154c") no-repeat 0px 0px;
    }

    .sdc-cty-g-b-i-b div span:nth-child(3) .content-like {
        background-position: -150px 0;
    }

    .sdc-cty-g-b-i-b div span:nth-child(3) .content-liked {
        background-position: -170px 0;
    }

    .sdc-cty-g-b-i-b div span:nth-child(2) {
        color: #333333;
    }

    .sdc-cty-g-b-i-b div span:nth-child(2):hover {
        text-decoration: underline;
    }

    #sdc-cty-n-body-titile {
        height: 20px;
        font-size: 12px;
        font-weight: 700;
        border-bottom: 1px solid #999B99;
        margin-bottom: 10px;
    }
</style>