<template>
  <div id="app">
    <ele-header :seller="seller"></ele-header>
    <ele-tab></ele-tab>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>
<script>
  import {getSeller} from './api'
  import EleHeader from "./components/EleHeader/EleHeader";
  import EleTab from "./components/EleTab/EleTab";

  export default {
    name:'App',
    components:{
      EleHeader,
      EleTab
    },
    data() {
      return {
        seller:{}
      }
    },
    created() {
      this._getSeller()
    },
    methods:{
      async _getSeller() {
        const res = await getSeller()
        if(res.code === 200) {
          this.seller = res.data
        }
      }
    }
  }
</script>
<style lang="less">
  #app {
    max-width: 640px;
    height: 100%;
    margin: 0 auto;
  }
</style>
