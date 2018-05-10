<template>
    <div class="goods">
      <div ref="menuWarapper" class="menu-wrapper">
        <ul>
          <li class="menu-item" @click="selectMenu(index,$event)" v-for="(item,index) in goods">
            <span class="text">
              <span  v-show="item.type>=0" class="iconMap" :class="icon[item.type]"></span>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div id="wrapper" ref='foodsWarapper' class="foods-wrapper">
        <ul>
          <li ref='foodList' class="food-list food-list-hook" v-for="item in goods">
            <h1 class="title">
              {{item.name}}
            </h1>
            <ul>
              <li v-for="foods in item.foods" class="food-item" @click="mFoods(foods)">
                <div class="icon">
                  <img :src="foods.icon" alt="" width="57"height="57">
                </div>
                <div class="content">
                  <h2 class="name">{{foods.name}}</h2>
                  <p class="description">{{foods.description}}</p>
                  <div class="sell-info">
                    <span class="sellCount">月售{{foods.sellCount}}</span>
                    <span class="rating">好评{{foods.rating}}%</span>
                    <div class="price">
                          <span class="newPrice">
                            <span class="unit">￥</span>
                            {{foods.price}}
                          </span>
                    </div>
                    <div class="cartcontrol-wrapper">
                      <cartcon :foods="foods"></cartcon>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
        <shopCart :foods="aFood" :deliveryPrice="datas.seller.deliveryPrice" :minPrice="datas.seller.minPrice" ref="shopCart"></shopCart>
        <foodetail :foods="foodDetail" ref="foodsteail"></foodetail>
    </div>
</template>
<script>
  import Scroll from 'better-scroll'
  import cartcon from '../details/cartcontrol.vue'
  import shopCart from '../details/shopCart.vue'
  import foodetail from '../details/fooDtail.vue'
    export default{
        props:['goods','datas'],
        data(){
            return {
              icon: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
              foodDetail:{}
            }
        },
        methods:{
            selectMenu(index,event){
                if(!event._constructed){
                    return false;
                }
              let foodList = this.$refs.foodList
              let el = foodList[index]
              this.foodsScroll.scrollToElement(el, 300)
            },
          mFoods(value){
            this.foodDetail = value;
            this.$refs['foodsteail'].foodShow();
          },
          scroll () {
            this.foodsScroll = new Scroll(this.$refs['foodsWarapper'], {
              click: true,
            })
            new Scroll(this.$refs['menuWarapper'], {
              click: true,
            })
          },
        },
        computed:{
          aFood(){
            let arr = []
            //                 回调里的参数 1.value 2.index
            this.datas.goods.length && this.datas.goods.forEach(goods=>{
              goods.foods.forEach(foods=>{
                if (foods.count > 0) {
                  arr.push(foods)
                }
              })
            })
            return arr
          }
        },
        components:{
          cartcon,
          shopCart,
          foodetail
        }
    }
</script>

