<template>
    <div id="playlistdetailCon">
        <div id="playlistdetailLeft">
            <div id="playlistdetailLeft-header">
                <!-- 图片 -->
                <div id="playlistdetailLeft-header-left">
                    <img :src="data.playlist.coverImgUrl" alt="">
                </div>
                <!-- 专辑信息 -->
                <div id="playlistdetailLeft-header-right">
                    <div>
                        <span></span>
                        <h2>{{data.playlist.name}}</h2>
                    </div>
                    <div>
                        <img :src="data.playlist.creator.avatarUrl" alt="">
                        <a>{{data.playlist.creator.nickname}}</a>
                        <span>{{createTime}}创建</span>
                    </div>
                    <div>
                        <span>播放</span>
                        <span></span>
                        <span>({{getnumber(data.playlist.subscribedCount)}})</span>
                        <span>({{getnumber(data.playlist.shareCount)}})</span>
                        <span>下载</span>
                        <span>({{getnumber(data.playlist.commentCount)}})</span>
                    </div>
                    <div id="playlist-tag" v-if="data.playlist.tags.length!=0">
                        <span>标签:</span>
                        <span class="playlistTags" v-for="(item,index) in data.playlist.tags" @click="totypeplaylist(item)">
                            {{item}}
                        </span>
                    </div>
                    <div id="playlistIntroduction">
                        <p :class="{isClose:isClose}">介绍：{{data.playlist.description}}
                        </p>
                    </div>
                    <span v-if="isOPenShow" id="playlistIntroduction-unfurls" @click="clickMore()">
                        {{openOrClose}}</span>
                </div>
                <br style="clear: both;">
            </div>
            <!-- 歌曲列表 -->
            <div id="playlistdetailLeft-body">
                <div id="playlistdetailLeft-b-h">
                    <span>歌曲列表</span>
                    <span>{{data.playlist.trackCount}}首歌</span>
                    <span>播放 <span>{{data.playlist.playCount}}</span>次</span>
                </div>
                <div id="playlistdetailLeft-b-b">
                    <table>
                        <tr>
                            <th></th>
                            <th>歌曲标题</th>
                            <th>时长</th>
                            <th>歌手</th>
                            <th>专辑</th>
                        </tr>
                        <tr v-for="(item,index) in data.playlist.tracks">
                            <td>
                                <span id="playlist-index">
                                    {{index}}
                                </span>
                                <!-- 播放按钮 -->
                                <span id="playlist-play" @click="playMusic(item)">
                                </span>
                            </td>
                            <td>
                                <span id="playlist-song-name" @click="toSongDetail(item.id)">
                                    {{item.name}}
                                </span>
                            </td>
                            <td>
                                <span id="playlist-song-dt">
                                    {{this.getDt(item.dt)}}
                                </span>
                                <div class="playlist-song-icon">
                                </div>
                                <div class="playlist-song-icon">
                                </div>
                                <div class="playlist-song-icon">
                                </div>
                                <div class="playlist-song-icon">
                                </div>
                            </td>
                            <td>
                                <span id="playlist-song-ar-name">
                                    {{item.ar[0].name}}
                                </span>
                            </td>
                            <td>
                                <span id="playlist-song-al">
                                    {{item.al.name}}
                                </span>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <!-- 评论 -->
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


            <!-- 评论end -->
        </div>

        <!-- 侧边栏 -->
        <div id="playlistdetailRight">
            <!-- 最近收藏用户 userId-->
            <p class="plut">喜欢这个歌单的人</p>
            <div v-for="(item,index) in users" :class="{'pluser1':true,'pluser2':index%4==0}">
                <img :src="item.avatarUrl+'?param=40y40'" alt="">
            </div>
            <br style="clear: both;">
            <!-- 最近收藏用户end -->

            <!-- 热门歌单 -->
            <p class="plut1">热门歌单</p>
            <div v-for="(item,index) in repl" class="repl">
                <img :src="item.coverImgUrl+'?param=50y50'" alt="" :title="item.name" @click="toplaylist(item.id)">
                <div>
                    <p class="ellipsis" :title="item.name" @click="toplaylist(item.id)">{{item.name}}</p>
                    <p class="ellipsis"><span>by</span><span :title="item.creator.nickname">{{item.creator.nickname}}</span></p>
                </div>
                <br style="clear: both;">
            </div>
            <!-- 热门歌单end -->
        </div>
        <br style="clear: both;">
    </div>
</template>

