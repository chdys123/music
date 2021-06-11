<template>
    <div class="con tl-con">
        <div id="tl-l">
            <h2>云音乐特色榜</h2>
            <div :class="{'tp-item':true,'tp-item-hover':item.id!=id,'tp-item-active':item.id==id}"
                v-for='(item,index) in toplist.slice(0,4)' @click="getTopListDetail(item.id)">
                <img :src="item.coverImgUrl+'?param=40y40'" alt="">
                <div>
                    <p>{{item.name}}</p>
                    <p>{{item.updateFrequency}}</p>
                </div>
                <br style="clear:both;">
            </div>
            <h2 id="tl-l-h2">全球媒体榜</h2>
            <div :class="{'tp-item':true,'tp-item-hover':item.id!=id,'tp-item-active':item.id==id}"
                v-for='(item,index) in toplist.slice(4,33)' @click="getTopListDetail(item.id)">
                <img :src="item.coverImgUrl+'?param=40y40'" alt="">
                <div>
                    <p>{{item.name}}</p>
                    <p>{{item.updateFrequency}}</p>
                </div>
                <br style="clear:both;">
            </div>


        </div>
        <div id="tl-r">
            <div id="tl-r-t">
                <div>
                    <img :src="toplistDetail.playlist.coverImgUrl+'?param=150y150'" alt="">
                </div>
                <div>
                    <p>{{toplistDetail.playlist.name}}</p>
                    <p>
                        <span class="updateLogo"></span>
                        更新时间：{{getupdateTime(toplistDetail.playlist.updateTime)}}
                    </p>
                    <!-- 一排收藏 分享按钮 -->
                    <div id="toplist-fun-btn">
                        <span title="播放" @click="playMusics(this.ids)">播放</span>
                        <span title="添加到播放列表" @click="addMusics(this.ids)"></span>
                        <span title="收藏">({{toplistDetail.playlist.subscribedCount}})</span>
                        <span title="分享">({{toplistDetail.playlist.shareCount}})</span>
                        <span title="下载">下载</span>
                        <span title="评论">({{toplistDetail.playlist.commentCount}})</span>
                    </div>

                </div>
                <br style="clear: both;">
            </div>

            <div id="tl-r-b-t">
                <span>歌曲列表</span>
                <span>{{toplistDetail.playlist.trackCount}}首歌</span>
                <span>播放<span>{{toplistDetail.playlist.playCount}}</span>次</span>
                <br style="clear: both;">
            </div>

            <!-- 歌曲列表 -->

            <div>
                <!-- 表头 -->
                <div id="tp-r-s-h">
                    <span></span>
                    <span>歌曲标题</span>
                    <span>时长</span>
                    <span>歌手</span>
                    <br style="clear: both;">
                </div>
                <!-- 歌曲列表 -->
                <div id="tp-r-s-b">
                    <div :class="{'a-h-w-b-item':true,'tl-s-img':index==0||index==1||index==2}"
                        v-for="(item,index) in toplistDetail.playlist.tracks">
                        <span>{{index+1}} <span class="playLogo" @click="playMusic(item.id)" title="播放"></span></span>
                        <span >
                            <img :src="item.al.picUrl+'?param=50y50'" alt="" v-if="index==2||index==0||index==1" @click="toSongDetail(item.id)" :title="item.name">
                            <span :title="item.name" @click="toSongDetail(item.id)">{{item.name}}</span>
                            <span class="mvLogo" v-if="item.mv!=0" title="播放mv" @click="toMv(item.mv)"></span>
                        </span>
                        <span>
                            <span class="a-h-w-dt">{{this.getDt(item.dt)}}</span>
                            <span class="a-h-w-func">
                                <span title="添加到播放列表" class="addSongLogo" @click="addMusics([item.id])"></span>
                                <span title="收藏" class="collectLogo"></span>
                                <span title="分享" class="shareLogo"></span>
                                <span title="下载" class="downloadLogo"></span>
                                <br style="clear: both;">
                            </span>
                        </span>
                        <span :title="item.ar[0].name" class="tp-s-b-sn" @click="toAr(item.ar[0].id)">{{item.ar[0].name}}</span>
                        <br style="clear:both">
                    </div>
                </div>
            </div>
            <!-- 歌曲列表end -->

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
                <!-- 评论模块end -->

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
        <br style="clear: both;">
    </div>
</template>

