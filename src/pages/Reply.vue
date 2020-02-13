<template>
  <div class="reply">
<hm-header>我的跟帖</hm-header>
<van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
      :offset="50"
    >
<div class="reply-info" v-for='item in list' :key='item.id'>
  <p>{{item.create_date |time('YYYY-MM-DD HH:mm') }}</p>
  <div class="parent" v-if="item.parent">
          <p>回复： {{item.parent.user.nickname}}</p>
          <p>{{item.parent.content}}</p>
        </div>
  <p>{{item.content}}</p>
  <p>
原文：  {{item.post.title}}   </p>

</div>
</van-list>
  </div>

</template>

<script>
export default {
  data () {
    return {
      list: [],
      pageIndex: 1,

      pageSize: 5,
      loading: false,
      finished: false
    }
  },
  created () {
    this.getReply()
  },
  methods: {
    async getReply () {
      const res = await this.$axios.get(`/user_comments`, {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = [...this.list, ...data]
        this.loading = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad () {
      setTimeout(() => {
        console.log('到底了，需要加载更多数据了')
        this.pageIndex++

        this.getReply()
      }, 3000)
    }
  }
}
</script>

<style lang='scss' scoped>
.reply{
  .reply-info{
    .parent {
    margin: 10px 0;
    background-color: #ddd;
    padding: 10px;
    border: 5px;}
    border-bottom: 1px solid #ccc
    p{
      overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
    }
  }
}
</style>