<script>
    export default {
        name: "playlistdetails",
        data() {
            return {
                playlistId: 0,
                //请求过来的数据
                data: { playlist: { name: '', coverImgUrl: '', creator: { avatarUrl: '', nickname: '' }, createTime: 11111111, subscribedCount: 0, shareCount: 0, commentCount: 0, tags: [], description: '', trackCount: 0, playCount: 0, tracks: [] } },
                //是否显示展开
                isOPenShow: true,
                //是否展开
                isClose: true,
                count: 0,
                height: 0,
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

                // 最近收藏用户
                users:[],
                // 相关歌单
                repl:[]


            }
        },
        computed: {
            //歌单创建日期格式化
            createTime() {
                let time = new Date(this.data.playlist.createTime)
                let str = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + " "
                // console.log(str)
                return str
            },
            //展开或者收起
            openOrClose() {
                if (this.isClose) {
                    return "展开"
                } else {
                    return "收起"
                }
            },
            // 总页数
            totalPage() {
                return Math.ceil(this.allComments.total / 20)
            }

        },
        methods: {
             // 数量格式化
             getnumber(num){
                num =parseInt(num)
                if(num>100000){
                    num=parseInt(num/100000)
                    return num+'万'
                }else{
                    return num
                }
            },
            //获取歌单详情数据
            getDetailData() {
                this.axios({
                    method: 'get',
                    url: '/playlist/detail?id=' + this.playlistId
                }).then(res => {
                    this.data = res.data
                }).catch(err => {
                    console.log("请求歌曲详情数据失败")
                })
            },
            //点击歌单展开后
            clickMore() {
                this.isClose = !this.isClose
            },
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
            //点击播放图标
            playMusic(item) {
                // 歌曲名
                let songname = item.name
                // 歌曲id
                let songid = item.id
                // 可能有多个歌手
                // 歌手名
                let arname = []
                // 歌手id
                let arid = []
                for(let i=0;i<item.ar.length;i++){
                    arname.push(item.ar[i].name)
                    arid.push(item.ar[i].id)
                }
                // 歌曲时长
                let time = item.dt
                // 歌曲图片
                let imgsrc = item.al.picUrl + '?param=34y34'
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
            // 点击歌曲名
            toSongDetail(id){
                // console.log("点击了歌曲名,歌曲id:",id)
                // 进入歌曲组件
                this.$router.push({path:'/discover/song',query:{id:id}})
            },
            // 评论日期格式化
            contentTime(num) {
                let time = new Date(num)
                let str = time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + "日"
                return str
            },
            // 获取评论
            getComments(num) {
                if (num == 1) {
                    this.axios({
                        method: 'get',
                        url: '/comment/playlist?id=' + this.playlistId
                    }).then(res => {
                        this.allComments = res.data
                        this.currentPage = 1
                    }).catch(err => {
                        console.log("获取评论失败")
                    })
                } else {
                    this.axios({
                        method: 'get',
                        url: '/comment/playlist?id=' + this.playlistId + '&offset=' + (num - 1) * 20 + '&before=' + this.allComments.comments[19].time
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
            // 获取最近收藏了这个歌单的八个用户
            getlastUsers(){
                this.axios({
                    url:'/playlist/subscribers?id='+this.playlistId+'&limit=8'
                }).then(res=>{
                    this.users=res.data.subscribers
                }).catch(err=>{
                    console.log("获取最近收藏用户失败")
                })
            },
            // 获取相似歌单
            getrepl(){
                this.axios({
                    method:'get',
                    url:'/related/playlist?id='+this.playlistId
                }).then(res=>{
                    this.repl=res.data.playlists
                }).catch(err=>{
                    console.log("获取相似歌单失败")
                })
            },
            // 进入歌单
            toplaylist(id){
                this.$router.push({path:'/discover/playlistdetail',query:{id:id}})
            },
            // 进入歌单列表
            totypeplaylist(type){
                this.$router.push({path:'/discover/playlist',query:{type:type}})

            }
        },

        created() {
            window.scrollTo(0, 0)
            //获取歌单id
            this.playlistId = parseInt(this.$route.query.id)
            //去掉header的背景
            let li = document.getElementById("discoverlittleList").childNodes
            for (let i = 0; i < li.length; i++) {
                li[i].setAttribute("class", '')
            }
            //获取歌单数据
            this.getDetailData()
            // 获取评论
            this.getComments(1)
            // 获取最近收藏了这个歌单的八个用户
            this.getlastUsers()
            // 获取相似歌单
            this.getrepl()
        },

        updated() {
            this.$nextTick(() => {
                let p = document.getElementById("playlistIntroduction").childNodes[0]
                if (this.count == 0) {
                    this.height = p.clientHeight
                }
                this.isOPenShow = this.height < p.scrollHeight
                this.count++
                
            })
        },


    }
</script>

<style>
    #playlistdetailCon {
        overflow: hidden;
        width: 980px;
        background-color: #FFFFFF;
        margin: 0 auto;
        border-left: 1px solid #D3D3D3;
        border-right: 1px solid #D3D3D3;
        margin-bottom: 100px;
    }

    #playlistdetailLeft {
        float: left;
        width: 640px;
        border-right: 1px solid #D3D3D3;
        padding: 47px 30px 40px 39px;
        /* background-color: pink; */
    }

    #playlistdetailRight {
        width: 200px;
        height: 100%;
        /* background-color: yellow; */
        float: left;
        padding: 20px 40px 40px 30px;
    }

    #playlistdetailLeft-header {
        width: 100%;
        
    }

    #playlistdetailLeft-header-left {
        float: left;
        width: 200px;
        height: 200px;
        padding: 4px;
        margin-top: -4px;
        border: 1px solid #D3D3D3;
        /* background-color: yellow; */
    }

    #playlistdetailLeft-header-right {
        position: relative;
        float: right;
        width: 410px;
        /* overflow: hidden; */
        /* height: 247px; */
        background-color: white;
    }

    #playlistdetailLeft-header-left img {
        width: 200px;
        height: 200px;
    }

    #playlistdetailLeft-header-right div:nth-child(1) {
        position: relative;
        /* height: 24px; */
        margin-bottom: 12px;
        /* background-color: pink; */
    }

    #playlistdetailLeft-header-right div:nth-child(1) span {
        position: absolute;
        top: 0;
        left: 0;
        height: 24px;
        width: 60px;
        background: url("https://s2.music.126.net/style/web2/img/icon.png?768124bbe4f75e175c791ff979ce95d5") no-repeat 0px -243px;
    }

    #playlistdetailLeft-header-right div:nth-child(1) h2 {
        font-size: 18px;
        font-weight: 400;
        line-height: 24px;
        padding-left: 62px;
    }

    #playlistdetailLeft-header-right div:nth-child(2) {
        height: 35px;
        /* background-color: gray; */
        margin-bottom: 20px;


    }

    #playlistdetailLeft-header-right div:nth-child(2) img {
        width: 35px;
        height: 35px;
        vertical-align: middle;

    }

    #playlistdetailLeft-header-right div:nth-child(2) a {
        /* line-height: 35px; */
        display: inline-block;
        height: 35px;
        font-size: 12px;
        margin-left: 18px;
        cursor: pointer;
        color: #0C73C2;
    }

    #playlistdetailLeft-header-right div:nth-child(2) a:hover {
        text-decoration: underline;
    }

    #playlistdetailLeft-header-right div:nth-child(2) span {
        display: inline-block;
        height: 35px;
        font-size: 12px;
        margin-left: 10px;
        color: #999999;
    }

    #playlistdetailLeft-header-right div:nth-child(3) {
        height: 31px;
        margin-bottom: 25px;

        /* background-color: gray; */
    }

    #playlistdetailLeft-header-right div:nth-child(3) span {
        float: left;
        line-height: 31px;
        height: 31px;
        font-size: 12px;
        /* background-color: pink; */
        cursor: pointer;
    }

    #playlistdetailLeft-header-right div:nth-child(3) span:nth-child(1) {
        width: 25px;
        padding-left: 35px;
        padding-right: 5px;
        /* background-color: #2374C2; */
        background: url("https://s2.music.126.net/style/web2/img/button2.png?521a1ed38fd91718f2919dde13cb0ecf") no-repeat 0px -632px;
        color: white;
        line-height: 33px;


    }

    #playlistdetailLeft-header-right div:nth-child(3) span:nth-child(2) {
        width: 31px;
        background: url("https://s2.music.126.net/style/web2/img/button2.png?521a1ed38fd91718f2919dde13cb0ecf") no-repeat 0px -1587px;

    }

    #playlistdetailLeft-header-right div:nth-child(3) span:nth-child(3),
    #playlistdetailLeft-header-right div:nth-child(3) span:nth-child(4),
    #playlistdetailLeft-header-right div:nth-child(3) span:nth-child(5),
    #playlistdetailLeft-header-right div:nth-child(3) span:nth-child(6) {
        padding: 0 2px 0 28px;
        margin-left: 8px;
        font-size: 12px;
        border-left: 1px solid #C4C4C4;
        border-right: 1px solid #C4C4C4;
        border-radius: 4px;
        background-color: #C8C6C6;
        font-weight: 400;
    }

    #playlistdetailLeft-header-right div:nth-child(3) span:nth-child(3) {
        background: url("https://s2.music.126.net/style/web2/img/button2.png?521a1ed38fd91718f2919dde13cb0ecf") no-repeat -2px -1062px;
    }

    #playlistdetailLeft-header-right div:nth-child(3) span:nth-child(4) {
        background: url("https://s2.music.126.net/style/web2/img/button2.png?521a1ed38fd91718f2919dde13cb0ecf") no-repeat -2px -1267px;
    }

    #playlistdetailLeft-header-right div:nth-child(3) span:nth-child(5) {
        background: url("https://s2.music.126.net/style/web2/img/button2.png?521a1ed38fd91718f2919dde13cb0ecf") no-repeat -2px -2760px;
    }

    #playlistdetailLeft-header-right div:nth-child(3) span:nth-child(6) {
        background: url("https://s2.music.126.net/style/web2/img/button2.png?521a1ed38fd91718f2919dde13cb0ecf") no-repeat -2px -1507px;
    }

    #playlist-tag {
        overflow: hidden;
        /* height: 25px; */
        /* background-color: skyblue; */
        font-size: 12px;
        line-height: 25px;
        color: #778CBC;
    }

    #playlist-tag span {
        float: left;
    }

    #playlist-tag .playlistTags {
        line-height: 12px;
        background-color: #F6F6F6;
        margin-left: 9px;
        padding: 2px 9px;
        border-radius: 15px;
        cursor: pointer;
        border: 1.5px solid #C1C1C1;
        margin-top: 3px;
    }

    #playlist-tag .playlistTags:hover {
        background-color: white;
    }

    #playlistIntroduction {
        /* height: 54px; */
        margin-top: 4px;
        /* background-color: skyblue; */
    }

    #playlistIntroduction p {
        font-size: 12px;
        line-height: 18px;
        white-space: pre-wrap;
        overflow: hidden;
        text-overflow: ellipsis;

    }

    #playlistIntroduction-unfurls {
        font-size: 12px;
        position: absolute;
        bottom: 0px;
        right: 0px;
        transform: translateY(100%);
        cursor: pointer;
        color: #0E75BF;
    }

    #playlistIntroduction-unfurls:hover {
        text-decoration: underline;
    }

    .isClose {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    #playlistdetailLeft-body {
        margin-top: 15px;
        /* height: 200px; */
        /* background-color: gray; */
    }

    #playlistdetailLeft-b-h {
        height: 33px;
        border-bottom: 2px solid #C20C0C;
        font-size: 12px;
        line-height: 33px;

    }

    #playlistdetailLeft-b-h span:nth-child(1) {
        font-size: 20px;
    }

    #playlistdetailLeft-b-h span:nth-child(2) {
        margin-left: 20px;
        color: #666666;
    }

    #playlistdetailLeft-b-h span:nth-child(3) {
        float: right;
        color: #666666;
        margin-top: 3px;
        white-space: pre-wrap;
    }

    #playlistdetailLeft-b-h span:nth-child(3) span {
        color: #C20C0C;
        font-size: 12px;
        font-weight: bold;
    }

    #playlistdetailLeft-b-b {
        /* height: 200px; */
        background-color: #FFFFFF;
    }

    #playlistdetailLeft-b-b table {
        margin-top: -1px;
        margin-top: 0px;
        width: 100%;
        border: 1px solid #D9D9D9;
        border-top: none;
        border-collapse: collapse;
        overflow: hidden;
    }

    #playlistdetailLeft-b-b table th {
        text-align: left;
        font-size: 12px;
        padding: 8px 10px;
        color: #666666;
        background-color: #F5F5F5;
        border-bottom: 2px solid #D8D8D8;
        border-right: 1px solid #d9d9d9;
    }

    #playlistdetailLeft-b-b table tr:nth-child(n+1) td {
        text-align: left;
        font-size: 12px;
        padding: 8px 10px;
    }

    #playlistdetailLeft-b-b table tr:nth-child(n+1) td:nth-child(1) span:nth-child(1) {
        width: 34px;
    }

    #playlistdetailLeft-b-b table tr:nth-child(n+1) td:nth-child(1) span:nth-child(2) {
        width: 20px;
        height: 17px;
        background-color: pink;
        background: url("https://s2.music.126.net/style/web2/img/table.png?3a5f37405892f2dbd5cfd501bf28124a") no-repeat 2px -103px;
    }

    #playlistdetailLeft-b-b table tr:nth-child(n+1) td:nth-child(1) span:nth-child(2):hover {
        background-position: 2px -128px;
    }

    #playlistdetailLeft-b-b table tr:nth-child(n+1) td:nth-child(2) span {
        width: 217px;
    }

    #playlistdetailLeft-b-b table tr:nth-child(n+1) td:nth-child(3) span {
        width: 90px;
    }

    #playlistdetailLeft-b-b table tr:nth-child(n+1) td:nth-child(4) span {
        width: 69px;
    }

    #playlistdetailLeft-b-b table tr:nth-child(n+1) td:nth-child(5) span {
        width: 107px;
    }

    #playlistdetailLeft-b-b table tr:nth-child(2n+2) td {
        background-color: #F7F7F7;
    }

    #playlistdetailLeft-b-b table tr:nth-child(n+1) td span {
        display: inline-block;
    }

    #playlistdetailLeft-b-b table tr:nth-child(n+1) td span {
        cursor: pointer;
    }

    #playlistdetailLeft-b-b table tr:nth-child(n+1) td #playlist-index {
        cursor: text;
    }

    #playlist-song-name:hover,
    #playlist-song-ar-name:hover,
    #playlist-song-al:hover {
        text-decoration: underline;
    }


    /* 歌曲名 歌手 专辑 文字溢出用省略号 */
    #playlistdetailLeft-b-b table tr:nth-child(n+1) td span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    #playlistdetailLeft-b-b table tr:nth-child(n+1) td .playlist-song-icon {
        /* display: inline-block; */
        display: none;
        width: 22.5px;
        height: 16px;
        margin-left: -3px;
        background: url("https://s2.music.126.net/style/web2/img/table.png?3a5f37405892f2dbd5cfd501bf28124a") no-repeat 2px -172px;

    }

    #playlistdetailLeft-b-b table tr:nth-child(n+1):hover .playlist-song-icon {
        display: inline-block;
        cursor: pointer;
    }

    #playlistdetailLeft-b-b table tr:nth-child(n+1):hover #playlist-song-dt {
        display: none;
    }

    #playlistdetailLeft-b-b table tr:nth-child(n+1) td .playlist-song-icon:nth-child(2):hover {
        background-position: -18px -172px;
    }

    #playlistdetailLeft-b-b table tr:nth-child(n+1) td .playlist-song-icon:nth-child(3) {
        background-position: 2px -193px;
    }

    #playlistdetailLeft-b-b table tr:nth-child(n+1) td .playlist-song-icon:nth-child(3):hover {
        background-position: -18px -193px;
    }

    #playlistdetailLeft-b-b table tr:nth-child(n+1) td .playlist-song-icon:nth-child(4) {
        background-position: -80px -172px;
    }

    #playlistdetailLeft-b-b table tr:nth-child(n+1) td .playlist-song-icon:nth-child(4):hover {
        background-position: -103px -172px;
    }

    #playlistdetailLeft-b-b table tr:nth-child(n+1) td .playlist-song-icon:nth-child(1) {
        background: url("https://s2.music.126.net/style/web2/img/icon.png?a3fac54832f2c8d83755e92cfc65f3e4") no-repeat 6px -697px;
    }

    #playlistdetailLeft-b-b table tr:nth-child(n+1) td .playlist-song-icon:nth-child(1):hover {
        background-position: -16px -697px;
    }

    /* 侧边栏 */
    .plut{
        font-size: 12px;
        font-weight: 700;
        border-bottom: 1px solid #CCCCCC;
        padding-bottom: 10px;
        margin-bottom: 20px;
    }
    #playlistdetailRight .pluser1{
        float: left;
        margin-left: 13px;
    }
    #playlistdetailRight .pluser2{
        margin-left: 0px;
    }
    .plut1{
        margin-top: 30px;
        font-size: 12px;
        font-weight: 700;
        border-bottom: 1px solid #CCCCCC;
        padding-bottom: 10px;
        margin-bottom: 20px;
    }
    .repl{
        margin-bottom: 15px;
    }
    .repl img{
        float: left;
    }
    .repl div{
        float: left;
        width: 145px;
        /* background-color: pink; */
        margin-left: 5px;

    }
    .repl div p:nth-child(1){
        font-size: 14px;
        cursor: pointer;
        padding: 3px 0px;
    }
    .repl div p:nth-child(1):hover{
        text-decoration: underline;
        

    }
    .repl div p:nth-child(2){
        font-size: 12px;
        padding: 3px 0px;
    }
    .repl div p:nth-child(2) span:nth-child(1){
        color: #99A6C4;
    }
    .repl div p:nth-child(2) span:nth-child(2){
        color: #666666;
        cursor: pointer;
        margin-left: 5px;

    }
    .repl div p:nth-child(2) span:nth-child(2):hover{
        text-decoration: underline;
    }



    /* 侧边栏end */
</style>