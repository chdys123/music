<template>
    <!-- 轮播图 -->
    <div id="rotationCon">
        <div id="rotationImg">
            <div id="before" @click="tobefore()">
                <div></div>
            </div>
            <div id="downLoad"></div>
            <div id="after" @click="toafter()">
                <div></div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'rotation',
        data() {
            return {
                bannerData: {},
                count:1,
                dom1:{},
                dom2:{}
            }
        },
        methods: {
            getBanner() {
                this.axios({
                    method: "get",
                    url: '/banner'
                }).then(res => {
                    this.bannerData = res.data
                    let data=this.bannerData
                    let that=this
                    let rotationImg = document.getElementById("rotationImg")
                    this.dom1=rotationImg
                    let rotationCon = document.getElementById("rotationCon")
                    this.dom2=rotationCon
                    rotationImg.style.backgroundImage = `url(${data.banners[0].imageUrl})`
                    rotationCon.style.backgroundImage = `url(${data.banners[0].imageUrl})`
                    let timer=setInterval(function(){
                        that.count=that.count%9
                        // console.log(that.count)
                        // console.log(num,data.banners[num].imageUrl)
                        rotationImg.style.backgroundImage = `url(${data.banners[that.count].imageUrl})`
                        rotationCon.style.backgroundImage = `url(${data.banners[that.count].imageUrl})`
                        that.count++
                    },3000)

                }).catch(err => {
                    console.log("错误")
                })
            },
            tobefore(){
                console.log("前一张")
                this.count=this.count+9
                this.count=this.count%10
                this.dom1.style.backgroundImage=`url(${this.bannerData.banners[this.count].imageUrl})`
                this.dom2.style.backgroundImage=`url(${this.bannerData.banners[this.count].imageUrl})`
            },
            toafter(){
                console.log("后一张")
                this.count++
                this.count=this.count%10
                this.dom1.style.backgroundImage=`url(${this.bannerData.banners[this.count].imageUrl})`
                this.dom2.style.backgroundImage=`url(${this.bannerData.banners[this.count].imageUrl})`
            }
        },
        created() {
            //获取banner信息
            this.getBanner()

        },

    }
</script>

<style scoped>
    #rotationCon {
        position: relative;
        height: 285px;
        /* background-color: pink; */
        background-repeat: no-repeat;
        background-size: 6000px;
        background-position: center;
    }
    #rotationImg {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 984px;
        height: 285px;
        margin: 0 auto;
        background-color: transparent;
        background-size: 730px 285px;
        background-repeat: no-repeat;
        background-position: left center;
        z-index: 1;

    }

    #downLoad {
        width: 254px;
        height: 285px;
        /* background-color: pink; */
        position: absolute;
        top: 0px;
        right: 0px;
    }


    #before,
    #after {
        position: absolute;
        width: 37px;
        height: 63px;
    }

    #before:hover,
    #after:hover {
        background-color: rgba(195, 195, 195, .5);
    }

    #before {
        left: -74px;
        top: 50%;
        transform: translateY(-50%);
    }

    #after {
        right: -74px;
        top: 50%;
        transform: translateY(-50%);
    }

    #before div,
    #after div {
        width: 30px;
        height: 30px;
        border-left: 2px solid white;
        border-bottom: 2px solid white;
        border-top: 2px solid transparent;
        border-right: 2px solid transparent;

    }

    #before div {
        position: absolute;
        transform: rotate(45deg);
        left: 12px;
        top: 14px;
    }

    #after div {
        position: absolute;
        transform: rotate(225deg);
        left: -10px;
        top: 14px;
    }
</style>