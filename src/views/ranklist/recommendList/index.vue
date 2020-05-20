<template>
  <div class="wrapper">
    <h3>推荐榜</h3>
    <div class="content">
      <div
        class="container"
        @click="toRecommendDetail(item)"
        v-for="item in allList"
        :key="item.id"
      >
        <img :src="item.coverImgUrl" alt="" @load="imgLoad" />
        <div class="playCount">
          <span style="fontSize:10px" class="iconfont icon-bofang1 icon"></span>
          <span>{{ item.playCount }}</span>
        </div>
        <h3>{{ item.updateFrequency }}</h3>
        <span class="name">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js'

export default {
  data() {
    return {
      allList: []
    }
  },
  methods: {
    getAllLists() {
      api.find.getAllList().then(res => {
        this.allList = res.data.list.slice(6, 12)
        for (let i = 0; i < this.allList.length; i++) {
          if (this.allList[i].playCount > 10000) {
            this.allList[i].playCount =
              parseInt(this.allList[i].playCount / 10000) + '万'
          }
        }
      })
    },
    toRecommendDetail(item) {
      this.$router.push('/recommenddetail?id=' + item.id)
    },
    imgLoad() {
      this.$bus.$emit('imgLoad')
    }
  },
  created() {
    this.getAllLists()
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  margin-top: 1.25rem;
  flex-direction: column;
  h3 {
    height: 2.5rem;
    margin-left: 0.625rem;
    font-weight: 600;
  }
  .content {
    flex: 1;
    display: flex;
    width: 100%;
    padding: 0.25rem;
    flex-wrap: wrap;
    .container {
      padding: 0.1875rem;
      flex: 30%;
      height: 10rem;
      position: relative;

      img {
        width: 7.1875rem;
        border-radius: 0.625rem;
      }
      h3 {
        margin-top: -1.5625rem;
        color: #fff;
        font-size: 0.8125rem;
        position: absolute;
      }
      .name {
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        margin-left: 0.125rem;
      }
      .playCount {
        position: absolute;
        margin-left: 10px;
        font-size: 0.8125rem;
        margin-top: 2px;
        top: 0;
        color: #fff;
      }
    }
  }
}
</style>
