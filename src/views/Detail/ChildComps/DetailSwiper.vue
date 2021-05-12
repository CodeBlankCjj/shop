<template>
    <Swiper class="swiper-item">
      <SwiperItem v-for="(item, index) in topImages" :key="index">
        <img :src="item">
      </SwiperItem>
    </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from '../../../components/common/swiper/index'
export default {
  props: {
    topImages: {
      type: Array,
      default: []
    }
  },
  components: {
    Swiper, SwiperItem
  }
}
</script>

<style lang="scss" scoped>
.swiper-item {
  height: 300px;
}

</style>