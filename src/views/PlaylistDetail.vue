<template>
    <div id="playlistdetailCon">
        <div id="playlistdetailLeft">
            <div id="playlistdetailLeft-header">
                <div id="playlistdetailLeft-header-left">
                    <img :src="data.playlist.coverImgUrl" alt="">
                </div>
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
                        <span>({{data.playlist.subscribedCount}})</span>
                        <span>({{data.playlist.shareCount}})</span>
                        <span>下载</span>
                        <span>({{data.playlist.commentCount}})</span>
                    </div>
                    <div id="playlist-tag" v-if="data.playlist.tags.length!=0">
                        <span>标签:</span>
                        <span class="playlistTags" v-for="(item,index) in data.playlist.tags">
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
                                <span id="playlist-play" @click="playMusic(item.id)">                                
                                </span>
                            </td>
                            <td>
                                <span id="playlist-song-name">
                                    {{item.name}}
                                </span>
                            </td>
                            <td>
                                <span id="playlist-song-dt">
                                    {{getDt(item.dt)}}
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
        </div>
        <div id="playlistdetailRight"></div>
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
                height: 0


            }
        },
        computed: {
            //日期格式化
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

        },
        methods: {


            //获取歌单详情数据
            getDetailData() {
                this.axios({
                    method: 'get',
                    url: '/playlist/detail?id=' + this.playlistId
                }).then(res => {
                    console.log(res.data)
                    this.data = res.data



                }).catch(err => {
                    console.log("请求歌曲详情数据失败")
                })

            },
            //点击歌单展开后
            clickMore() {
                console.log("点击了展开")
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
            playMusic(id){
                console.log("点击了播放图标",id)
                
            }
        },

        created() {
            window.scrollTo(0, 0)
            console.log(this.$route.query.id)
            //获取歌单id
            this.playlistId = parseInt(this.$route.query.id)
            //去掉header的背景
            let li = document.getElementById("discoverlittleList").childNodes
            for (let i = 0; i < li.length; i++) {
                li[i].setAttribute("class", '')
            }
            //获取歌单数据
            this.getDetailData()

        },
        mounted() {
            console.log("到了挂载阶段")
        },
        updated() {
            console.log("页面修改了")
            this.$nextTick(() => {
                let p = document.getElementById("playlistIntroduction").childNodes[0]
                if (this.count == 0) {
                    this.height = p.clientHeight
                }
                this.isOPenShow = this.height < p.scrollHeight
                this.count++
                console.log(p)
                console.log(p.clientHeight, p.clientWidth)
                console.log(p.offsetHeight, p.offsetWidth)
                console.log(p.scrollHeight)
            })
        },


    }
</script>

<style>
    #playlistdetailCon {
        overflow: hidden;
        width: 980px;
        height: 3366px;
        background-color: #FFFFFF;
        margin: 0 auto;
        border-left: 1px solid #D3D3D3;
        border-right: 1px solid #D3D3D3;
    }

    #playlistdetailLeft {
        float: left;
        width: 640px;
        height: 1000px;
        border-right: 1px solid #D3D3D3;
        padding: 47px 30px 40px 39px;
        background-color: pink;
    }

    #playlistdetailRight {
        width: 270px;
        height: 500px;
        background-color: yellow;
        float: left;
    }

    #playlistdetailLeft-header {
        width: 100%;
        /* overflow: hidden; */
        /* height: 247px; */
        /* background-color: yellow; */
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
        height: 24px;
        /* background-color: gray; */
        margin-bottom: 12px;
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
    #playlistdetailLeft-b-b table tr:nth-child(n+1) td:nth-child(1) span:nth-child(2):hover{
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
</style>