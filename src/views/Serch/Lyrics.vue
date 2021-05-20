<template>
    <div>
        搜索的歌词
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
            
        },
        created() {
            window.scrollTo(0, 0)
            let dom=document.getElementById('headermenu').childNodes
            for(let i=0;i<dom.length;i++){
                dom[i].setAttribute('class','')
            }
            
            
        },
        mounted() {
            let dom2=document.getElementById('ser-list').childNodes
            for(let i=0;i<dom2.length;i++){
                if(i==4){
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