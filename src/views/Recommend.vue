<template>
    <div>
        <!-- 轮播图 -->
        <rotation></rotation>
        <!-- 热门推荐 -->
        <div class="re-con">
            <div class="reco-l">
                <!-- 首页热门推荐 -->
                <div>
                    <div class="topPicksHeader">
                        <div class="rmtj" @click="toAllPlayList()">
                            热门推荐
                        </div>

                        <div class="topPicksCategory">
                            <a class="Classification">华语</a>|
                            <a class="Classification">流行</a>|
                            <a class="Classification">摇滚</a>|
                            <a class="Classification">民谣</a>|
                            <a class="Classification">电子</a>
                            <a class="Classification" @click="toAllPlayList()">更多</a>
                        </div>
                        <br style="clear: both;">
                    </div>

                    <!-- 首页热门推荐歌单展示部分 -->
                    <div>
                        <div v-for="(item,index) in hotplaylist" :class="{'h-p-f':true,'h-p-f-b':index%4==0}"
                            :title="item.name">
                            <img :src="item.picUrl+'?param=140y140'" alt="" @click="toAllPlayListDetail(item.id)">
                            <p @click="toAllPlayListDetail(item.id)">{{item.name}}</p>
                            <div>
                                <span class="playlistPerNumLogo"></span>
                                <span>{{getPlayCount(item.playCount)}}</span>
                                <span class="playlistPlayLogo"></span>
                            </div>
                        </div>
                        <br style="clear: both;">
                    </div>
                </div>


                <!-- 个性化推荐 登陆后 -->
                <div>

                </div>

                <!-- 新碟上架 -->
                <div>
                    <div class="topPicksHeader">
                        <div class="rmtj" @click="toAllAl()">
                            新碟上架
                        </div>
                        <div class="topPicksCategory">
                            <a class="Classification f-new-al-more" @click="toAllAl()">更多</a>
                        </div>
                        <br style="clear: both;">
                    </div>
                    <div class="f-nal-b">
                        <span class="fnalLLogo fnalLLogo1" @click="toLeft()"></span>
                        <div class="f-nal-bb">
                            <div v-for="(item,index) in hotAl.slice(0,10)"
                                :class="{'f-nal-b-item':true,'f-nal-b-item-b':index%5==0}">
                                <img :src="item.picUrl+'?param=100y100'" alt="" @click="toAlDetail(item.id)">
                                <p class="ellipsis" :title="item.name" @click="toAlDetail(item.id)">{{item.name}}</p>
                                <p class="ellipsis"><span v-for="item1 in item.artists" :title="item1.name"
                                        @click="toArDetail(item1.id)">{{item1.name }}</span></p>
                            </div>
                        </div>
                        <span class="fnalRLogo fnalRLogo1" @click="toRight()"></span>


                    </div>

                </div>

                <!-- 榜单 -->
                <div>
                    <div class="topPicksHeader">
                        <div class="rmtj" @click="toTopList(19723756)">
                            榜单
                        </div>
                        <div class="topPicksCategory">
                            <a class="Classification f-new-al-more" @click="toTopList(19723756)">更多</a>
                        </div>
                        <br style="clear: both;">
                    </div>

                    <div class="ftlb">
                        <!-- 飙升榜 -->
                        <div>
                            <div class="f-img-con">
                                <img src="https://p1.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=80y80"
                                    alt="" @click="toTopList(19723756)">
                            </div>
                            <div class="f-img-conR">
                                <p @click="toTopList(19723756)">飙升榜</p>
                                <span class="ftpbfLogo" title="播放"></span>
                                <span class="ftpscLogo" title="收藏"></span>
                            </div>

                            <div class="ftlDetail">
                                <div v-for="(item,index) in toplistData[0].slice(0,10)" class="ftpDetail-item">
                                    <span class="ftpnum">{{index+1}}</span>
                                    <span class="ftpname ellipsis" :title="item.name" @click="tosongDetail(item.id)">{{item.name}}</span>
                                </div>
                            </div>
                            <br style="clear: both;">
                        </div>

                        <!-- 新歌榜 -->
                        <div>
                            <div class="f-img-con">
                                <img src="https://p1.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg?param=80y80"
                                    alt="" @click="toTopList(3779629)">
                            </div>
                            <div class="f-img-conR">
                                <p @click="toTopList(3779629)">新歌榜</p>
                                <span class="ftpbfLogo" title="播放"></span>
                                <span class="ftpscLogo" title="收藏"></span>
                            </div>

                            <div class="ftlDetail">
                                <div v-for="(item,index) in toplistData[1].slice(0,10)" class="ftpDetail-item">
                                    <span class="ftpnum">{{index+1}}</span>
                                    <span class="ftpname ellipsis" :title="item.name" @click="tosongDetail(item.id)">{{item.name}}</span>
                                </div>
                            </div>
                            <br style="clear: both;">
                            
                        </div>
                        <!-- 原创榜 -->
                        <div>
                            <div class="f-img-con">
                                <img src="https://p1.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg?param=80y80"
                                    alt="" @click="toTopList(2884035)">
                            </div>
                            <div class="f-img-conR">
                                <p @click="toTopList(2884035)">原创榜</p>
                                <span class="ftpbfLogo" title="播放"></span>
                                <span class="ftpscLogo" title="收藏"></span>
                            </div>

                            <div class="ftlDetail">
                                <div v-for="(item,index) in toplistData[2].slice(0,10)" class="ftpDetail-item">
                                    <span class="ftpnum">{{index+1}}</span>
                                    <span class="ftpname ellipsis" :title="item.name" @click="tosongDetail(item.id)">{{item.name}}</span>
                                </div>
                            </div>
                            <br style="clear: both;">
                        </div>
                        <br style="clear: both;">
                    </div>

                </div>






            </div>
            <div class="reco-r">
                右
            </div>

        </div>



    </div>
