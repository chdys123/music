<template>
    <div id="playlistCon">
        <div id="playlistHeader">
            <span id="typespan">{{playlistType}}</span>
            <span id="ChooseType" @click="isShow()">选择分类</span>
            <span id="hotplaylist">热门</span>
            <div class="category" id="category" v-show="show">
                <p class="cat-h"><span @click="getdata('全部')">全部风格</span></p>
                <div>
                    <div class="cat-hh">
                        <span class="fg1"></span> <span class="cat-hhh">语种</span>
                    </div>
                    <div class="cat-item">
                        <span v-for="item in catlist[0]">
                            <span @click="getdata(item)">{{item}}</span>|
                        </span>
                    </div>
                    <br style="clear: both;">
                </div>
                <div>
                    <div class="cat-hh">
                        <span class="fg2"></span><span class="cat-hhh">风格</span>
                    </div>
                    <div class="cat-item">
                        <span v-for="item in catlist[1]">
                            <span @click="getdata(item)">{{item}}</span>|
                        </span>
                    </div>
                    <br style="clear: both;">
                </div>
                <div>
                    <div class="cat-hh">
                        <span class="fg3"></span><span class="cat-hhh">场景</span>
                    </div>
                    <div class="cat-item">
                        <span v-for="item in catlist[2]">
                            <span @click="getdata(item)">{{item}}</span>|
                        </span>
                    </div>
                    <br style="clear: both;">
                </div>
                <div>
                    <div class="cat-hh">
                        <span class="fg4"></span><span class="cat-hhh">情感</span>
                    </div>
                    <div class="cat-item">
                        <span v-for="item in catlist[3]">
                            <span @click="getdata(item)">{{item}}</span>|
                        </span>
                    </div>
                    <br style="clear: both;">
                </div>
                <div>
                    <div class="cat-hh">
                        <span class="fg5"></span><span class="cat-hhh">主题</span>
                    </div>
                    <div class="cat-item">
                        <span v-for="item in catlist[4]">
                            <span @click="getdata(item)">{{item}}</span>|
                        </span>
                    </div>
                    <br style="clear: both;">
                </div>
            </div>

        </div>
        <div id="playlistBody">
            <ul>
                <li v-for="(item,index) in playlistData.playlists" :class="{Edge:index%5==0}">
                    <img :src="item.coverImgUrl" alt="" @click="toplaylist(item.id)">
                    <div id="playlistMsk">
                        <span></span>
                        {{parseInt(item.playCount/10000)}}万
                        <span></span>
                    </div>
                    <p id="playlistName" @click="toplaylist(item.id)">{{item.name}}</p>
                    <span id="by">by</span><span id="creatorNickname">{{item.creator.nickname}}</span>
                </li>
                <br style="clear: both;">
            </ul>
        </div>

        <!-- 分页 -->
        <div class="f-page">
            <div class="f-page-c">
                <a @click="toFirstPage()" :class="{'disable':this.currentPage==1}">首页</a>
                <a @click="toPrePage()" :class="{'disable':this.currentPage==1}">&lt;上一页</a>
                <a @click="toNextPage()"
                    :class="{'disable':this.currentPage==this.totalPage||this.totalPage==1}">下一页&gt;</a>
                <a @click="toTailPage()" :class="{'disable':this.currentPage==this.totalPage||this.totalPage==1}">尾页</a>
                <span>当前页：{{this.currentPage}}</span>
                <span>总页数：{{totalPage}}</span>
                <span>跳转到：<input type="text" @keydown="jumpPage($event)"
                        oninput="value=value.replace(/[^\d]/g,'')" />页</span>
            </div>
        </div>
        <!-- 分页结束 -->
    </div>
</template>

