<template>
    <p v-if="total==0" style="margin-bottom: 40px;">暂无mv</p>
    <div v-if="total!=0" style="margin-bottom: 40px;">
        <div class="ar-mv-item" v-for="(item,index) in mvs">
                <img :src="item.imgurl16v9+'?param=137y103'" alt="" @click="toMvDetail(item.id)">
                <p class="al-mv-name ellipsis" :title="item.name" @click="toMvDetail(item.id)">{{item.name}}</p>
                <span id="ar-mv-icon" class="mvPlayLogo" @click="toMvDetail(item.id)"></span>
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
        <br style="clear: both;">
    </div>
</template>

<script>
    export default{
        name:'almv',
        data(){
            return {
                artistId:'',
                // mv总数
                total:0,
                // mv信息
                mvs:[],
                // 当前页数
                currentPage:1
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
            getArtistId(){
                this.artistId=this.$route.query.id
            },
            // 获取mv信息
            getMv(num) {
                this.axios({
                    method: "get",
                    url: '/artist/mv?limit=12&id=' + this.artistId + '&offset=' + (num - 1) * 12
                }).then(res => {
                    this.mvs=res.data.mvs
                    this.currentPage=num
                }).catch(err => {
                    console.log("获取所有专辑失败")
                })
            },
            // 获取mv总数
            gettotal(){
                this.axios({
                    method:'get',
                    url:'/artist/detail?id='+this.artistId
                }).then(res=>{
                    this.total=res.data.data.artist.mvSize
                }).catch(err=>{
                    console.log("获取mv总数失败")
                })               
            },

            toPrePage() {
                console.log("点击了前一页")
                this.currentPage -= 1
                this.getMv(this.currentPage)
            },
            toNextPage() {
                console.log("点击了后一页")
                this.currentPage += 1
                this.getMv(this.currentPage)
            },
            toFirstPage() {
                console.log("点击了首页")
                this.getMv(1)

            },
            toTailPage() {
                console.log("点击了尾页")
                this.getMv(this.totalPage)
            },
            //跳转页面
            jumpPage(e) {
                if (e.keyCode == 13) {
                    let num = parseInt(e.target.value)
                    e.target.value = ''
                    if (num == this.currentPage) {
                        return
                    } else if (num >= this.totalPage) {
                        this.getMv(this.totalPage)
                    } else if (num <= 1) {
                        this.getMv(1)
                    } else {
                        this.getMv(num)
                    }
                }
            },
            // 进入mv详情页面
            toMvDetail(id){
                console.log("点击了mv",id)
                this.$router.push({path:'/discover/mv',query:{id:id}})
            }



        },
        created() {
            // 获取歌手id
            this.getArtistId()
            // mv总数
            this.gettotal()
            // 获取mv信息
            this.getMv(1)
            
        },
        mounted() {
            // 去除list背景
            let dom = document.getElementById("arConLList")
            for (let i = 0; i < dom.childNodes.length; i++) {
                if (2 == i) {
                    dom.childNodes[i].setAttribute("class", "ar-con-l-list-active")
                } else {
                    dom.childNodes[i].setAttribute("class", '')
                }
            }
        },
    }
</script>

<style>
    .ar-mv-item{
        position: relative;
        float: left;
        margin: 10px 0px 40px 30px;
    }
    .ar-mv-item:nth-child(1),
    .ar-mv-item:nth-child(5),
    .ar-mv-item:nth-child(9){
        margin-left: 0px;
    }
    .al-mv-name{
        width: 137px;
        font-size: 14px;
    }
    .al-mv-name:hover{
        text-decoration: underline;
        cursor: pointer;
    }
    #ar-mv-icon{
        position: absolute;
        width: 45px;
        height: 45px;
        top: 30px;
        left: 43px;
    }

</style>