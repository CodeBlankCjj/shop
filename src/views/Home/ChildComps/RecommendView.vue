<template>
  <div class="recommend">
    <div v-for="(item, index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array,
      default: []
    }
  }

}
</script>

<style lang="scss" scoped>
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 16px;
  padding: 5px 0 15px;
  border-bottom: 8px solid #eee;
  .recommend-item {
    flex: 1;
    img {
      width: 100%;
      margin-bottom: 10px;
    }
  }
}
</style>