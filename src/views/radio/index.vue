<template>
  <div class="all">
    <div class="top">
      <span @click="back" class="iconfont icon-fanhui"></span>
      <h3>电台</h3>
    </div>
    <Scroll class="scroll">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in banner" :key="index">
          <img style="borderRadius:10px;" :src="item.pic" alt="" />
        </van-swipe-item>
      </van-swipe>

      <div class="changeType">
        <div class="wrapper">
          <span class="iconfont icon-jingpin"></span>
          <p>付费精品</p>
        </div>
        <div class="wrapper">
          <span class="iconfont icon-paihangbang"></span>
          <p>电台排行</p>
        </div>
        <div class="wrapper">
          <span class="iconfont icon-leimupinleifenleileibie"></span>
          <p>电台分类</p>
        </div>
        <div class="wrapper">
          <span class="iconfont icon-yinyue"></span>
          <p>音乐故事</p>
        </div>
      </div>

      <div class="recommend">
        <div class="tag">
          <h3>推荐电台</h3>
        </div>

        <div class="wrapper">
          <div
            @click="toRadioDetail(item)"
            class="content"
            v-for="item in recommend"
            :key="item.id"
          >
            <img :src="item.picUrl" alt="" />

            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>

      <div class="recommend">
        <div class="tag">
          <h3>有声书</h3>
        </div>

        <div class="wrapper">
          <div
            @click="toRadioDetail(item)"
            class="content"
            v-for="item in book"
            :key="item.id"
          >
            <img :src="item.picUrl" alt="" />

            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '@/components/scroll'
import api from '@/api/index.js'

export default {
  data() {
    return {
      banner: {},
      recommend: [],
      book: []
    }
  },
  components: {
    Scroll
  },
  methods: {
    getBanners() {
      api.radio.getBanner().then(res => {
        this.banner = res.data.data
      })
    },
    getRecommends() {
      api.radio.getRecommend().then(res => {
        this.recommend = res.data.djRadios.slice(0, 3)
      })
    },
    getRadioSorts() {
      api.radio.getRadioSort(10001).then(res => {
        this.book = res.data.djRadios.slice(0, 3)
      })
    },
    toRadioDetail(item) {
      this.$router.push('/radiodetail?id=' + item.id)
    },
    back() {
      this.$router.go(-1)
    }
  },
  created() {
    this.getBanners()
    this.getRecommends()
    this.getRadioSorts()
  }
}
</script>

<style lang="less" scoped>
.all {
  padding: 0 0.625rem;
  .top {
    display: flex;
    align-items: center;
    text-align: center;
    height: 3.75rem;
    span {
      width: 3.75rem;
      font-size: 1.875rem;
    }
    h3 {
      flex: 1;
      margin-right: 3.75rem;
      font-size: 1.25rem;
    }
  }
  .scroll {
    height: calc(100vh - 3.75rem);
  }
  .recommend {
    height: 11.25rem;
    display: flex;
    margin-top: 1.875rem;
    flex-direction: column;
    .tag {
      display: flex;
      justify-content: space-between;
      align-items: center;
      h3 {
        height: 1.875rem;
      }
      span {
        border: 1px solid #999;
        border-radius: 0.625rem;
        font-size: 0.8125rem;
        padding: 0 0.5rem;
      }
    }

    .wrapper {
      flex: 1;
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      margin-top: 0.625rem;
      .content {
        flex: 30%;
        padding: 0.1875rem;
        img {
          width: 100%;
          height: 6.875rem;
          border-radius: 0.9375rem;
          position: relative;
        }
        .playCount {
          display: flex;
          position: absolute;
          margin-top: -6.875rem;
          align-items: cneter;
          height: 0.9375rem;
          margin-left: 0.3125rem;
          span {
            color: #fff;
            font-size: 0.8125rem;
          }
          .icon {
            // width: 20px;
            font-size: 0.5625rem;
            margin-top: 0.25rem;
          }
        }

        p {
          margin-top: -0.0625rem;
          position: absolute;
          font-size: 0.875rem;
          width: 6.25rem;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
  .changeType {
    display: flex;
    height: 6.25rem;
    width: 100%;
    align-items: center;
    margin-top: 0.625rem;
    border-radius: 0.9375rem;
    background: #eee;
    .wrapper {
      flex: 1;
      text-align: center;
      display: flex;
      flex-direction: column;
      height: 100%;

      span {
        flex: 1;
        font-size: 1.875rem;
        line-height: 4.0625rem;
      }
      p {
        font-size: 0.9375rem;
        color: #851e1e;
      }
    }
  }
}
</style>
