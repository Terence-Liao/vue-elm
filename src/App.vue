<template>
  <div id="app">
    <vHeader :seller="datas.seller"></vHeader>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/commet">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :goods="datas.goods" :datas="datas" :seller="datas.seller" ref="scroll"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import axios from 'axios'
  import vHeader from './components/details/header.vue'
export default {
    data(){
       return{
          datas:{
            goods: {},
            seller:[],
            commet:[]
          }
       }
    },
    mounted(){
        axios.get('/static/data.json').then(res => {
        this.datas.seller = res.data.seller
        this.datas.goods = res.data.goods
        this.datas.commet = res.data.ratings
          this.$nextTick(() => {
            this.$refs.scroll.scroll()
          })
      })
    },
  components:{
    vHeader
  }
}
</script>

<style>
  #app .tab .tab-item a.router-link-active{
    color: red;
  }
</style>
