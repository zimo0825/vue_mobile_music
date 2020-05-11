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
  padding: 0 10px;
  .top {
    display: flex;
    align-items: center;
    text-align: center;
    height: 60px;
    span {
      width: 60px;
      font-size: 30px;
    }
    h3 {
      flex: 1;
      margin-right: 60px;
      font-size: 20px;
    }
  }
  .scroll {
    height: calc(100vh - 60px);
  }
  .recommend {
    height: 180px;
    display: flex;
    margin-top: 30px;
    flex-direction: column;
    .tag {
      display: flex;
      justify-content: space-between;
      align-items: center;
      h3 {
        height: 30px;
      }
      span {
        border: 1px solid #999;
        border-radius: 10px;
        font-size: 13px;
        padding: 0 8px;
      }
    }

    .wrapper {
      flex: 1;
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      margin-top: 10px;
      .content {
        flex: 30%;
        padding: 3px;
        img {
          width: 100%;
          height: 110px;
          border-radius: 15px;
          position: relative;
        }
        .playCount {
          display: flex;
          position: absolute;
          margin-top: -110px;
          align-items: cneter;
          height: 15px;
          margin-left: 5px;
          span {
            color: #fff;
            font-size: 13px;
          }
          .icon {
            // width: 20px;
            font-size: 9px;
            margin-top: 4px;
          }
        }

        p {
          margin-top: -1px;
          position: absolute;
          font-size: 14px;
          width: 100px;
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
}
</style>
