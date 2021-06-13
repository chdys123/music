import { createRouter, createWebHistory } from 'vue-router'
const Discover = () => import('../views/Discover.vue')
const Recommend = () => import('../views/Recommend.vue')
const Playlist = () => import('../views/Playlist.vue')
const PlaylistDetail = () => import('../views/PlaylistDetail')
const SongDetail = () => import('../views/SongDetail')
const Artist = () => import('../views/Artist')
const ArHotWorks = () => import('../views/ArHotWorks')
const ArAllAlbum = () => import('../views/ArAllAlbum')
const Armv = () => import('../views/Armv')
const Ardesc = () => import('../views/Ardesc')
const Mvdetail = () => import('../views/Mvdetail')
const Aldetail = () => import('../views/Aldetail')
const TopList = () => import('../views/TopList')
const Artists = () => import('../views/Artists')
const Albums = () => import('../views/Albums')
const SerchDetail = () => import('../views/SerchDetail')
const SerSong=()=>import('../views/Serch/Songs')
const SerArtist=()=>import('../views/Serch/Artists')
const SerAlbum=()=>import('../views/Serch/Albums')
const SerVideo=()=>import('../views/Serch/Videos')
const SerLyrics=()=>import('../views/Serch/Lyrics')
const SerPlaylist=()=>import('../views/Serch/Playlists')
const SerVoice=()=>import('../views/Serch/VoiceAr')
const SerUser=()=>import('../views/Serch/Users')
const MyMusic=()=>import('../views/MyMusic/MyMusic')
const MyAr=()=>import('../views/MyMusic/MyAr')
const MyVedio=()=>import('../views/MyMusic/MyVedio')

const routes = [
  { path: '', redirect: '/discover' },
  { path: '/', redirect: '/discover' },
  // 搜索页面路由
  {
    path: '/serch', component: SerchDetail, children: [
      // 歌曲
      {path:'',redirect:'/serch/song'},
      {path:'song',component:SerSong},
      // 歌手
      {path:'artist',component:SerArtist},
      // 专辑
      {path:'album',component:SerAlbum},
      // 视频
      {path:'video',component:SerVideo},
      // 歌词
      {path:'lyrics',component:SerLyrics},
      // 歌单
      {path:'playlist',component:SerPlaylist},
      // 声音主播
      {path:'voice',component:SerVoice},
      // 用户
      {path:'user',component:SerUser}
    ]
  },
  {//发现音乐路由
    path: '/discover', component: Discover, children: [
      // 推荐
      { path: '', redirect:'/discover/recommend' },
      { path: 'recommend', component: Recommend },
      // 排行榜
      { path: 'toplist', component: TopList },
      // 歌手
      { path: 'artists', component: Artists },
      //歌单
      { path: 'playlist', component: Playlist },
      // 新碟上架
      { path: 'albums', component: Albums },
      //歌单详情
      { path: 'playlistdetail', component: PlaylistDetail },
      // 歌曲详情路由
      { path: 'song', component: SongDetail },
      // mv详情路由
      { path: 'mv', component: Mvdetail },
      // 专辑详情路由
      { path: 'album', component: Aldetail },
      // 歌手详情路由
      {
        path: 'artist', component: Artist, children: [
          // 热门作品路由
          { path: '', redirect: '/discover/artist/arhotworks' },
          { path: 'arhotworks', component: ArHotWorks },
          // 所有专辑路由
          { path: 'album', component: ArAllAlbum },
          // 所有mv
          { path: 'mv', component: Armv },
          // 艺人介绍
          { path: 'desc', component: Ardesc }

        ]
      },
    ]
  },
  {
    // 我的音乐路由
    path:'/mymusic',component:MyMusic,children:[
      // 我的歌手
      { path: '', redirect: '/mymusic/artist' },
      { path: 'artist', component:MyAr},
      { path: 'mv', component:MyVedio},
    ]
  }
]




const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