<script>
    export default {
        name: 'playlist',
        data() {
            return {
                playlistType: "全部",
                playlistData: {},
                // 歌单分类
                catlist: [
                    [], [], [], [], []
                ],
                // 是否显示歌单分类
                show:false,
                total: 0,
                currentPage: 1

            }
        },
        computed: {
            // 总页数
            totalPage() {
                return Math.ceil(this.total / 35)
            }

        },
        methods: {
            // 显示歌单分类
            isShow() {
                this.show=!this.show
                console.log("点击了",this.show)
            },
            //点击后背景颜色改变
            changeBgc(num) {
                let li = document.getElementById("discoverlittleList").childNodes
                for (let i = 0; i < li.length; i++) {
                    if (i == num - 1) {
                        //加上liBgc类
                        li[i].setAttribute("class", "liBgc")
                    } else {
                        li[i].setAttribute("class", "")
                    }
                }
            },
        
            // 点击歌单类型 获取数据
            getdata(type){
                this.playlistType = type
                this.getAll(1)
            },

            // 获取全部新碟
            getAll(num) {
                this.currentPage = num
                this.axios({
                    method: 'get',
                    url: '/top/playlist?limit=35&order=hot&cat=' + this.playlistType+'&offset='+(num-1)*35
                }).then(res => {
                    this.playlistData = res.data
                    this.total = res.data.total
                }).catch(err => {
                    console.log("请求歌单信息失败")
                    
                })
            },
            //进入歌单详情
            toplaylist(id) {
                console.log("进入歌单详情页面")

                //传参数过去
                this.$router.push({ path: "/discover/playlistdetail", query: { id: id } })
            },
            // 获取歌单分类
            getcatlist() {
                this.axios({
                    method: 'get',
                    url: '/playlist/catlist'
                }).then(res => {
                    let len = res.data.sub.length
                    for (let i = 0; i < len; i++) {
                        this.catlist[res.data.sub[i].category].push(res.data.sub[i].name)
                    }
                }).catch(err => {
                    console.log("获取歌单分类失败")
                })
            },

            // 分页
            // 前一页
            toPrePage() {
                console.log("点击了前一页")
                this.currentPage -= 1
                this.getAll(this.currentPage)
            },
            toNextPage() {

                console.log("点击了后一页")
                this.currentPage += 1
                this.getAll(this.currentPage)
            },
            toFirstPage() {
                console.log("点击了首页")
                this.getAll(1)

            },
            toTailPage() {
                console.log("点击了尾页")
                this.getAll(this.totalPage)
            },
            //跳转页面
            jumpPage(e) {
                if (e.keyCode == 13) {
                    let num = parseInt(e.target.value)
                    e.target.value = ''
                    if (num == this.currentPage) {
                        return
                    } else if (num >= this.totalPage) {
                        this.getAll(this.totalPage)
                    } else if (num <= 1) {
                        this.getAll(1)
                    } else {
                        this.getAll(num)
                    }
                }
            },
        },
        created() {
            window.scrollTo(0, 0)
            //取出哪些路由传过来的歌单类型数据 赋值给this.playlistType
            this.playlistType = this.$route.query.type
            this.changeBgc(3)
            // 获取歌单信息
            this.getAll(1)
            // 获取歌单分类
            this.getcatlist()
        },
        mounted() {
            let that = this
            this.$nextTick(function () {
                // 监听点击其他地方 歌单分类消失
                window.addEventListener("click", function (e) {
                    if (e.target.getAttribute('class') != 'category' && e.target.getAttribute('id') != 'ChooseType') {
                        // console.log("消失")
                        that.show=false
                    }
                })
            })

        },
    }
</script>

