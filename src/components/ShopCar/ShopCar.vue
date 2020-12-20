<template>
  <div class="shop-car-wrapper">
    <div class="shop-car" @click="_showShopContent">
      <div class="left-car">
        <div class="car">
          <div :class="{active:totalCount>0}" class="inner-car">
            <span :class="{highlight:totalCount>0}" class="iconfont iconshopping-cart-fill"></span>
          </div>
        </div>
        <div :class="{highlight: totalCount>0}" class="price">￥{{totalPrice}}</div>
        <div class="onther">另需配送费￥{{seller.deliveryPrice}}元</div>
        <div v-show="totalCount>0" class="number-shopping-car">{{totalCount}}</div>
      </div>
      <div @click.stop="_pay" :class="payClass" class="right-car">
        {{payDesc}}
      </div>
    </div>
    <transition name="content">
      <div v-show="listShow" class="shop-content">
        <div class="shop-header">
          <span class="car">购物车</span><span @click="_clear" class="clear">清空</span>
        </div>
        <ele-scroll ref="content" :data="selectFoods" class="shop-list">
          <ul>
            <li class="shop-item" :key="index" v-for="(food,index) in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span class="number">￥<span class="num">{{food.price}}</span></span>
                <cart-control :food="food"></cart-control>
              </div>
            </li>
          </ul>
        </ele-scroll>
      </div>
    </transition>
    <transition name="mask">
      <div @click="_showShopContent" v-show="listShow" class="mask">
      </div>
    </transition>
  </div>
</template>

<script>
  import CartControl from "../CartControl/CartControl";
  import EleScroll from "../EleScroll/EleScroll";
    export default {
      name: "ShopCar",
      props:{
        seller:{
          type:Object,
          default:null
        },
        selectFoods:{
          type:Array,
          default() {
            return [
              {
                price: 10,
                count: 1
              }
            ];
          }
        }
      },
      data() {
        return {
          listShow:false
        }
      },
      computed:{
        totalPrice() {
          let totalPrice = 0
          this.selectFoods.forEach((item) => {
            totalPrice += item.price*item.count
          })
          return totalPrice
        },
        totalCount() {
          let totalCount = 0
          this.selectFoods.forEach((item) => {
            totalCount += item.count
          })
          return totalCount
        },
        payDesc() {
          if(this.totalPrice === 0) {
            return `￥${this.seller.minPrice}元起送`
          } else if(this.totalPrice<this.seller.minPrice) {
            return `还差${this.seller.minPrice-this.totalPrice}元起送`
          }
            else {
              return '去结算'
            }
        },
        payClass() {
          if(this.totalPrice<this.seller.minPrice) {
            return 'not-enough'
          } else {
            return 'enough'
          }
        }
      },
      methods:{
        _showShopContent() {
          if(this.totalCount > 0) {
            this.listShow = !this.listShow
          }
          this.$nextTick(() => {
            this.$refs.content.refresh()
          })
        },
        _clear() {
          this.selectFoods.forEach((item) => {
            item.count =0
          })
          if(!this.totalCount) {
            this.listShow = false;
          }
        },
        _pay() {
          if(this.totalPrice && this.totalPrice >=this.seller.minPrice ) {
            alert(`您要支付${this.totalPrice}元`)
          }

        }
      },
      components:{
        CartControl,
        EleScroll
      }
    }
</script>

<style lang="less" scoped>
.mask {
  position: fixed;
  bottom: 48px;
  width: 100%;
  top: 0;
  background-color: rgba(7,17,27,0.6);
  z-index: 99;
  backdrop-filter: blur(10px);
  opacity: 1;
  max-width: 640px;
  margin: 0 auto;
  &.mask-enter,&.mask-enter-to {
    opacity: 0;
  }
  &.mask-enter-active,&.mask-leave-active {
    transition: all 0.5s;
  }
}
.shop-content {
  position: fixed;
  bottom: 48px;
  width: 100%;
  background-color: #f3f5f7;
  z-index: 100;
  &.content-enter,&.content-leave-to {
    transform: translate3d(0,100%,0);
  }
  &.content-enter-active,&.content-leave-active {
    transition: all 0.5s;
  }
  .shop-header {
    padding:0 18px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;
    .car {
      font-size: 14px;
      color: rgb(7,17,27);
    }
    .clear {
      font-size: 12px;
      color: rgb(0,160,220);
    }
  }
  .shop-list {
    margin: 0 18px;
    max-height: 240px;
    overflow: hidden;
    .shop-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 48px;
      border-bottom: 1px solid rgba(7,17,27,0.1);
      &:last-child{
        border-bottom: none;
      }
      .name {
        font-size: 14px;
        color: rgb(7,17,27);
        line-height: 24;
      }
      .price {
        display: flex;
        align-items: center;
        .number {
          font-size:10px;
          color: rgb(240,20,20);
          line-height: 24px;
          margin-right: 12px;
          .num {
            font-size: 14px;
          }
        }
      }
    }
  }
}
.shop-car {
  position:fixed;
  bottom: 0;
  height: 48px;
  left: 0;
  right: 0;
  display: flex;
  z-index: 102;
  max-width: 640px;
  margin: 0 auto;
  .left-car {
    flex: 1;
    background-color: #141d27;
    position: relative;
    display: flex;
    color: #0086b3;
    .car {
      position: absolute;
      top: -10px;
      width: 54px;
      height: 54px;
      margin-left: 18px;
      margin-bottom: 8px;
      border-radius: 50%;
      background-color: #141d27;
      display: flex;
      justify-content: center;
      align-items: center;
      .inner-car {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background-color: #2a343c;
        display: flex;
        justify-content: center;
        align-items: center;
        &.active {
          background-color: rgb(0,160,220);
        }
        .iconshopping-cart-fill {
          font-size: 22px;
          color: #7f8689;
          &.highlight {
            color: #ffffff;
          }
        }
      }
    }
    .price {
      margin-left: 80px;
      margin-top: 6px;
      margin-bottom: 6px;
      line-height: 36px;
      font-size: 16px;
      padding-right: 12px;
      color: rgba(255,255,255,0.4);
      font-weight: 700;
      border-right: 1px solid rgba(255,255,255,0.1);
      &.highlight {
        color: #ffffff;
      }
    }
    .onther {
      line-height: 48px;
      font-size: 10px;
      padding-left: 12px;
      color: rgba(255,255,255,0.4);
    }
    .number-shopping-car {
      position: absolute;
      top: -10px;
      left: 44px;
      width: 24px;
      height: 16px;
      border-radius: 6px;
      background-color: #f01610;
      color: #ffffff;
      font-size: 9px;
      line-height: 16px;
      text-align: center;
    }
  }
  .right-car {
    flex: 0 0 105px;
    width: 105px;
    text-align: center;
    line-height: 48px;
    font-size: 12px;
    font-weight: 700;
    color: rgba(255,255,255,0.4);
    &.not-enough {
      background-color: #2a353a;
    }
    &.enough {
      background-color: #00b43c;
      color: #ffffff;
    }
  }
}
</style>
