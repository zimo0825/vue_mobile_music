<template>
  <div class="all">
    <Scroll class="scroll">
      <div class="top">
        <span @click="back" class="iconfont icon-fanhui"></span>
        <h3>{{ description }}</h3>
      </div>
      <div class="header">
        <img :src="coverUrl" alt="" />
        <span>
          {{ name }}
        </span>
      </div>
      <div
        @click="selectItem(item, index)"
        class="main"
        v-for="(item, index) in detail"
        :key="index"
      >
        <div class="main-top">
          <div class="name">
            {{ item.name }}
          </div>
          <div class="playCount">
            <span
              style="fontSize:10px"
              class="iconfont icon-bofang icon"
            ></span>
            {{ item.listenerCount }}
          </div>
        </div>
        <div class="desc">
          {{ item.mainSong.album.name }}
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import api from '@/api/index.js'
import { mapActions } from 'vuex'
import Scroll from '@/components/scroll/index.vue'

export default {
  data() {
    return {
      detail: [],
      description: '',
      coverUrl: '',
      name: '',
      id: ''
    }
  },
  components: {
    Scroll
  },
  methods: {
    getRadioDetails() {
      api.radio.getRadioDetail(this.$route.query.id).then(res => {
        this.detail = res.data.programs
        this.description = res.data.programs[0].description
        this.coverUrl = res.data.programs[0].coverUrl
        this.name = res.data.programs[0].mainSong.artists[0].name
        this.id = res.data.programs[0].mainSong.id
      })
    },
    selectItem(item, index) {
      this.selectPlay({
        list: this.detail,
        index
      })
    },
    ...mapActions(['selectPlay']),
    back() {
      this.$router.go(-1)
    }
  },
  created() {
    this.getRadioDetails()
  }
}
</script>

<style lang="less" scoped>
.all {
  padding: 0 10px;
  .scroll {
    height: 100vh;
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
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .header {
      height: 260px;
      display: flex;
      flex-direction: column;
      padding: 10px;
      background: #a09999;
      img {
        width: 200px;
        border-radius: 15px;
      }
      span {
        font-size: 20px;
        margin-top: 20px;
      }
    }
    .main {
      height: 50px;
      margin-top: 20px;
      background: #eee;
      .main-top {
        display: flex;
        justify-content: space-between;
        .name {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 300px;
          font-size: 15px;
          padding: 0 2px;
        }
        .playCount {
          font-size: 12px;
          margin-right: 10px;
        }
      }
      .desc {
        white-space: nowrap;
        overflow: hidden;
        margin-top: 6px;
        padding: 0 2px;
        text-overflow: ellipsis;
        width: 300px;
        font-size: 15px;
      }
    }
  }
}
</style>
