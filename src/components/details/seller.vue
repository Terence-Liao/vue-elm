<template>
    <div class="seller-wrapper" ref="seller-wrapper">
      <div class="seller-content">
        <div class="info">
          <div class="title">
            <div class="text">{{seller.name}}</div>
            <div class="star-wrapper">
              <star :size="36" :score="seller.score"></star>
              <span class="rate-count">评论({{seller.ratingCount}})</span>
              <span class="sell-count">月售{{seller.sellCount}}单</span>
              <div class="collect" @click="toggle=!toggle">
                <span class="icon-favorite" :class="{'active':toggle}"></span>
                <span class="text">收藏</span>
              </div>
            </div>
          </div>
          <div class="remark">
            <div class="block">
              <h2>起送价</h2>
              <div class="content">
                <span class="num">{{seller.minPrice}}元</span>
              </div>
            </div>
            <div class="block">
              <div class="content">
                <h2>商家配送</h2>
                <span class="num">{{seller.deliveryPrice}}元</span>
              </div>
            </div>
            <div class="block">
              <div class="content">
                <h2>平均配送时间</h2>
                <span class="num">{{seller.deliveryTime}}分钟</span>
              </div>
            </div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="activities">
          <div class="bulletin">
            <span>公告活动</span>
            <div class="content">
              {{seller.bulletin}}
            </div>
          </div>
        </div>
        <div class="supports">
          <ul>
            <li v-for="item in seller.supports" class="item">
              <span class="iconMap" :class="icon[item.type]"></span>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
        </div>
        <div class="divider"></div>
        <div class="seller-imgs">
          <h1>商家实景</h1>
          <div class="img-wrapper">
            <div>
              <img :src="img" v-for="img in seller.pics" alt="" width="120" height="90">
            </div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="seller-info">
          <h1>商家信息</h1>
          <ul class="info-list">
            <li class="info" v-for="list in seller.infos">
              {{list}}
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>
<script>
  import Scroll from 'better-scroll'
  import star from './star.vue'
    export default{
        props:['seller'],
        components:{
              star,
        },
      mounted(){
        this.$nextTick(()=>{
          new Scroll(this.$refs['seller-wrapper'],{
            click:true
          })
        })
      },
      data(){
        return{
            toggle:false,
            icon:['decrease','discount','special','invoice','guarantee']
        }
      },
      methods:{

      }
    }
</script>
<style>

</style>
