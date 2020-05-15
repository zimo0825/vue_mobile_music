import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/index.vue')
const Search = () => import('../views/search/index.vue')
const Mine = () => import('../views/mine/index.vue')
const Video = () => import('../views/video/index.vue')
const SongDetail = () => import('../components/detail/index.vue')
const RecommendDetail = () => import('../components/recommendDetail/index.vue')
const AlbumDetail = () => import('../components/albumDetail/index.vue')
const SongList = () => import('../views/songlist/index.vue')
const RankList = () => import('../views/ranklist/index.vue')
const VideoUrl = () => import('../components/detail/songDetail/videoUrl.vue')
const Radio = () => import('../views/radio/index.vue')
const RadioDetail = () => import('../components/radioDetail/index.vue')
const Star = () => import('../components/star/index.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/star',
    component: Star
  },
  {
    path: '/',
    component: Home
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '*',
    component: Home
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/mine',
    component: Mine
  },

  {
    path: '/video',
    component: Video
  },
  {
    path: '/songdetail',
    component: SongDetail
  },

  {
    path: '/recommenddetail',
    component: RecommendDetail
  },
  {
    path: '/albumdetail',
    component: AlbumDetail
  },
  {
    path: '/songlist',
    component: SongList
  },
  {
    path: '/ranklist',
    component: RankList
  },
  {
    path: '/playvideo',
    component: VideoUrl
  },
  {
    path: '/radio',
    component: Radio
  },
  {
    path: '/radiodetail',
    component: RadioDetail
  }
]

const router = new VueRouter({
  routes
})

export default router
