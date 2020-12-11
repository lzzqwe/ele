<template>
  <transition name="food">
    <ele-scroll ref="food" :data="food" v-show="foodShow" class="food-detail">
      <div v-if="food">
        <div class="food-img">
          <img height="100%" width="100%" :src="food.image" alt="">
        </div>
        <div @click="_hideDetail" class="back-icon">
          <span class="iconfont iconicon-test2"></span>
        </div>
        <div class="food-content">
          <div class="rating-count">
            <h1 class="title">{{food.name}}</h1>
            <span class="number">
            月售{{food.sellCount}}份
            <span class="percent">好评率{{food.rating}}%</span>
          </span>
            <div class="price">
              <span class="new-price">￥{{food.price}}</span>
              <span v-show="food.oldPrice" class="old-price">￥{{food.oldPrice}}</span>
            </div>
          </div>
          <div class="increase-car">
            <span class="car">加入购物车</span>
          </div>
        </div>
        <ele-spilt></ele-spilt>
        <div class="goods-info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <ele-spilt></ele-spilt>
        <div class="rating-select">
          <h1 class="ratings">商品评价</h1>
          <rating-select
            @select="_select"
            @toggle="_toggleContent"
            :only-content="onlyContent"
            :ratings="food.ratings"
            :select-type="selectType"
            :satisfaction="'推荐'"
            :no-satisfaction="'吐槽'"></rating-select>
        </div>
        <ul v-if="food.ratings" class="comment-list">
          <li v-show="needShow(item.rateType,item.text)" :key="index" class="comment-item" v-for="(item,index) in food.ratings">
            <div class="left">
              <span class="time">{{item.rateTime | formateTime}}</span>
              <div class="content">
                <span :class="{iconhaoping:item.rateType===0,iconchaping:item.rateType===1}" class="iconfont"></span>
                <span class="text">{{item.text}}</span>
              </div>
            </div>
            <div class="right">
              <span class="username">{{item.username}}</span>
              <img class="avatar" width="12px" height="12px" :src="item.avatar" alt="">
            </div>
          </li>
        </ul>
      </div>
    </ele-scroll>
  </transition>
</template>

<script>
  import EleSpilt from "../EleSpilt/EleSpilt";
  import EleScroll from "../EleScroll/EleScroll";
  import RatingSelect from "../RatingSelect/RatingSelect";
  const ALL = 2;
    export default {
      name: "FoodDetail",
      props:{
        foodShow:{
          type:Boolean
        },
        food:{
          type:Object
        }
      },
      components:{
        EleSpilt,
        EleScroll,
        RatingSelect
      },
      data() {
        return {
          selectType: ALL,
          onlyContent:true
        }
      },
      methods:{
        _hideDetail() {
          this.$emit('hide')
        },
        _select(type) {
          this.selectType = type
          this.$nextTick(() => {
            this.$refs.food.refresh()
          })
        },
        _toggleContent() {
          this.onlyContent = !this.onlyContent
          this.$nextTick(() => {
            this.$refs.food.refresh()
          })
        },
        needShow(type,text) {
          if(this.onlyContent && !text) {
             return false
          }
          if(this.selectType === ALL) {
            return true
          } else {
            return type === this.selectType
          }
        }
      }
    }
</script>

<style lang="less" scoped>
.food-detail {
  position: fixed;
  top:0;
  left: 0;
  bottom: 48px;
  right: 0;
  z-index: 101;
  background-color: #ffffff;
  overflow: hidden;
  opacity: 1;
  &.food-enter,&.food-leave-to {
    transform: translateX(100%);
    opacity: 0;
  }
  &.food-enter-active,&.food-leave-active {
    transition: all 0.5s;
  }
  .food-img {
    height: 375px;
  }
  .back-icon {
    position: absolute;
    top: 10px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    .iconicon-test2 {
      font-size: 36px;
      color: #e4e7e7;
    }
  }
  .food-content {
    display: flex;
    justify-content: space-between;
    padding: 18px;
    .rating-count {
      .title {
        font-size: 14px;
        font-weight: 700;
        color: rgb(7,17,27);
        line-height: 14px;
        margin-bottom: 8px;
      }
      .number {
        font-size: 10px;
        color: rgb(147,153,159);
        display: inline-block;
        margin-bottom: 18px;
        .percent {
          margin-left: 12px;
        }
      }
      .price {
        .new-price {
          font-size: 14px;
          color: rgb(240,20,20);
          font-weight: 700;
          line-height: 14px;
          margin-right: 8px;
        }
        .old-price {
          font-size: 10px;
          color: rgb(147,153,159);
          line-height: 24px;
          text-decoration: line-through;
        }
      }
    }
    .increase-car {
      position: relative;
      .car {
        display: inline-block;
        height:24px;
        width: 74px;
        background-color: rgb(0,160,220);
        font-size: 10px;
        border-radius: 12px;
        padding: 0 12px;
        line-height: 24px;
        text-align: center;
        color: rgb(255,255,255);
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
  }
  .goods-info {
    padding: 18px;
    .title {
      margin-bottom: 6px;
      font-size: 14px;
    }
    .text {
      margin-left: 8px;
      font-size: 12px;
      color: rgb(77,85,93);
      line-height: 24px;
      text-align: left;
    }
  }
  .rating-select {
    .ratings {
      margin: 18px 0 0 18px;
      font-size: 14px;
    }
  }
  .comment-list {
    margin: 0 18px;
    .comment-item {
      display: flex;
      justify-content: space-between;
      padding: 16px 0;
      border-bottom: 1px solid rgba(7,17,27,0.1);
      &:last-child {
        border-bottom: none;
      }
      .left {
        .time {
          font-size: 10px;
          color: rgb(147,153,159);
          line-height: 12px;
          margin-bottom: 6px;
        }
        .content {
          display: flex;
          align-items: center;
          .iconhaoping {
            font-size: 12px;
            margin-right: 4px;
            color: #05a0db;
            line-height: 24px;
          }
          .iconchaping {
            font-size: 12px;
            margin-right: 4px;
            color: #b7bbbf;
            line-height: 24px;
          }
          .text {
            font-size: 12px;
            color: rgb(7,17,27);
            line-height: 16px;
          }
        }
      }
      .right {
        .username {
          font-size: 10px;
          color: rgb(147,153,159);
          line-height: 12px;
          margin-right: 6px;
        }
        .avatar {
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