<style>
    #playlistCon {
        width: 900px;
        /* height: 1744px; */
        background-color: #FFFFFF;
        margin: 0 auto;
        padding: 40px;
        /* padding-bottom: 0; */
        border: 1px solid #D3D3D3;
        border-top: none;
    }
    #playlistHeader {
        position: relative;
        width: 900px;
        height: 42px;
        border-bottom: 2px solid #C20C0C;
    }

    #typespan {
        font-size: 24px;
        line-height: 42px;
    }

    #ChooseType {
        display: inline-block;
        margin-left: 20px;
        padding: 6px 22px;
        font-size: 12px;
        color: #0C73C2;
        background-color: #F6F6F6;
        cursor: pointer;
        border: 1px solid #C4C4C4;
        border-radius: 4px;
        transform: translateY(-5px);

    }

    #ChooseType:hover {
        background-color: white;
    }

    #hotplaylist {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        padding: 6px;
        background-color: #D20C0D;
        border-radius: 4px;
        color: white;
        font-size: 12px;
        cursor: pointer;
    }

    #hotplaylist:hover {
        text-decoration: underline;
    }

    /* 歌单分类 */
    .category {
        position: absolute;
        width: 700px;
        height: 390px;
        background-color: #FFFFFF;
        top: 45px;
        left: -34px;
        z-index: 10;
        border-radius: 5px;
        border: 2px solid #DEDEDE;
    }

    .cat-h {
        height: 50px;
        /* background-color: pink; */
        border-bottom: 1px solid #BEBEBE;
    }

    .cat-h span {
        display: inline-block;
        padding: 5px 10px;
        margin: 10px 0px 0px 30px;
        font-size: 12px;
        border: 2px solid #BEBEBE;
        border-radius: 5px;
        cursor: pointer;

    }

    .cat-h span:hover {
        text-decoration: underline;
    }

    .cat-hh,
    .cat-item {
        float: left;
    }

    .cat-hh {
        width: 96px;
        /* background-color: pink; */
        font-size: 12px;
        font-weight: 700;
    }

    .cat-hh span:nth-child(1) {
        float: left;
        /* background-color: gray; */
        width: 23px;
        height: 23px;
        margin-left: 24px;
        margin-top: 6px;
    }

    .cat-hhh {
        float: right;
        padding: 10px;
        margin-right: 5px;
        /* background-color: green; */
    }

    .cat-item {
        width: 600px;
        /* background-color: yellow; */
        border-left: 1px solid #BEBEBE;
        font-size: 12px;
    }

    .cat-item>span>span {
        display: inline-block;
        padding: 10px;
        cursor: pointer;
    }

    .cat-item>span>span:hover {
        text-decoration: underline;
    }





    /* 歌单分类end */
    #playlistBody {
        width: 900px;
        /* height: 1700px; */
        padding-top: 30px;
        /* background-color: yellow; */
    }

    #playlistBody ul li {
        position: relative;
        float: left;
        height: 188px;
        width: 140px;
        margin-left: 49px;
        margin-bottom: 30px;
        /* background-color: pink; */
        overflow: hidden;

    }

    #playlistBody ul .Edge {
        margin-left: 0px;
    }

    #playlistBody ul li img {
        height: 140px;
        width: 140px;
        vertical-align: bottom;
    }

    #playlistMsk {
        position: absolute;
        top: 113px;
        left: 0;
        width: 140px;
        height: 27px;
        padding-left: 24px;
        background-color: rgba(0, 0, 0, .5);
        color: white;
        font-size: 12px;
        line-height: 27px;

    }

    #playlistMsk span:nth-child(1) {
        position: absolute;
        top: 8px;
        left: 6px;
        width: 18px;
        height: 19px;
        background: url('https://s2.music.126.net/style/web2/img/iconall.png?3f1d5d84259dc9096d6c9970b24807c5') no-repeat 0 -23px;
    }

    #playlistMsk span:nth-child(2) {
        position: absolute;
        top: 5px;
        right: 25px;
        width: 22px;
        height: 19px;
        background: url('https://s2.music.126.net/style/web2/img/iconall.png?3f1d5d84259dc9096d6c9970b24807c5') no-repeat 0 1px;
    }

    #playlistName {
        margin-top: 8px;
        width: 125px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 12px;
        cursor: pointer;
    }

    #playlistName:hover {
        text-decoration: underline;
    }

    #by {
        font-size: 12px;
        color: #99A3C1;
    }

    #creatorNickname {
        font-size: 12px;
        color: #666666;
        cursor: pointer;
        margin-left: 5px;
    }

    #creatorNickname:hover {
        text-decoration: underline;
    }
</style>