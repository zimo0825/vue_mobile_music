<template>
  <div>
    <!-- 新歌速递 -->
    <div class="new">
      <h3 @click="newSongs">新歌</h3>
      <h3 @click="newDiscs">| 新碟</h3>
    </div>

    <div class="bottom" v-show="checkType">
      <div
        @click="selectItem(item, index)"
        class="container"
        v-for="(item, index) in newSong"
        :key="item.id"
      >
        <div class="left">
          <img :src="item.album.blurPicUrl" alt="" />
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
    <div class="bottom" v-show="!checkType">
      <div
        @click="selectItems(item, index)"
        class="container"
        v-for="(item, index) in newDisc"
        :key="item.id"
      >
        <div class="left">
          <img :src="item.album.blurPicUrl" alt="" />
          <p>{{ item.name }}</p>
        </div>
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
      newSong: [],
      newDisc: [],
      checkType: true
    }
  },
  methods: {
    // 新歌
    getNewSongList() {
      api.find.getNewSong().then(res => {
        this.newSong = res.data.data.slice(0, 3)
      })
    },
    // 新碟
    getAlbums() {
      api.find.getNewSong(7).then(res => {
        this.newDisc = res.data.data.slice(0, 3)
      })
    },
    newDiscs() {
      this.checkType = false
    },
    newSongs() {
      this.checkType = true
    },
    selectItem(item, index) {
      this.selectPlay({
        list: this.newSong,
        index
      })
    },
    selectItems(item, index) {
      this.selectPlay({
        list: this.newDisc,
        index
      })
    },
    ...mapActions(['selectPlay'])
  },
  created() {
    this.getNewSongList()
    this.getAlbums()
  }
}
</script>

<style lang="less" scoped>
.new {
  display: flex;
  margin-bottom: 10px;
  h3 {
    font-weight: 600;
    &:nth-child(1) {
      margin-right: 5px;
    }
  }
}
.bottom {
  height: 140px;
  display: flex;
  .container {
    flex: 1;
    .left {
      display: flex;
      justify-content: center;
      img {
        width: 110px;
        height: 110px;
        border-radius: 10px;
      }
      p {
        position: absolute;
        margin-top: 88px;
        color: #fff;
        width: 80px;
        overflow: hidden;
        white-space: nowrap;
        margin-left: -10px;
      }
    }
  }
}
</style>
