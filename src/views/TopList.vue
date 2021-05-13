<template>
    <div class="con">
        <div id="tl-l">
            <h2>云音乐特色榜</h2>
            <div class="tp-item tp-item-hover" v-for='(item,index) in toplist.slice(0,4)' @click="getTopListDetail(item.id)">
                <img :src="item.coverImgUrl+'?param=40y40'" alt="">
                <div>
                    <p>{{item.name}}</p>
                    <p>{{item.updateFrequency}}</p>
                </div>
                <br style="clear:both;">
            </div>
            <h2 id="tl-l-h2">全球媒体榜</h2>
            <div class="tp-item tp-item-hover" v-for='(item,index) in toplist.slice(4,33)'>
                <img :src="item.coverImgUrl+'?param=40y40'" alt="">
                <div>
                    <p>{{item.name}}</p>
                    <p>{{item.updateFrequency}}</p>
                </div>
                <br style="clear:both;">
            </div>

        </div>
        <div id="tl-r">

        </div>
        <br style="clear: both;">
    </div>
</template>

<script>
    export default {
        name: 'toplist',
        data() {
            return {
                // 榜单数据
                toplist: []
                

            }
        },
        methods: {
            // 获取榜单数据
            getTopList() {
                this.axios({
                    method: 'get',
                    url: '/toplist'
                }).then(res => {
                    this.toplist=res.data.list
                    this.getTopListDetail(this.toplist[0].id)
                }).catch(err => {
                    console.log("获取榜单数据失败")
                })
            },
            // 获取榜单详情
            getTopListDetail(id){
                console.log("点击了榜单",id)

            }

        },
        created() {
            let li = document.getElementById("discoverlittleList").childNodes
            for (let i = 0; i < li.length; i++) {
                if (i == 1) {
                    //加上liBgc类
                    li[i].setAttribute("class", "liBgc")
                } else {
                    li[i].setAttribute("class", "")
                }
            }
            this.getTopList()

        },
    }
</script>

<style>
    #tl-l,
    #tl-r {
        float: left;
    }

    #tl-l {
        width: 239px;
        border-right: 1px solid #D3D3D3;
        /* height: 1000px; */
        background-color: #F5F5F5;
    }

    #tl-r {
        width: 739px;
        height: 100%;
    }
    #tl-l h2{
        font-size: 14px;
        padding: 0px 10px 12px 15px;
        margin-top: 40px;
    }
    #tl-l #tl-l-h2{
        margin-top: 10px;
    }
    .tp-item{
        /* margin-bottom: 20px; */
        cursor: pointer;
        padding: 10px 0px 10px 20px;

    }
    /* 活跃的榜单  去除tp-item-hover类 添加tp-item-active*/
    .tp-item-active{
        background-color: #E6E6E6;

    } 
    .tp-item-hover:hover{
        background-color: #FFFFFF;
    }

    .tp-item img{
        float: left;
        vertical-align: middle;
    }
    .tp-item div{
        float: left;
        margin-left: 10px;
        font-size: 12px;
        color: #999999;
    }
    .tp-item div p:nth-child(1){
        margin-bottom: 5px;
        color: #000;
    }
</style>