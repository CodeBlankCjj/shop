<template>
    <div>
      <NavBar>
        <div slot="left" class="back" @click="backClick">
          <img src="../../../assets/img/common/back.svg" alt="">
        </div>
        <div slot="center" class="title">
          <div v-for="(item, index) in titles" :key="index" 
            class="title-item" 
            :class="{active: index === currentIndex}"
            @click="titleClick(index)">
            {{item}}
          </div>
        </div>
      </NavBar>
    </div>
</template>

<script>
import NavBar from '../../../components/common/NavBar/NavBar'
export default {
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index
      this.$emit('titleClick', index)
    },
    backClick() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.back {
  img{
    position: relative;
    width: 20px;
    z-index: 9;
    top: 5px;
  }
}
.title {
  display: flex;
  font-size: 12px;
  .title-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
}
</style>