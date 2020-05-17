import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () =>
  import(/* webpackChunkName: "home" */ '../views/home/index.vue')
const Search = () =>
  import(/* webpackChunkName: "search" */ '../views/search/index.vue')
const Mine = () =>
  import(/* webpackChunkName: "mine */ '../views/mine/index.vue')
const Singer = () =>
  import(/* webpackChunkName: "singer" */ '../views/singer/index.vue')
const SongDetail = () =>
  import(
    /* webpackChunkName: "searchDetail" */ '../components/detail/index.vue'
  )
const RecommendDetail = () =>
  import(
    /* webpackChunkName: "homeDetail" */ '../components/recommendDetail/index.vue'
  )
const AlbumDetail = () =>
  import(
    /* webpackChunkName: "homeDetail" */ '../components/albumDetail/index.vue'
  )
const SongList = () =>
  import(/* webpackChunkName: "search" */ '../views/songlist/index.vue')
const RankList = () =>
  import(/* webpackChunkName: "homeDetail" */ '../views/ranklist/index.vue')
const VideoUrl = () =>
  import(
    /* webpackChunkName: "search" */ '../components/detail/songDetail/videoUrl.vue'
  )
const Radio = () =>
  import(/* webpackChunkName: "homeRadio" */ '../views/radio/index.vue')
const RadioDetail = () =>
  import(
    /* webpackChunkName: "homeRadio" */ '../components/radioDetail/index.vue'
  )
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
    path: '/singer',
    component: Singer
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
