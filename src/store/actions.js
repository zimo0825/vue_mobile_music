import * as types from './mutations-type.js'

export const selectPlay = function({ commit }, { list, index }) {
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_MAX_PLAY, true)
  commit(types.SET_PLAYING_STATE, true)
}
