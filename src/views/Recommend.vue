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
                        <div v-for="(item,index) in hotplaylist" :class="{'h-p-f':true,'h-p-f-b':index%4==0}" :title="item.name">
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
                        <div class="rmtj" @click="toAllPlayList()">
                            新碟上架
                        </div>
                        <div class="topPicksCategory">
                            <a class="Classification f-new-al-more" @click="toAllPlayList()" >更多</a>
                        </div>
                        <br style="clear: both;">
                    </div>
                    <div class="f-n-al-b">

                        
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
                hotplaylist:[],
                // 热门新碟
                hotAl:[]

            }
        },
        methods: {
            // 点击更多进入歌单路由
            toAllPlayList() {
                console.log("进入到歌单组件")
                this.$router.push("/discover/playlist")
            },
            // 获取热门推荐歌单
            getHotPlaylist(){
                this.axios({
                    method:'get',
                    url:'/personalized?limit=8'
                }).then(res=>{
                    this.hotplaylist=res.data.result

                }).catch(err=>{
                    console.log("获取热门推荐歌单失败")
                })

            },
            // 进入歌单详情
            toAllPlayListDetail(id){
                this.$router.push({path:'/discover/playlistdetail',query:{id:id}})
            },
            // 格式化歌单播放数
            getPlayCount(num){
                num =parseInt(num)
                if(num<100000){
                    return num
                }else{
                    let a=Math.floor(num/10000)
                    return a+'万'
                }

            },
            // 获取新碟上架数据
            getHotAl() {
                this.axios({
                    method: 'get',
                    url: '/album/newest'
                }).then(res => {
                    this.hotAl = res.data.albums
                    console.log(this.hotAl)
                }).catch(err => {
                    console.log("获取热门新碟数据失败")
                })
            },
        },
        components: {
            rotation
        },
        created() {
            // 获取热门歌单
            this.getHotPlaylist()
            // 获取热门新碟上架
            this.getHotAl()
        },
        
    }
</script>
<style>
    .re-con {
        width: 983px;
        height: 1200px;
        margin: 0 auto;
        border: 1px solid #D3D3D3;
        border-top: none;
        background-color: #FFFFFF;
    }

    .reco-l {
        width: 689px;
        float: left;
        border-right: 1px solid #D3D3D3;
        padding: 20px 20px 40px 20px;

    }

    .reco-r {
        width: 180px;
        height: 100%;
        float: left;
        padding: 20px 40px 40px 30px;
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

    
    .h-p-f{
        float: left;
        margin-left: 43px;
        margin-bottom: 20px;
        position: relative;
    }
    .h-p-f img{
        cursor: pointer;
    }
    .h-p-f div{
        position: absolute;
        top: 113px;
        left: 0;
        width: 140px;
        height: 27px;
        background-color: rgb(0,0,0,.3);
    }
    .h-p-f div span{
        font-size: 12px;
        color: #CCCCCC;
        line-height: 27px;
    }
    .h-p-f div span:nth-child(1){
        margin-left: 10px;
    }
    .h-p-f div span:nth-child(2){
        margin-left: 2px;
    }
    .h-p-f div span:nth-child(3){
        position: absolute;
        right: 2px;
        top:5px;
    }
    .h-p-f-b{
        margin-left: 0px;
    }
    .h-p-f img{
        vertical-align: bottom;
    }
    /* 显示三行 */
    .h-p-f p{
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
    .h-p-f p:hover{
        text-decoration:underline;
    }
    /* 首页热门推荐end */

    /* 首页新碟上架 */

    .topPicksHeader .topPicksCategory .f-new-al-more{
        margin-left: 480px;
    }
    .f-n-al-b{
        height: 300px;
        background-color: #F5F5F5;
        border:1px solid #D3D3D3;
    }

    /* 首页新碟上架end */

</style>