<script>
    export default {
        name: 'toplist',
        data() {
            return {
                // 榜单数据
                toplist: [],

                // 榜单详情
                toplistDetail: {
                    playlist: {
                        name: '',
                        coverImgUrl: '',
                        updateTime: 0,
                        trackCount: 0,
                        playCount: 0,
                        // 收藏次数
                        subscribedCount: 0,
                        // 分享次数
                        shareCount: 0,
                        // 评论数
                        commentCount: 0,
                        // 歌曲列表
                        tracks: [
                            {
                                name: '',
                                id: '',
                                ar: [
                                    {
                                        name: '',
                                        id: ''
                                    }
                                ],
                                al: {
                                    picUrl: ''
                                }
                            }
                        ]
                    }

                },
                // 当前榜单详情id
                id: 0,
                // 当前榜单歌曲id数组
                ids:[],
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
            // 获取榜单数据
            getTopList(id) {
                
                this.axios({
                    method: 'get',
                    url: '/toplist'
                }).then(res => {
                    this.toplist = res.data.list
                    this.getTopListDetail(id)
                    this.getComments(1)
                }).catch(err => {
                    console.log("获取榜单数据失败")
                })
            },
            // 获取榜单详情
            getTopListDetail(id) {
                console.log("点击了榜单", id)
                this.id = id
                this.axios({
                    method: 'get',
                    url: '/playlist/detail?id=' + id
                }).then(res => {
                    this.toplistDetail = res.data
                    // 把歌曲id加入到ids
                    let len = res.data.playlist.tracks.length
                    for (let i = 0; i < len; i++) {
                        this.ids.push(res.data.playlist.tracks[i].id)
                    }




                }).catch(err => {
                    console.log("获取榜单详情失败")
                })
                // 获取评论
                this.getComments(1)
            },
            // 榜单修改日期格式化
            getupdateTime(num) {
                let time = new Date(num)
                let str = time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + "日"
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
            // 获取评论
            getComments(num) {
                if (num == 1) {
                    this.axios({
                        method: 'get',
                        url: '/comment/playlist?id=' + this.id
                    }).then(res => {
                        this.allComments = res.data
                        this.currentPage = 1
                    }).catch(err => {
                        console.log("获取评论失败")
                    })
                } else {
                    this.axios({
                        method: 'get',
                        url: '/comment/playlist?id=' + this.id + '&offset=' + (num - 1) * 20 + '&before=' + this.allComments.comments[19].time
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

        },

        created() {
            window.scrollTo(0,0)
            let li = document.getElementById("discoverlittleList").childNodes
            for (let i = 0; i < li.length; i++) {
                if (i == 1) {
                    //加上liBgc类
                    li[i].setAttribute("class", "liBgc")
                } else {
                    li[i].setAttribute("class", "")
                }
            }
            // 获取传过来的榜单id
            let id=this.$route.query.id
            console.log("id",id)
            // 获取榜单列表
            this.getTopList(id)

        },
    }
</script>

<style>
    .tl-con {
        background-color: #F5F5F5;
    }

    #tl-l,
    #tl-r {
        float: left;
    }

    #tl-l {
        width: 239px;
        height: 100%;
        background-color: #F5F5F5;
    }

    #tl-r {
        width: 670px;
        height: 100%;
        border-left: 1px solid #D3D3D3;
        padding: 40px 30px 40px 39px;
        background-color: #FFFFFF;
    }

    #tl-l h2 {
        font-size: 14px;
        padding: 0px 10px 12px 15px;
        margin-top: 40px;

    }

    #tl-l #tl-l-h2 {
        margin-top: 10px;
    }

    .tp-item {
        /* margin-bottom: 20px; */
        cursor: pointer;
        padding: 10px 0px 10px 20px;

    }

    /* 活跃的榜单  去除tp-item-hover类 添加tp-item-active*/
    .tp-item-active {
        background-color: #E6E6E6;

    }

    .tp-item-hover:hover {
        background-color: #FFFFFF;
    }

    .tp-item img {
        float: left;
        vertical-align: middle;
    }

    .tp-item div {
        float: left;
        margin-left: 10px;
        font-size: 12px;
        color: #999999;
    }

    .tp-item div p:nth-child(1) {
        margin-bottom: 5px;
        color: #000;
    }

    /* 右侧榜单详情 */
    #tl-r-t>div {
        float: left;
    }

    #tl-r-t>div:nth-child(2) {
        margin-left: 25px;
    }

    #tl-r-t>div:nth-child(2) p:nth-child(1) {
        font-size: 20px;
    }

    #tl-r-t>div:nth-child(2) p:nth-child(2) {
        font-size: 12px;
    }

    #tl-r-t>div:nth-child(2) p {
        margin-top: 20px;
        margin-bottom: 20px;
    }

    /* 一排按钮 收藏 分享... */
    #toplist-fun-btn {
        height: 31px;
        margin-top: 12px;
        margin-bottom: 25px;
        /* background-color: #fff; */
    }

    #toplist-fun-btn span {
        float: left;
        line-height: 31px;
        height: 31px;
        font-size: 12px;
        cursor: pointer;
    }

    #toplist-fun-btn span:nth-child(1) {
        width: 25px;
        padding-left: 35px;
        padding-right: 5px;
        background: url("https://s2.music.126.net/style/web2/img/button2.png?521a1ed38fd91718f2919dde13cb0ecf") no-repeat 0px -632px;
        color: white;
        line-height: 33px;
    }

    #toplist-fun-btn span:nth-child(2) {
        width: 31px;
        background: url("https://s2.music.126.net/style/web2/img/button2.png?521a1ed38fd91718f2919dde13cb0ecf") no-repeat 0px -1587px;

    }

    #toplist-fun-btn span:nth-child(3),
    #toplist-fun-btn span:nth-child(4),
    #toplist-fun-btn span:nth-child(5),
    #toplist-fun-btn span:nth-child(6) {
        padding: 0 9px 0 24px;
        margin-left: 8px;
        font-size: 12px;
        border-left: 1px solid #C4C4C4;
        border-right: 1px solid #C4C4C4;
        border-radius: 4px;
        font-weight: 400;
        background: #C8C6C6 url("https://s2.music.126.net/style/web2/img/button2.png?521a1ed38fd91718f2919dde13cb0ecf") no-repeat;
    }

    #toplist-fun-btn span:nth-child(3) {
        background-position: -2px -1062px;
    }

    #toplist-fun-btn span:nth-child(4) {
        background-position: -2px -1267px;
    }

    #toplist-fun-btn span:nth-child(5) {
        background-position: -2px -2760px;
    }

    #toplist-fun-btn span:nth-child(6) {
        background-position: -2px -1507px;
    }

    #tl-r-b-t {
        /* background-color: pink; */
        margin-top: 40px;
        border-bottom: 2px solid #C20C0C;
        padding-bottom: 5px;
    }

    #tl-r-b-t>span:nth-child(1) {
        font-size: 20px;

    }

    #tl-r-b-t>span:nth-child(2) {
        font-size: 12px;
        color: #666666;
        margin-left: 20px;
    }

    #tl-r-b-t>span:nth-child(3) {
        font-size: 12px;
        color: #666666;
        float: right;
        margin-top: 9px;
    }

    #tl-r-b-t>span:nth-child(3) span {
        color: #C20C0C;
    }

    /* 歌曲列表 表头样式 */
    #tp-r-s-h span {
        padding: 8px 10px;
        height: 18px;
        float: left;
        background-color: #F5F5F5;
        border-bottom: 2px solid #D8D8D8;
    }

    #tp-r-s-h span:nth-child(1) {
        width: 73px;
        border-left: 1px solid #D8D8D8;
    }

    #tp-r-s-h span:nth-child(2) {
        width: 277px;
        border-left: 1px solid #D8D8D8;


    }

    #tp-r-s-h span:nth-child(3) {
        text-align: center;
        width: 99px;
        border-left: 1px solid #D8D8D8;

    }

    #tp-r-s-h span:nth-child(4) {
        width: 136px;
        border-left: 1px solid #D8D8D8;
        border-right: 1px solid #D8D8D8;

    }

    /* 表头end */

    #tp-r-s-b {
        border-bottom: 1px solid #D8D8D8;
        border-left: 1px solid #D8D8D8;
        border-right: 1px solid #D8D8D8;
    }

    .tp-s-b-sn {
        width: 136px !important;
    }

    .tl-s-img>span:nth-child(1),
    .tl-s-img>span:nth-child(3),
    .tl-s-img>span:nth-child(4) {
        padding-top: 23px;
    }

    .tl-s-img img {
        vertical-align: middle !important;
        margin-right: 5px !important;
    }
</style>