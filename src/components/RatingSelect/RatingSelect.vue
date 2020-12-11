<template>
  <div class="rating-select" v-if="ratings">
    <div class="btn">
      <button @click="select(2)" :class="{active:selectType===2}" class="all">{{all}}{{ratings.length}}</button>
      <button @click="select(0)" :class="{active:selectType===0}" class="satisfaction">{{satisfaction}}{{satisfactionContent.length}}</button>
      <button @click="select(1)" :class="{active:selectType===1}" class="no-satisfaction">{{noSatisfaction}}{{noSatisfactionContent.length}}</button>
    </div>
    <div @click="_onlyShowContent" class="switch">
      <span :class="{high:onlyContent}" class="iconfont iconcheck-circle-fill1"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
    const ALL = 2
    const POSITIVE = 0
    const NEGATIVE = 1
    export default {
      name: "RatingSelect",
      props:{
        all:{
          type:String,
          default:'全部'
        },
        selectType:{
          type:Number,
          default:ALL
        },
        onlyContent:{
          type:Boolean,
          default:true
        },
        satisfaction:{
          type: String,
          default: '满意'
        },
        noSatisfaction:{
          type:String,
          default:'不满意'
        },
        ratings:{
          type:Array
        }
      },
      methods:{
        select(type) {
          this.$emit('select',type)
        },
        _onlyShowContent() {
          this.$emit('toggle')
        }
      },
      computed:{
        satisfactionContent() {
          let result = []
          this.ratings.forEach((item) => {
            if(item.rateType === POSITIVE) {
              result.push(item)
            }
          })
          return result
        },
        noSatisfactionContent() {
          let result = []
          this.ratings.forEach((item) => {
            if(item.rateType === NEGATIVE) {
              result.push(item)
            }
          })
          return result
        }
      }
    }
</script>

<style lang="less" scoped>
.rating-select {
  .btn {
    margin:18px 18px 0 18px;
    padding-bottom: 18px;
    font-size: 12px;
    border-bottom: 1px solid #e8e8e8;
    .satisfaction {
      margin:0 8px;
      padding: 10px;
      border: none;
      background-color: rgba(0,160,220,0.2);
      color: #666666;
      outline: none;
      &.active {
        background-color: #00a1dc;
        color: #fffcee;
      }
    }
    .all {
      padding: 10px;
      border: none;
      background-color: rgba(0,160,220,0.2);
      color: #666666;
      outline: none;
      &.active {
        background-color: #00a1dc;
        color: #fffcee;
      }
    }
    .no-satisfaction {
      padding: 10px;
      border: none;
      background-color: #cccccc;
      color: #666666;
      outline: none;
      &.active {
        background-color: #666;
        color: #fffcee;
      }
    }
  }
  .switch {
    padding: 15px 20px 15px 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e5e8e8;
    .iconcheck-circle-fill1 {
      font-size: 20px;
      margin-right: 10px;
      color: #b7bbbf;
      &.high {
        color: green;
      }
    }
    .text {
      font-size: 12px;
      color: #94999a;
      vertical-align: center;
    }
  }
}
</style>
