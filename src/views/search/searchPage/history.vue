<template>
  <div>
    <div class="wrapper" v-show="false">
      <div class="top">
        <h3>历史记录</h3>
        <span class="iconfont icon-shanchu"></span>
      </div>
      <div class="bottom">
        <span>你好</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  // background: red;
  margin-top: 20px;
  .top {
    display: flex;
    align-items: center;
    span {
      margin-left: 70%;
    }
  }
  .bottom {
    height: auto;
    margin-top: 10px;
    span {
      border-radius: 5px;
      width: 40px;
      text-align: center;
      display: block;
      color: #333;
      font-size: 14px;
      background: #eee;
    }
  }
}
</style>
