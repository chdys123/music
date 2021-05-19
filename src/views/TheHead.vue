<template>
  <div id="headercon">
    <div id="header">
      <div class="logo">

      </div>
      <ul id="headermenu">
        <li @click="toDiscover(1)" class="headerlibgc">发现音乐</li>
        <li @click="toMyMusic(2)">我的音乐</li>
        <li @click="toFriends(3)">朋友</li>
        <li @click="toMall(4)">商城</li>
        <li @click="toMusicMan(5)">音乐人</li>
        <li @click="toClient(6)">下载客户端</li>
      </ul>
      <!-- 搜索框 -->
      <input type="text" class="serch input" placeholder="音乐/视频/电台/用户" @input="serchSuggest($event)">
      <!-- 创作者中心 -->
      <button id="cratebtn">创作者中心</button>
      <!-- 头像或者登录 -->
      <a id="loginspan">登录</a>
      <div id="ser-sugg">
        <p><span>搜索'{{keyword}}'相关用户</span>&nbsp;&gt;</p>

        <div>
          <span>单曲</span>
          <div>
            <p v-for="item in serchData.songs" class="ellipsis">
              <span>{{item.name}}</span>-<span v-for="item1 in item.artists">{{item1.name}}&nbsp;</span>
            </p>
          </div>
          <br style="clear: both;">
        </div>

        <div>
          <span>歌手</span>
          <div>
            <p v-for="item in serchData.artists" class="ellipsis">
              <span>{{item.name}}</span>
            </p>
          </div>
          <br style="clear: both;">

        </div>
        <div>
          <span>专辑</span>
          <br style="clear: both;">

        </div>
        <div>
          <span>歌单</span>
          <br style="clear: both;">


        </div>

      </div>
    </div>
  </div>



  <!-- 播放器绝对定位到底部 -->
  <div id="player">
    <!-- 不显示 自己写样式只是用audio的属性即可 -->
    <audio ref="myaudio" :src="songList[index].src" id="myaudio" preload></audio>
    <!-- :src="getSonglist[getIndex].src" -->

    <div id="player-con">
      <!-- 前一首 播放暂停 后一首 -->
      <div id="player-con-btn">
        <a @click="playerForward()"></a>
        <a class="player-pause" @click="playerSwitch()" ref="switchBtn" id="switchBtn"></a>
        <a @click="playerBack()"></a>
      </div>

      <!-- 音乐图片 -->
      <div id="player-img">
        <img :src="songList[index].imgsrc" alt="">
      </div>

      <!-- 音乐名字 歌手 进度条 -->
      <div id="player-message">
        <!-- 音乐名字 歌手 -->
        <div>
          <span @click="toSongDetail()">{{songList[index].songname}}</span>
          <span v-for="item in songList[index].arname">{{item}}</span>
        </div>
        <!-- 进度条和时间盒子 -->
        <div id="ProgressbarCon">
          <input type="range" id="myslider" ref="myslider" @input="slider()" min="0" max="100" value="0">
          <span id="player-time">{{getDt(time)}}/{{getDt(songList[index].time)}}</span>
        </div>

      </div>

      <!-- 收藏 转发 调节音量等功能 -->
      <div id="player-function">
        <span></span>
        <span></span>
        <!-- 调节音量 -->
        <span @click="vc()"></span>
        <span></span>
        <span>21</span>
      </div>
      <div id="volumeControl" ref="volumeControl" v-show="vControl" @mouseleave="vcmouseleave()">
        <input type="range" id="myvolumeslider" min="0" max="100" value="100" ref="myvolumeslider"
          @input="volumeslider()">
      </div>
    </div>
  </div>


  <router-view :key="$route.fullPath"></router-view>
</template>

