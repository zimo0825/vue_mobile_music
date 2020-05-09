import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'
import Search from '../views/search/index.vue'
import Mine from '../views/mine/index.vue'
import Video from '../views/video/index.vue'
import SongDetail from '../components/detail/index.vue'
import HotDetail from '../components/hotDetail/index.vue'
import RecommendDetail from '../components/recommendDetail/index.vue'
import AlbumDetail from '../components/albumDetail/index.vue'
import SongList from '../views/songlist/index.vue'
import VideoUrl from '../components/detail/songDetail/videoUrl.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    // name: 'Home',
    component: Home
  },
  {
    path: '*',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/mine',
    name: 'Mine',
    component: Mine
  },

  {
    path: '/video',
    name: 'Video',
    component: Video
  },
  {
    path: '/songdetail',
    name: 'SongDetail',
    component: SongDetail
  },
  {
    path: '/hotdetail',
    name: 'HotDetail',
    component: HotDetail
  },
  {
    path: '/recommenddetail',
    name: 'RecommendDetail',
    component: RecommendDetail
  },
  {
    path: '/albumdetail',
    name: 'AlbumDetail',
    component: AlbumDetail
  },
  {
    path: '/songlist',
    name: 'SongList',
    component: SongList
  },
  {
    path: '/playvideo',
    name: 'VideoUrl',
    component: VideoUrl
  }
]

const router = new VueRouter({
  routes
})

export default router
