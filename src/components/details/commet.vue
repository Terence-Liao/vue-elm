<template>
    <div class="ratingsWrapper" ref="ratingsWrapper">
      <div class="ratings-content">
        <div class="info">
          <div class="mark">
            <div class="num">{{seller.score}}</div>
            <div class="text">综合评分</div>
            <div class="contrast">高于周边商家{{seller.rankRate}}</div>
          </div>
          <div class="stars">
            <div class="serviceScore">
              <span class="text">服务态度</span>
              <star :score="seller.foodScore" :size="36"></star>
              <span class="num">{{seller.foodScore}}</span>
            </div>
            <div class="foodScore">
              <span class="text">送餐速度</span>
              <star :score="seller.shScore" :size="36"></star>
              <span class="num">{{seller.shScore}}</span>
            </div>
            <div class="deliveryTime">
              <span class="text">送达时间</span>
              <span class="time">{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="evaluation">
          <div class="classify">
            <span v-for="(item,index) in datas" class="item" :class="{'active':item.active,'bad':index===2,'badActive':index===2&&item.active}"@click="ifActive(item)">
              {{item.name}}
              <span class="count">{{item.count}}</span>
            </span>
          </div>
          <div class="switch" @click="toggle=!toggle">
            <span class="icon-check_circle" :class="{'on':toggle}"></span>
            <span class="text">只看有内容的评价</span>
          </div>
          <div class="evel-list">
            <ul>
              <li class="evel" v-for="item in commtes">
                <div class="avatar">
                  <img :src="item.avatar" alt="" width="28" height="28">
                </div>
                <div class="content">
                  <div class="user">
                    <span class="name">{{item.username}}</span>
                    <span class="rateTime">{{item.rateTime}}</span>
                  </div>
                  <div class="star-wrapper">
                    <star :size="24" :score="item.score"></star>
                    <span class="deliveryTime">{{item.deliveryTime}}分钟送达</span>
                  </div>
                  <div class="text">{{item.text}}</div>
                  <div class="recommend">
                    <span class="icon" :class="item.rateType?'icon-thumb_down':'icon-thumb_up'"></span>
                    <span class="dish" v-for="dish in item.recommend">{{dish}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import star from './star.vue'
  import axios from 'axios'
  import sCroll from 'better-scroll'
    export default{
        props:['seller'],
        data(){
            return{
              datas:[
                  {name:'全部',count:0,commet:[],active:true},
                  {name:'推荐',count:0,commet:[],active:false},
                  {name:'吐槽',count:0,commet:[],active:false}
              ],
              ratings:[],
              comment:[],
              toggle:true
            }
        },
      mounted(){
        axios.get('/static/data.json').then(res=>{
            this.ratings = res.data.ratings
            this.comment = res.data.ratings
            this.ratings.forEach(val=>{
              this.datas[0].count++
              this.datas[0].commet.push(val)
              if(val.score>3){
                this.datas[1].count++
                this.datas[1].commet.push(val)
              }else if(val.score<3){
                this.datas[2].count++
                this.datas[2].commet.push(val)
              }
            })
        })
        this.$nextTick(()=>{
          if(!this.Sc){
            this.Sc = new sCroll(this.$refs['ratingsWrapper'],{
                click:true
            })
          }
        })
      },
      methods:{
        ifActive(item){
          /*item.active = !item.active*/
          this.datas.forEach((val)=>{
            val.active=false
          })
          item.active=true
          this.comment = item.commet
        },
        updataSc () {
          this.$nextTick(() => {
            this.Sc.refresh()
          })
        }
      },
      computed:{
          commtes(){
              this.updataSc();
              let arr=[];
              if(this.toggle){
                this.comment.forEach((val)=>{
                  if(val.text.length>0) {
                    arr.push(val)
                  }
                })
                return arr
              }else{
                return this.comment
              }
          }
      },
      components:{
        star
      }
    }
</script>
<style>

</style>
