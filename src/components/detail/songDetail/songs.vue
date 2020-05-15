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
  height: calc(100vh - 120px);
  .container {
    .wrapper {
      display: flex;
      height: 60px;
      .left {
        flex-direction: column;
        width: 310px;
        .top {
          height: 40px;
          display: flex;
          line-height: 50px;
          .singer {
            color: #515da1;
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
          .album {
            color: #515da1;
            margin-left: 4px;
          }
        }
      }
      .right {
        line-height: 60px;
        span {
          font-size: 26px;
        }
      }
    }
  }
}
</style>
