import axios from './http.js'

// 首页轮播图数据
function getBanner() {
  return axios({
    url: '/banner'
  })
}

// 歌单
function getRecommendList(limit = 6) {
  return axios({
    url: '/top/playlist',
    params: {
      limit
    }
  })
}

// 推荐歌单
function getRecommendSong() {
  return axios({
    url: '/personalized'
  })
}

// 获取精品歌单
function getBoutiqueSong(limit = 30) {
  return axios({
    url: '/top/playlist/highquality',
    params: {
      limit
    }
  })
}

// 获取精品歌单(华语)
function getCnMusic(limit = 30) {
  return axios({
    url: '/top/playlist/highquality?cat=华语',
    params: {
      limit
    }
  })
}

// 获取精品歌单(欧美)
function getAmerica(limit = 30) {
  return axios({
    url: '/top/playlist/highquality?cat=欧美',
    params: {
      limit
    }
  })
}

// 新碟上架
function getAlbum() {
  return axios({
    url: '/top/album',
    params: {
      limit: 6
    }
  })
}

// 获取推荐歌单详情
function getRecommendDetail(id) {
  return axios({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}

// 获取新碟详情
function getAlbumDetail(id) {
  return axios({
    url: '/album',
    params: {
      id
    }
  })
}

// 新歌速递
function getNewSong(type = 96) {
  return axios({
    url: '/top/song',
    params: {
      type
    }
  })
}

// 排行榜
function getRankingList(idx) {
  return axios({
    url: '/top/list',
    params: {
      idx
    }
  })
}

// 所有榜单
function getAllList() {
  return axios({
    url: '/toplist'
  })
}

// 私人FM
function getPersonal() {
  return axios({
    url: '/personal_fm'
  })
}

export default {
  getBanner,
  getRecommendList,
  getAlbum,
  getRecommendDetail,
  getAlbumDetail,
  getNewSong,
  getRecommendSong,
  getBoutiqueSong,
  getCnMusic,
  getAmerica,
  getRankingList,
  getAllList,
  getPersonal
}
