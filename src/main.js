import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '../public/basic.css'

const app = createApp(App)
// 在原型上面挂着方法
app.config.globalProperties.setItem = function (key, value) {
    if (key == 'index') {
        // 创建一个自定义事件
        let newStorageEvent = new Event("StorageEvent")
        //把key value 存进本地存储
        localStorage.setItem(key, value)
        // 触发事件
        console.log("本地存储index改变")
        window.dispatchEvent(newStorageEvent)
    } else if (key == 'track-queue') {
        // 创建一个自定义事件
        let newStorageEvent = new Event("StorageEvent2")
        //把key value 存进本地存储
        localStorage.setItem(key, value)
        // 触发事件
        console.log("本地存储track-queue改变")
        window.dispatchEvent(newStorageEvent)

    }


}
// 挂载向本地存储添加歌曲的方法 并改变当前播放index
app.config.globalProperties.addSong = function (song) {
    //判断本地存储是否有 track-queue
    if (localStorage.getItem("track-queue") == null) {
        let num = [song]
        let s = JSON.stringify(num)
        localStorage.setItem("track-queue", s)
        // 存储播放位置
        this.setItem("index", 0)
    } else {
        // 如果本地有
        let queue = JSON.parse(localStorage.getItem("track-queue"))
        // 判断歌曲是否在当前播放列表中
        for (let i = 0; i < queue.length; i++) {
            if (song.songid == queue[i].songid) {
                this.setItem("index", i)
                console.log(localStorage.getItem("index"))
                return
            }
        }
        queue.push(song)
        let s = JSON.stringify(queue)
        localStorage.setItem("track-queue", s)
        let len = queue.length
        this.setItem("index", len - 1)
    }
    console.log(localStorage.getItem("index"))
}
// 向播放列表中添加歌曲 但是不改变index(加入播放列表)
app.config.globalProperties.addtoQueue = function (song) {
    console.log("addtoQueue")
    //判断本地存储是否有 track-queue
    if (localStorage.getItem("track-queue") == null) {
        let num = [song]
        let s = JSON.stringify(num)
        localStorage.setItem("track-queue", s)
        // 存储播放位置
        this.setItem("index", 0)
        console.log("加入播放列表成功")
    } else {
        let queue = JSON.parse(localStorage.getItem("track-queue"))
        // 判断歌曲是否在当前播放列表中
        for (let i = 0; i < queue.length; i++) {
            if (song.songid == queue[i].songid) {
                console.log("当前歌曲已经在播放列表中")
                return
            }
        }
        // 歌曲不在播放列表中
        queue.push(song)
        let s = JSON.stringify(queue)
        this.setItem("track-queue", s)
        console.log("加入播放列表成功")
    }
}
// 传入歌曲id,获取歌曲信息
app.config.globalProperties.getsong1 = function (id) {
    let p1 = this.axios({
        url: '/song/detail?ids=' + id,
        method: 'get'
    })

    let p2 = this.axios({
        method: 'get',
        url: '/song/url?id=' + id
    })
    return Promise.all([p1, p2])
}
app.config.globalProperties.getsong2 = function (result) {
    let song = {}
    let res1 = result[0]
    let res2 = result[1]
    // 歌曲名
    song.songname = res1.data.songs[0].name
    // 歌曲id
    song.songid = res1.data.songs[0].id
    // 歌手名
    song.arname = []
    // 歌手id
    song.arid = []
    for (let i = 0; i < res1.data.songs[0].ar.length; i++) {
        song.arname.push(res1.data.songs[0].ar[i].name)
        song.arid.push(res1.data.songs[0].ar[i].id)
    }
    // 歌曲图片
    song.imgsrc = res1.data.songs[0].al.picUrl + '?param=34y34'
    // 歌曲播放时间
    song.time = res1.data.songs[0].dt
    // if vip 歌曲
    if (res1.data.privileges[0].chargeInfoList[0].chargeType == 0) {
        song.vip = 'no'
    } else {
        song.vip = 'yes'
    }

    // 获取音乐播放地址
    song.src = res2.data.data[0].url
    // 改变音乐播放时长
    if (res2.data.data[0].freeTrialInfo) {
        song.time = (parseInt(res2.data.data[0].freeTrialInfo.end) - parseInt(res2.data.data[0].freeTrialInfo.start))*1000
    }
    return song
}
// 返回歌曲对象
app.config.globalProperties.getsong = async function (id) {
    let result = await this.getsong1(id)
    return this.getsong2(result)
}
// 封装播放函数
app.config.globalProperties.playMusic=async function(id){
    this.addSong(await this.getsong(id))
}
// 封装添加播放队列函数
app.config.globalProperties.addMusic=async function(id){
    this.addtoQueue(await this.getsong(id))
}


// 歌单或者专辑播放 里面很多首歌曲 点击播放都要加入播放列表 并播放第一首歌 传入id数组
app.config.globalProperties.playMusics=async function(arr){
    // 第一首歌是播放 剩下的都是加入列表
    this.playMusic(arr[0])
    for(let i=1;i<arr.length;i++){
        this.addMusic(arr[i])
    }
    console.log("点击了",arr)
}

// 歌单或者专辑加入播放列表 里面很多首歌 点击加入播放列表 
app.config.globalProperties.addMusics=async function(arr){
    for(let i=0;i<arr.length;i++){
        this.addMusic(arr[i])
    }
}


// 进入入歌单详情
app.config.globalProperties.toPlatListDetail=function(id){
    this.$router.push({path:'/discover/playlistdetail',query:{id:id}})
}
// 进入歌曲详情
app.config.globalProperties.toSongDetail=function(id){
    this.$router.push({path:'/discover/song',query:{id:id}})
}
// 进入歌手详情
app.config.globalProperties.toAr=function(id){
    this.$router.push({ path: '/discover/artist', query: { id: id } })
}
// 进入专辑详情
app.config.globalProperties.toAl=function(id){
    this.$router.push({ path: '/discover/album', query: { id: id } })
}
// 进入mv详情
app.config.globalProperties.toMv=function(id){
    this.$router.push({ path: '/discover/mv', query: { id: id } })
}




axios.defaults.baseURL = "http://localhost:3000"
axios.defaults.withCredentials = true
app.use(store).use(router).use(VueAxios, axios).mount('#app')
