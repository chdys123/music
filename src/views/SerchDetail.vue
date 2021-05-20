<template>
    <div>
        <div class="bar"></div>
        <div class="con ser-con">
            <ul id="ser-list">
                <li @click="toSerch('song')">单曲</li>
                <li @click="toSerch('artist')">歌手</li>
                <li @click="toSerch('album')">专辑</li>
                <li @click="toSerch('video')">视频</li>
                <li @click="toSerch('lyrics')">歌词</li>
                <li @click="toSerch('playlist')">歌单</li>
                <li @click="toSerch('voice')">声音主播</li>
                <li @click="toSerch('user')">用户</li>
                <br style="clear: both;">
            </ul>
            <router-view :key="$route.fullPath"></router-view>
        </div>
    </div>
    
</template>

<script>
    export default{
        name:'serchdetail',
        data(){
            return {
                keyword:'',

            }
        },
        methods: {
            getkeyWord(){
                this.keyword=this.$route.query.keyword
                console.log(this.keyword)
            },
            // 搜索出的详细信息显示
            toSerch(str){
                this.$router.push({path:'/serch/'+str,query:{keyword:this.keyword}})
            },
            
        },
        created() {
            window.scrollTo(0, 0)
            let dom=document.getElementById('headermenu').childNodes
            for(let i=0;i<dom.length;i++){
                dom[i].setAttribute('class','')
            }
            // 获取关键词
            this.getkeyWord()
        },
    }
</script>

<style>
    .ser-con{
        padding: 40px;
        width: 900px;
    }
    #ser-list{
        border: 2px solid #CCCCCC;
        
    }
    #ser-list li{
        float: left;
        padding: 8px 38px;
        font-size: 16px;
        background-color: #F7F7F7;
        cursor: pointer;
    }
    #ser-list li:hover{
        background-color: #fff;
    }
    #ser-list .serlistbgc{
        background-color: #fff;
    }

</style>