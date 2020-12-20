<template>
  <div class="ele-goods-wrapper">
    <div class="ele-goods">
      <ele-scroll ref="menus" :data="list" class="left-menus">
        <ul>
          <li
            :class="{current:currentIndex===index}"
            ref="menuList"
            @click="selectMenu(index)"
            :key="index" v-for="(menu,index) in list"
            class="menus-item">
             <span class="text border-1px">
               <span :class="classMap[menu.type]" v-show="menu.type>0"></span>
               {{menu.name}}
             </span>
          </li>
        </ul>
      </ele-scroll>
      <ele-scroll
        @scroll="handleScroll"
        :listen-scroll="listenScroll"
        :probe-type="probeType"
        ref="foods"
        :data="list"
        class="right-foods">
        <ul>
          <li ref="food" :key="index" v-for="(item,index) in list" class="foods-item">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li @click="_viewDetail(food)" :key="index" v-for="(food,index) in item.foods" class="food border-1px">
                <img
                  class="food-img"
                  :src="food.icon" alt="">
                <div class="food-content">
                  <span class="name">{{food.name}}</span>
                  <span v-show="food.description" class="description">{{food.description}}</span>
                  <span class="sell-count">月售{{food.sellCount}}份,好评率{{food.rating}}%</span>
                  <div class="price">
                    <span class="new-price">￥{{food.price}}</span>
                    <span v-show="food.oldPrice" class="old-price">￥{{food.oldPrice}}</span>
                  </div>
                </div>
                <div class="cart-control-wrapper">
                  <cart-control :food="food"></cart-control>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </ele-scroll>
      <food-detail @hide="_hide" :food="food" :food-show="foodShow"></food-detail>
    </div>
    <shop-car :selectFoods="selectFoods" :seller="seller"></shop-car>
  </div>
</template>

<script>
  import {getGoods} from '../../api'
  import EleScroll from "../../components/EleScroll/EleScroll";
  import ShopCar from "../../components/ShopCar/ShopCar";
  import CartControl from "../../components/CartControl/CartControl";
  import FoodDetail from "../../components/FoodDetail/FoodDetail";
    export default {
      name: "EleGoods",
      props:{
        seller:{
          type:Object,
          default:null
        }
      },
      created() {
        this.classMap = ['decrease','discount','special','invoice','guarantee']
        this._getGoods()
      },
      data() {
        return {
          list:[],
          probeType:3,
          listenScroll: true,
          scrollY:0,
          listHeight:[],
          foodShow:false,
          food:{}
        }
      },
      components:{
        EleScroll,
        ShopCar,
        CartControl,
        FoodDetail
      },
      computed:{
        currentIndex() {
          for (let i=0;i<this.listHeight.length;i++) {
            let h1 = this.listHeight[i]
            let h2 = this.listHeight[i+1]
            if(!h2 || (h1<=this.scrollY && this.scrollY < h2)) {
              this._followScroll(i)
              return i
            }
          }
          return 0
        },
        selectFoods() {
          let foods = []
          this.list.forEach((good) => {
              good.foods.forEach((item) => {
                if(item.count) {
                  foods.push(item)
                }
              })
          })
          return foods
        }
      },
      methods:{
        _followScroll(index) {
          let menuList = this.$refs.menuList
          let el = menuList[index]
          this.$refs.menus.scrollToElement(el,300)
        },
        _viewDetail(item) {
          this.foodShow = true
          this.food =item
        },
        _hide() {
          this.foodShow= false
          this.food = {}
        },
        async _getGoods() {
          const res = await getGoods()
          if(res.code===200) {
            this.list = res.data
            this.$nextTick(() => {
              this._calculateListHeight()
            })
          }
        },
        handleScroll(pos) {
          if(pos.y<=0) {
            this.scrollY = Math.abs(Math.round(pos.y));
          }
        },
        selectMenu(index) {
          this.$refs.foods.scrollToElement(this.$refs.food[index],200)
        },
        _calculateListHeight() {
          let foodList = this.$refs.food
          let height = 0
          this.listHeight.push(height)
          for (let i=0;i<foodList.length;i++) {
            height+=foodList[i].clientHeight
            this.listHeight.push(height)
          }
        }
      }
    }
</script>

<style lang="less" scoped>
@import '~common/less/mixin.less';
.ele-goods {
  position: fixed;
  top: 175px;
  bottom: 48px;
  width: 100%;
  display: flex;
  .left-menus {
    flex: 0 0 80px;
    width: 80px;
    background-color: #f3f6f6;
    text-align: center;
    overflow: hidden;
    .menus-item {
      height: 54px;
      font-size: 12px;
      line-height: 14px;
      display: table;
      padding: 0 12px;
      width: 100%;
      box-sizing: border-box;
      &.current {
        background-color: #ffffff;
      }
      &:nth-last-child(1) {
        .text {
          border-bottom: none;
        }
      }
      .text {
        display: table-cell;
        vertical-align: middle;
        width: 56px;
        .border-1px(rgba(7,17,27,0.12));
        &>.special {
          width: 12px;
          height: 12px;
          background-size: 12px 12px;
          display: inline-block;
          .bg-image('special_3');
        }
        &>.discount {
          width: 12px;
          height: 12px;
          background-size: 12px 12px;
          display: inline-block;
          .bg-image('discount_3');
        }
      }
    }
  }
  .right-foods {
    flex: 1;
    overflow: hidden;
    .foods-item {
      .title {
        font-size: 12px;
        padding-left: 12px;
        border-left: 1px solid #d9dde1;
        background-color: #f3f5f7;
        height: 26px;
        line-height: 26px;
        color: rgb(147,153,159);
      }
      .food {
        margin: 18px 18px 0 18px;
        position: relative;
        display: flex;
        padding-bottom:18px;
        .border-1px(rgba(7,17,27,0.1));
        &:nth-last-child(1) {
          border: none;
        }
        .food-img {
          width: 57px;
          flex: 0 0 57px;
          margin-right: 10px;
          height: 57px;
        }
        .food-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          .name {
            font-size: 14px;
            color: rgb(7,17,27);
            line-height: 14px;
          }
          .description {
            font-size: 12px;
            color: rgb(147,153,159);
            line-height: 16px;
            margin-top: 8px;
          }
          .sell-count {
            font-size: 12px;
            color: rgb(147,153,159);
            line-height: 10px;
            margin: 8px 0;
            display: block;
          }
          .price {
            font-size: 14px;
            font-weight: 700;
            color: #fb131e;
            line-height: 24px;
            .old-price {
              font-size: 10px;
              margin-left: 8px;
              text-decoration: line-through;
              color: rgb(147,153,159);
              font-weight: normal;
            }
          }
        }
        .cart-control-wrapper {
          position: absolute;
          right:0;
          bottom:12px;
        }
      }
    }
  }
}
</style>
