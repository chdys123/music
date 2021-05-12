<template>
    <div>
        <div id="a-h-w-t">
            <span @click="musicPlay()">播放</span>
            <span @click="addQueue()" title="添加到播放列表"></span>
            <span>收藏</span>
        </div>

        <div class="a-h-w-b-item" v-for="(item,index) in hotSongs">
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

            <span :title="item.al.name">{{item.al.name}}</span>
            <br style="clear:both">

        </div>



    </div>
</template>
<script>
    export default {
        name: 'arhotworks',
        data() {
            return {
                artistId: '',
                hotSongs: []
            }
        },
        methods: {
            // 获取歌手id
            getArtistId() {
                this.artistId = this.$route.query.id
                // console.log(this.artistId)
            },
            // 获取歌手歌曲信息
            getArtistSongs() {
                this.axios({
                    method: "get",
                    url: '/artists?id=' + this.artistId
                }).then(res => {
                    // console.log(res.data.hotSongs)
                    this.hotSongs = res.data.hotSongs
                }).catch(err => {
                    console.log("获取歌手歌曲失败")
                })
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
            // 获取歌手id
            this.getArtistId()


            // 获取热门单曲信息
            this.getArtistSongs()



        },
        mounted() {
            // 去除list背景
            let dom = document.getElementById("arConLList")
            for (let i = 0; i < dom.childNodes.length; i++) {
                if (0 == i) {
                    dom.childNodes[i].setAttribute("class", "ar-con-l-list-active")
                } else {
                    dom.childNodes[i].setAttribute("class", '')
                }
            }

        }
    }
</script>
<style>
    /* 一排按钮 收藏... */
    #a-h-w-t {
        height: 31px;
        margin-top: 12px;
        margin-bottom: 25px;
    }

    #a-h-w-t span {
        float: left;
        line-height: 31px;
        height: 31px;
        font-size: 12px;
        cursor: pointer;
    }

    #a-h-w-t span:nth-child(1) {
        width: 25px;
        padding-left: 35px;
        padding-right: 5px;
        background: url("https://s2.music.126.net/style/web2/img/button2.png?521a1ed38fd91718f2919dde13cb0ecf") no-repeat 0px -632px;
        color: white;
        line-height: 33px;
    }

    #a-h-w-t span:nth-child(2) {
        width: 31px;
        background: url("https://s2.music.126.net/style/web2/img/button2.png?521a1ed38fd91718f2919dde13cb0ecf") no-repeat 0px -1587px;

    }

    #a-h-w-t span:nth-child(3) {
        padding: 0 9px 0 24px;
        margin-left: 8px;
        font-size: 12px;
        border-left: 1px solid #C4C4C4;
        border-right: 1px solid #C4C4C4;
        border-radius: 4px;
        font-weight: 400;
        background: #C8C6C6 url("https://s2.music.126.net/style/web2/img/button2.png?521a1ed38fd91718f2919dde13cb0ecf") no-repeat;
    }

    #a-h-w-t span:nth-child(3) {
        background-position: -2px -1062px;
    }




   
</style>