</template>

<script scope>
    import rotation from "../components/Rotation.vue"
    export default {
        name: 'recommend',
        data() {
            return {
                // 热门推荐歌单
                hotplaylist: [],
                // 热门新碟
                hotAl: [],
                indent: 0,
                // 榜单数据
                toplistData: [
                    [
                        {
                            name: '',
                            id: ''
                        }
                    ],
                    [
                        {
                            name: '',
                            id: ''
                        }
                    ],
                    [
                        {
                            name: '',
                            id: ''
                        }
                    ]
                ]
            }
        },
        methods: {
            // 点击更多进入歌单路由
            toAllPlayList() {
                console.log("进入到歌单组件")
                this.$router.push("/discover/playlist")
            },
            // 点击更多进入专辑路由
            toAllAl() {
                this.$router.push("/discover/albums")
            },
            // 获取热门推荐歌单
            getHotPlaylist() {
                this.axios({
                    method: 'get',
                    url: '/personalized?limit=8'
                }).then(res => {
                    this.hotplaylist = res.data.result

                }).catch(err => {
                    console.log("获取热门推荐歌单失败")
                })

            },
            // 进入歌单详情
            toAllPlayListDetail(id) {
                this.$router.push({ path: '/discover/playlistdetail', query: { id: id } })
            },
            // 格式化歌单播放数
            getPlayCount(num) {
                num = parseInt(num)
                if (num < 100000) {
                    return num
                } else {
                    let a = Math.floor(num / 10000)
                    return a + '万'
                }

            },
            // 获取新碟上架数据
            getHotAl() {
                this.axios({
                    method: 'get',
                    url: '/album/newest'
                }).then(res => {
                    this.hotAl = res.data.albums
                }).catch(err => {
                    console.log("获取热门新碟数据失败")
                })
            },
            // 新碟上架左移
            toLeft() {
                let dom = document.querySelector('.f-nal-bb')
                if (this.indent == 0) {
                    this.indent = this.indent - 610
                } else {
                    this.indent = 0
                }
                dom.style.textIndent = this.indent + 'px'

            },
            // 新碟上架右移
            toRight() {
                let dom = document.querySelector('.f-nal-bb')
                if (this.indent == 0) {
                    this.indent = this.indent - 610
                } else {
                    this.indent = 0
                }
                dom.style.textIndent = this.indent + 'px'

            },
            // 进入专辑详情
            toAlDetail(id) {
                this.$router.push({ path: '/discover/album', query: { id: id } })
            },
            // 进入歌手详情
            toArDetail(id) {
                this.$router.push({ path: '/discover/artist', query: { id: id } })
            },
            // 获取榜单数据
            gettpData() {
                this.axios({
                    method: 'get',
                    url: '/playlist/detail?id=19723756'
                }).then(res => {
                    this.toplistData[0] = res.data.playlist.tracks
                }).catch(err => {
                    console.log("获取飙升榜数据失败")
                })

                this.axios({
                    method: 'get',
                    url: '/playlist/detail?id=3779629'
                }).then(res => {
                    this.toplistData[1] = res.data.playlist.tracks
                }).catch(err => {
                    console.log("获取新歌榜数据失败")
                })

                this.axios({
                    method: 'get',
                    url: '/playlist/detail?id=2884035'
                }).then(res => {
                    this.toplistData[2] = res.data.playlist.tracks
                }).catch(err => {
                    console.log("获取原创榜数据失败")
                })
            },
            // 进入榜单
            toTopList(id){
                this.$router.push({path:'/discover/toplist',query:{id:id}})
            },
            // 进入歌曲详情
            tosongDetail(id){
                this.$router.push({path:'/discover/song',query:{id:id}})
            }

        },
        components: {
            rotation
        },
        created() {
            // 获取热门歌单
            this.getHotPlaylist()
            // 获取热门新碟上架
            this.getHotAl()
            // 获取榜单数据
            this.gettpData()
        },

    }
