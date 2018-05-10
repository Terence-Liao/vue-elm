<template>
  <div>
    <div class="shopCart">
      <div class="content">
            <div @click='aShow' class="content-left">
              <div class="logo-wrapper">
                <div class="logo active">
                  <i class="icon-shopping_cart"></i>
                </div>
                <div class="badge" v-show="totalCount>0">{{totalCount}}</div>
              </div>
              <div class="price" :class="{'active':totalPrice>0}">￥{{totalPrice}}</div>
              <div class="desc" v-show="totalPrice<100">另外需要配送费￥{{deliveryPrice}}元</div>
            </div>
            <div class="content-right" :class="{'enough': totalPrice >= minPrice}">
              <div class="pay">{{chaPrice}}</div>
            </div>
          </div>
     <!-- <div class="ball-container">
        <transition name="fade" v-for="ball in balls"  @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>-->
      <transition name="transHeight">
        <div class="shopcart-list" v-show="totalPrice>0 && show">
              <div class="list-header">
                <h1 class="title">购物车</h1>
                <span @click='empty'class="empty">清空</span>
              </div>
              <div ref='list-content'class="list-content">
                <ul>
                  <li v-for="item in foods" class="food">
                    <span class="name">{{item.name}}</span>
                    <div class="price">
                      <span>￥{{item.price}}</span>
                    </div>
                    <div class="cartcontrol-wrapper" @add="addFood">
                      <cartcontrol :foods="item"></cartcontrol>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
      </transition>
    </div>
    <div class="backdrop"></div>
  </div>
</template>
<script>
  import cartcontrol from './cartcontrol.vue'
  import Scroll from 'better-scroll'
    export default{
      props:['deliveryPrice','minPrice','foods'],
      data(){
          return {
              show:false,
              balls: [
                {
                  show: false
                },
                {
                  show:  false
                },
                {
                  show:  false
                },
                {
                  show:  false
                },
                {
                  show:  false
                }
            ],
            dropBalls:[]
          }
      },
      methods:{
        addFood(target) {
          this.drop(target);
        },
        /*drop(el) {
          //触发一次事件就会将所有小球进行遍历
          for (let i = 0; i < this.balls.length; i++) {
            let ball = this.balls[i];
            if (!ball.show) { //将false的小球放到dropBalls
              ball.show = true;
              ball.el = el; //设置小球的el属性为一个dom对象
              this.dropBalls.push(ball);
              return;
            }
          }
        },*/
        /*beforeEnter(el){ //这个方法的执行是因为这是一个vue的监听事件
          let count = this.balls.length;
          while (count--) {
            let ball = this.balls[count];
            if (ball.show) {
              let rect = ball.el.getBoundingClientRect(); //获取小球的相对于视口的位移(小球高度)
              let x = rect.left - 32;
              let y = -(window.innerHeight - rect.top - 22); //负数,因为是从左上角往下的的方向
              el.style.display = ''; //清空display
              el.style.webkitTransform = `translate3d(0,${y}px,0)`;
              el.style.transform = `translate3d(0,${y}px,0)`;
              //处理内层动画
              let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
              inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
              inner.style.transform = `translate3d(${x}px,0,0)`;
            }
          }
        },*/
       /* enter(el, done) { //这个方法的执行是因为这是一个vue的监听事件
          /!* eslint-disable no-unused-vars *!/
          let rf = el.offsetHeight; //触发重绘html
          this.$nextTick(() => { //让动画效果异步执行,提高性能
            el.style.webkitTransform = 'translate3d(0,0,0)';
            el.style.transform = 'translate3d(0,0,0)';
            //处理内层动画
            let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
            inner.style.webkitTransform = 'translate3d(0,0,0)';
            inner.style.transform = 'translate3d(0,0,0)';
            el.addEventListener('transitionend', done); //Vue为了知道过渡的完成，必须设置相应的事件监听器。
          });
        },*/
        /*afterEnter(el) { //这个方法的执行是因为这是一个vue的监听事件
          let ball = this.dropBalls.shift(); //完成一次动画就删除一个dropBalls的小球
          if (ball) {
            ball.show = false;
            el.style.display = 'none'; //隐藏小球
          }
        },*/
          empty(){
              this.foods.forEach(val=>{
                  val.count = 0;
              })
          },
          aShow(){
            this.show = !this.show
            // 等待dom更新完之后
            // 第一次展开购物车的时候 10个商品(1000px) 清空 再次添加 5个商品(500px)
            // 沿用第一次记录下来的高度
            this.$nextTick(() => {
              if (!this.scro) {
                this.scro = new Scroll(this.$refs['list-content'], {
                  click: true
                })
              } else {
                // 强制重新计算高度
                this.scro.refresh()
              }
            })
          },
      },
      computed:{
        totalPrice () {
          let total = 0
          this.foods.forEach(food => {
            total += food.price * food.count
          })
          return total
        },
        chaPrice(){
            if(this.totalPrice<this.minPrice){
                return `还差￥${this.minPrice - this.totalPrice}起送`
            }else if(this.totalPrice===0){
                return this.minPrice
            }else return '去结算'
        },
        totalCount(){
          let sum=0;
          this.foods.forEach(count=>{
              if(count.count>0)sum+=count.count;
          });
          return sum;
        }
      },
      components:{
        cartcontrol
      }
    }
</script>
<style>

</style>
