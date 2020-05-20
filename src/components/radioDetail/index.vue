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
        @click="selectItem"
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
    selectItem() {},
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
  padding: 0 0.625rem;
  .scroll {
    height: 100vh;
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
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .header {
      height: 16.25rem;
      display: flex;
      flex-direction: column;
      padding: 0.625rem;
      background: #a09999;
      img {
        width: 12.5rem;
        border-radius: 0.9375rem;
      }
      span {
        font-size: 1.25rem;
        margin-top: 1.25rem;
      }
    }
    .main {
      height: 3.125rem;
      margin-top: 1.25rem;
      background: #eee;
      .main-top {
        display: flex;
        justify-content: space-between;
        .name {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 18.75rem;
          font-size: 0.9375rem;
          padding: 0 0.125rem;
        }
        .playCount {
          font-size: 0.75rem;
          margin-right: 0.625rem;
        }
      }
      .desc {
        white-space: nowrap;
        overflow: hidden;
        margin-top: 0.375rem;
        padding: 0 0.125rem;
        text-overflow: ellipsis;
        width: 18.75rem;
        font-size: 0.9375rem;
      }
    }
  }
}
</style>
