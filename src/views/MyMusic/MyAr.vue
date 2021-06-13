<template>
    <div id="myAr-con">
        <p id="myAr-h">我的歌手&nbsp;({{acount}})</p>
        <div v-for="item in ar" class="myArItem">
            <img :src="item.picUrl+'?param=80y80'" alt="">
            <div>
                <p>{{item.name}}</p>
                <p>{{item.albumSize}}个专辑{{item.mvSize}}个MV</p>
            </div>
            

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



    
</style>