/* <template>
  <div class="folloe" >
    <div><hm-header>我的关注</hm-header></div>
 <div class='editfollow' v-for='item in list' :key='item.id'>
   <div class="img"><img :src="$axios.defaults.baseURL + item.head_img" alt=""></div>
   <div class="center"><p>{{item.nickname}}</p> <p>{{item.create_date | time}}</p> </div>
   <div class="right">
     <div class="follow-off" @click="unfollow(item.id)">取消关注</div>
   </div>
 </div>
  </div>
</template>

<script>
export default {

  data () {
    return {
      list: []
    }
  },
  created () {
    this.getlist()
    /* this.follow(1)
    this.follow(2)
    this.follow(3)
    this.follow(4)
    this.follow(5)
    this.follow(6)
    this.follow(7)
    this.follow(8)
    this.follow(9) */
  },
  methods: {
    async getlist () {
      const res = await this.$axios.get(`/user_follows`)

      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    },
    async unfollow (id) {
      try {
        await this.$dialog.confirm({
          title: '提示',
          message: '你确定要取关该用户吗'
        })
        const res = await this.$axios.get(`/user_unfollow/${id}`)
        console.log(res)
        const { statusCode } = res.data
        if (statusCode === 200) {
          this.$toast('取消成功')
          this.getlist()
        }
      } catch {
        this.$toast('取消操作')
      }
    }
  }

}

</script>

<style lang='scss' scoped>
.editfollow{
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #cccccc;
  .img {
 padding-top: 10px;
    img{

      width: 60px;
    height: 60px;
    border-radius: 30px;
    }
  }
  .center{
    flex: 1;
    padding-left: 10px;
  }
  .right{
      padding-top: 20px;
    height: 60px;
    line-height: 60px;

    .follow-off{

      height: 30px;
      line-height: 30px;
      text-align: center;
     padding: 0 5px;
      background-color: aqua;
      border-radius: 15px;
    }
  }
}
</style>
 */
