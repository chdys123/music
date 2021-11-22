<template>
    <div id="myAr-con">
        <p id="myAr-h">我的歌手&nbsp;({{acount}})</p>
        <div v-for="item in ar" class="myArItem" @click="toAr(item.id)" :key="item.id">
            <div class="myArItem-left">
                <img :src="item.picUrl+'?param=80y80'" alt="">
            </div>
            <div class="myArItem-right">
                <div>{{item.name}}</div>
                <div>{{item.albumSize}}个专辑&nbsp;&nbsp;&nbsp;{{item.mvSize}}个MV</div>
            </div>
            <br style="clear: both;">            

        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                // 歌手数组
                ar:[
                    {
                        name:'',
                        id:'',
                        albumSize:'',
                        mvSize:''
                    }
                ],
                // 关注歌手数量
                acount:0

            }
        },
        methods: {
            // 获取用户关注的歌手
            getAr(){
                this.axios({
                    method:'get',
                    url:'/artist/sublist'
                }).then(res=>{
                    this.ar=res.data.data
                    this.acount=res.data.count

                }).catch(err=>{
                    console.log("获取用户关注歌手失败")
                })
            }
            
        },
        created() {
            this.getAr()
            
        },
    }
</script>

<style>
    #myAr-con{
        padding: 40px;
    }
    #myAr-h{
        font-size: 24px;
        border-bottom: 2px solid #C20C0C;
        padding-bottom: 5px;
    }
    .myArItem{
        margin-top: 5px;
        padding-bottom: 5px;
        border-bottom:1px solid #DDDDDD ;
    }
    .myArItem-left{
        float: left;
        
    }
    .myArItem-left img{
        vertical-align: middle;
        cursor: pointer;
    }
    .myArItem-right{
        float: left;
        margin-left: 15px;
        height: 80px;
        width: 562px;
    }
    .myArItem-right div:nth-child(1){
        font-size: 16px;
        font-weight: 700;
        height: 40px;
        line-height: 40px;
    }
    .myArItem-right div:nth-child(2){
        font-size: 12px;
        color: #666666;
        height: 40px;
        line-height: 40px;
    }





    
</style>