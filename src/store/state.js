import { playMode } from '../components/js/config.js'
import { loadSearch } from '../components/js/cache.js'

const state = {
  singer: {},
  // 整个播放组件
  playing: true,
  // 播放器
  maxPlay: false,
  // 播放列表
  playlist: [],
  sequenceList: [],
  // 播放模式
  mode: playMode.sequence,
  // 当前播放歌曲索引
  currentIndex: -1,
  // 通过LocalStorage获取历史搜索词
  searchHistory: loadSearch()
}

export default state
