<template>
  <Swiper>
    <SwiperItem v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" @load="imageLoad">
      </a>
    </SwiperItem>
  </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from '../../../components/common/swiper/index'

export default {
  components: { Swiper, SwiperItem },
  props: {
    banners: {
      type: Array,
      default: []
    }
  },
  methods: {
    
    imageLoad() {
      if (!this.isLoad) {
        // console.log(123);
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
      
    }
  },
  data() {
    return {
      isLoad: false
    }
  }
}
</script>

<style>

</style>