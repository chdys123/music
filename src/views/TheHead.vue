<template>
  <div id="headercon">
    <div id="header">
      <div class="logo">
      </div>
      <ul id="headermenu">
        <li @click="toDiscover(1)" class="headerlibgc">发现音乐</li>
        <li @click="toMyMusic()">我的音乐</li>
        <li @click="toFriends(3)">朋友</li>
        <li @click="toMall(4)">商城</li>
        <li @click="toMusicMan(5)">音乐人</li>
        <li @click="toClient(6)">下载客户端</li>
      </ul>

      <!-- 搜索框 -->
      <input type="text" class="myserch input" placeholder="音乐/视频/电台/用户" @input="serchSuggest($event)"
        @focus="serchfocus($event)" id="serch1" @keydown="serch($event)">
      <!-- 创作者中心 -->
      <button id="cratebtn">创作者中心</button>
      <!-- 头像或者登录 -->
      <!-- 登录之后显示头像 登录字样消失 -->
      <a id="loginspan" @click="clickLogin1()" v-if="isLogin==false">登录</a>
      <!-- 头像 -->
      <div id="userImg-con">
        <img :src="userImg" alt="" id="userImg" v-if="isLogin==true">
        <!-- 鼠标停在头像上面的时候 显示个人信息选项 -->
        <div id="user-img-func">
          <p @click="toMyMusic()"><i class="wdzyLogo"></i>我的主页</p>
          <p><i class="wdxxLogo"></i>我的消息</p>
          <p><i class="wddjLogo"></i>我的等级</p>
          <p><i class="viphyLogo"></i>VIP会员</p>
          <p><i class="grszLogo"></i>个人设置</p>
          <p><i class="smrzLogo"></i>实名认证</p>
          <p @click="logout()"><i class="tcLogo"></i>退出</p>
        </div>

      </div>


      <!-- 搜索建议 -->
      <div class="ser-sugg" v-if="isShow">
        <p v-if="isShow"><span v-if="isShow">搜索'{{keyword}}'相关用户</span>&nbsp;&gt;</p>
        <div v-if="serchData.songs!=null">
          <p><span class="serSong"></span><span>单曲</span></p>
          <div>
            <p v-for="item in serchData.songs" class="ellipsis" @click="toSongDetail(item.id)">
              <span>{{item.name}}</span>-<span v-for="item1 in item.artists">{{item1.name}}&nbsp;</span>
            </p>
          </div>
          <br style="clear: both;">
        </div>

        <div v-if="serchData.artists!=null">
          <p><span class="serAr"></span><span>歌手</span></p>
          <div class="ser-sugg-bgc1">
            <p v-for="item in serchData.artists" class="ellipsis" @click="toArDetail(item.id)">
              <span>{{item.name}}</span>
            </p>
          </div>
          <br style="clear: both;">

        </div>
        <div v-if="serchData.albums!=null">
          <p><span class="serAl"></span><span>专辑</span></p>
          <div>
            <p v-for="item in serchData.albums" class="ellipsis" @click="toAlDetail(item.id)">
              <span>{{item.name}}-{{item.artist.name}}</span>
            </p>
          </div>
          <br style="clear: both;">

        </div>
        <div v-if="serchData.playlists!=null">
          <p><span class="serPlaylist"></span><span>歌单</span></p>

          <div class="ser-sugg-bgc1">
            <p v-for="item in serchData.playlists" class="ellipsis" @click="toplaylistDetail(item.id)">
              <span>{{item.name}}</span>
            </p>
          </div>
          <br style="clear: both;">
        </div>
      </div>
      <!-- 搜索建议end -->
    </div>

  </div>



  <!-- 播放器绝对定位到底部 -->
  <div id="player">
    <!-- 不显示 自己写样式只是用audio的属性即可 自己根据id获取播放地址-->
    <!-- <audio ref="myaudio" :src="songList[index].src" id="myaudio" preload></audio> -->
    <audio ref="myaudio" :src="src" id="myaudio" preload></audio>

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
          <span @click="toSongDetail(songList[index].songid)">{{songList[index].songname}}</span>
          <span v-for="(item,index1) in songList[index].arname"
            @click="toAr(songList[index].arid[index1])">{{item}}</span>
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
        <span>{{songList.length}}</span>
      </div>
      <div id="volumeControl" ref="volumeControl" v-show="vControl" @mouseleave="vcmouseleave()">
        <input type="range" id="myvolumeslider" min="0" max="100" value="100" ref="myvolumeslider"
          @input="volumeslider()">
      </div>
    </div>

  </div>
  <!-- 登录弹出框 -->
  <el-dialog title="手机号登录" v-model="isShowLogin" width="30%">
    <span class="closeLogin">
      <i class="closeLoginLogo" @click="handleClose()"></i>
    </span>
    <div class="LoginInput">
      <p><input type="text" placeholder="请输入手机号" v-model="phone"></p>
      <p><input type="password" placeholder="请输入密码" v-model="password"></p>
      <p><button @click="Login()">登&nbsp;&nbsp;&nbsp;录</button></p>
    </div>
    <div class="login-bottom"></div>
  </el-dialog>

  <!-- 登录弹出框end -->

  <router-view :key="$route.fullPath"></router-view>
