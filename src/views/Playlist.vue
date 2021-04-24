<template>
    <div id="playlistCon">
        <div id="playlistHeader">
            <span id="typespan">{{playlistType}}</span>
            <span id="ChooseType">选择分类</span>
            <span id="hotplaylist">热门</span>
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
            </ul>
        </div>
    </div>
    <!-- <router-view></router-view> -->
</template>

<script>
    export default{
        name:'playlist',
        data(){
            return {
                playlistType:"全部",
                playlistData:{}
            }
        },
        methods: {
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
            },
            //获取歌单信息
            getPlayList(type){
                this.axios({
                    method:"get",
                    url:'/top/playlist?limit=35&order=hot&cat='+type
                }).then(res=>{
                    console.log(res.data)
                    this.playlistData=res.data

                }).catch(err=>{
                    console.log("请求歌单信息失败")
                })
            },
            //进入歌单详情
            toplaylist(id){
                console.log("进入歌单详情页面")
                
                //传参数过去
                this.$router.push({path:"/discover/playlistdetail",query:{id:id}})
            }
        },
        created(){
            //取出哪些路由传过来的歌单类型数据 赋值给this.playlistType
            this.changeBgc(3)
            this.getPlayList(this.playlistType)
        }
    }
</script>

<style>
    #playlistCon{
        width: 900px;
        height: 1744px;
        background-color: #FFFFFF;
        margin: 0 auto;
        padding: 40px;
        border: 1px solid #D3D3D3;
        border-top: none;
    }
    #playlistHeader{
        position: relative;
        width: 900px;
        height: 42px;
        /* background-color: pink; */
        border-bottom:2px solid #C20C0C ;
    }
    #typespan{
        font-size: 24px;
        display: inline-block;
        margin-top: 3px;
    }
    #ChooseType{
        position: absolute;
        padding: 6px 22px ;
        top: 50%;
        left: 59px;
        transform: translateY(-50%);
        font-size: 12px;
        color: #0C73C2;
        background-color: #F6F6F6;
        cursor: pointer;
        border: 1px solid #C4C4C4;
        border-radius: 4px;    
    }
    #ChooseType:hover{
        background-color: white;
    }
    #hotplaylist{
        position:absolute;
        right: 0;
        top:50%;
        transform: translateY(-50%);
        padding: 6px;
        background-color: #D20C0D;
        border-radius: 4px;
        color:white;
        font-size: 12px;
        cursor: pointer;
    }
    #hotplaylist:hover{
        text-decoration: underline;
    }
    #playlistBody{
        width: 900px;
        height: 1700px;
        padding-top: 30px;
        /* background-color: yellow; */
    }
    #playlistBody ul li{
        position: relative;
        float: left;
        height: 188px;
        width: 140px;
        margin-left: 49px;
        margin-bottom: 30px;
        /* background-color: pink; */
        overflow: hidden;

    }
    #playlistBody ul .Edge{
        margin-left: 0px;
    }
    #playlistBody ul li img{
        height: 140px;
        width: 140px;
        vertical-align:bottom ;
    }
    #playlistMsk{
        position:absolute;
        top: 113px;
        left: 0;
        width: 140px;
        height: 27px;
        padding-left:24px ;
        background-color: rgba(0,0,0,.5);
        color: white;
        font-size: 12px;
        line-height: 27px;
        
    }
    #playlistMsk span:nth-child(1){
        position: absolute;
        top:8px;
        left: 6px;
        width: 18px;
        height: 19px;
        background: url('https://s2.music.126.net/style/web2/img/iconall.png?3f1d5d84259dc9096d6c9970b24807c5') no-repeat 0 -23px;
    }
    #playlistMsk span:nth-child(2){
        position: absolute;
        top:5px;
        right:25px;
        width: 22px;
        height: 19px;
        background: url('https://s2.music.126.net/style/web2/img/iconall.png?3f1d5d84259dc9096d6c9970b24807c5') no-repeat 0 1px;
    }
    #playlistName{
        margin-top: 8px;
        width: 125px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 12px;
        cursor: pointer;
    }
    #playlistName:hover{
        text-decoration: underline;
    }
    #by{
        font-size: 12px;
        color: #99A3C1;
    }
    #creatorNickname{
        font-size: 12px;
        color: #666666;
        cursor: pointer;
        margin-left: 5px;
    }
    #creatorNickname:hover{
        text-decoration: underline;
    }


</style>