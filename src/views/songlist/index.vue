<template>
  <div>
    <div class="top">
      <span class="iconfont icon-fanhui" @click="back"></span>
      <h3>歌单广场</h3>
    </div>
    <van-tabs style="padding:0 10px">
      <van-tab title="推荐">
        <recommend></recommend>
      </van-tab>
      <van-tab title="精品">
        <Boutique></Boutique>
      </van-tab>
      <van-tab title="华语">
        <cn></cn>
      </van-tab>
      <van-tab title="欧美">
        <America></America>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import recommend from '../songlist/songListPage/recommend.vue'
import Boutique from '../songlist/songListPage/boutique.vue'
import America from '../songlist/songListPage/america.vue'
import Cn from '../songlist/songListPage/cn.vue'

export default {
  components: {
    recommend,
    Boutique,
    America,
    Cn
  },
  methods: {
    back() {
      this.$router.push('/home')
    }
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
    margin-right: 80px;
    font-size: 20px;
  }
}
</style>
