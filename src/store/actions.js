import * as types from './mutations-type.js'
import { saveSearch, clearSearch } from '../components/js/cache.js'

// 根据当前所选歌曲进入播放详情页并携带相关数据
export const selectPlay = function({ commit }, { list, index }) {
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_MAX_PLAY, true)
  commit(types.SET_PLAYING_STATE, true)
}

// 存储历史搜索词到LocalStorage
export const saveSearchHistory = function({ commit }, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

// 清楚历史搜索词
export const clearSearchHistory = function({ commit }) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}