<script>
  export default {
    name: 'thehead',
    data() {
      return {
        flag: 0,
        // 播放器播放的歌曲列表信息
        songList: [
          {
            songname: '',
            src: '',
            arid: [],
            arname: [],
            imgsrc: '',
            songid: '',
            time: ''
          },
        ],
        //当前音乐在歌曲列表的位置
        index: 0,
        // 音频实时播放时间
        time: 0,
        // 是否展示控制音量slider
        vControl: false,
        // 搜索建议
        serchData: {
          albums: [],
          artists: [],
          songs: [],
          playlists: []
        },
        // 搜索关键词
        keyword: ''
      }


    },

    methods: {
      // 搜索框输入的时候
      serchSuggest(e) {
        console.log(e.target.value)
        this.keyword = e.target.value
        this.axios({
          method: 'get',
          url: '/search/suggest?keywords=' + e.target.value
        }).then(res => {
          this.serchData = res.data.result
        }).catch(err => {
          console.log("获取搜索建议失败")
        })
      },
      toDiscover(num) {
        this.changeHeaderliBgc(num)
        console.log("进入发现音乐")
        this.$router.push('/discover')
      },
      toMyMusic(num) {
        this.changeHeaderliBgc(num)
        console.log("进入我的音乐")
      },
      toFriends(num) {
        this.changeHeaderliBgc(num)
        console.log("进入我的朋友")
      },
      toMall(num) {
        this.changeHeaderliBgc(num)
        console.log("进入商城")
      },
      toMusicMan(num) {
        this.changeHeaderliBgc(num)
        console.log("进入音乐人")
      },
      toClient(num) {
        this.changeHeaderliBgc(num)
        console.log("进入下载客户端")
      },
      //点击改变背景颜色
      changeHeaderliBgc(num) {
        let li = document.getElementById("headermenu").childNodes
        for (let i = 0; i < li.length; i++) {
          if (i == num - 1) {
            li[i].setAttribute("class", "headerlibgc")
          } else {
            li[i].setAttribute("class", "")
          }
        }
      },
      // 点击播放按钮
      playerSwitch() {
        let audio = this.$refs.myaudio
        let switchBtn = this.$refs.switchBtn
        console.log("当前音乐名", this.songList[this.index].songname)
        if (audio.paused) {
          console.log("播放")
          setTimeout(() => {
            audio.play()
            switchBtn.setAttribute("class", "player-open")
          }, 500);
        } else {
          audio.pause()
          console.log("暂停")
          switchBtn.setAttribute("class", "player-pause")
        }
      },
      //点击上一首
      playerForward() {
        let switchBtn = this.$refs.switchBtn
        let myaudio = this.$refs.myaudio
        let len = this.songList.length
        console.log("点击了前一首")
        //判断当前是否播放
        if (myaudio.paused) {
          //如果是暂停状态
          // 把index改变即可
          this.index = (this.index - 1 + len) % len
          switchBtn.setAttribute("class", "player-open")
          setTimeout(() => {
            audio.play()
          }, 500);
        } else {
          // 先暂停
          myaudio.pause()
          switchBtn.setAttribute("class", "player-pause")
          this.index = (this.index - 1 + len) % len
          // 加载到浏览器估计可以流畅播放 在播放
          myaudio.oncanplaythrough = () => {
            myaudio.play()
            switchBtn.setAttribute("class", "player-open")
          }
        }
        localStorage.setItem("index", this.index)
      },

      //点击下一首
      playerBack() {
        let switchBtn = this.$refs.switchBtn
        let myaudio = this.$refs.myaudio
        let len = this.songList.length
        console.log("点击了后一首")
        //判断当前是否播放
        if (myaudio.paused) {
          //如果是暂停状态
          // 把index改变即可
          this.index = (this.index + 1) % len

          switchBtn.setAttribute("class", "player-open")
          setTimeout(() => {
            myaudio.play()
          }, 500);
        } else {
          // 先暂停
          myaudio.pause()
          switchBtn.setAttribute("class", "player-pause")
          this.index = (this.index + 1) % len
          // 加载到浏览器估计可以流畅播放 在播放
          myaudio.oncanplaythrough = () => {
            myaudio.play()
            switchBtn.setAttribute("class", "player-open")

          }
        }
        localStorage.setItem("index", this.index)
      },

      //歌曲时长格式化
      getDt(num) {
        let a = Math.floor(num / 1000)//总秒数
        let b = Math.floor(a / 60)//分钟数
        let c = a % 60//秒数
        let str1, str2
        if (b < 10 && b > 0) {
          str1 = '0' + b
        } else if (b == 0) {
          str1 = '00'
        } else {
          str1 = b
        }
        if (c == 0) {
          str2 = '00'
        } else if (c < 10) {
          str2 = '0' + c
        } else {
          str2 = c
        }
        return str1 + ':' + str2
      },
      //拖动进度条
      slider() {
        let myslider = this.$refs.myslider
        myslider.style.backgroundSize = myslider.value + "% 100%"
        // 改变时间
        let audio = this.$refs.myaudio
        audio.currentTime = parseInt(audio.duration * myslider.value / 100)
      },
      // 点击音量图标
      vc() {
        console.log("点击了音量图标")
        // let vControl=this.$refs.volumeControl
        this.vControl = !this.vControl
      },
      // 鼠标离开音量splider后
      vcmouseleave() {
        console.log("离开")
        this.vControl = false
      },
      // 拖动音量大小进度条
      volumeslider() {
        let volumeslider = this.$refs.myvolumeslider
        volumeslider.style.backgroundSize = volumeslider.value + "% 100%"
        // 改变音量
        let audio = this.$refs.myaudio
        // console.log("当前音量:",audio.volume)
        // console.log("当前音量:",volumeslider.value/100)
        audio.volume = volumeslider.value / 100
      },
      // 进入歌曲详情
      toSongDetail() {
        console.log("点击了歌曲详情")
        this.$router.push({ path: '/discover/song', query: { id: this.songList[this.index].songid } })
      }

    },

    created() {
      let that = this
      this.$nextTick(() => {
        // 判断本地存储是否有track-queue
        let s = localStorage.getItem("track-queue")
        let index = localStorage.getItem("index")
        if (s) {
          let queue = JSON.parse(s)
          that.songList = queue
          that.index = index
        }

      })
    },
    mounted() {
      let that = this
      this.$nextTick(function () {
        // 监听自定义事件 监听播放的index改变
        window.addEventListener("StorageEvent", function () {
          console.log("监听到本地存储index改变")
          let s = localStorage.getItem("track-queue")
          let index = parseInt(localStorage.getItem("index"))
          // 先判断播放去状态
          let audio = document.getElementById("myaudio")
          // console.log(audio.paused)
          if (audio.paused) {
            that.songList = JSON.parse(s)
            that.index = index
            that.playerSwitch()
          } else {
            that.playerSwitch()
            that.songList = JSON.parse(s)
            that.index = index
            that.playerSwitch()
          }
        })
        // window监听自定义事件 监听queue改变 但是index不改变
        window.addEventListener("storageEvent2", function () {
          console.log("监听到queue改变")
          let s = localStorage.getItem("track-queue")
          that.songList = JSON.parse(s)
        })
        // 监听audio播放位置更改
        let audio = document.getElementById("myaudio")
        let myslider = that.$refs.myslider
        audio.addEventListener("timeupdate", function () {
          that.time = audio.currentTime * 1000
          let totolTime = isNaN(audio.duration) ? 1 : audio.duration
          // console.log("当前时间:",audio.currentTime,"总时长:",totolTime)
          myslider.value = audio.currentTime / totolTime * 100
          // console.log("进度条的值",myslider.value)
          myslider.style.backgroundSize = myslider.value + "% 100%"

        })
        // 监听播放结束后
        audio.addEventListener("ended", function () {
          console.log("当前音乐结束")
          that.playerBack()
        })

        // 监听错误状态
        audio.addEventListener("error", function () {
          console.log("错误状态")
          // 就要关闭歌曲 提示错误。
        })
        // 监听暂停事件
        let switchBtn = that.$refs.switchBtn
        audio.addEventListener("pause", function () {
          switchBtn.setAttribute("class", "player-pause")
        })
      })
    },
  }


