<template>
  <div>
    <!-- 新歌速递 -->
    <div class="newSong">
      <h3>新歌速递</h3>
      <div class="wrapper">
        <div
          class="content"
          @click="selectItem(item, index)"
          v-for="(item, index) in newSong"
          :key="item.id"
        >
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
      newSong: []
    }
  },

  methods: {
    getNewSongList() {
      api.find.getNewSong().then(res => {
        this.newSong = res.data.data.slice(0, 6)
      })
    },

    selectItem(item, index) {
      this.selectPlay({
        list: this.newSong,
        index
      })
    },
    ...mapActions(['selectPlay'])
  },

  created() {
    this.getNewSongList()
  }
}
</script>

<style lang="less" scoped>
.newSong {
  height: 400px;
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  h3 {
    height: 30px;
  }
  .wrapper {
    flex: 1;
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    .content {
      flex: 30%;
      padding: 3px;
      img {
        width: 100%;
        border-radius: 15px;
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
</style>
