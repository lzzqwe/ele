<template>
    <ele-scroll :data="ratings" class="ratings">
      <div class="ratings-container">
        <div class="overview">
          <div class="overview-left">
            <h1 class="score">{{seller.score}}</h1>
            <span class="composite">综合评分</span>
            <span class="exceed">高于周边商家{{seller.rankRate}}%</span>
          </div>
          <div class="overview-right">
            <div class="service-attribute">
              <span class="title">服务态度</span>
              <ele-star :size="36" :score="seller.serviceScore"></ele-star>
              <span class="number">{{seller.serviceScore}}</span>
            </div>
            <div class="service-attribute">
              <span class="title">商品评分</span>
              <ele-star :size="36" :score="seller.foodScore"></ele-star>
              <span class="number">{{seller.foodScore}}</span>
            </div>
            <div class="delivery-time">
              <span class="time">送达时间</span>
              <span class="minute">{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <ele-spilt></ele-spilt>
        <rating-select
          @select="_select"
          @toggle="_toggleContent"
          :ratings="ratings"
          :select-type="selectType"
          :only-content="onlyContent"
        ></rating-select>
        <div :key="index" class="ratings-wrapper border-1px" v-for="(item,index) in ratings">
          <div class="avatar">
            <img height="28px" width="28px" :src="item.avatar" alt="">
          </div>
          <div class="content">
            <div class="name">
              <span>{{item.username}}</span>
              <span class="time">{{item.rateTime | formateTime}}</span>
            </div>
            <div class="appraise">
              <ele-star :size="24" :score="item.score"></ele-star>
              <span v-show="item.deliveryTime" class="delivery">{{item.deliveryTime}}分钟送达</span>
            </div>
            <div class="text">{{item.text}}</div>
            <div v-show="item.recommend && item.recommend.length" class="tag">
              <span class="iconfont iconhaoping"></span>
              <div class="tag-list">
                <span :key="index" v-for="(tag,index) in item.recommend" class="tag-item">{{tag}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ele-scroll>
</template>

<script>
  const ALL = 2
  import {getRatings} from "../../api";
  import EleScroll from "../../components/EleScroll/EleScroll";
  import RatingSelect from "../../components/RatingSelect/RatingSelect";
  import EleSpilt from "../../components/EleSpilt/EleSpilt";
  import EleStar from "../../components/EleStar/EleStar";
    export default {
      name: "EleRatings",
      components:{
        EleScroll,
        RatingSelect,
        EleSpilt,
        EleStar
      },
      props:{
        seller:{
          type:Object
        }
      },
      data() {
        return {
          ratings:[],
          selectType:ALL,
          onlyContent:true
        }
      },
      created() {
       this._getRatingsData()
      },
      methods:{
        async _getRatingsData() {
          const res = await getRatings()
          if(res.code===200) {
            this.ratings = res.data
          }
        },
        _select(type) {
          this.selectType = type
        },
        _toggleContent() {
          this.onlyContent = !this.onlyContent
        }
      }
    }
</script>

<style lang="less" scoped>
@import "~common/less/mixin.less";
.ratings {
  position: fixed;
  top: 175px;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  .ratings-container {
    .overview {
      padding:18px 0;
      display: flex;
      .overview-left {
        flex: 0 0 137.5px;
        width: 137.5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-right: 1px solid #e6e6e6;
        .score {
          font-size: 24px;
          color: rgb(255,153,0);
          line-height: 28px;
        }
        .composite {
          font-size: 12px;
          color: rgb(7,17,27);
          line-height: 12px;
          display: block;
          margin: 6px 0 8px 0;
        }
        .exceed {
          font-size: 10px;
          line-height: 10px;
          color: #92969c;
        }
      }
      .overview-right {
        flex: 1;
        margin-left: 24px;
        .service-attribute {
          display: flex;
          margin-bottom: 8px;
          align-items: center;
          font-size: 12px;
          .title {
            line-height: 12px;
            margin-right: 12px;
          }
          .number {
            margin-left: 12px;
            line-height: 18px;
            color: rgb(255,153,0);
          }
        }
        .delivery-time {
          font-size: 12px;
          line-height: 18px;
          .time {
            color: rgb(7,17,27);
            margin-right: 12px;
          }
          .minute {
            color: rgb(147,153,159);
          }
        }
      }
    }
    .ratings-wrapper {
      display: flex;
      margin: 18px 18px 0 18px;
      padding-bottom: 18px;
      .border-1px(#e8e8e8);
      &:nth-last-child(1) {
        border-bottom: none;
      }
      .avatar {
        flex: 0 0 28px;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 12px;
      }
      .content {
        flex: 1;
        .name {
          font-size: 10px;
          color: rgb(7,17,27);
          line-height: 24px;
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
          .time {
            color: rgb(147,153,159);
          }
        }
        .appraise {
          display: flex;
          align-items: center;
          margin-bottom: 6px;
          .delivery {
            font-size: 10px;
            font-weight: 200;
            color: rgb(147,153,159);
            line-height: 12px;
          }
        }
        .text {
          font-size: 12px;
          line-height: 18px;
          color: rgb(7,17,27);
          margin-bottom: 8px;
        }
        .tag {
          display: flex;
          .iconhaoping {
            font-size: 12px;
            line-height: 16px;
            margin-right: 8px;
            color: rgb(0,160,220);
          }
          .tag-list {
            .tag-item {
              border: 1px solid rgba(7,17,27,0.1);
              padding: 0 6px;
              font-size: 9px;
              color: rgb(147,153,159);
              line-height: 16px;
              margin-right: 8px;
              background-color: rgb(255,255,255);
            }
          }
        }
      }
    }
  }
}
</style>
