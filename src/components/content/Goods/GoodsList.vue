<template>
  <div class="goods-list">
    <GoodsListItem v-for="(item, index) in goods" :key="index" :goodsItem="item">      
    </GoodsListItem>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
  props: {
    goods: {
      type: Array,
      default: []
    }
  },
  components: {
    GoodsListItem
  }
}
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}
</style>