<template>
  <div id="all">
    <div class="top">
      <span @click="back" class="iconfont icon-fanhui"></span>
      <h3 v-for="(item, index) in RecommendList.tags" :key="index">
        {{ item }}
      </h3>
    </div>

    <div class="main">
      <song :tracks="tracks" :RecommendList="RecommendList"></song>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js'
import song from './recommendDetailPage/song.vue'

export default {
  data() {
    return {
      RecommendList: {},
      tracks: []
    }
  },
  components: {
    song
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    getRecommendDetails() {
      api.find.getRecommendDetail(this.$route.query.id).then(res => {
        this.RecommendList = res.data.playlist
        this.tracks = res.data.playlist.tracks
      })
    }
  },
  created() {
    this.getRecommendDetails()
  },
  watch: {
    $route(newVal, oldVal) {
      if (newVal.query.id != oldVal.query.id) {
        this.getRecommendDetails()
      }
      return
    }
  }
}
</script>

<style lang="less" scoped>
#all {
  display: flex;
  flex-direction: column;
  height: 100%;
  .top {
    display: flex;
    background: #8e989f;
    height: 60px;
    align-items: center;
    color: #fff;
    margin-bottom: -1px;
    span {
      text-align: center;
      font-size: 30px;
      width: 60px;
    }
    h3 {
      margin: 0 6px;
      display: block;
      font-size: 25px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .main {
    flex: 1;
  }
}
</style>
