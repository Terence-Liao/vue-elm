<template>
  <transition name="move">
    <div  v-show="Bshow" class="detailWrapper" ref="detailWrapper">
      <div class="foodDetail">
        <div class="back">
          <i class="icon-arrow_lift" @click.stop="Bshow=!Bshow"></i>
        </div>
        <img :src="foods.image"alt=""height="425"width="100%">
        <div class="info">
          <div class="title">{{foods.name}}</div>
          <div class="desc">
            <span>月售{{foods.sellCount}}</span>
            <span>好评{{foods.rating}}%</span>
          </div>
          <div class="price">
            <span class="unit">￥</span>{{foods.price}}
            <span class="oldPirce"></span>
          </div>
          <transition name="fade">
            <div class="shopCart" @click.stop="addCount($event)" v-show="foods.count===0||foods.count === undefined">
              <div class="text">加入购物车</div>
            </div>
          </transition>
          <cartcontrol :foods="foods" ref="control"></cartcontrol>
        </div>
        <div class="divider"></div>
        <div class="desc">
          <div class="title">商品介绍</div>
          <div class="content">{{foods.info}}</div>
        </div>
        <div class="divider"></div>
        <div class="evaluation">
          <div class="title">商品评价</div>
          <div class="classify">
            <span class="item" v-for="(item,index) in datas" :class="{'active': item.active, 'bad': index === 2, 'badActive':index===2&&item.active }" @click.stop="changCo(item)">
              {{item.name}}
              <span>{{item.count}}</span>
            </span>
          </div>
          <div class="switch"@click.stop="toggle = !toggle">
            <span class="icon-check_circle" :class="{'on':toggle}"></span>
            <span class="text">只看有内容的评价</span>
          </div>
          <div class="evel-list">
            <ul>
              <li class="evel" v-for="item in contents">
                <div class="userInfo">
                  <div class="time">{{item.rateTime}}</div>
                  <div class="user">
                    <span>{{item.username}}</span>
                    <span class="avatar">
                      <img width="12" height="12" :src="item.avatar" alt="">
                    </span>
                  </div>
                </div>
                <div class="content">
                  <span class="icon" :class="item.rateType?'icon-thumb_down':'icon-thumb_up'"></span>
                  <span class="text">{{item.text}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import cartcontrol from '../details/cartcontrol.vue'
  import Scroll from 'better-scroll'
    export default{
        props:['foods'],
        data(){
          return {
              Bshow: false,
              datas: [
              {name: '全部', count: 0, commont: [], active: true},
              {name: '推荐', count: 0, commont: [], active: false},
              {name: '吐槽', count: 0, commont: [], active: false}
            ],
            commonts:{},
            toggle: true
          }
        },
      methods:{
            foodShow(){
                this.Bshow = true;
                this.$nextTick(()=>{
                  if(!this.scr)
                  this.scr = new Scroll(this.$refs['detailWrapper'],{
                      click:true
                  })
                  else{
                    this.scr.refresh()
                  }
                })
                  this.datas.forEach(val=>{
                    val.count = 0;
                    val.commont =[];
                  })

                  this.$nextTick(()=>{
                    this.commonts = this.foods.ratings
                    this.foods.ratings.forEach(val=>{
                      this.datas[0].count++
                      this.datas[0].commont.push(val)
                      if(val.rateType){
                        this.datas[2].count++
                        this.datas[2].commont.push(val)
                      }else{
                        this.datas[1].count++
                        this.datas[1].commont.push(val)
                      }
                    })
                })
            },
        addCount(event){
          this.$refs['control'].addNum(event);
        },
        changCo(item){
            this.commonts=item.commont
            this.datas.forEach(val=>{
              val.active = false;
            })
            item.active = true;
        },
        updatescr () {
          this.$nextTick(() => {
            this.scr.refresh()
          })
        }
      },
      computed: {
        contents(){
          let arr=[]
          this.updatescr()
          if(this.toggle){
            this.commonts.length&&this.commonts.forEach(val=>{
              if(val.text.length>0){
                arr.push(val) //只看有内容的
              }
            })
            return arr
          }else{
              return this.commonts //全部评价
            }
        }
      },
      components:{
        cartcontrol
      }
    }
</script>
<style>

</style>
