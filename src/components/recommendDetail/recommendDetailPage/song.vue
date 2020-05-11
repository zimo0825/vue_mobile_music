<template>
  <div>
    <Scroll class="scroll">
      <div class="header">
        <div class="container">
          <div class="left">
            <img :src="RecommendList.coverImgUrl" alt="" />
          </div>
          <div class="right">
            <h3>{{ RecommendList.name }}</h3>
            <span>{{ RecommendList.description }}</span>
          </div>
        </div>
        <div class="bottom">
          <span class="iconfont icon-pinglun1"></span>
          <span
            style="fontSize:35px;marginBottom:6px"
            class="iconfont icon-fenxiang"
          ></span>
          <span class="iconfont icon-xihuan"></span>
          <span class="iconfont icon-xiazai"></span>
        </div>
      </div>

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
.scroll {
  height: calc(100vh - 60px);
  .header {
    display: flex;
    height: 220px;
    flex-direction: column;
    background: #8e989f;

    .container {
      flex: 1;
      display: flex;
      overflow: hidden;
      top: 60px;
      .left {
        width: 150px;
        display: flex;
        align-items: center;
        position: relative;
        justify-content: center;
        img {
          border-radius: 10px;
          width: 90%;
        }
      }
      .right {
        display: flex;
        flex: 1;
        padding: 26px 2px;
        flex-direction: column;
        .singer {
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        h3 {
          height: 40px;
          font-size: 17px;
          color: #f9f6f6;
          margin-bottom: 5px;
        }
        span {
          flex: 1;
          font-size: 13.5px;
          height: 20px;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }
    }
    .bottom {
      height: 50px;
      display: flex;
      align-items: center;
      span {
        flex: 1;
        text-align: center;
        font-size: 28px;
      }
    }
  }
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
        flex: 1;
        display: flex;
        margin-top: 5px;
        color: #a99d9d;
        font-size: 15px;
        h3 {
          width: 70px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 240px;
        }
      }
    }
  }
}
</style>
