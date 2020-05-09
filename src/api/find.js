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
function getRecommendDetail(id, limit = 10) {
  return axios({
    url: '/playlist/detail',
    params: {
      id,
      limit
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

export default {
  getBanner,
  getRecommendList,
  getAlbum,
  getRecommendDetail,
  getAlbumDetail,
  getNewSong
}
