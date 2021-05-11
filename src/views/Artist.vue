<template>
    <div id="artist-con">
        <div id="artist-con-l">
            <div id="ar-con-l-t">
                <span>{{artist.name}}</span>
                <span>{{artist.transNames[0]}}</span>
            </div>
            <div id="ar-con-l-img">
                <img :src="artist.cover+'?param=640y300'" alt="" v-if="artist.cover!=null">
                <img src="http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg?param=640y300" alt="" v-else>
            </div>
            <div id="arConLList" ref="arConLList">
                <span @click="toHotWorks()">
                    热门作品
                </span>
                <span @click="toAllAls()">所有专辑</span>
                <span @click="toMv()">相关mv</span>
                <span @click="toDesc()">艺人介绍</span>
            </div>

            <router-view></router-view>

        </div>

        <!-- 热门歌手 -->
        <div id="artist-con-r">
            <div id="artist-con-r-t">
                <span>热门歌手</span>
            </div>
            <div id="a-c-r-c">
                <div :class="{'artist-con-r-item':true,'a-c-r-i-l':index%3==0}" v-for="(item,index) in hotArtists">
                    <img :src="item.img1v1Url+'?param=50y50'" alt="" :title="item.name" @click="toArtist(item.id)">
                    <p :title="item.name" @click="item.id">{{item.name}}</p>
                </div>
                <br style="clear:both;">
            </div>

        </div>
        <br style="clear: both;">
    </div>
</template>

<script>
    export default {
        name: 'artist',
        data() {
            return {
                // 歌手id
                artistId: '',
                // 歌手基本信息
                artist: {
                    id: '',
                    cover: '',
                    name: '',
                    transNames: []
                },
                // 热门歌手
                hotArtists: [
                    {
                        name: '',
                        id: '',
                        img1v1Url: ''
                    }
                ]

            }

        },
        methods: {
            // 获取歌手姓名 图片
            getArtistMsg() {
                this.axios({
                    method: 'get',
                    url: '/artist/detail?id=' + this.artistId
                }).then(res => {
                    // console.log(res.data.data)
                    this.artist = res.data.data.artist
                }).catch(err => {
                    console.log("获取歌手数据失败")
                })
            },
            // 热门歌手
            getHotArtist() {
                this.axios({
                    method: 'get',
                    url: '/top/artists?offset=0&limit=6'
                }).then(res => {
                    this.hotArtists = res.data.artists
                }).catch(err => {
                    console.log("获取热门歌手失败")
                })
            },
            // 进入歌手详情
            toArtist(id) {
                this.$router.push({ path: '/discover/artist', query: { id: id } })
            },
            // 改变被点击list的背景
            changecolor(num) {
                let dom = this.$refs.arConLList
                for (let i = 0; i < dom.childNodes.length; i++) {
                    if (num == i) {
                        dom.childNodes[i].setAttribute("class", "ar-con-l-list-active")
                    } else {
                        dom.childNodes[i].setAttribute("class", '')
                    }
                }
            },
            // 点击list
            toHotWorks() {
                this.$router.push({ path: '/discover/artist/arhotworks', query: { id: this.artistId } })
            },
            toAllAls() {
                this.$router.push({ path: '/discover/artist/album', query: { id: this.artistId } })
            },
            toMv() {
                this.$router.push({ path: '/discover/artist/mv', query: { id: this.artistId } })
            },
            toDesc() {
                this.$router.push({ path: '/discover/artist/desc', query: { id: this.artistId } })
            }
        },
        created() {
            window.scrollTo(0, 0)
            //获取歌手id
            this.artistId = parseInt(this.$route.query.id)
            //去掉header的背景
            let li = document.getElementById("discoverlittleList").childNodes
            for (let i = 0; i < li.length; i++) {
                li[i].setAttribute("class", '')
            }
            // 获取歌手信息
            this.getArtistMsg()
            // 获取热门歌手
            this.getHotArtist()
        },
    }
</script>

<style>
    #artist-con {
        width: 980px;
        /* height: 1200px; */
        margin: 0 auto;
        border: 1px solid #D3D3D3;
        border-top: none;
        background-color: #FFFFFF;
        /* background-color: red; */
    }

    #artist-con-l {
        width: 640px;
        /* height: 1000px; */
        float: left;
        border-right: 1px solid #D3D3D3;
        padding: 47px 30px 40px 39px;
        /* background-color: pink; */
    }

    #artist-con-r {
        width: 200px;
        height: 100%;
        float: left;
        padding: 20px 40px 40px 30px;
        /* background-color: yellow; */
    }

    #ar-con-l-t {
        height: 34px;
        /* background-color: skyblue; */
    }

    #ar-con-l-t span:nth-child(1) {
        font-size: 24px;
        line-height: 13px;

    }

    #ar-con-l-t span:nth-child(2) {
        font-size: 14px;
        color: #999999;
        margin-left: 20px;
    }

    #ar-con-l-img img {
        vertical-align: bottom;
    }

    #arConLList {
        height: 39px;
        background-color: #F7F7F7;
        line-height: 39px;
        font-size: 14px;
        border: 1px solid #cccccc;
        border-top: none;
        /* overflow: hidden; */
        margin-bottom: 10px;
    }

    #arConLList span {
        float: left;
        padding: 0 42px;
        cursor: pointer;
        border-top: 2px solid #cccccc;
    }

    #arConLList span:hover {
        border-top: 2px solid red;
    }

    /* 处于活跃状态的类 */
    #arConLList .ar-con-l-list-active {
        border-top: 2px solid red;
        background-color: #FDFDFD;
    }

    #artist-con-r-t {
        height: 24px;
        font-size: 12px;
        font-weight: 700;
        border-bottom: 1px solid #cccccc;
    }

    #a-c-r-c {
        margin-top: 36px;
    }

    .artist-con-r-item {
        float: left;
        margin-left: 25px;
    }

    .artist-con-r-item:nth-child(n+4) {
        margin-top: 30px;
    }

    .a-c-r-i-l {
        margin-left: 0;
    }

    .artist-con-r-item img,
    .artist-con-r-item p {
        cursor: pointer;
    }

    .artist-con-r-item p {
        width: 50px;
        font-size: 12px;
        color: #333333;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
    }

    .artist-con-r-item p:hover {
        text-decoration: underline;
    }
</style>