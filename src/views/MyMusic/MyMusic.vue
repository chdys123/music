<template>
    <div v-if="userId.length!=0">
        <!-- 红线 -->
        <div id="redLine-con">
            <div id="redLine">
                <!-- 小三角 -->
                <span id="myMusic-sanjiao"></span>
            </div>
        </div>

        <!-- 大盒子 -->
        <div id="myMusic-con">
            <!-- 左盒子 -->
            <div id="myMusic-left">
                <p id="myAr" @click="toMyAr()">我的歌手({{data.artistCount}})</p>
                <p id="myMv" @click="toMyVedio()">我的视频({{data.mvCount}})</p>
                <div class="my-l-lcon">
                    <p id="myPlayList" @click="open1=!open1">
                        <span :class="{'putItAwayLogo':open1,'unFurlsLogo':!open1}">
                        </span>创建的歌单({{data.createdPlaylistCount}})
                    </p>

                    <div v-show="!open1">
                        <div v-for="item in playList1" class="my-pl-item" @click="toPlayListDetail(item.id)" :key="item.id">
                            <img :src="item.coverImgUrl+'?param=40y40'" alt="">
                            <div>
                                <p class="my-pl-item-p1 ellipsis">{{item.name}}</p>
                                <p class="my-pl-item-p2 ellipsis">{{item.trackCount}}首</p>
                            </div>
                            <br style="clear: both;">
                        </div>
                    </div>
                </div>
                <div class="my-l-lcon">
                    <p id="myCollect" @click="open2=!open2">
                        <span :class="{'putItAwayLogo':open2,'unFurlsLogo':!open2}">
                        </span>收藏的歌单({{data.subPlaylistCount}})
                    </p>
                    <div v-show="!open2">
                        <div v-for="item in playList2" class="my-pl-item" @click="toPlayListDetail(item.id)" :key="item.id">
                            <img :src="item.coverImgUrl+'?param=40y40'" alt="">
                            <div>
                                <p class="my-pl-item-p1 ellipsis">{{item.name}}</p>
                                <p class="my-pl-item-p2 ellipsis">
                                    {{item.trackCount}}首&nbsp;by&nbsp;{{item.creator.nickname}}</p>
                            </div>
                            <br style="clear: both;">
                        </div>
                    </div>
                </div>
            </div>
            <!-- 右盒子 -->
            <div id="myMusic-right">
                <router-view></router-view>
            </div>
            <br style="clear: both;">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'myMusic',
        data() {
            return {
                // 创建的歌单是否展开
                open1: false,
                // 收藏的歌单是否展开
                open2: false,
                // 各种数量
                data: {},
                // 用户id
                userId: '',
                // 创建的歌单
                playList1: [],
                // 收藏的歌单
                playList2: [],

            }
        },
        methods: {
            // 获取用户id
            getUserId() {
                this.userId = this.$route.query.id
                console.log(this.userId)
            },
            // 获取 收藏的mv数量 关注的歌手数量 创建的歌单数量  收藏的歌单数量
            getNumber() {
                this.axios({
                    method: 'get',
                    url: '/user/subcount'
                }).then(res => {
                    this.data = res.data
                }).catch(err => {
                    console.log("获取数量失败")
                })
            },
            // 获取我的歌单 包括我创建的 我收藏的歌单
            getPlayList() {
                this.axios({
                    method: 'get',
                    url: '/user/playlist?uid=' + this.userId
                }).then(res => {
                    let data = res.data.playlist
                    let len = data.length
                    for (let i = 0; i < len; i++) {
                        if (data[i].subscribed) {
                            this.playList2.push(data[i])
                        } else {
                            this.playList1.push(data[i])
                        }
                    }
                }).catch(err => {
                    console.log("获取我的歌单失败")
                })
            },
            // 点击我的歌手
            toMyAr() {
                this.$router.push({ path: '/mymusic/artist', query: { id: this.userId } })
                // this.$router.push('/mymusic/artist')
            },
            // 点击我的视频
            toMyVedio() {
                this.$router.push({ path: '/mymusic/mv', query: { id: this.userId } })
                // this.$router.push('/mymusic/mv')
            }





        },
        created() {
            let li = document.getElementById("headermenu").childNodes
            for (let i = 0; i < li.length; i++) {
                if (i == 1) {
                    li[i].setAttribute("class", "headerlibgc")
                } else {
                    li[i].setAttribute("class", "")
                }
            }

            // 获取用户id
            this.getUserId()
            console.log("用户id",this.userId)
            if (this.userId =='') {
                this.$message.success({
                    message: '您还没有登录,请先登录',
                    type: 'success'
                })
            }

            // 获取各种数量
            this.getNumber()
            // 获取各种歌单
            this.getPlayList()


        },


    }
</script>
<style>
    /* 红线 */
    #redLine-con {
        height: 7px;
        background-color: #C20C0C;
    }

    #redLine {
        position: relative;
        width: 980px;
        margin: 0px auto;
        height: 7px;
        background-color: #C20C0C;
    }

    #myMusic-sanjiao {
        position: absolute;
        top: 0px;
        left: 266px;
        border: 0px;
        border-left: 7px solid transparent;
        border-bottom: 7px solid #C20C0C;
        border-right: 7px solid transparent;
        transform: translateY(-100%);
    }

    /* 红线end */

    /* 整体布局 */
    #myMusic-con {
        width: 980px;
        background-color: #FFFFFF;
        /* height: 1200px; */
        border: 1px solid #D3D3D3;
        padding-bottom: 50px;
        margin: 0 auto;
    }

    #myMusic-left {
        float: left;
        width: 242px;
        border-right: 1px solid #D3D3D3;
        background-color: #F9F9F9;
        padding-top: 30px;
    }

    #myMusic-right {
        float: left;
        width: 737px;
    }

    /* 整体布局end */

    /* 左盒子内容 */
    #myAr,
    #myMv,
    #myPlayList,
    #myCollect {
        font-size: 14px;
        font-weight: 700;
        padding: 10px 0px 10px 0px;
        cursor: pointer;
        padding-left: 40px;

    }

    #myAr:hover,
    #myMv:hover {
        background-color: #EEEEEE;
    }

    .my-l-lcon {
        position: relative;
    }

    /* 展开状态 */
    .unFurlsLogo {
        position: absolute;
        top: 17px;
        left: 18px;
        border-left: 7px solid transparent;
        border-top: 7px solid #CCCCCC;
        border-right: 7px solid transparent;
    }

    /* 收起状态 */
    .putItAwayLogo {
        position: absolute;
        top: 13px;
        left: 22px;
        border-left: 7px solid #CCCCCC;
        border-top: 7px solid transparent;
        border-bottom: 7px solid transparent;
    }

    .my-pl-item {
        padding: 6px 0px 6px 17px;
        font-size: 12px;
        cursor: pointer;
    }

    .my-pl-item:hover {
        background-color: #E6E6E6;
    }

    .my-pl-item img {
        vertical-align: middle;
        float: left;
    }

    .my-pl-item div {
        float: left;
        /* background-color: pink; */
        width: 185px;
        height: 40px;
    }

    .my-pl-item div p {
        margin-left: 10px;
        width: 175px;
        line-height: 20px;
    }

    .my-pl-item-p2 {
        color: #B6B6B6;
    }









    /* 左盒子内容end */
</style>