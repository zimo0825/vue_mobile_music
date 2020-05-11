<template>
  <div class="wrapper" @click="toRecommendDetail(soar)">
    <div class="left">
      <img :src="soar.coverImgUrl" alt="" />
      <div class="playCount">
        <span style="fontSize:10px" class="iconfont icon-bofang icon"></span>
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
  height: 120px;
  display: flex;
  .left {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    .playCount {
      position: absolute;
      color: #fff;
      margin-top: -35px;
      margin-left: -15px;
      font-size: 12px;
    }
    img {
      width: 100px;
      border-radius: 10px;
    }
  }
  .right {
    flex: 1;
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    .content {
      flex: 1;
      display: flex;
      h4 {
        margin-right: 5px;
      }
      h3 {
        font-size: 12px;
        margin-right: 2px;
      }
      span {
        font-size: 15px;
        margin-left: 2px;
        margin-top: -3px;
      }
    }
  }
}
</style>
