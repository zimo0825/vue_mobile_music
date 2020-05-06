import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'
import Search from '../views/search/index.vue'
import Mine from '../views/mine/index.vue'
import Video from '../views/video/index.vue'
import SongDetail from '../components/detail/index.vue'

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
  }
]

const router = new VueRouter({
  routes
})

export default router
