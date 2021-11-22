<template>
    <div class="con ars-con">
        <!-- 左边 -->
        <div id="ars-l">
            <p class="ars-type-t">推荐</p>
            <p class="ars-active" @click="getHotAr($event)"><span class="ars-rededLogo"></span>热门歌手</p>

            <p class="ars-type-t">华语</p>
            <p @click="getArByType(7,1,$event)"><span class="ars-redLogo"></span> 华语男歌手</p>
            <p @click="getArByType(7,2,$event)"><span class="ars-redLogo"></span> 华语女歌手</p>
            <p @click="getArByType(7,3,$event)"><span class="ars-redLogo"></span> 华语组合/乐队</p>

            <p class="ars-type-t">欧美</p>
            <p @click="getArByType(96,1,$event)"><span class="ars-redLogo"></span> 欧美男歌手</p>
            <p @click="getArByType(96,2,$event)"><span class="ars-redLogo"></span> 欧美女歌手</p>
            <p @click="getArByType(96,3,$event)"><span class="ars-redLogo"></span> 欧美组合/乐队</p>

            <p class="ars-type-t">日本</p>
            <p @click="getArByType(8,1,$event)"><span class="ars-redLogo"></span> 日本男歌手</p>
            <p @click="getArByType(8,2,$event)"><span class="ars-redLogo"></span> 日本女歌手</p>
            <p @click="getArByType(8,3,$event)"><span class="ars-redLogo"></span> 日本组合/乐队</p>

            <p class="ars-type-t">韩国</p>
            <p @click="getArByType(16,1,$event)"><span class="ars-redLogo"></span> 韩国男歌手</p>
            <p @click="getArByType(16,2,$event)"><span class="ars-redLogo"></span> 韩国女歌手</p>
            <p @click="getArByType(16,3,$event)"><span class="ars-redLogo"></span> 韩国组合/乐队</p>

            <p class="ars-type-t">其他</p>
            <p @click="getArByType(0,1,$event)"><span class="ars-redLogo"></span> 其他男歌手</p>
            <p @click="getArByType(0,2,$event)"><span class="ars-redLogo"></span> 其他女歌手</p>
            <p @click="getArByType(0,3,$event)"><span class="ars-redLogo"></span> 其他组合/乐队</p>
        </div>
        <!-- 左边end -->
        <!-- 右边 -->
        <div id="ars-r">
            <h2>{{title}}</h2>
            <div id="ars-choose" v-if="!ishot">
                <span v-for="(item,index) in initials" @click="choose(item,$event)" :class="{'choose-active':index==0}" :key="item">
                    {{item}}
                </span>
                <br style="clear: both;">
            </div>


            <div v-for='(item,index) in hotars.slice(0,10)' :class="{'ars-border':index%5==0,'ars-item1':true}" :key="item.id">
                <div @click="toArdetail(item.id)">
                    <img :src="item.img1v1Url+'?param=130y130'" alt="">
                </div>
                <p :title="item.name" class="ellipsis"
                @click="toArdetail(item.id)">
                    {{item.name}}
                </p>
            </div>

            <div v-for="(item,index) in hotars.slice(10)" :class="{'ars-item2':true,'ars-border':index%5==0}" :key="item.id">
                <p :title="item.name" class="ellipsis" @click="toArdetail(item.id)">
                    {{item.name}}
                </p>
            </div>


            <br style="clear: both;">

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
                title: '热门歌手',
                // 歌手数据
                hotars: [],
                ishot: true,

                area: 0,
                type: 0,
                initial: -1,

                initials:['热门','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','其他']



            }
        },
        methods: {
            // 获取热门歌手数据
            getHotAr() {
                if (arguments.length != 0) {
                    document.querySelectorAll('.ars-active')[0].setAttribute('class', '')
                    document.querySelectorAll('.ars-rededLogo')[0].setAttribute('class', 'ars-redLogo')
                    arguments[0].target.setAttribute('class', 'ars-active')
                    arguments[0].target.childNodes[0].setAttribute("class", 'ars-rededLogo')
                    this.title = arguments[0].target.innerText
                }
                this.ishot = true
                this.axios({
                    method: 'get',
                    url: '/top/artists?limit=100'
                }).then(res => {
                    this.hotars = res.data.artists

                }).catch(err => {
                    console.log("获取热门歌手数据失败")
                })
            },
            // 根据歌手类型获取歌手数据
            getArByType(area, type, e) {
                this.area = area
                this.type = type
                this.title = e.target.innerText
                this.ishot = false
                document.querySelectorAll('.ars-active')[0].setAttribute('class', '')
                document.querySelectorAll('.ars-rededLogo')[0].setAttribute('class', 'ars-redLogo')
                e.target.setAttribute('class', 'ars-active')
                e.target.childNodes[0].setAttribute("class", 'ars-rededLogo')


                this.axios({
                    method: 'get',
                    url: '/artist/list?limit=100&type=' + this.type + '&area=' + this.area + '&initial=' + this.initial
                }).then(res => {
                    this.hotars = res.data.artists
                }).catch(err => {
                    console.log("获取歌手数据失败")
                })

            },
            // 点击字母选项
            choose(arg,e){
                console.log(arg)
                document.querySelectorAll('.choose-active')[0].setAttribute("class",'')
                e.target.setAttribute('class','choose-active')

                if(arg=='热门'){
                    this.initial=-1
                }else if(arg=='其他'){
                    this.initial=0
                }else{
                    arg=arg.toLowerCase()
                    this.initial=arg
                }
                this.axios({
                    method: 'get',
                    url: '/artist/list?limit=100&type=' + this.type + '&area=' + this.area + '&initial=' + this.initial
                }).then(res => {
                    this.hotars = res.data.artists
                }).catch(err => {
                    console.log("获取歌手数据失败")
                })
            },
            // 进入歌手详情
            toArdetail(id){
                this.$router.push({'path':'/discover/artist',query:{id:id}})
            }
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
            // 获取热门歌手数据
            this.getHotAr()


        },

    }
