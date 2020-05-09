<template>
  <div>
    <Scroll>
      <div class="content" v-for="item in singer" :key="item.id">
        <div class="left">
          <img :src="item.coverImgUrl" alt="" />
        </div>
        <div class="right">
          <h3>{{ item.description }}</h3>
          <span>
            {{ item.creator.nickname }}
          </span>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '@/components/scroll/index.vue'

export default {
  components: {
    Scroll
  },
  props: {
    singer: {
      type: Array,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  display: flex;
  height: 160px;
  margin: 5px 0;
  .left {
    width: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 140px;
      width: 140px;
      border-radius: 10px;
    }
  }
  .right {
    flex: 1;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    h3 {
      font-size: 14px;
      height: 118px;
      overflow: hidden;
      width: 190px;
    }
    span {
      flex: 1;
      font-size: 13px;
      margin-top: 5px;
      color: #717973;
    }
  }
}
</style>
