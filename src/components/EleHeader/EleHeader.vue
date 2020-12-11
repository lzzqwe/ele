<template>
    <div class="header">
     <div class="content-wrapper">
       <div class="avatar">
         <img
           width="100%"
           height="100%"
           :src="seller.avatar" alt="">
       </div>
       <div class="content">
         <div class="title">
           <span class="brand"></span>
           <span class="text">{{seller.name}}</span>
         </div>
         <div class="send">
           <span>{{seller.description}}</span>/<span>{{seller.deliveryTime}}分钟送达</span>
         </div>
         <div v-if="seller.supports" class="pay">
           <span class="decease"></span>
           <span>{{seller.supports[0].description}}</span>
         </div>
       </div>
       <div @click="_showDetail" class="support-count">
         <span>5个</span><span class="iconfont iconicon-test3"></span>
       </div>
     </div>
      <div @click="_showDetail" class="notice">
        <span class="title"></span>
        <span class="text">{{seller.bulletin}}</span>
        <span class="iconfont iconicon-test3"></span>
      </div>
      <div class="background">
        <img
          height="100%"
          width="100%"
          :src="seller.avatar"
          alt="">
      </div>
      <ele-detail :seller="seller" @close="_closeDetail" :detail-show="detailShow"></ele-detail>
    </div>
</template>

<script>
  import EleDetail from "../EleDetail/EleDetail";
    export default {
      name: "EleHeader",
      props:{
        seller:{
          type:Object,
          default:null
        }
      },
      components:{
        EleDetail
      },
      data() {
        return {
          detailShow: false
        }
      },
      methods:{
        _showDetail() {
          this.detailShow = true
        },
        _closeDetail() {
          this.detailShow = false
        }
      }
    }
</script>

<style lang="less" scoped>
.header {
  position: relative;
  background-color: rgba(7,17,27,0.5);
  .content-wrapper {
    display: flex;
    padding: 24px 12px 18px 24px;
    position: relative;
    .avatar {
      width: 64px;
      height: 64px;
      border-radius: 2px;
      overflow: hidden;
      flex: 0 0 64px;
    }
    .content {
      flex: 1;
      margin-left: 16px;
      .title {
        display: flex;
        margin-top: 2px;
        .brand {
          background-image: url("./brand@2x.png");
          background-size: 30px 18px;
          background-repeat: no-repeat;
          width: 30px;
          height: 18px;
          margin-right: 6px;
        }
        .text {
          font-size: 16px;
          line-height: 18px;
          color: rgb(255,255,255);
          font-weight: bold;
        }
      }
      .send {
        margin: 8px 0 10px 0;
        color: rgb(255,255,255);
        font-weight: 200;
        font-size: 10px;
        line-height: 12px;
      }
      .pay {
        color: rgb(255,255,255);
        font-weight: 200;
        font-size: 10px;
        line-height: 12px;
        display: flex;
        .decease {
          background-image: url("./decrease_1@2x.png");
          background-size: 12px 12px;
          width: 12px;
          height: 12px;
          background-repeat: no-repeat;
          margin-right: 2px;
        }
      }
    }
    .support-count {
      position: absolute;
      bottom: 10px;
      right: 12px;
      padding: 7px 8px;
      border-radius: 8px;
      color: rgb(255,255,255);
      font-size: 10px;
      background-color: rgba(0,0,0,0.2);
      line-height: 12px;
      .iconicon-test3 {
        margin-left: 2px;
      }
    }
  }
  .notice {
    display: flex;
    height: 28px;
    line-height: 28px;
    padding: 0 12px;
    background-color:rgba(7,17,27,0.2);
    align-items: center;
    .text {
      white-space: nowrap;
      font-size: 10px;
      text-overflow: ellipsis;
      overflow: hidden;
      flex: 1;
      color: rgb(255,255,255);
    }
    .title {
      background-image: url("./bulletin@2x.png");
      width: 22px;
      height: 12px;
      background-size: 22px 12px;
      background-repeat: no-repeat;
      flex: 0 0 22px;
      margin-right: 4px;
    }
    .iconicon-test3 {
      flex: 0 0 16px;
      width: 16px;
      height: 16px;
      text-align: center;
      line-height: 16px;
      color: rgb(255,255,255);
    }
  }
  .background {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: -1;
    filter: blur(10px);
  }
}
</style>
