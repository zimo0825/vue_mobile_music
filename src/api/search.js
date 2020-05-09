import axios from './http.js'

// 热搜歌曲
function hotSearch() {
  return axios({
    url: '/search/hot/detail'
  })
}

// 歌曲详情,获取图片之类的信息
function songDetail(ids) {
  return axios({
    url: '/song/detail',
    params: {
      ids
    }
  })
}

// 获取音乐url
function getMusciUrl(id) {
  return axios({
    url: '/song/url',
    params: {
      id
    }
  })
}

// 根据歌名搜索音乐
function getMusic(keywords, limit, type) {
  return axios({
    url: '/search',
    params: {
      keywords,
      limit,
      type
    }
  })
}

// 获取歌词
function getMusicLyric(id) {
  return axios({
    url: '/lyric',
    params: {
      id
    }
  })
}

// 获取视频播放地址
function getVideoUrl(id) {
  return axios({
    url: '/video/url',
    params: {
      id
    }
  })
}

// 获取视频评论
function getVideoComment(id) {
  return axios({
    url: '/comment/video',
    params: {
      id
    }
  })
}
export default {
  hotSearch,
  songDetail,
  getMusciUrl,
  getMusic,
  getMusicLyric,
  getVideoUrl,
  getVideoComment
}