</script>

<style>
    .ars-con {
        background-color: #FFFFFF;
    }

    #ars-l,
    #ars-r {
        float: left;
    }

    #ars-l {
        width: 150px;
        border-right: 1px solid #D3D3D3;
        background-color: #F9F9F9;

    }

    #ars-r {
        width: 719px;
        padding: 40px;
        height: 100%;
        background-color: #FFFFFF;

    }

    #ars-l {
        padding: 40px 15px 0px 15px;
    }

    #ars-l .ars-type-t {
        font-size: 16px;
        font-weight: 700;
        padding: 0px 0px 0px 5px;
        padding: 0px 0px 0px 10px;
        text-decoration: none !important;
    }

    #ars-l p {
        font-size: 12px;
        cursor: pointer;
        margin: 10px 0px 10px 0px;
        padding: 5px 0px 5px 16px;


    }

    #ars-l p:hover {
        text-decoration: underline;
    }

    /* active */
    #ars-l .ars-active {
        color: red;
        background-color: #F5F5F5;
        border: 1px solid #cccccc;
    }

    /* 右边 */
    #ars-r h2 {
        border-bottom: 2px solid #C20C0C;
        padding-bottom: 10px;
        margin-bottom: 10px;
    }

    /*字母选择 */
    #ars-choose {
        margin-bottom: 10px;
    }

    #ars-choose span {
        float: left;
        padding: 5px 5px;
        margin-left: 6px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
    }

    #ars-choose span:hover {
        text-decoration: underline;

    }

    #ars-choose span:nth-child(1) {
        margin-left: 0px;
        padding: 5px 15px;
        border-radius: 3px;
    }
    /* 字母选择active类 */
    #ars-choose .choose-active{
        background-color: #C20C0C;
        color: white;
    }

    /* 字符选择end */

    .ars-item1 {
        float: left;
        width: 130px;
        margin-left: 17px;
        margin-bottom: 30px;
    }

    .ars-item1 p {
        text-align: center;
        font-size: 12px;
        cursor: pointer;
    }

    .ars-item1 p:hover {
        text-decoration: underline;
    }

    .ars-item1 div {
        width: 130px;
        height: 130px;
        overflow: hidden;
        margin-bottom: 10px;
    }

    .ars-item1 img {
        transition: all .3s;
    }

    .ars-item1 img:hover {
        transform: scale(1.1);
    }

    .ars-item2 {
        width: 130px;
        height: 20px;
        margin-left: 17px;
        margin-bottom: 10px;
        float: left;
        cursor: pointer;
        font-size: 12px;
    }

    .ars-item2 p {
        /* padding: 5px 0px; */
        height: 20px;
        width: 130px;
        line-height: 20px;
    }

    .ars-item2 p:hover {
        text-decoration: underline;
    }

    .ars-border {
        margin-left: 0px !important;

    }
</style>