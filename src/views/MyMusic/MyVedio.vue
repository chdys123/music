<template>
    <div id="myVedio-con">
        <p id="myVedio-h">我的视频({{count}})</p>
        <div v-for="(item,index) in mv" class="myVedio-item" :class="{'myVedio-item-b':index%4==0}">
            <img :src="item.coverUrl+'?param=159y90'" alt="" @click="toMv(item.vid)">
            <p class="ellipsis" :title="item.title" @click="toMv(item.vid)">{{item.title}}</p>
            <p class="ellipsis">
                <span v-for="item1 in item.creator" :title="item1.userName" @click="toAr(item1.userId)">{{item1.userName}}&nbsp;&nbsp;</span>
            </p>
        </div>
        <br style="clear:both;">
    </div>
</template>

<script>
    export default{
        data(){
            return {
                // mv数组
                mv:[],
                // mv数量
                count:''

            }
        },
        methods: {
            // 获取mv
            getMv(){
                this.axios({
                    method:'get',
                    url:'/mv/sublist'
                }).then(res=>{
                    this.count=res.data.count
                    this.mv=res.data.data
                }).catch(err=>{
                    console.log("获取mv数据失败")
                })
            }
            
        },
        created() {
            this.getMv()
            
        },
    }
</script>

<style>
    #myVedio-con{
        padding: 40px;
    }
    #myVedio-h{
        font-size: 24px;
        border-bottom: 2px solid #C20C0C;
        padding-bottom: 5px;
        margin-bottom: 15px;
    }
    .myVedio-item{
        float: left;
        width: 159px;
        margin-left: 7px;
        margin-bottom: 20px;
    }
    .myVedio-item-b{
        margin-left: 0px;
    }
    .myVedio-item p{
        width: 159px;
    }
    .myVedio-item p:nth-child(2){
        font-size: 14px;
        cursor: pointer;
    }
    .myVedio-item p:nth-child(3){
        font-size: 12px;
        color: #666666;
    }
    .myVedio-item p:nth-child(2):hover{
        text-decoration: underline;
    }
    .myVedio-item p:nth-child(3) span{
        cursor: pointer;
    }
    .myVedio-item p:nth-child(3) span:hover{
        text-decoration: underline;
    }


    


    
</style>