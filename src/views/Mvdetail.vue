<template>
    <div class="con">
        <div class="con-l">
            <div id="mv-t">
                <h2><span class="mvDetailLogo"></span>{{mvDetail.name}}</h2>
                <span v-for="(item,index) in mvDetail.artists" :title="item.name">{{item.name}}</span>
                <br style="clear: both;">

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
                    console.log(res.data)
                    this.url = res.data.data.url
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


            //歌曲时长格式化
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
                    let n2=n1/10
                    return n2+'万'
                }

            }



        },

        created() {
            this.getMvId()
            this.getMvDetail()
            this.getSemiMv()


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
        position: absolute;
        top: 0px;
        right: 104px;
        font-size: 12px;
        color: white;
        background-color: rgb(0, 0, 0, .5);
    }
</style>