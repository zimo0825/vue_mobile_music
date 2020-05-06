<template>
  <div>
    <Scroll>
      <div class="container">
        <div
          @dblclick="selectItem(item, index)"
          class="wrapper"
          v-for="(item, index) in songs"
          :key="index"
        >
          <div class="top">
            <div class="singer">{{ item.name }}</div>
            <div class="album">
              {{ item.alias[0] }}
            </div>
          </div>
          <div class="bottom">
            <div class="singer">{{ item.artists[0].name }}</div>
            <div class="album">-{{ item.album.name }}</div>
          </div>
        </div>
      </div>
      <audio :src="musicUrl" autoplay></audio>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '../../scroll/index.vue'
export default {
  data() {
    return {
      songDetail: [],
      musicUrl: ''
    }
  },
  components: {
    Scroll
  },
  props: {
    songs: {
      type: Array,
      default() {
        return {}
      }
    }
  },
  methods: {
    // 定义select事件并且向父组件传值
    selectItem(item, index) {
      this.$emit('select', item, index)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  .wrapper {
    display: flex;
    height: 60px;
    flex-direction: column;
    .top {
      height: 40px;
      display: flex;
      line-height: 50px;
      .singer {
        color: #44b64e;
        height: 40px;
        font-size: 17px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .album {
        margin-left: 5px;
        font-size: 12px;
        width: 220px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .bottom {
      flex: 1;
      display: flex;
      color: #767a73;
      font-size: 15px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 13px;
    }
  }
}
</style>
