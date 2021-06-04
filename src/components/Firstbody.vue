<template>
    <div id="firstBody">

        <div id="firstBodyLeft">
            <!-- 首页热门推荐 -->
            <div id="topPicks">
                <div id="topPicksHeader">
                    <div id="rmtj" @click="toAllPlayList()">热门推荐</div>
                    <div id="topPicksCategory">
                        <a  class="Classification">华语</a>|
                        <a  class="Classification">流行</a>|
                        <a  class="Classification">摇滚</a>|
                        <a  class="Classification">民谣</a>|
                        <a  class="Classification">电子</a>
                        <a  class="Classification" @click="toAllPlayList()">更多</a>
                    </div>
                </div>
                <!-- 首页热门推荐歌单展示部分 -->
                <div id="topPicksBody">
                    歌单
                </div>
            </div>

            <!-- 首页新碟上架 -->
        </div>

        

    </div>
</template>

<script>
    export default {
        name: 'firstbody',
        data() {
            return {

            }
        },
        
    }
</script>


<style scoped>
    #firstBody {
        width: 983px;
        height: 2000px;
        margin: 0 auto;
        background-color: #FFFFFF;
        border-left: 1px solid #D3D3D3;
        border-right: 1px solid #D3D3D3;
    }

    #firstBodyLeft {
        float: left;
        width: 729px;
        height: 2000px;
        border-right: 1px solid #D3D3D3;
    }

   

    
    
</style>