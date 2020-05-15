<template>
  <div>
    <div
      @click="selectItem(item, index)"
      class="wrappers"
      v-for="(item, index) in tracks"
      :key="item.id"
    >
      <div class="count">
        <span>{{ index + 1 }}</span>
      </div>
      <div class="right">
        <div class="top">
          <div class="singer">{{ item.name }}</div>
        </div>
        <div class="bottom">
          <h3>{{ item.ar[0].name }}</h3>
          <span>-{{ item.al.name }}</span>
        </div>
      </div>
      <div class="play">
        <span class="iconfont icon-bofang"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    tracks: {
      type: Array,
      default() {
        return []
      }
    },
    RecommendList: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    selectItem(item, index) {
      this.selectPlay({
        list: this.tracks,
        index
      })
    },

    ...mapActions(['selectPlay'])
  }
}
</script>

<style lang="less" scoped>
.wrappers {
  height: 60px;
  display: flex;
  align-items: center;
  .count {
    width: 40px;
    text-align: center;
    color: #a79595;
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;

    .top {
      height: 20px;
      .singer {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 200px;
      }
    }
    .bottom {
      display: flex;
      margin-top: 5px;
      color: #a99d9d;
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 250px;
    }
  }
  .play {
    width: 60px;
    span {
      font-size: 26px;
    }
  }
}
</style>
