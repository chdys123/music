<template>
    <div>
        这是热门作品
    </div>
</template>
<script>
    export default {
        name: 'arhotworks',
        data() {
            return {
                artistId: ''
            }
        },
        methods: {
            // 获取歌手id
            getArtistId() {
                this.artistId = this.$route.params.id
            },
            // 获取歌手歌曲信息
            getArtistSongs(){
                this.axios({
                    method:"get",
                    url:''
                }).then(res=>{
                    console.log(res.data)
                }).catch(err=>{
                    console.log("获取歌手歌曲失败")
                })
            }
        },
        created() {
            // 获取歌手id
            this.getArtistId()
           
           
            // 获取热门作品信息



        },
        mounted() {
            // 去除list背景
            let dom = document.getElementById("arConLList")
             for (let i = 0; i < dom.childNodes.length; i++) {
                if (0 == i) {
                    dom.childNodes[i].setAttribute("class", "ar-con-l-list-active")
                } else {
                    dom.childNodes[i].setAttribute("class", '')
                }
            }
            
        }
    }
</script>
<style>

</style>