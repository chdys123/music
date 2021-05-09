<template>
    <div id="discoverlittleBanner">
        <ul id="discoverlittleList">
            <li @click="toRecommended(1)" class="liBgc">推荐</li>
            <li @click="toLeaderboard(2)">排行榜</li>
            <li @click="toPlaylist(3)">歌单</li>
            <li @click="toStation(4)">主播电台</li>
            <li @click="toSinger(5)">歌手</li>
            <li @click="toDisc(6)">新碟上架</li>
        </ul>
    </div>
    <router-view :key="$route.fullPath"></router-view>
</template>

<script>
    export default{
        name:"discover",
        data(){
            return {

            }
        },
        methods: {
            toRecommended(num){
                this.changeBgc(num)
                this.$router.push('/discover/recommend')
                console.log("推荐页面")
            },
            toLeaderboard(num){
                this.changeBgc(num)
                console.log("排行榜页面")
            },
            toPlaylist(num){
                this.changeBgc(num)
                console.log("歌单页面")
                
                this.$router.push("/discover/playlist")
            },
            toStation(num){
                this.changeBgc(num)
                console.log("主播电台页面")
            },
            toSinger(num){
                this.changeBgc(num)
                console.log("歌手页面")
            },
            toDisc(num){
                this.changeBgc(num)
                console.log("新碟上架页面")
            },
            //点击后背景颜色改变
            changeBgc(num){
                let li = document.getElementById("discoverlittleList").childNodes
                for(let i=0;i<li.length;i++){
                    if(i==num-1){
                        //加上liBgc类
                        li[i].setAttribute("class","liBgc")
                    }else{
                        li[i].setAttribute("class","")
                    }
                }

            }
        },

    }
</script>

<style>
    #discoverlittleBanner{
        height: 34px;
        background-color: #C20C0C;
    }
    #discoverlittleList{
        width: 1100px;
        margin: 0 auto;
        height: 34px;
        position: relative;
    }
    #discoverlittleList::before{
        content:'';
        display: inline-block;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #C20C0C;
        position: absolute;
        left: 220px;
        transform: translateY(-100%);
    }
    #discoverlittleList li{
        float: left;
        color: #ffffff;
        height: 20px;
        padding: 0px 13px;
        font-size: 12px;
        line-height: 20px;
        margin: 7px 23px;
        border-radius: 10px;
        cursor: pointer;

    }
    #discoverlittleList li:nth-child(1){
        margin-left: 202px;
    }
    #discoverlittleList li:hover{
        background-color: #9B0909;
    }
    .liBgc{
        background-color: #9B0909;
    }
    
</style>