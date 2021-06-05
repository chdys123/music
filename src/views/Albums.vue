<template>
    <div class="con als-con">
        <h2>热门新碟</h2>
        <div v-for="(item,index) in hotAl.slice(0,10)" :class="{'als-item':true,'als-border':index%5==0}">
            <div>
                <img :src="item.picUrl+'?param=130y130'" alt="" @click="toAldetail(item.id)">
            </div> 
            <p :title="item.name" class="ellipsis" @click="toAldetail(item.id)">{{item.name}}</p>
            <p class="ellipsis">
                <span v-for="item2 in item.artists" :title="item2.name" @click="toArdetail(item2.id)">
                    {{item2.name}}&nbsp;
                </span>
            </p>
        </div>
        <br style="clear: both;">

        <h2>全部新碟</h2>
        <div v-for="(item,index) in allAl" :class="{'als-item':true,'als-border':index%5==0}">
            <div>
                <img :src="item.picUrl+'?param=130y130'" alt="" @click="toAldetail(item.id)">
            </div>
            <p :title="item.name" class="ellipsis" @click="toAldetail(item.id)">{{item.name}}</p>
            <p class="ellipsis">
                <span v-for="item2 in item.artists" :title="item2.name" @click="toArdetail(item2.id)">
                    {{item2.name}}&nbsp;
                </span>
            </p>

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
        <br style="clear: both;">
    </div>
</template>

<script>
    export default {
        name: 'albums',
        data() {
            return {
                hotAl: [],
                area: 'ALL',
                allAl: [],
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
            // 获取热门新碟
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
            // 获取全部新碟
            getAll(num) {
                this.currentPage = num
                this.axios({
                    method: 'get',
                    url: '/album/new?area=' + this.area + '&limit=25&offset=' + (num - 1) * 35
                }).then(res => {
                    this.allAl = res.data.albums
                    this.total = res.data.total
                }).catch(err => {
                    console.log("获取全部新碟失败")
                })
            },
            // 进入歌手详情
            toArdetail(id){
                console.log(id)
                this.$router.push({'path':'/discover/artist',query:{id:id}})
            },
            // 进入 专辑详情
            toAldetail(id){
                this.$router.push({'path':'/discover/album',query:{id:id}})
            },
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
            let li = document.getElementById("discoverlittleList").childNodes
            for (let i = 0; i < li.length; i++) {
                if (i == 5) {
                    //加上liBgc类
                    li[i].setAttribute("class", "liBgc")
                } else {
                    li[i].setAttribute("class", "")
                }
            }
            this.getHotAl()
            this.getAll(1)

        },
    }
</script>

<style>
    .als-con {
        width: 900px;
        padding: 40px;
    }

    h2 {
        font-size: 24px;
        padding-bottom: 10px;
        border-bottom: 2px solid #C20C0C;
        margin-bottom: 20px;
        font-weight: 500;
    }

    .als-item {
        float: left;
        margin-left: 62px;
        margin-bottom: 15px;
        margin-top: 10px;
    }

    .als-border {
        margin-left: 0px;
    }

    .als-item div {
        width: 130px;
        height: 130px;
        overflow: hidden;
    }

    .als-item img {
        vertical-align: bottom;
        width: 130px;
        height: 130px;
        transition: all .3s;
    }

    .als-item img:hover {
        transform: scale(1.1);
    }

    .als-item p {
        width: 130px;
        height: 20px;
        cursor: pointer;
        line-height: 20px;
        margin: 5px 0px;
    }

    .als-item div+p {
        font-size: 14px;
    }

    .als-item div+p:hover {
        text-decoration: underline;
    }

    .als-item span:hover {
        text-decoration: underline;
    }

    .als-item span {
        font-size: 12px;
        color: #666666;
    }
</style>