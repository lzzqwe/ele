<template>
  <div class="star" :class="starType">
    <span
      v-for="(item,index) in itemClasses"
      class="star-item"
      :key="index"
      :class="item"
    ></span>
  </div>
</template>

<script>
  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'
    export default {
      name: "EleStar",
      props:{
        size:{
          type:Number
        },
        score:{
          type:Number
        }
      },
      computed:{
        starType() {
          return 'star-' + this.size
        },
        itemClasses() {
          let result = []
          let score = Math.floor(this.score * 2)/2
          let hasDecimal = score % 1 !== 0
          let integer = Math.floor(score)
          for (let i=0;i<integer;i++) {
            result.push(CLS_ON)
          }
          if(hasDecimal) {
            result.push(CLS_HALF)
          }
          while (result.length<LENGTH) {
            result.push(CLS_OFF)
          }
          return result
        }
      }
    }
</script>

<style lang="less" scoped>
  @import "~common/less/mixin.less";
  .star {
    &.star-48 {
      .star-item {
        width: 20px;
        height: 19px;
        background-size: 20px 19px;
        display: inline-block;
        margin-right: 6px;
        &:last-child{
          margin-right: 0;
        }
        &.on {
          .bg-image('star48_on');
        }
        &.off {
          .bg-image('star48_off');
        }
        &.half {
          .bg-image('star48_half');
        }
      }
    }
    &.star-36 {
      .star-item {
        width: 15px;
        height: 14.5px;
        background-size: 15px 14.5px;
        display: inline-block;
        margin-right: 6px;
        &:last-child{
          margin-right: 0;
        }
        &.on {
          .bg-image('star36_on');
        }
        &.half {
          .bg-image('star36_half');
        }
        &.off {
          .bg-image('star36_off');
        }
      }
    }
    &.star-24 {
      .star-item {
        width: 10px;
        height: 9.5px;
        background-size: 10px 9.5px;
        display: inline-block;
        margin-right: 6px;
        &:last-child{
          margin-right: 0;
        }
        &.on {
          .bg-image('star24_on');
        }
        &.half {
          .bg-image('star24_half');
        }
        &.off {
          .bg-image('star24_off');
        }
      }
    }

  }
</style>
