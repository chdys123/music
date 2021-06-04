<template>
    <div>
        搜索的歌曲
        搜索的关键词:{{keyword}}

        <!-- <div v-html="keyword">

        </div> -->
        
    </div>

</template>

<script>
    export default{
        data(){
            return {
                keyword:''

            }
        },
        methods: {
            getkeyWord(){
                this.keyword=this.$route.query.keyword
                console.log(this.keyword)
            },
            // 获取歌曲信息
            getSongData(){
                this.axios({
                    method:'get',
                    url:'/search?keywords='+this.keyword+'&limit=30&type=1'
                }).then(res=>{

                }).catch(err=>{

                })
            }
            
        },
        created() {
            window.scrollTo(0, 0)
            let dom=document.getElementById('headermenu').childNodes
            for(let i=0;i<dom.length;i++){
                dom[i].setAttribute('class','')
            }
            this.getkeyWord()

           
            
        },
        mounted() {
             let dom2=document.getElementById('ser-list').childNodes
            for(let i=0;i<dom2.length;i++){
                if(i==0){
                    dom2[i].setAttribute("class",'serlistbgc')
                }else{
                    dom2[i].setAttribute("class",'')
                }
            }
            
        },
    }
</script>

<style>

</style>