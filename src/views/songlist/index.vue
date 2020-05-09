<template>
  <div>
    <div class="top">
      <span class="iconfont icon-fanhui" @click="back"></span>
      <h3>歌单广场</h3>
    </div>
    <van-tabs v-model="active" style="padding:0 10px">
      <van-tab title="推荐">
        <recommend></recommend>
      </van-tab>
      <van-tab title="精品">
        <Boutique></Boutique>
      </van-tab>
      <van-tab title="欧美">
        <America></America>
      </van-tab>
      <van-tab title="电子">
        <Electronics></Electronics>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import api from '@/api/index.js'
import recommend from '../songlist/songListPage/recommend.vue'
import Boutique from '../songlist/songListPage/boutique.vue'
import America from '../songlist/songListPage/america.vue'
import Electronics from '../songlist/songListPage/electronics.vue'

export default {
  components: {
    recommend,
    Boutique,
    America,
    Electronics
  },
  methods: {
    getRecommendLists() {
      api.find.getRecommendList(15).then(res => {
        console.log(res)
      })
    },
    back() {
      this.$router.go(-1)
    }
  },
  created() {
    this.getRecommendLists()
  }
}
</script>

<style lang="less" scoped>
.top {
  display: flex;
  height: 60px;
  align-items: center;
  text-align: center;
  span {
    font-size: 30px;
    width: 80px;
  }
  h3 {
    flex: 1;
    margin: 0 auto;
    margin-left: -80px;
    font-size: 20px;
  }
}
</style>
