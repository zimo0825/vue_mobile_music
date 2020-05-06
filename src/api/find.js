import axios from './http.js'

// 首页轮播图数据
function getBanner() {
  return axios({
    url: '/banner'
  })
}

// 推荐歌单
function getRecommend() {
  return axios({
    url: '/personalized',
    params: {
      limit: 6
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

export default {
  getBanner,
  getRecommend,
  getAlbum
}
