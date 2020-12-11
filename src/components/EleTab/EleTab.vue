<template>
    <div class="ele-tab">
      <router-link class="ele-tab-item" tag="span" to="/goods">商品</router-link>
      <router-link class="ele-tab-item" tag="span" to="/ratings">评价</router-link>
      <router-link class="ele-tab-item" tag="span" to="/seller">商家</router-link>
    </div>
</template>

<script>
    export default {
        name: "EleTab"
    }
</script>

<style lang="less" scoped>
  .ele-tab {
    height: 40px;
    display: flex;
    background-color: #ffffff;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    .ele-tab-item {
      flex: 1;
      text-align: center;
      line-height: 40px;
      font-size: 14px;
      color: rgb(77,85,93);
      &.router-link-active {
        color: rgb(240,20,20);
      }
    }
  }
</style>
