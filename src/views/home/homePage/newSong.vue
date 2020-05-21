<template>
  <div id="alls">
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
#alls {
  height: 210px;
  .new {
    display: flex;
    margin-bottom: 0.625rem;
    h3 {
      font-weight: 600;
      &:nth-child(1) {
        margin-right: 0.3125rem;
      }
    }
  }
  .bottom {
    height: 8.75rem;
    display: flex;
    .container {
      flex: 1;
      .left {
        display: flex;
        justify-content: center;
        position: relative;
        img {
          width: 95%;
          height: 95%;
          border-radius: 0.625rem;
        }
        p {
          position: absolute;
          font-size: 0.8125rem;
          bottom: 0;
          color: #fff;
          width: 5rem;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
