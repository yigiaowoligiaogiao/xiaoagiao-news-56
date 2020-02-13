 <template>
  <div class="homepage">
    <div class="header">
<div>new</div>
<div>搜索新闻</div>
<div @click="$router.push('/profile')">
<van-icon name="friends-o" />
</div>
    </div>
    <div class="content">
    <van-tabs v-model="active" sticky animated swipeable>
      <van-tab v-for="item in tablist" :key="item.id" :title="item.name">
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
   :offset="50"
>
<hm-post v-for="post in postList" :key='post.id' :post='post'></hm-post>

</van-list>
        </van-pull-refresh>

      </van-tab>
    </van-tabs>
    </div>
  </div>
</template>

<script>
import HmPost from '../components/HmPost'
export default {
  data () {
    return {
      active: localStorage.getItem('token') ? 0 : 1,
      tablist: [],
      pageIndex: 1,
      pageSize: 5,
      loading: false,
      finished: false,
      refreshing: false,
      postList: []
    }
  },
  components: {
    HmPost
  },

  async created () {
    await this.getTabList()
    this.getPostList()
    /* console.log(this.tablist) */
  },
  methods: {
    watch: {
      active (value) {
      // 当切换tab栏的时候，我们把所有的数据都重置成状态
        this.pageIndex = 0
        this.postList = []
        this.finished = false
        this.loading = true
        this.onLoad()
      }
    },
    onLoad () {
      setTimeout(() => {
        this.pageIndex++
        this.getPostList()
      }, 1000)
    },
    async getTabList () {
      const res = await this.$axios.get(`/category`

      )
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        /* data.forEach(item => {
          item.postList = []
          item.pageIndex = 1

          item.finished = false
        }) */
        this.tablist = data
      }
    },
    async getPostList () {
      const id = this.tablist[this.active].id
      const res = await this.$axios.get(`/post`, {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })

      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tablist.postList = [...this.postList, ...data]
        this.loading = false
        this.refreshing = false

        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },

    onRefresh () {
      console.log('下拉刷新了')
      // 重置所有的状态
      this.pageIndex = 0
      this.postList = []
      this.finished = false
      this.loading = true
      this.onLoad()
    }

  }
}
</script>

<style lang='scss' scoped>
.homepage{
  .header{
    height: 45px;
    line-height: 45px;
    display: flex;
    background-color: red;
    color: #fff;
  padding: 10px 0;
    div:nth-child(1){
      font-size: 24px;
      width: 45px;
      padding:  0 10px;
    }
    div:nth-child(2){
      font-size: 24px;
      text-align: center;
      border-radius: 30px;
      flex: 1;
      background-color:  rgba(255,255,255,0.5)
    }
    div:nth-child(3){
      font-size: 24px;
       padding: 0 10px;
    }

  }
}
</style>
