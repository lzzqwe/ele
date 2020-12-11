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
  .star {
    &.star-48 {
      .star-item {
        width: 20px;
        height: 19px;
        background-size: 20px 19px;
        display: inline-block;
        margin-left: 6px;
        &.on {
          background-image: url("star48_on@2x.png");
        }
        &.off {
          background-image: url("star48_off@2x.png");
        }
        &.half {
          background-image: url("star48_half@2x.png");
        }
      }
    }
    &.star-36 {
      .star-item {
        width: 15px;
        height: 14.5px;
        background-size: 15px 14.5px;
        display: inline-block;
        margin-left: 6px;
        &.on {
          background-image: url("star36_on@2x.png");
        }
        &.half {
          background-image: url("star36_half@2x.png");
        }
        &.off {
          background-image: url("star36_off@2x.png");
        }
      }
    }
    &.star-24 {
      .star-item {
        width: 10px;
        height: 9.5px;
        background-size: 10px 9.5px;
        display: inline-block;
        margin-left: 6px;
        &.on {
          background-image: url("star24_on@2x.png");
        }
        &.half {
          background-image: url("star24_half@2x.png");
        }
        &.off {
          background-image: url("star24_off@2x.png");
        }
      }
    }

  }
</style>
