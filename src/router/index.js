import { createRouter, createWebHistory } from 'vue-router'
const Discover = () => import('../views/Discover.vue')
const Recommend = () => import('../views/Recommend.vue')
const Playlist = () => import('../views/Playlist.vue')
const PlaylistDetail = () => import('../views/PlaylistDetail')
const SongDetail = () => import('../views/SongDetail')
const Artist = () => import('../views/Artist')
const ArHotWorks=()=>import('../views/ArHotWorks')
const ArAllAlbum=()=>import('../views/ArAllAlbum')
const routes = [
  { path: '', redirect: '/discover' },
  { path: '/', redirect: '/discover' },
  {//发现音乐路由
    path: '/discover', component: Discover, children: [
      // 推荐
      { path: '', redirect: '/discover/recommend' },
      { path: 'recommend', component: Recommend },
      // 排行榜

      //歌单
      {
        path: 'playlist', component: Playlist, children: [


        ]
      },
      //歌单详情
      { path: 'playlistdetail', component: PlaylistDetail },
      // 歌曲详情路由
      { path: 'song', component: SongDetail },
      // 歌手详情路由
      { path: 'artist', component:Artist,children:[
        // 热门作品路由
        {path:'',redirect:'/discover/artist/arhotworks'},
        {path:'arhotworks',component:ArHotWorks},
        // 所有专辑路由
        {path:'album',component:ArAllAlbum}

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
