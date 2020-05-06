<template>
  <div>
    <!-- 新碟上架 -->
    <div class="album">
      <h3>新碟上架</h3>
      <div class="wrapper">
        <div class="content" v-for="item in album" :key="item.id">
          <img :src="item.picUrl" alt="" />
          <span>{{ item.playCount }}</span>
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      album: []
    }
  },

  methods: {
    getHotRadios() {
      this.$api.find.getAlbum().then(res => {
        this.album = res.data.albums
      })
    }
  },

  created() {
    this.getHotRadios()
  }
}
</script>

<style lang="less" scoped>
.album {
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
        height: 110px;
        border-radius: 15px;
      }
      span {
        position: absolute;
        color: #fff;
        margin-left: -50px;
        font-size: 13px;
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