</template>

<script>
  export default {
    name: 'thehead',
    data() {
      return {
        flag: 0,
        // 用户id
        userId: '',
        // 用户头像url
        userImg: '',
        // 是否登录
        isLogin: false,
        // 播放器播放的歌曲列表信息从浏览器本地获取的
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
        index:1,
        // 当前音乐的实时播放路径
        src: '',
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
        keyword: '',
        // 是否显示搜索建议
        isShow: false,
        // 是否弹出登录框
        isShowLogin: false,
        // 手机号码,
        phone: '',
        // 登录密码
        password: ''
      }
    },
    watch: {
      index(newindex,oldindex){
        console.log("index改变了,newindex:",newindex,"oldindex:",oldindex)
        let id=this.songList[newindex].songid
        this.getSrc(id)
      }

    },


    methods: {
      // 点击关闭的时候
      handleClose() {
        this.isShowLogin = false
      },
      // 加载组件的时候判断是否登录 加时间戳
      status() {
        this.axios({
          method: 'get',
          url: '/login/status?timestamp=' + Date.now()
        }).then(res => {
          if (res.data.data.account === null) {
            // this.$message.success({
            //   message: '没有登录',
            //   type: 'success'
            // })
            this.isLogin = false
            // 
          } else {
            // this.$message.success({
            //   message: '已经登录了',
            //   type: 'success'
            // })
            this.isLogin = true
            this.userId = res.data.data.account.id
            this.userImg = res.data.data.profile.avatarUrl + '?param=30y30'
          }
        }).catch(err => {
          console.log("获取登录状态失败")
        })
      },

      // 点击登录的时候 弹出登录对话框
      clickLogin1() {
        this.isShowLogin = true
      },
      // 点击登录弹出框中的登录按钮
      Login() {
        // console.log("点击了登录按钮")
        this.axios({
          method: 'get',
          url: '/login/cellphone?phone=' + this.phone + '&password=' + this.password + '&timestamp=' + Date.now()
        }).then(res => {
          console.log(res.data.code)
          // 判断是否登录成功
          if (res.data.code == 200) {
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            // 登录弹出框消失
            this.isShowLogin = false
            // 显示头像
            this.id = res.data.account.id
            this.userImg = res.data.profile.avatarUrl
            this.isLogin = true
            // 登录成功后跳转到首页
            this.$router.push('/discover/recommend')
            // 刷新页面
            setTimeout(() => {
              location.reload()
            }, 1)

          } else {
            this.$message({
              message: res.data.message,
              type: 'error'
            })

          }

          // 登录成功之后把本地里面的vip歌曲全部重新获取
          // 退出登录后 把vip歌曲。。。。
        }).catch(err => {
          console.log("登录失败")
        })
      },

      // 退出登录
      logout(){
        this.axios({
          method:'get',
          url:'/logout'+ '?timestamp=' + Date.now()
        }).then(res=>{
          if(res.data.code==200){
            this.$router.push('/discover/recommend')
            // 刷新页面
            setTimeout(() => {
              location.reload()
            }, 1)
          }
        }).catch(err=>{
          console.log("退出登录失败")
        })
      },
      // 搜索框输入的时候
      serchSuggest(e) {
        this.keyword = e.target.value.trim()
        // console.log(this.keyword)
        if (this.keyword == '') {
          this.isShow = false
          return
        }
        this.axios({
          method: 'get',
          url: '/search/suggest?keywords=' + e.target.value
        }).then(res => {
          this.serchData = res.data.result
          if (Object.keys(res.data.result).length == 0) {
            this.isShow = false
          } else {
            this.isShow = true
          }
        }).catch(err => {
          console.log("获取搜索建议失败", err)
        })
      },
      // 搜索框键盘按下
      serch(e) {
        if (this.keyword != '' && e.keyCode == 13) {
          this.isShow = false
          this.$router.push({ path: '/serch', query: { keyword: this.keyword } })
        }
      },
      toDiscover(num) {
        this.changeHeaderliBgc(num)
        console.log("进入发现音乐")
        this.$router.push('/discover')
      },
      toMyMusic() {
        this.$router.push({ path: '/mymusic', query: { id: this.userId } })
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
      // 获取播放地址
      async getSrc(id) {
        let res = await this.getSongUrl(id)
        console.log("音乐实时播放地址:", res.data.data[0].url)
        this.src=res.data.data[0].url
        if(this.src==null){
          this.$message({
            message:'当前音乐需要单独付费',
            type:'error'
          })
          // this.playerBack()
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
            myaudio.play()
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
      toSongDetail(id) {
        console.log("点击了歌曲详情")
        this.isShow = false
        this.$router.push({ path: '/discover/song', query: { id: id } })
      },
      // 进入歌手详情
      toArDetail(id) {
        console.log("点击了歌手详情")
        this.isShow = false
        this.$router.push({ path: '/discover/artist', query: { id: id } })
      },
      // 进入专辑详情
      toAlDetail(id) {
        console.log("点击了专辑详情")
        this.isShow = false
        this.$router.push({ path: '/discover/album', query: { id: id } })
      },
      // 进入歌单详情
      toplaylistDetail(id) {
        console.log("点击率歌单详情")
        this.isShow = false
        this.$router.push({ path: '/discover/playlistdetail', query: { id: id } })
      },

      // 输入框获得焦点
      serchfocus(e) {
        if (e.target.value != '') {
          this.isShow = true
        }
      },


    },

    created() {
      let that = this
      // 判断登录状态
      this.status()
      this.$nextTick(() => {
        // 判断本地存储是否有track-queue
        let s = localStorage.getItem("track-queue")
        let index = localStorage.getItem("index")
        if (s) {
          let queue = JSON.parse(s)
          that.songList = queue
          that.index = index
          // 获取当前src
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
          // 先判断播放器状态
          let audio = document.getElementById("myaudio")
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

          // 获取当前src


        })
        // window监听自定义事件 监听queue改变 但是index不改变
        window.addEventListener("StorageEvent2", function () {
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
          // let audio = this.$refs.myaudio
          // let switchBtn = this.$refs.switchBtn
          // if (audio.paused) {

          // } else {
          //   audio.pause()
          //   console.log("暂停")
          //   switchBtn.setAttribute("class", "player-pause")
          // }

        })
        // 监听暂停事件
        let switchBtn = that.$refs.switchBtn
        audio.addEventListener("pause", function () {
          switchBtn.setAttribute("class", "player-pause")
        })

        // 监听点击其他区域 搜索建议框消失 歌单种类选择框消失
        window.addEventListener("click", function (e) {
          if (e.target.getAttribute('id') != 'serch1' && e.target.getAttribute('class') != 'ser-sugg') {
            that.isShow = false
          }
        })


      })
    },


  }

</script>

<style>
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

  .myserch {
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

    margin-left: 20px;
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

  /* 用户头像 */
  #userImg-con {
    display: inline-block;
    /* background-color: pink; */
    height: 30px;
    width: 30px;
    margin-left: 15px;
    border-radius: 50%;
  }

  #userImg {
    border-radius: 50%;
    vertical-align: middle;
  }

  #userImg-con:hover #user-img-func {
    display: inline-block;
  }

  /* 个人信息选项 */
  #user-img-func {
    position: absolute;
    right: -33px;
    top: 52px;
    width: 160px;
    height: 245px;
    background-color: #2B2B2B;
    z-index: 10;
    color: #CCCCCC;
    display: none;
  }

  #user-img-func p {
    font-size: 12px;
    line-height: 35px;
    cursor: pointer;
    padding: 0px 10px 0px 20px;
  }

  #user-img-func p:hover {
    background-color: #353535;
  }

  #user-img-func p i {
    display: inline-block;
    width: 18px;
    height: 18px;
    background: url('https://s2.music.126.net/style/web2/img/frame/toplist.png?787607357925eff0b50b673a2342d45d') no-repeat 0px 0px;
    vertical-align: middle;
    margin-right: 10px;
  }

  #user-img-func .wdzyLogo {
    background-position: 0px -81px;
  }

  #user-img-func .wdxxLogo {
    background-position: -20px -121px;
  }

  #user-img-func .wddjLogo {
    background-position: 0 -100px;
  }

  #user-img-func .viphyLogo {
    background-position: 0 -221px;
  }

  #user-img-func .grszLogo {
    background-position: 0 -141px;
  }

  #user-img-func .smrzLogo {
    background-position: -20px -143px;
  }

  #user-img-func .tcLogo {
    background-position: 0 -201px;
  }







  /* 个人信息选项end */

  /* 搜索建议 */
  .ser-sugg {
    position: absolute;
    width: 244px;
    /* height: 304px; */
    top: 63px;
    right: 116px;
    background-color: #FFFFFF;
    z-index: 100;
    box-shadow: -1px -1px 8px 1px #242424;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 12px;
  }

  .ser-sugg>p {
    height: 23px;
    border-bottom: 1px solid #ccc;
    padding: 8px 0px 0px 8px;
    color: #6F6F6F;
    cursor: pointer;
  }

  .ser-sugg>p span:hover {
    background-color: #E3E5E7;
  }

  .ser-sugg>div>p {
    float: left;

  }

  .ser-sugg>div>p>span:nth-child(2) {
    margin-top: 4px;
    margin-left: 4px;
  }

  .ser-sugg>div>p>span:nth-child(1) {
    display: inline-block;
    width: 16px;
    height: 18px;
    margin-left: 8px;
    vertical-align: middle;
    /* background-color: pink; */
  }

  .ser-sugg div div {
    float: right;
    width: 175px;
    margin-left: 10px;
    border-left: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }

  .ser-sugg div div p {
    width: 167px;
    padding: 4px 0px 4px 8px;
    cursor: pointer;
  }

  .ser-sugg div div p:hover {
    background-color: #E3E5E7;
  }

  .ser-sugg .ser-sugg-bgc1 {
    background-color: #F9F8F8;
  }

  /* 搜索建议end */




  /* 登录弹出框 */
  .closeLogin {
    position: absolute;
    top: 0px;
    right: 0px;
    height: 40px;
    width: 45px;
  }

  .closeLoginLogo {
    position: absolute;
    width: 10px;
    height: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: url('https://s2.music.126.net/style/web2/img/layer/layer.png?029a4018cc2eeb15afff986d6d6ef935') no-repeat 0 -95px;
    cursor: pointer;
  }

  .LoginInput {
    padding-top: 30px;
    border-bottom: 1px solid #C6C6C6;
  }

  .LoginInput input {
    width: 208px;
    height: 20px;
    outline: none;
    border: 1px solid #CDCDCD;
    font-size: 12px;
    padding: 5px 6px 6px;
    border-radius: 5px;
  }

  .LoginInput p {
    text-align: center;
    margin-bottom: 10px;
  }

  .LoginInput button {
    width: 220px;
    height: 30px;
    background-color: #3181CD;
    outline: none;
    border-radius: 5px;
    border: none;
    color: white;
    margin-top: 20px;
    margin-bottom: 40px;
  }

  .LoginInput button:hover {
    background-color: #5DA2E2;
  }

  .login-bottom {
    background-color: #F7F7F7;
  }

  /* 登录弹出框end*/
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