</script>

<style scoped>
  #myaudio {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
  }

  #headercon {
    background-color: #242424;
  }

  #header {
    position: relative;
    width: 1100px;
    height: 70px;
    background-color: #242424;
    margin: 0 auto;
  }

  #headermenu li {
    float: left;
    line-height: 70px;
    /* font-size: 16px; */
    color: #F9F9F9;
    padding: 0 20px;
    cursor: pointer
  }

  #headermenu li:hover {
    background-color: #000000;
  }

  .serch {
    width: 158px;
    height: 32px;
    margin-top: 19px;
    border-radius: 16px;
    border: none;
    text-indent: 3em;
    font-size: 12px;
    line-height: 32px;
    background: url(https://s2.music.126.net/style/web2/img/frame/topbar.png?7ffbfa72872896d428cebadecd571a42) no-repeat 0px -98px #FFFFFF;
  }

  #cratebtn {
    height: 32px;
    border-radius: 16px;
    border: 1px solid #373737;
    margin-top: 19px;
    padding: 0 20px;
    line-height: 32px;
    outline: none;
    color: #CCCCCC;
    background-color: #242424;

    margin-left: 30px;
    font-size: 12px;
    cursor: pointer
  }

  #cratebtn:hover {
    border: 1px solid #FFFFFF;
    color: #ffffff;
  }

  #loginspan {
    color: #666666;
    font-size: 13px;
    margin-left: 30px;
    cursor: pointer
  }

  #loginspan:hover {
    color: #ffffff;
    text-decoration: underline;

  }

  /* 搜索建议 */
  #ser-sugg {
    position: absolute;
    width: 244px;
    height: 304px;
    top: 63px;
    right: 116px;
    background-color: #FFFFFF;
    z-index: 100;
    box-shadow: -1px -1px 8px 1px #242424;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 12px;
  }
  #ser-sugg>p {
    height: 23px;
    border-bottom: 1px solid #ccc;
    padding:8px 0px 0px 8px;
    color: #6F6F6F;
    cursor: pointer;
  }

  #ser-sugg>p span:hover {
    background-color: #E3E5E7;
  }

  #ser-sugg div>span{
    float: left;
    margin-top: 4px;
    margin-left: 8px;
  }
  #ser-sugg div div{
    float: right;
    width: 175px;
    margin-left: 10px;
    border-left: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  } 
  #ser-sugg div div p{
    width: 167px;
    padding: 4px 0px 4px 8px;
    cursor: pointer;
  }
  
  



  /* 搜索建议end */


  .headerlibgc {
    background-color: #000000;
  }


  #player {
    width: 100%;
    height: 53px;
    background-color: rgba(0, 0, 0, .8);
    position: fixed;
    bottom: 0px;
    /* right: 0; */
    z-index: 100;
    color: #FFFFFF;
  }

  #player #player-con {
    position: relative;
    width: 983px;
    height: 53px;
    /* background-color: yellow; */
    margin: 0 auto;
  }

  #player-con-btn {
    width: 137px;
    height: 42px;
    margin-top: 6px;
    float: left;
    /* display: inline-block; */
    /* background-color: pink; */
  }

  #player-con-btn a {
    float: left;
    width: 28px;
    height: 28px;
    margin-right: 8px;
    margin-top: 7px;
    background: url("https://s2.music.126.net/style/web2/img/frame/playbar.png?0e4c16cd5d6d33e3c074c84ab90c76a3") no-repeat 0px -129px;
  }

  /*  */
  #player-con-btn a:nth-child(2) {
    width: 36px;
    height: 36px;
    margin-top: 3px;
  }

  #player-con-btn a:nth-child(1):hover {
    background-position: -30px -129px;
  }

  #player-con-btn a:nth-child(3) {
    background-position: -81px -129px;
  }

  #player-con-btn a:nth-child(3):hover {
    background-position: -111px -129px;
  }

  /* 音乐没有播放的时候 player-open类 */
  #player-con-btn .player-pause {
    background-position: 0px -204px;
  }

  #player-con-btn .player-pause:hover {
    background-position: -40px -204px;
    /* background-position: 0px -165px; */

  }

  /* 音乐播放的时候 player-open类 */
  #player-con-btn .player-open {
    background-position: 0px -165px;
  }

  #player-con-btn .player-open:hover {
    background-position: -40px -165px;

  }

  #player-con #player-img {
    float: left;
    width: 34px;
    height: 34px;
    margin-top: 10px;
    /* background-color: pink; */
    overflow: hidden;
  }

  #player #player-con #player-message {
    float: left;
    width: 608px;
    height: 53px;
    /* background-color: pink; */
    margin-left: 14px;
  }

  #player-message div:nth-child(1) {
    height: 28px;
    /* background-color: skyblue; */
  }

  #player-message div:nth-child(1) span:nth-child(1) {
    float: left;
    height: 28px;
    max-width: 300px;
    font-size: 12px;
    line-height: 28px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
  }

  #player-message div:nth-child(1) span:nth-child(1):hover {
    text-decoration: underline dashed;
  }

  #player-message div:nth-child(1) span:nth-child(n+2) {
    float: left;
    height: 28px;
    font-size: 12px;
    line-height: 28px;
    margin-left: 17px;
    color: #838383;
    cursor: pointer;
  }

  #player-message div:nth-child(1) span:nth-child(n+2):hover {
    text-decoration: underline dashed;
  }

  #player-message #ProgressbarCon {
    position: relative;
    height: 25px;
    width: 608px;
    /* background-color: pink; */
  }

  #myslider {
    /* margin-top: 8px; */
    -webkit-appearance: none;
    width: 493px;
    height: 6px;
    outline: none;
    border-radius: 3px;
    background: #151616 -webkit-linear-gradient(#C70C0C, #C70C0C) no-repeat;
    background-size: 0% 100%;
  }

  #myslider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    background-color: #C70C0C;
    border-radius: 50%;
  }

  #myslider::-webkit-slider-thumb:hover {
    box-shadow: 0 .125em .125em #3b4547;
  }

  #player-time {
    font-size: 12px;
    margin-left: 5px;
  }



  #player-function {
    float: left;
    width: 190px;
    height: 53px;
  }

  #player-function span {
    float: left;
    height: 25px;
    width: 25px;
    margin-top: 14px;
    margin-left: 6px;
    background-color: pink;
    background: url("https://s2.music.126.net/style/web2/img/frame/playbar.png?0e4c16cd5d6d33e3c074c84ab90c76a3") no-repeat;
  }

  #player-function span:nth-child(1) {
    background-position: -86px -161px;
  }

  #player-function span:nth-child(1):hover {
    background-position: -86px -187px;
  }

  #player-function span:nth-child(2) {
    background-position: -115px -161px;
  }

  #player-function span:nth-child(2):hover {
    background-position: -115px -187px;
  }

  #player-function span:nth-child(3) {
    background-position: -4px -246px;
  }

  #player-function span:nth-child(3):hover {
    background-position: -33px -246px;
  }

  /* 这里应该设置类的 不同的播放方式 不同的类 */
  #player-function span:nth-child(4) {
    background-position: -69px -246px;
  }

  #player-function span:nth-child(4):hover {
    background-position: -96px -246px;
  }

  #player-function span:nth-child(5) {
    width: 59px;
    background-position: -45px -67px;
    font-size: 12px;
    line-height: 28px;
    text-indent: 1.8em;
  }

  #player-function span:nth-child(5):hover {
    background-position: -45px -97px;
  }

  #volumeControl {
    position: absolute;
    top: 0;
    right: 97px;
    transform: translateY(-112px);
    width: 32px;
    height: 113px;
    background-color: rgb(41, 41, 41, .8);

  }

  #volumeControl input {
    transform: rotate(-90deg) translate(-44px, -30.5px);
    cursor: pointer;
    -webkit-appearance: none;
    width: 93px;
    height: 4px;
    outline: none;
    border-radius: 2px;
    background: #151616 -webkit-linear-gradient(#C70C0C, #C70C0C) no-repeat;
    background-size: 100% 100%;
  }

  #volumeControl input::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px;
    height: 14px;
    background-color: #C70C0C;
    border-radius: 50%;
  }

  #volumeControl input::-webkit-slider-thumb:hover {
    box-shadow: 0 .125em .125em #3b4547;

  }
</style>