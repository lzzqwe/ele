<template>
    <ele-scroll class="seller">
      <div class="seller-content">
        <div class="overview border-1px">
          <div class="title">
            <h1 class="text">{{seller.name}}</h1>
            <div class="sale">
              <ele-star :size="36" :score="seller.score"></ele-star>
              <span class="num">({{seller.ratingCount}})</span>
              <span class="count">月售{{seller.sellCount}}单</span>
            </div>
          </div>
          <div :class="{active:isActive}" @click="isFavorite" class="favorite">
            <span class="iconfont iconshoucang1"></span>
            <span class="complate">{{favoriteDesc}}</span>
          </div>
        </div>
        <div class="delivery">
          <div class="min_price">
            <span class="price">起送价</span>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>
              元
            </div>
          </div>
          <div class="min_price">
            <span class="price">商家配送</span>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>
              元
            </div>
          </div>
          <div class="min_price">
            <span class="price">平均配送时间</span>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>
              分钟
            </div>
          </div>
        </div>
        <ele-spilt></ele-spilt>
        <div class="notice-active">
          <h1 class="title">公告与活动</h1>
          <p class="details border-1px">{{seller.bulletin}}</p>
          <ul class="supports" v-if="seller.supports.length >0">
            <li :key="index" v-for="(item,index) in seller.supports" class="support-item border-1px">
              <span :class="classMap[item.type]" class="icon"></span><span>{{item.description}}</span>
            </li>
          </ul>
        </div>
        <ele-spilt></ele-spilt>
        <div class="live-action">
          <h1 class="live-title">商家实景</h1>
          <ele-scroll :scroll-x="scrollX">
            <ul class="live-sence">
              <li :key="index" v-for="(pic,index) in seller.pics" class="live-item">
                <img height="90" width="120" :src="pic" alt="">
              </li>
            </ul>
          </ele-scroll>
        </div>
        <ele-spilt></ele-spilt>
        <div class="seller-info">
          <h1 class="title">商家信息</h1>
          <ul class="infos">
            <li :key="index" v-for="(info,index) in seller.infos " class="info-item border-1px">
              {{info}}
            </li>
          </ul>
        </div>
      </div>
    </ele-scroll>
</template>

<script>
  import EleScroll from "../../components/EleScroll/EleScroll";
  import EleSpilt from "../../components/EleSpilt/EleSpilt";
  import EleStar from "../../components/EleStar/EleStar";
    export default {
      name: "EleSeller",
      data() {
        return {
          scrollX:true,
          isActive:false
        }
      },
      created() {
        this.classMap = ['decease','discount','special','invoice','guarantee']
      },
      computed:{
        favoriteDesc() {
          if(! this.isActive) {
            return '收藏'
          } else {
            return '已收藏'
          }
        }
      },
      props:{
        seller:{
          type:Object
        }
      },
      methods:{
        isFavorite() {
          this.isActive =!this.isActive
        }
      },
      components:{
        EleScroll,
        EleSpilt,
        EleStar
      }
    }
</script>

<style lang="less" scoped>
  @import "~common/less/mixin.less";
.seller {
  position: fixed;
  top: 175px;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  .seller-content {
    border: none;
    .overview {
      display: flex;
      justify-content: space-between;
      margin: 0 18px 0 18px;
      padding-bottom: 18px;
      padding-top: 18px;
      .border-1px(rgba(7,17,27,0.1));
      .title {
        .text {
          font-size: 14px;
          color: rgb(7,17,27);
          line-height: 14px;
          margin-bottom: 8px;
        }
        .sale {
          display: flex;
          font-size: 10px;
          color: rgb(77,85,93);
          line-height: 18px;
          .num {
            margin-left: 8px;
          }
          .count {
            margin-left: 12px;
          }
        }
      }
      .favorite {
        display: flex;
        flex-direction: column;
        text-align: center;
        width: 50px;
        &.active {
          .iconshoucang1 {
            color: red;
          }
        }
        .iconshoucang1 {
          margin-bottom: 4px;
          font-size: 24px;
          line-height: 24px;
          color: #ccc;
        }
        .complate {
          font-size: 10px;
          color: rgb(77,85,93);
          line-height: 10px;
        }
      }
    }
    .delivery {
      display: flex;
      text-align: center;
      margin: 18px 0;
      .min_price {
        flex: 1;
        border-right: 1px solid rgba(7,17,27,0.1);
        &:nth-last-child(1) {
          border: none;
        }
        .price {
          font-size: 10px;
          color: rgb(147,153,159);
          line-height: 10px;
        }
        .content {
          font-size: 10px;
          line-height: 10px;
          margin-top: 4px;
          .stress {
            font-size: 24px;
            line-height: 24px;
            font-weight: 200;
            color: rgb(7,17,27);
          }
        }
      }
    }
    .notice-active {
      margin: 18px;
      border: none;
      .title {
        font-size: 14px;
        margin-bottom: 8px;
      }
      .details {
        font-size: 12px;
        color: #f01414;
        line-height: 24px;
        margin-left: 12px;
        padding-bottom: 16px;
        .border-1px(rgba(7,17,27,0.1));
      }
      .supports {
        .support-item {
          padding: 16px 0;
          font-size: 12px;
          color: rgb(7,17,27);
          line-height: 16px;
          display: flex;
          align-items: center;
          .border-1px(rgba(7,17,27,0.1));
          &:nth-last-child(1) {
            &::after {
              border: none;
            }
          }
          .icon {
            display: inline-block;
            margin-right: 6px;
            background-size: 16px 16px;
            width: 16px;
            height: 16px;
            &.decease {
              .bg-image('decrease_4');
            }
            &.discount {
              .bg-image('discount_4');
            }
            &.special {
              .bg-image('special_4');
            }
            &.invoice {
              .bg-image('invoice_4');
            }
            &.guarantee {
              .bg-image('guarantee_4');
            }
          }
        }
      }
    }
    .live-action {
      margin: 18px 0 0 18px;
      padding-bottom: 18px;
      .live-title {
        font-size: 14px;
        padding-bottom: 12px;
      }
      .live-sence {
        height: 90px;
        display: flex;
        width: 498px;
        .live-item {
          width: 120px;
          height: 90px;
          margin-right: 6px;
          &:nth-last-child(1) {
            margin-right: 0;
          }
        }
      }
    }
    .seller-info {
      margin: 18px 18px 0 18px;
      padding-bottom: 18px;
      border: none;
      .title {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 12px;
      }
      .infos {
        margin-left: 12px;
        .info-item {
          padding: 16px 0;
          .border-1px(rgba(7,17,27,0.1));
          line-height: 16px;
          font-size: 12px;
          color: rgb(7,17,27);
          &:nth-last-child(1) {
            &::after {
              border: none;
            }
          }
        }
      }
    }
  }

}
</style>
