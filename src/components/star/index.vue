<template>
  <div class="star" v-if="star">
    <span class="star-item" ref="starItem">音樂的力量</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      star: true
    }
  },
  methods: {
    start() {
      const star = this.$refs.starItem
      setTimeout(() => {
        star.style.display = 'block'
        setTimeout(() => (star.style.opacity = 1), 50)
        setTimeout(() => {
          this.star = false
          this.$router.push('/home')
        }, 3000)
      }, 1000)
    }
  },
  mounted() {
    this.start()
  }
}
</script>

<style>
.star {
  height: 100vh;
  width: 100vw;
  text-align: center;
  line-height: 100vh;
  font-family: 楷体;
  background: black;
}

.star-item {
  display: none;
  opacity: 0;
  color: red;
  font-size: 60px;
  transition: opacity 1s ease-in;
}
</style>
