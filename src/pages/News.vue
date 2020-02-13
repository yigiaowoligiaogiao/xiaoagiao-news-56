<template>
  <div class="news">
  <div class="header">
   <div class="left">

     <div class="jian" @click="$router.back()">   <van-icon name="arrow-left" /> </div>
    <div>new</div>
   </div>
   <div class="right">
     <div v-if="post.has_follow" @click="unfollow">已关注</div>
     <div v-else @click='follow'>关注</div>
   </div>
 </div>
  <div class="center">
    <p>{{post.title}}</p>
      <div class="post-info">
        <span>{{post.user.nickname}}</span>
        <span>{{post.create_date | time}}</span>
      </div>
       <div  class="video" v-if='post.type===2' >
      <video :src="post.content" controls></video>
    </div>
    <div v-else v-html="post.content"></div>
 </div>

    <div class="bottom">
     <div @click="like" > <span><van-icon :class="{like:post.has_like}" name="good-job-o" /></span> <span>{{post.like_length}}</span></div>
     <div> <span><van-icon name="chat-o" /></span> <span>微信</span></div>
   </div>

   <div class="comments">

      <hmcommonts
      v-for="item in commentList"
       :key='item.id'
        :comment='item'
        @reply='reply'>
        </hmcommonts>
   </div>
   <div class="footer">
     <div class="comment-input" v-show="!isFocus">
       <input type="text" placeholder="写跟帖" @click="handleFocus">
      <div class="icon-comment">
        <i class="iconfont iconpinglun-"></i>
        <span class="num">12</span>
      </div>
      <i class="iconfont iconshoucang" @click = 'start' :class="{star:post.has_star}"></i>
      <i class="iconfont iconfenxiang"></i></div>
      <div class="comment-textarea" v-show="isFocus">
        <textarea  ref='textarea' cols="3" placeholder="回复" rows="10" @blur="handleBlur" v-model="content"></textarea>
         <div class="send" @click='send'>发送</div>
      </div>
   </div>
  </div>
</template>

<script>
import Hmcommonts from '../components/Hmcommonts'
export default {
  data () {
    return {
      post: {
        user: {}
      },
      isFocus: false,
      commentList: [],
      content: '',
      parent_id: ''
    }
  },
  components: {
    Hmcommonts
  },
  created () {
    this.getNews()
    this.getComments()
  },
  methods: {
    async send () {
      this.isFocus = true
      const id = this.post.id
      const res = await this.$axios.post(`/post_comment/${id}`, {
        content: this.content,
        parent_id: this.parentId
      })

      console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.isFocus = false
        this.getComments()
        this.content = ''
        this.parentId = ''
      }
    },

    async getComments () {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_comment/${id}`)

      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
        console.log(this.commentList)
      }
    },

    async getNews () {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post/${id}`)

      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.post = data
      }
    },
    async unfollow () {
      const id = this.post.user.id
      const res = await this.$axios.get(`/user_unfollow/${id}`)

      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success('取消关注')
        this.post.has_follow = false
      }
    },
    async follow () {
      const id = this.post.user.id
      const res = await this.$axios.get(`/user_follows/${id}`)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success('关注成功')
        this.post.has_follow = true
      }
    },
    async like () {
      const id = this.post.id
      const res = await this.$axios.get(`/post_like/${id}`)

      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getNews()
      }
    },
    async handleFocus () {
      this.isFocus = true
      await this.$nextTick()
      this.$refs.textarea.focus()
    },
    handleBlur () {
      if (this.content) {
        return
      }
      this.isFocus = false
    },
    async start () {
      const id = this.post.id
      const res = await this.$axios.get(`/post_star/${id}`)

      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
      }
    },
    async reply (id) {
      this.parentId = id
      this.isFocus = true
      await this.$nextTick()
      this.$refs.textarea.focus()
    }
    /* , watch: {
      $route () {
      // 监听路由的变化，如果地址改变了，重新获取数据
        this.getNews()
      }
    } */

  }
}
</script>

<style lang = 'scss' scoped>
    .news{
       border-bottom: 3px solid #cccccc;
      width: 100%;
       .center{
        width: 100%;
        padding: 0 10px;
        .video{
                  width: 100%;

                }
        .post-info{
          margin-bottom: 10px;
          span:nth-child(2){padding-left: 5px;}
        }
        p{
          font-size: 14px;
          font-weight: 700;
        }
      }
     .header{

        width: 100%;
      height: 45px;
      line-height: 45px;
      background-color: #ccc;
      display: flex;
      justify-content: space-between;

      .left{
        width: 40px;
         display: flex;
      justify-content: space-between;
      font-size: 30px;

      .jian{
        padding-top: 5px;
      }

      }.right{

        width: 40px;
        height: 20px;
        line-height: 20px;
        border: 1px solid #ccc;
        text-align: center;
        border-radius: 10px;
        background-color: aqua;
        margin-top: 15px;
        margin-right: 10px;
      }
     }
     .bottom{

         display: flex;
      justify-content: space-between;
      padding: 10px 10px;
      border-bottom: 3px solid red;
      div{
        width: 70px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        border: 1px solid #000;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        padding: 0 8px;
        span:nth-child(1){
          padding-top: 3px;
          .like {
      color: red;
      border-color: red;
         }
       }
      }
    }

    .comments{
    width: 100%;
    height: 60px;
    margin-bottom: 30px;
     }
     .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px 0;
    background-color: #fff;
    .comment-input {
      display: flex;
      justify-content: space-around;
      align-items: center;
      input {
        width: 180px;
        height: 30px;
        background-color: #ddd;
        border-radius: 15px;
        padding-left: 20px;
      }
      .iconfont {
        font-size: 24px;
      }
      .star {
        color: red;
      }
      .icon-comment {
        position: relative;
        .num {
          position: absolute;
          background-color: red;
          height: 20px;
          line-height: 20px;
          color: #fff;
          padding: 0 10px;
          border-radius: 10px;
          right: -20px;
          top: -4px;
        }
      }
    }

  .comment-textarea {
      display: flex;
      width: 100%;
      padding: 0 20px;
      justify-content: space-between;
      align-items: flex-end;
      textarea {
        background-color: #ddd;
        width: 240px;
        height: 70px;
        border-radius: 10px;
        padding: 10px;
      }
      .send {
        width: 60px;
        height: 26px;
        line-height: 26px;
        background-color: red;
        color: #fff;
        text-align: center;
        border-radius: 13px;
      }
    }
}
    }
</style>
