<template>
  <div>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in banners" :key="item.id">
        <img
          style="height:138px; overFlow: hidden;"
          :src="item.imageUrl"
          alt=""
        />
      </van-swipe-item>
    </van-swipe>

    <!-- changeType -->
    <div class="changeType">
      <div class="wrapper">
        <span class="iconfont icon-tubiaosvg-"></span>
        <p>每日推荐</p>
      </div>
      <div class="wrapper" @click="toSongList">
        <span class="iconfont icon-gedan"></span>
        <p>歌单</p>
      </div>
      <div class="wrapper" @click="toRankList">
        <span class="iconfont icon-paihangbang"></span>
        <p>排行榜</p>
      </div>
      <div class="wrapper" @click="toRadio">
        <span class="iconfont icon-diantai"></span>
        <p>电台</p>
      </div>
      <div class="wrapper">
        <span class="iconfont icon-shouyinji"></span>
        <p>私人FM</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      banners: [],
      person: []
    }
  },
  methods: {
    getBanners() {
      api.find.getBanner().then(res => {
        this.banners = res.data.banners
      })
    },
    toRadio() {
      this.$router.push('/radio')
    },
    toSongList() {
      this.$router.push('/songlist')
    },
    toRankList() {
      this.$router.push('/ranklist')
    },
    ...mapActions(['selectPlay'])
  },

  created() {
    this.getBanners()
  }
}
</script>

<style lang="less" scoped>
.my-swipe {
  border-radius: 15px;
  overflow: hidden;
  .van-swipe-item {
    font-size: 20px;
    line-height: 80px;
    height: 138px;
    text-align: center;
    overflow: hidden;

    img {
      height: 100%;
      width: 100%;

      border-radius: 15px;
    }
  }
}
.changeType {
  display: flex;
  height: 100px;
  width: 100%;
  align-items: center;
  margin-top: 10px;
  border-radius: 15px;
  background: #eee;
  .wrapper {
    flex: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    height: 100%;

    span {
      flex: 1;
      font-size: 30px;
      line-height: 65px;
    }
    p {
      font-size: 15px;
      color: #851e1e;
    }
  }
}
</style>
