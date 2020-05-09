<template>
  <div>
    <Scroll>
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
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '../../scroll/index.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    Scroll
  },
  props: {
    tracks: {
      type: Array,
      default() {
        return []
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
      }
    }
    .bottom {
      flex: 1;
      display: flex;
      margin-top: 5px;
      color: #a99d9d;
      font-size: 15px;
    }
  }
}
</style>
