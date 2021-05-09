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
    }else if(key=='track-queue'){
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

// 向播放列表中添加歌曲 但是不改变index
app.config.globalProperties.addtoQueue = function (song) {
    console.log("addtoQueue")
    //判断本地存储是否有 track-queue
    if (localStorage.getItem("track-queue") == null) {
        let num = [song]
        let s = JSON.stringify(num)
        localStorage.setItem("track-queue", s)
        // 存储播放位置
        this.setItem("index", 0)
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
    }
}
axios.defaults.baseURL = "http://localhost:3000"
app.use(store).use(router).use(VueAxios, axios).mount('#app')
