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
      <input type="text" class="serch input" placeholder="音乐/视频/电台/用户">
      <!-- 创作者中心 -->
      <button id="cratebtn">创作者中心</button>
      <!-- 头像或者登录 -->
      <a id="loginspan">登录</a>
    </div>
  </div>
  <!-- 播放器绝对定位到底部 -->
  <div id="player">
    <!-- 不显示 自己写样式只是用audio的属性即可 -->
    <audio src='https://music.163.com/song/media/outer/url?id=1447721226.mp3' ref="myaudio"></audio>

    <div id="player-con">
      <!-- 前一首 播放暂停 后一首 -->
      <div id="player-con-btn">
        <a></a>
        <a class="player-pause" @click="playerSwitch()" ref="switchBtn"></a>
        <a></a>
      </div>
      <div id="player-img">
        <!-- 音乐图片 -->
        <img src="http://p3.music.126.net/RMLIZ1gg_TnDhckiRxAK0g==/109951164983271693.jpg?param=34y34" alt="">
      </div>
      <div id="player-message">
        <div>
          <span>在听海</span>
          <span>周大发</span>
        </div>
        <div>
          进度条 以及时间
        </div>
      </div>
      <div id="player-function">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span>21</span>
      </div>
    </div>

  </div>
  <router-view></router-view>
</template>

<script>
  export default {
    name: 'thehead',
    data() {
      return {

      }
    },
    methods: {
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
      playerSwitch() {
        let audio = this.$refs.myaudio
        let switchBtn= this.$refs.switchBtn
        console.log(switchBtn)
        if (audio.paused) {
          audio.play()

          switchBtn.setAttribute("class","player-open")
        } else {
          audio.pause()
          switchBtn.setAttribute("class","player-pause")
        }
        console.log("点击了开关按钮")
      }


    },

  }

</script>

<style scoped>
  #headercon {
    background-color: #242424;
  }

  #header {
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
    background-position: 0px -203px;
  }

  #player-con-btn .player-pause:hover {
    background-position: -40px -203px;
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

  #player-message div:nth-child(1) span:nth-child(2) {
    float: left;
    height: 28px;
    font-size: 12px;
    line-height: 28px;
    margin-left: 17px;
    color: #838383;
    cursor: pointer;
  }

  #player-message div:nth-child(1) span:nth-child(2):hover {
    text-decoration: underline dashed;
  }

  #player-message div:nth-child(2) {
    height: 25px;
    width: 608px;
    background-color: pink;
  }

  #player-function {
    float: left;
    width: 190px;
    height: 53px;
    /* background-color: green; */
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
</style>