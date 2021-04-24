<template>
    <div id="firstBody">

        <div id="firstBodyLeft">
            <!-- 首页热门推荐 -->
            <div id="topPicks">
                <div id="topPicksHeader">
                    <div id="rmtj" @click="toAllPlayList()">热门推荐</div>
                    <div id="topPicksCategory">
                        <a  class="Classification">华语</a>|
                        <a  class="Classification">流行</a>|
                        <a  class="Classification">摇滚</a>|
                        <a  class="Classification">民谣</a>|
                        <a  class="Classification">电子</a>
                        <a  class="Classification" @click="toAllPlayList()">更多</a>
                    </div>
                </div>
                <!-- 首页热门推荐歌单展示部分 -->
                <div id="topPicksBody">
                </div>
            </div>

            <!-- 首页新碟上架 -->
        </div>

        <div id="firstBodyRight"></div>

    </div>
</template>

<script>
    export default {
        name: 'firstbody',
        data() {
            return {

            }
        },
        methods: {
            toAllPlayList(){
                //跳转之前改变导航条背景颜色
                
                console.log("进入到歌单组件")
                this.$router.push("/discover/playlist")
            }
        },
    }
</script>


<style scoped>
    #firstBody {
        width: 983px;
        height: 2000px;
        margin: 0 auto;
        background-color: #FFFFFF;
        border-left: 1px solid #D3D3D3;
        border-right: 1px solid #D3D3D3;
    }

    #firstBodyLeft {
        float: left;
        width: 729px;
        height: 2000px;
        border-right: 1px solid #D3D3D3;
    }

    #firstBodyRight {
        float: right;
        width: 254px;
        height: 2000px;
        background-color: #F4F4F4;
    }

    #topPicks {
        height: 523px;
        width: 689px;
        background-color: pink;
        margin: 20px auto;
    }

    #topPicksHeader {
        height: 35px;
        width: 689px;
        background:#FFFFFF url('https://s2.music.126.net/style/web2/img/index/index.png?2328d8e5c76bbf74805cb85f12bf8a16') no-repeat -222px -153px;
    }
    #topPicksHeader #rmtj{
        float: left;
        margin-left: 39px;
        font-size: 20px;
        color: #000;
        line-height: 32px;
        cursor: pointer;
        
    }
    #topPicksCategory{
        float: left;
        width: 550px;
        margin-left: 15px;
        color: #666666;
        font-size: 12px;
        background: url('https://s2.music.126.net/style/web2/img/index/index.png?2328d8e5c76bbf74805cb85f12bf8a16') no-repeat 516px -228px;
    }
    
    #topPicksCategory a{
        line-height:35px;
        font-size: 12px;
        color: #666666;
        margin: 0 10px;
        cursor: pointer;
    } 
    #topPicksCategory a:nth-child(6){
        margin: 0 0 0 240px;
    }
    .Classification:hover{
        text-decoration:underline ;
    }
    #topPicksBody{
        height: 300px;
        border-top: 2px solid #C10D0C;
        background-color: gray;
    }
    
</style>