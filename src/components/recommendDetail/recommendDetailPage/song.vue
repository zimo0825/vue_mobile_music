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
  height: 3.75rem;
  display: flex;
  align-items: center;
  .count {
    width: 2.5rem;
    text-align: center;
    color: #a79595;
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;

    .top {
      height: 1.25rem;
      .singer {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 12.5rem;
      }
    }
    .bottom {
      display: flex;
      margin-top: 0.3125rem;
      color: #a99d9d;
      font-size: 0.875rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 15.625rem;
    }
  }
  .play {
    width: 3.75rem;
    span {
      font-size: 1.625rem;
    }
  }
}
</style>
