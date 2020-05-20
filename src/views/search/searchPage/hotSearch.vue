<template>
  <div id="all">
    <h3>热搜榜</h3>
    <div>
      <ul>
        <li
          class="wrapper"
          @click="toHotMusicDetail(item)"
          v-for="(item, index) in hotSearchList"
          :key="index"
        >
          <span>{{ index + 1 }}</span>
          <div class="content">
            <div class="top">
              <div class="songs">{{ item.searchWord }}</div>
              <div class="playCount">{{ item.score }}</div>
              <img :src="item.iconUrl" alt="" />
            </div>
            <div class="name">{{ item.content }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js'

export default {
  data() {
    return {
      hotSearchList: []
    }
  },

  methods: {
    getHotSearch() {
      api.search.hotSearch().then(async res => {
        this.hotSearchList = await res.data.data
      })
    },
    toHotMusicDetail(item) {
      this.$router.push('/songDetail?k=' + item.searchWord)
    }
  },
  created() {
    this.getHotSearch()
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  display: block;
  height: 4.375rem;
  display: flex;
  &:nth-child(1) > span {
    color: red;
  }
  &:nth-child(2) > span {
    color: red;
  }
  &:nth-child(3) > span {
    color: red;
  }
  span {
    width: 2.5rem;
    text-align: center;
    line-height: 4.375rem;
    color: #999;
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 0.625rem;
    // background: red;
    .top {
      display: flex;
      // background: yellow;
      flex: 1;
      align-items: center;
      .songs {
        font-size: 0.9375rem;
      }
      .playCount {
        color: #999;
        font-size: 0.875rem;
        margin-left: 0.625rem;
      }
      img {
        width: 1.125rem;
        margin-left: 0.3125rem;
      }
    }
    .name {
      color: #aaa;
      font-size: 0.875rem;
    }
  }
}
</style>
