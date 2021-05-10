<template>
  <Swiper>
    <SwiperItem v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image">
      </a>
    </SwiperItem>
  </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from '../../../components/common/swiper/index'

export default {
  components: { Swiper, SwiperItem},
  props: {
    banners: {
      type: Array,
      default: []
    }
  }
}
</script>

<style>

</style>