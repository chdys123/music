import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '../public/basic.css'

const app=createApp(App)
// 在原型上面挂着方法
app.config.globalProperties.setItem = function(key,value){
    // 创建一个自定义事件
    let newStorageEvent= new Event("StorageEvent")
    //把key value 存进本地存储
    localStorage.setItem(key,value)
    // 触发事件
    console.log("本地存储改变")
    window.dispatchEvent(newStorageEvent)
}

axios.defaults.baseURL="http://localhost:3000"
app.use(store).use(router).use(VueAxios, axios).mount('#app')
