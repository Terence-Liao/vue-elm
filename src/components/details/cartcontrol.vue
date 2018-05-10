<template>
    <div class="cartcontrol">
      <transition mode="in-out" name="fadeRotate">
        <div class="cart-decrease" @click.stop="reduce($event)" v-show="this.foods.count>0">
          <span class="icon-remove_circle_outline inner"></span>
        </div>
      </transition>
      <div class="cart-count" v-show="this.foods.count>0">{{this.foods.count}}</div>
      <div id="add" class="cart-add" @click.stop="addNum($event)">
        <i class="icon-add_circle"></i>
      </div>
    </div>
</template>
<script>
  import Vue from 'vue'
    export default{
      props: ['foods'],
      methods:{
          addNum(event){
              if (typeof this.foods.count === 'undefined') {
                Vue.set(this.foods,'count', 0)
                // Vue.set 可以直接往data里或接收的数据中添加
                // this.$set 需要执行函数的时候传值过来 然后往传递的值里添加
              }
              this.foods.count++;
              //constrected就better-scroll有。
              if (!event._constructed) {
                return false
              }
              this.$emit('add', event.target);
            },
          reduce(event){
            if (!event._constructed) {
              return false
            }
            this.foods.count--;
            if(this.foods.count<0)this.foods.count=0
          }
      }
    }
</script>

