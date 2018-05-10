<template>
        <div class="header">
          <div class="content-wrapper">
            <div class="avatar">
              <img :src="seller.avatar" alt="" width="64"height="64">
            </div>
            <div class="content">
              <div class="title">
                <span class="brand"></span>
                <span class="name">{{seller.name}}</span>
              </div>
              <div class="description">{{seller.description}} / {{seller.deliveryTime}}分钟送达 </div>
              <div class="supports">
                <div class="supports_desc">
                  <span class="icon decrease"></span>
                  <span class="text">在线支付满30减10</span>
                </div>
              </div>
            </div>
            <div class="support-count" @click="show=!show">
              <span class="count">详情</span>
              <i class="icon-keyboard_arrow_right"></i>
            </div>
          </div>
          <div class="bulletin-wrapper">
            <span class="bulletin-title">

            </span>
            <span class="bulletin-text" @click="show=!show">
              粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。
            </span>
            <i class="icon-keyboard_arrow_right"></i>
          </div>
          <div class="background">
            <img width="100%" height="100%" src="http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg">
          </div>
          <!--details-->
          <transition name="fade">
            <div class="detail" v-show="show">
            <div class="detail-wrapper clearfix">
                <div class="detail-main">
                  <h1 class="name">{{seller.name}}</h1>
                  <div class="star-wrapper">
                    <star :score="seller.score" :size="48"></star>
                  </div>
                  <div class="title">
                    <div class="line"></div>
                    <div class="text">优惠信息</div>
                    <div class="line"></div>
                  </div>
                  <ul class="supports">
                    <li class="support-item" v-for="item in seller.supports">
                      <span class="icon" :class="icon[item.type]"></span>
                      <span class="text">{{ item.description }}</span>
                    </li>
                  </ul>
                  <div class="title">
                    <div class="line"></div>
                    <div class="text">
                      商家公告
                    </div>
                    <div class="line"></div>
                  </div>
                  <div class="bulletin">
                    粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。
                  </div>
                </div>
              </div>
            <div class="detail-close">
              <i class="icon-close" @click="show=!show"></i>
            </div>
          </div>
          </transition>
        </div>
</template>
<script>
  import star from './star.vue'
    export default{
        props: ['seller'],
        data(){
            return {
                icon: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
                show : false
            }
        },
      methods:{
          /*shows(){
              return this.show = !this.show;
          }*/
      },
      components:{
          star
        }
    }
</script>
<style>
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter,.fade-leave-to{
      opacity: 0;
    }
</style>
