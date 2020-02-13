<template>
  <div class="floor" >
    <floor :index="index-1" v-if="comment.parent" :comment='comment.parent'></floor>
    <div class="content">
      <div class="left">
       <div class="img">
        <span></span>
       </div>
      <div class="img-l">
        <div >{{index-1}} {{comment.user.nickname}} </div>
        <div> {{comment.create_date | time('YYYY-MM-DD HH:mm:ss')}}</div>
      </div>
       <div class="right" @click='reply(comment.id)'>回复</div>

    </div>

</div>
<div class="content">{{comment.content}}</div>
  </div>
</template>

<script>
export default {
  created () {
    /*  console.log('传', this.comment) */
  },
  name: 'floor',
  props: {
    comment: Object,
    index: Number
  },
  data () {
    return {

    }
  },
  methods: {
    reply (id) {
      console.log('孙子', 1)

      this.$emit('reply', id)
    }
  }

}
</script>

<style lang='scss' scoped>
 .content{
      margin: 0 auto;
        display: flex;
        justify-content: space-between;
        width: 80%;
        background-color:#ccc;
        .left{
        width: 100%;
        display: flex;
       /*  justify-content: space-between; */

        .img{
          img{
            width: 25px;
          height: 25px;
           background-color:blue ;
          }
        }
        .img-l{
          flex: 1;
          padding-left: 8px;
       /*     display: flex;
         justify-content: space-between;
         padding-right: 45%; */

        }
        .right{
          width: 60px;

        }

      }
      }
</style>
