<template>
    <div class="con">
        <div class="con-l">
            <div id="mv-t">
                <h2><span class="mvDetailLogo"></span>{{mvDetail.name}}</h2>
                <span v-for="(item,index) in mvDetail.artists" :title="item.name">{{item.name}}</span>
                <br style="clear: both;">
            </div>
            <div>
                <video :src="url" width="640" height="360" controls>
                </video>
                <div id="mv-d-btn">
                    <span><span class="likedLogo"></span> 点赞</span>
                    <span><span class="collectedLogo"></span> 收藏</span>
                    <span><span class="shareLogo"></span> 分享</span>
                    <br style="clear: both;">
                </div>
            </div>
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


        </div>
        <div class="con-r">
            <div class="mv-d-r-t">MV简介</div>
            <p>发布时间：{{mvDetail.publishTime}}</p>
            <p>播放次数：{{mvDetail.playCount}}次</p>
            <p>{{mvDetail.desc}}</p>

            <div class="mv-d-r-b">相关推荐</div>

            <div v-for="item in simimvs" class="mv-d-r-simimv">
                <img :src="item.cover+'?param=96y54'" alt="" :title="item.name">
                <div>
                    <p class="ellipsis" :title="item.name">{{item.name}}</p>
                    <p>{{getDt(item.duration)}}</p>
                    <p class="ellipsis">by <span :title="item.artists[0].name">{{item.artists[0].name}}</span></p>
                </div>
                <p><span class="videoPlaycountLogo"></span>{{getPlayCount(item.playCount)}}</p>
                <br style="clear: both;">


            </div>


        </div>


        <br style="clear: both;">

    </div>
</template>

<script>
    export default {
        name: 'mvdetail',
        data() {
            return {
                mvId: '',
                // mv detail
                mvDetail: {},
                // mv点赞详情
                info: {},
                // mv播放地址
                url: '',
                // 相似mv
                simimvs: [],
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
            // 获取mvid
            getMvId() {
                this.mvId = this.$route.query.id
                console.log(this.mvId)
            },
            // 获取mv名字 歌手 mv简介 出版时间 评论数目
            // 分享数目 收藏数目 播放次数 清晰度列表
            getMvDetail() {
                this.axios({
                    method: 'get',
                    url: '/mv/detail?mvid=' + this.mvId
                }).then(res => {
                    // console.log(res.data.data)
                    this.mvDetail = res.data.data
                }).catch(err => {
                    console.log("获取mv详情失败")
                })
            },
            // 获取点赞数目 和是否点赞
            getMvLikedCount() {
                this.axios({
                    method: 'get',
                    url: '/mv/detail/info?mvid=' + this.mvId
                }).then(res => {
                    console.log(res.data)
                    this.info = res.data

                }).catch(err => {
                    console.log("获取点赞数目失败")
                })
            },
            // 获取mv播放地址 默认1080
            getMvUrl() {
                this.axios({
                    method: 'get',
                    url: '/mv/url?id=' + this.mvId
                }).then(res => {
                    this.url = res.data.data.url
                    console.log(this.url)

                }).catch(err => {
                    console.log("获取播放地址失败")
                })
            },
            // 获取类似mv
            getSemiMv() {
                this.axios({
                    method: 'get',
                    url: '/simi/mv?mvid=' + this.mvId
                }).then(res => {
                    this.simimvs = res.data.mvs
                }).catch(err => {
                    console.log("获取相似mv失败")
                })
            },

            // 获取评论
            getComments(num) {
                if (num == 1) {
                    this.axios({
                        method: 'get',
                        url: '/comment/mv?id=' + this.mvId
                    }).then(res => {
                        this.allComments = res.data
                        console.log(res.data)
                        this.currentPage = 1
                    }).catch(err => {
                        console.log("获取评论失败")
                    })
                } else {
                    this.axios({
                        method: 'get',
                        url: '/comment/mv?id=' + this.mvId + '&offset=' + (num - 1) * 20 + '&before=' + this.allComments.comments[19].time
                    }).then(res => {
                        this.allComments = res.data
                        this.currentPage = num
                    }).catch(err => {
                        console.log("获取评论失败")
                    })
                }
            },


            //mv时长格式化
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
            // 格式化播放量
            getPlayCount(num) {
                if (num < 100000) {
                    return num
                } else {
                    let n1 = parseInt(num / 1000)
                    let n2 = n1 / 10
                    return n2 + '万'
                }

            },
            // 日期格式化
            contentTime(num) {
                let time = new Date(num)
                let str = time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + "日"
                return str
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
            this.getMvId()
            this.getMvDetail()
            this.getSemiMv()
            this.getMvUrl()
            this.getComments(1)
        },
    }
</script>

<style>
    #mv-t h2,
    #mv-t span {
        float: left;
    }

    #mv-t h2 {
        font-weight: 500;
    }

    #mv-t span {
        font-size: 12px;
        color: #0C73C2;
        margin-left: 10px;
        cursor: pointer;
        line-height: 42px;
    }

    #mv-t span:hover {
        text-decoration: underline;
    }

    .mv-d-r-t {
        font-size: 14px;
        font-weight: 700;
        height: 25px;
        border-bottom: 1px solid #CCCCCC;
    }

    .mv-d-r-t+p,
    .mv-d-r-t+p+p {
        font-size: 12px;
        color: #CCCCCC;
        margin: 10px 0px;
    }

    .mv-d-r-t+p+p+p {
        font-size: 12px;
        white-space: pre-wrap;
        line-height: 20px;
    }

    .mv-d-r-b {
        font-size: 14px;
        font-weight: 700;
        height: 25px;
        border-bottom: 1px solid #CCCCCC;
        margin-top: 30px;
        /* margin-bottom: 20px; */

    }

    .mv-d-r-simimv {
        margin-bottom: 20px;
        position: relative;
    }

    .mv-d-r-simimv img {
        vertical-align: bottom;
        cursor: pointer;
    }

    .mv-d-r-simimv img,
    .mv-d-r-simimv div {
        float: left;
    }

    .mv-d-r-simimv div {
        margin-left: 10px;
        font-size: 12px;
    }

    .mv-d-r-simimv div p:nth-child(1) {
        cursor: pointer;
    }

    .mv-d-r-simimv div p:nth-child(1):hover {
        text-decoration: underline;
    }

    .mv-d-r-simimv div p:nth-child(2) {
        color: #cccccc;
    }

    .mv-d-r-simimv div p:nth-child(3) {
        color: #cccccc;
        cursor: pointer;
    }

    .mv-d-r-simimv div p:nth-child(3) span:hover {
        text-decoration: underline;
    }

    .mv-d-r-simimv>p {
        cursor: pointer;
        position: absolute;
        top: 0px;
        right: 104px;
        font-size: 12px;
        color: white;
        background-color: rgb(0, 0, 0, .5);
    }


    /* 一排按钮 收藏 转发 */
    #mv-d-btn>span {
        float: left;
        padding: 5px 9px 5px 0px;
        font-size: 12px;
        cursor: pointer;
        border: 1px solid #C4C4C4;
        margin-right: 20px;
        border-radius: 5px;
        background-color: #F2F2F2;
    }

    #mv-d-btn>span:hover {
        background-color: #F8F8F8;
    }

    #mv-d-btn>span>span {
        display: inline-block;
        width: 21px;
        height: 17px;
        vertical-align: bottom;
    }
</style>