</script>
<style>
    .re-con {
        width: 983px;
        height: 1600px;
        margin: 0 auto;
        border: 1px solid #D3D3D3;
        border-top: none;
        background-color: #FFFFFF;
    }

    .reco-l {
        width: 689px;
        float: left;
        border-right: 1px solid #D3D3D3;
        padding: 20px 20px 0px 20px;

    }

    .reco-r {
        width: 180px;
        height: 100%;
        float: left;
        padding: 20px 40px 0px 30px;
    }


    /* 首页热门推荐 */
    .topPicksHeader {
        height: 35px;
        background: #FFFFFF url('https://s2.music.126.net/style/web2/img/index/index.png?2328d8e5c76bbf74805cb85f12bf8a16') no-repeat -222px -153px;
        border-bottom: 2px solid #C10D0C;
        margin-bottom: 15px;
    }

    .topPicksHeader .rmtj {
        float: left;
        margin-left: 39px;
        font-size: 20px;
        color: #000;
        line-height: 32px;
        cursor: pointer;
    }

    .topPicksCategory {
        position: relative;
        float: left;
        width: 550px;
        margin-left: 15px;
        color: #666666;
        font-size: 12px;
        background: url('https://s2.music.126.net/style/web2/img/index/index.png?2328d8e5c76bbf74805cb85f12bf8a16') no-repeat 516px -228px;
    }

    .topPicksCategory a {
        line-height: 35px;
        font-size: 12px;
        color: #666666;
        margin: 0 10px;
        cursor: pointer;
    }

    .topPicksCategory a:last-child {
        margin: 0px 0px 0px 240px;
    }

    .Classification:hover {
        text-decoration: underline;
    }


    .h-p-f {
        float: left;
        margin-left: 43px;
        margin-bottom: 20px;
        position: relative;
    }

    .h-p-f img {
        cursor: pointer;
    }

    .h-p-f div {
        position: absolute;
        top: 113px;
        left: 0;
        width: 140px;
        height: 27px;
        background-color: rgb(0, 0, 0, .3);
    }

    .h-p-f div span {
        font-size: 12px;
        color: #CCCCCC;
        line-height: 27px;
    }

    .h-p-f div span:nth-child(1) {
        margin-left: 10px;
    }

    .h-p-f div span:nth-child(2) {
        margin-left: 2px;
    }

    .h-p-f div span:nth-child(3) {
        position: absolute;
        right: 2px;
        top: 5px;
    }

    .h-p-f-b {
        margin-left: 0px;
    }

    .h-p-f img {
        vertical-align: bottom;
    }

    /* 显示三行 */
    .h-p-f p {
        font-size: 14px;
        width: 140px;
        height: 54px;
        margin-top: 5px;
        overflow: hidden;
        text-overflow: ellipsis;

        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        cursor: pointer;
    }

    .h-p-f p:hover {
        text-decoration: underline;
    }

    /* 首页热门推荐end */

    /* 首页新碟上架 */

    .topPicksHeader .topPicksCategory .f-new-al-more {
        margin-left: 480px;
    }

    .f-nal-b {
        position: relative;
        height: 156px;
        background-color: #F5F5F5;
        border: 1px solid #D3D3D3;
        padding: 20px 30px 0px 30px;
        margin-bottom: 30px;
    }

    .f-nal-bb {
        overflow: hidden;
        white-space: nowrap;
        transition: text-indent 0.5s;

    }

    .f-nal-b-item {
        text-indent: 0px;
        display: inline-block;
        margin-left: 22px;
    }

    /* .f-nal-b-item-b{
        margin-left: 0px;
    } */
    .f-nal-b-item img {
        vertical-align: bottom;
    }

    .f-nal-b-item p {
        width: 100px;
        font-size: 12px;
        margin-top: 5px;
        cursor: pointer;
    }

    .f-nal-b-item p:hover {
        text-decoration: underline;
    }

    .f-nal-b-item p:nth-child(3) {
        color: #666666;
    }

    .fnalLLogo1 {
        position: absolute;
        top: 60px;
        left: 6px;

    }

    .fnalRLogo1 {
        position: absolute;
        top: 60px;
        right: 6px;
    }

    /* 首页新碟上架end */

    /* 首页榜单 */
    .ftlb {
        background-color: #F4F4F4;
        /* height: 300px; */
        border: 1px solid #C7C7C7;

    }

    .ftlb>div {
        float: left;
        width: 228px;
        border-right: 1px solid #C7C7C7;
        /* padding: 20px 0px 0px 19px; */
    }

    .ftlb>div:nth-child(3) {
        border-right: none;
    }

    .ftlb .f-img-con,
    .ftlb .f-img-conR {
        float: left;
        height: 100px;
        margin: 20px 0px 0px 19px;
    }

    .ftlb .f-img-con {
        width: 80px;
    }

    .ftlb .f-img-conR {
        width: 115px;
        margin-left: 10px;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
    }

    .f-img-conR p {
        margin-top: 5px;
        margin-bottom: 8px;
    }

    .f-img-conR p:hover {
        text-decoration: underline;
    }

    .f-img-conR span:nth-child(3) {
        margin-left: 15px;
    }

    .ftlDetail {
        float: left;
        font-size: 12px;
        line-height: 26px;
    }
    .ftlDetail>div{
        position: relative;
    }
    .ftlDetail div:nth-child(odd) {
        background-color: #E8E8E8;
    }

    .ftlDetail .ftpnum {
        margin-left: 19px;
        display: inline-block;
        width: 12px;
        height: 26px;
        vertical-align: middle;
        text-align: center;

    }

    .ftlDetail .ftpname{
        display: inline-block;
        margin-left: 5px;
        width: 192px;
        height: 26px;
        overflow: hidden;
        vertical-align: middle;
        cursor: pointer;
    }
   
    .ftlDetail .ftpname:hover {
        text-decoration: underline;
    }
    /* 首页榜单end */
</style>