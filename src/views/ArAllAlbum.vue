<template>
    <div id="ar-al-con">
        <div v-for="(item,index) in albums" class="album-item">
            <img :src="item.picUrl+'?param=120y120'" alt="">
            <p class="ellipsis al-name" :title="item.name">{{item.name}}</p>
            <p class="al-pt">{{getPulishTime(item.publishTime)}}</p>
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
                <span>总页数：{{Math.ceil(this.total/12)}}</span>
                <span>跳转到：<input type="text" @keydown="jumpPage($event)"
                        oninput="value=value.replace(/[^\d]/g,'')" />页</span>
            </div>
        </div>
        <br style="clear:both">
    </div>
</template>

<script>
    export default {
        name: 'arallalbum',
        data() {
            return {
                artistId: '',
                // 专辑数量
                total: 0,
                // 专辑信息
                albums: [],
                // 当前页面
                currentPage:1,
            }
        },
        computed:{
            // 总页数
            totalPage(){
                return Math.ceil(this.total / 12)
            }
        },
        methods: {
            // 获取歌手id
            getArtistId() {
                this.artistId = this.$route.query.id
            },
            // 获取专辑信息
            getAlbum(num) {
                this.axios({
                    method: "get",
                    url: '/artist/album?limit=12&id=' + this.artistId + '&offset=' + (num - 1) * 12
                }).then(res => {
                    this.total = res.data.artist.albumSize
                    this.albums = res.data.hotAlbums
                }).catch(err => {
                    console.log("获取所有专辑失败")
                })
            },
            // 专辑出版日期格式化
            getPulishTime(num) {
                let time = new Date(num)
                let str = time.getFullYear() + '.' + (time.getMonth() + 1) + '.' + time.getDate() + " "
                return str
            },

            toPrePage() {
                console.log("点击了前一页")
                this.currentPage -= 1
                this.getAlbum(this.currentPage)
            },
            toNextPage() {

                console.log("点击了后一页")
                this.currentPage += 1
                this.getAlbum(this.currentPage)
            },
            toFirstPage() {
                console.log("点击了首页")
                this.getAlbum(1)

            },
            toTailPage() {
                console.log("点击了尾页")
                this.getAlbum(this.totalPage)
            },
            //跳转页面
            jumpPage(e) {
                if (e.keyCode == 13) {
                    let num = parseInt(e.target.value)
                    e.target.value = ''
                    if (num == this.currentPage) {
                        return
                    } else if (num >= this.totalPage) {
                        this.getAlbum(this.totalPage)
                    } else if (num <= 1) {
                        this.getAlbum(1)
                    } else {
                        this.getAlbum(num)
                    }
                }
            },

        },
        created() {
            // 获取歌手id
            this.getArtistId()
            // 获取专辑
            this.getAlbum(1)

        },
        mounted() {
            // 去除list背景
            let dom = document.getElementById("arConLList")
            for (let i = 0; i < dom.childNodes.length; i++) {
                if (1 == i) {
                    dom.childNodes[i].setAttribute("class", "ar-con-l-list-active")
                } else {
                    dom.childNodes[i].setAttribute("class", '')
                }
            }
        },

    }
</script>
<style>
    #ar-al-con{
        height: 660px;
        /* background-color: pink; */
    }
    .album-item {
        float: left;
        margin: 10px 0px 20px 53px;
    }
    .album-item:nth-child(1),
    .album-item:nth-child(5),
    .album-item:nth-child(9){
        margin-left: 0px;
    }

    .album-item img {
        vertical-align: bottom;
        margin-bottom: 10px;
    }

    .al-name{
        width: 120px;
        font-size: 14px;
        cursor: pointer;
        margin-bottom: 5px;
    }
    .al-name:hover{
        text-decoration: underline;
    }

    .al-pt {
        font-size: 12px;
        color: #666666;
    }
</style>