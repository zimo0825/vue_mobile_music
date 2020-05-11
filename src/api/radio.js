import axios from './http.js'

// 电台轮播
function getBanner() {
  return axios({
    url: '/dj/banner'
  })
}

// 电台推荐
function getRecommend() {
  return axios({
    url: '/dj/recommend'
  })
}

// 电台分类推荐
function getRadioSort(type) {
  return axios({
    url: '/dj/recommend/type',
    params: {
      type
    }
  })
}

// 电台详情
function getRadioDetail(rid) {
  return axios({
    url: '/dj/program',
    params: {
      rid
    }
  })
}

export default {
  getBanner,
  getRecommend,
  getRadioSort,
  getRadioDetail
}
