<template>
    <div class="con ars-con">
        <!-- 左边 -->
        <div id="ars-l">
            <p>推荐</p>
            <p>热门歌手</p>
            <p>华语</p>
            <p>华语</p>
            <p>华语</p>
            <p>华语</p>
        </div>
        <!-- 左边end -->
        <!-- 右边 -->
        <div id="ars-r">
            111
        </div>
        <!-- 右边end -->
        <br style="clear: both;">
    </div>
</template>

<script>
    export default {
        name: 'artists',
        data() {
            return {

            }
        },
        methods: {

        },
        created() {
            let li = document.getElementById("discoverlittleList").childNodes
            for (let i = 0; i < li.length; i++) {
                if (i == 4) {
                    //加上liBgc类
                    li[i].setAttribute("class", "liBgc")
                } else {
                    li[i].setAttribute("class", "")
                }
            }


        },
    }
</script>

<style>
    .ars-con{
        background-color: #F9F9F9;
    }
    #ars-l,
    #ars-r {
        float: left;
    }

    #ars-l {
        width: 180px;
    }

    #ars-r {
        width: 799px;
        border-left: 1px solid #D3D3D3;
        height: 100%;
        background-color: #FFFFFF;

    }
</style>