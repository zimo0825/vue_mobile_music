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
        <img :src="item.coverImgUrl" alt="" />
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
  margin-top: 20px;
  flex-direction: column;
  h3 {
    height: 40px;
    margin-left: 10px;
    font-weight: 600;
  }
  .content {
    flex: 1;
    display: flex;
    width: 100%;
    padding: 4px;
    flex-wrap: wrap;
    .container {
      padding: 3px;
      flex: 30%;
      height: 160px;

      img {
        width: 100%;
        border-radius: 10px;
        position: relative;
      }
      h3 {
        margin-top: -25px;
        color: #fff;
        font-size: 13px;
        position: absolute;
      }
      .name {
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        margin-left: 2px;
      }
      .playCount {
        position: absolute;
        margin-top: -110px;
        font-size: 13px;
        color: #fff;
        margin-left: 5px;
      }
    }
  }
}
</style>
