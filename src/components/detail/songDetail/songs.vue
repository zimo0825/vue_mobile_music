<template>
  <div>
    <Scroll class="content">
      <div class="container">
        <div
          @dblclick="selectItem(item, index)"
          class="wrapper"
          v-for="(item, index) in songs"
          :key="index"
        >
          <div class="left">
            <div class="top">
              <div class="singer">{{ item.name }}</div>
              <div class="album">
                {{ item.alias[0] }}
              </div>
            </div>
            <div class="bottom">
              <div class="singer">{{ item.artists[0].name }}</div>
              <div class="album">- {{ item.album.name }}</div>
            </div>
          </div>
          <div class="right">
            <span class="iconfont icon-bofang"></span>
          </div>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '../../scroll/index.vue'
export default {
  data() {
    return {
      songDetail: []
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
.content {
  height: calc(100vh - 7.5rem);
  .container {
    .wrapper {
      display: flex;
      height: 3.75rem;
      .left {
        flex-direction: column;
        width: 19.375rem;
        .top {
          height: 2.5rem;
          display: flex;
          line-height: 3.125rem;
          .singer {
            color: #515da1;
            height: 2.5rem;
            font-size: 1.0625rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .album {
            margin-left: 0.3125rem;
            font-size: 0.75rem;
            width: 13.75rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .bottom {
          flex: 1;
          display: flex;
          color: #767a73;
          font-size: 0.9375rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 0.8125rem;
          .album {
            color: #515da1;
            margin-left: 0.25rem;
          }
        }
      }
      .right {
        line-height: 3.75rem;
        span {
          font-size: 1.625rem;
        }
      }
    }
  }
}
</style>
