<template>
  <div class="star" :class="'star-'+size">
    <span class="star-item" :class="item" v-for="item in stars"></span>
  </div>
</template>
<script>
    export default{
        props: ['score','size'],
        computed: {
          stars(){
              let arr = [];
              let scores = Math.floor(this.score);
              let bloean = (this.score-scores) >= 0.5;

              for( let i=0;i<scores;i++){
                arr.push('on');
              }

              if(bloean) {arr.push('half')};
              while(arr.length<5)
              {arr.push('off');}
              return arr;
          }
        }
    }
</script>
<style>

</style>
