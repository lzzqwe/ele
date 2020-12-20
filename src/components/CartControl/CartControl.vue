<template>
    <div class="cart-control">
      <transition name="move">
        <span @click.stop="_decrease"  v-show="food.count>0" class="iconfont iconicon_roundreduce"></span>
      </transition>
      <transition name="num">
        <span v-show="food.count>0" class="number">{{this.food.count}}</span>
      </transition>
      <span @click.stop="_increase" class="iconfont iconplus-circle-fill
"></span>
    </div>
</template>

<script>
  import Vue from 'vue'
    export default {
      name: "CartControl",
      props:{
        food:{
          type:Object,
          default:null
        }
      },
      data() {
        return {
          flag:false
        }
      },
      methods:{
        _increase() {
          if(!this.food.count) {
            //添加对象的响应式数据
            Vue.set(this.food,'count',1)
          } else {
            this.food.count ++
          }
        },
        _decrease() {
          if(this.food.count) {
            this.food.count--
          }
        }
      }
    }
</script>

<style lang="less" scoped>
.cart-control {
  height: 24px;
  display: flex;
  align-items: center;
  .iconicon_roundreduce {
    font-size: 24px;
    color: rgb(0,160,220);
    line-height: 24px;
    opacity: 1;
    &.move-enter,&.move-leave-to {
      transform: translateX(24px) rotate(180deg);
    }
    &.move-enter-active,&.move-leave-active {
      transition: all 0.5s linear;
    }
  }
  .number {
    vertical-align: middle;
    font-size: 10px;
    line-height: 24px;
    color: rgb(147,153,159);
    padding: 0 6px;
    opacity: 1;
    width: 12px;
    &.num-enter,&.enter-leave-to {
      opacity: 0;
    }
    &.num-enter-active,&.num-leave-active {
      transition: all 0.5s;
    }
  }
  .iconplus-circle-fill {
    font-size: 24px;
    color: rgb(0,160,220);
    line-height: 24px;
  }
}
</style>
