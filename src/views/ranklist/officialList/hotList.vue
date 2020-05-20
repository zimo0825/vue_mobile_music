<template>
  <div class="wrapper" @click="toRecommendDetail(soar)">
    <div class="left">
      <img :src="soar.coverImgUrl" alt="" />
      <div class="playCount">
        <span style="fontSize:10px" class="iconfont icon-bofang1 icon"></span>
        <span>{{ soar.playCount }}</span>
      </div>
    </div>
    <div class="right">
      <div class="content" v-for="(item, index) in soars" :key="index">
        <h4>{{ index + 1 }}.</h4>
        <h3>{{ item.name }} -</h3>
        <span>{{ item.ar[0].name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js'

export default {
  data() {
    return {
      soar: [],
      soars: []
    }
  },
  methods: {
    getRankingLists() {
      api.find.getRankingList(1).then(res => {
        this.soar = res.data.playlist
        this.soars = res.data.playlist.tracks.slice(0, 3)
        if (this.soar.playCount > 10000) {
          this.soar.playCount = parseInt(this.soar.playCount / 10000) + '万'
        }
      })
    },
    toRecommendDetail(soar) {
      this.$router.push('/recommenddetail?id=' + soar.id)
    }
  },
  created() {
    this.getRankingLists()
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  height: 7.5rem;
  display: flex;
  .left {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 7.5rem;
    position: relative;

    .playCount {
      position: absolute;
      color: #fff;
      margin-top: 8px;
      top: 0;
      left: 15px;
      font-size: 0.75rem;
    }
    img {
      width: 6.25rem;
      border-radius: 0.625rem;
    }
  }
  .right {
    flex: 1;
    padding: 1.875rem 0;
    display: flex;
    flex-direction: column;
    .content {
      flex: 1;
      display: flex;
      h4 {
        margin-right: 0.3125rem;
      }
      h3 {
        font-size: 0.75rem;
        margin-right: 0.125rem;
      }
      span {
        font-size: 0.9375rem;
        margin-left: 0.125rem;
        margin-top: -0.1875rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
