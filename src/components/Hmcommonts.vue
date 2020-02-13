<template>
  <div class="commonts">
    <div class="title"></div>
    <div class="content">
      <div class="left">
       <div class="img">
         <img :src="$axios.defaults.baseURL + comment.user.head_img" alt="">
       </div>
      <div class="img-l">
        <div >{{comment.user.nickname}} </div>
        <div> {{comment.create_date |time('YYYY-MM-DD') }}</div>
      </div>
      <div class="right" @click='reply(comment.id)'>回复</div>
    </div>

    </div>
  <floor v-if="comment.parent" :index='index' :comment="comment.parent" @reply='reply'></floor>

    <div class="content">{{comment.content}}</div>
  </div>
</template>

<script>
import Floor from './Floor'
export default {
  created () {
    /* console.log('父级数据', this.comment) */
  },
  components: {
    Floor
  },
  data () {
    return {
      index: this.getLength(1, this.comment)
    }
  },
  props: {
    comment: Object
  },
  methods: {
    getLength (num, comment) {
      if (comment.parent) {
        return this.getLength(num + 1, comment.parent)
      } else {
        return num
      }
    },
    reply (id) {
      this.$emit('reply', id)
    }
  }
}
</script>

<style lang='scss' scoped>
 .commonts{
   margin-bottom: 50px;
      width: 100%;
     padding: 10px;
      .title{
       text-align: center;
      }
     .content{
        display: flex;
        justify-content: space-between;
        .left{
        width: 100%;
        display: flex;
       /*  justify-content: space-between; */

        .img{
          img{
            width: 25px;
          height: 25px;
         /*  background-color: red; */
          }
        }
        .img-l{
          flex: 1;
          padding-left: 8px;
        }
        .right{
          width: 60px;
        color: green;
        }

      }
     }
    }
</style>
