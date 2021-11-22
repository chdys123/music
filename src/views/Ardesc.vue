<template>
    <div id="ar-desc-con">
        <h2>简介</h2>
        <p>{{briefDesc}}</p>
        <div v-for="item in introduction" :key="item">
            <h2>{{item.ti}}</h2>
            <p>{{item.txt}}</p>
        </div>
    </div>
</template>

<script>
    export default{
        name:'aldesc',
        data(){
            return {
                artistId:'',
                // 歌手简介
                briefDesc:'',
                // 主要成就
                introduction:[]
            }
        },
        
        methods: {
            // 获取歌手id
            getArtistId(){
                this.artistId=this.$route.query.id
            },
            // 艺人介绍
            getArtistDesc(){
                this.axios({
                    method:"get",
                    url:'/artist/desc?id='+this.artistId
                }).then(res=>{
                    this.briefDesc=res.data.briefDesc
                    this.introduction=res.data.introduction
                }).catch(err=>{
                    console.log("获取艺人介绍失败")
                })

            }
            
        },
        created() {
            this.getArtistId()
            this.getArtistDesc()
            
        },
        mounted() {
            // 去除list背景
            let dom = document.getElementById("arConLList")
            for (let i = 0; i < dom.childNodes.length; i++) {
                if (3 == i) {
                    dom.childNodes[i].setAttribute("class", "ar-con-l-list-active")
                } else {
                    dom.childNodes[i].setAttribute("class", '')
                }
            }
        },
    }
</script>
<style>
    #ar-desc-con h2{
        font-size: 14px;
        margin: 20px 0px 20px 0px;
    }
    #ar-desc-con p{
        font-size: 12px;
        color: #666666;
        white-space: pre-wrap;
        line-height: 25px;
        margin-bottom: 20px;
    }
</style>