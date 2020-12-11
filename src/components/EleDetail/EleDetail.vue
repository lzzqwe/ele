<template>
  <transition name="detail">
    <div v-show="detailShow" class="detail">
      <h1 class="shop-title">{{seller.name}}</h1>
      <ele-star class="distance" :score="seller.score" :size="48"></ele-star>
      <div class="discounts">
        <span class="across"></span><span class="info">优惠信息</span><span class="across"></span>
      </div>
      <ul class="supports" v-if="seller.supports">
        <li :key="index" v-for="(support,index) in seller.supports" class="supports-item">
          <span :class="classMap[support.type]" class="icon"></span><span>{{support.description}}</span>
        </li>
      </ul>
      <div class="discounts">
        <span class="across"></span><span class="info">商家公告</span><span class="across"></span>
      </div>
      <p class="text">{{seller.bulletin}}</p>
      <div @click="closeDetail" class="close">
        <span class="iconfont iconicon-test1"></span>
      </div>
    </div>
  </transition>
</template>

<script>
  import EleStar from "../EleStar/EleStar";
    export default {
      name: "EleDetail",
      props:{
        detailShow:{
          type:Boolean
        },
        seller:{
          type: Object
        }
      },
      components:{
        EleStar
      },
      created() {
        this.classMap = ['decrease','discount','special','invoice','guarantee']
      },
      methods:{
        closeDetail() {
          this.$emit('close')
        }
      }
    }
</script>

<style lang="less" scoped>
.detail {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(7,17,27,0.8);
  z-index: 104;
  backdrop-filter: blur(10px);
  opacity: 1;
  padding: 64px 36px 0 36px;
  text-align: center;
  overflow: auto;
  &.detail-enter {
    opacity: 0;
  }
  &.detail-leave-to {
    opacity: 0;
  }
  &.detail-enter-active,&.detail-leave-active {
    transition: all 0.5s;
  }
  .shop-title {
    font-size: 16px;
    font-weight: 700;
    color: rgb(255,255,255);
    line-height: 16px;
    margin-bottom: 16px;
  }
  .distance {
    margin-bottom: 28px;
  }
  .discounts {
    display: flex;
    align-items: center;
    .across {
      flex: 1;
      height: 1px;
      background-color: rgba(255,255,255,0.2);
    }
    .info {
      padding: 0 12px;
      font-size: 14px;
      font-weight: 700;
      color: #fefeff;
    }
  }
  .text {
    text-align: left;
    margin-top: 24px;
    font-size: 12px;
    font-weight: 200;
    color: rgb(255,255,255);
    line-height: 24px;
    padding: 0 12px;
  }
  .supports {
    margin-top: 24px;
    margin-bottom: 28px;
    padding: 0 12px;
    .supports-item {
      font-size: 12px;
      font-weight: 200;
      color: rgb(255,255,255);
      line-height: 12px;
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      &.last-child {
        margin-bottom: 0;
      }
      .icon {
        width: 16px;
        height: 16px;
        display: inline-block;
        background-size: 16px 16px;
        margin-right: 6px;
        background-color: #f3f6f6;
        &.decrease {
          background-image: url("decrease_4@2x.png");
        }
        &.discount {
          background-image: url("discount_4@2x.png");
        }
        &.special {
          background-image: url("special_4@2x.png");
        }
        &.invoice {
          background-image: url("invoice_4@2x.png");
        }
        &.guarantee {
          background-image: url("guarantee_4@2x.png");
        }
      }
    }
  }
  .close {
    position: absolute;
    bottom: 32px;
    left: 0;
    right: 0;
    .iconicon-test1 {
      font-size: 32px;
      color: rgba(255,255,255,0.5);
    }
  }
}
</style>
