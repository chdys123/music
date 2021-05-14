import { createRouter, createWebHistory } from 'vue-router'
const Discover = () => import('../views/Discover.vue')
const Recommend = () => import('../views/Recommend.vue')
const Playlist = () => import('../views/Playlist.vue')
const PlaylistDetail = () => import('../views/PlaylistDetail')
const SongDetail = () => import('../views/SongDetail')
const Artist = () => import('../views/Artist')
const ArHotWorks=()=>import('../views/ArHotWorks')
const ArAllAlbum=()=>import('../views/ArAllAlbum')
const Armv=()=>import('../views/Armv')
const Ardesc=()=>import('../views/Ardesc')
const Mvdetail=()=>import('../views/Mvdetail')
const Aldetail=()=>import('../views/Aldetail')
const TopList=()=>import('../views/TopList')
const Artists=()=>import('../views/Artists')
const routes = [
  { path: '', redirect: '/discover' },
  { path: '/', redirect: '/discover' },
  {//发现音乐路由
    path: '/discover', component: Discover, children: [
      // 推荐
      { path: '', redirect: '/discover/recommend' },
      { path: 'recommend', component: Recommend },
      // 排行榜
      {path:'toplist',component:TopList},
      // 歌手路由
      {path:'artists',component:Artists},
      //歌单
      {path: 'playlist', component: Playlist},
      //歌单详情
      { path: 'playlistdetail', component: PlaylistDetail },
      // 歌曲详情路由
      { path: 'song', component: SongDetail },
      // mv详情路由
      {path:'mv',component:Mvdetail},
      // 专辑详情路由
      {path:'album',component:Aldetail},
      // 歌手详情路由
      { path: 'artist', component:Artist,children:[
        // 热门作品路由
        {path:'',redirect:'/discover/artist/arhotworks'},
        {path:'arhotworks',component:ArHotWorks},
        // 所有专辑路由
        {path:'album',component:ArAllAlbum},
        // 所有mv
        {path:'mv',component:Armv},
        // 艺人介绍
        {path:'desc',component:Ardesc}

      ]
    },
    ]
  },
]




const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
