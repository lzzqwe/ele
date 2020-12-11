<template>
  <div ref="scroll">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from '@better-scroll/core'
    export default {
      name: "EleScroll",
      props:{
        click: {
          type:Boolean,
          default:true
        },
        scrollX:{
          type:Boolean,
          default:false
        },
        probeType:{
          type:Number,
          default:3
        },
        listenScroll:{
          type:Boolean,
          default:false
        },
        data:[Object,Array]
      },
      mounted() {
        this.$nextTick(() => {
          this._initScroll()
        })
      },
      methods:{
        _initScroll() {
          if (!this.$refs.scroll) {
            return
          }
          if(!this.scroll) {
            this.scroll = new BScroll(this.$refs.scroll,{
              click:this.click,
              probeType: this.probeType,
              scrollX:this.scrollX
            })
            if(this.listenScroll){
              let me=this
              this.scroll.on('scroll',(pos)=>{me.$emit('scroll',pos)})
            }
          }
        },
        refresh() {
          this.scroll && this.scroll.refresh()
        },
        scrollToElement(el,time) {
          this.scroll && this.scroll.scrollToElement(el,time)
        }
      },
      watch:{
        data() {
          setTimeout(() => {
            this.refresh()
          },20)
        }
      }
    }
</script>

<style lang="less" scoped>

</style>
