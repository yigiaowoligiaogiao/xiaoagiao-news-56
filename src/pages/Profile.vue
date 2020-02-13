<template>
  <div class="hm-profile">
   <div class="user-info" @click="$router.push('/edit-profile')">
      <div class="avatar">
       <!--  <img v-show='loading' :src="avatar" alt=""> -->
      </div>
      <div class="info">
        <p>
          <i v-if="profile.gender===1" class="iconfont iconxingbienan"></i>
           <i v-else class="iconfont iconxingbienv"></i>
          <span>{{profile.nickname}}</span>
        </p>
        <p>{{profile.create_date | time}}</p>
      </div>
      <div class="icon">
        <i class="iconfont iconjiantou1"></i>
      </div>
    </div>
    <div class="list">
      <hm-nav name="我的关注" desc="关注的用户" @click="$router.push('/Follow')"></hm-nav>
      <hm-nav name="我得跟帖" desc="跟帖/回复" @click="$router.push('/Reply')"></hm-nav>
      <hm-nav name="我的收藏" desc="文章/视频" @click='$router.push("/Myfavorite")'></hm-nav>
      <hm-nav name="设置" @click="$router.push('/EditProfile')"></hm-nav>
       <hm-nav name="自定义栏目" @click="$router.push('/edit-manager')"></hm-nav>
       <hm-nav name="推出" @click='logout'></hm-nav>
       <hm-nav name= '返回首页' @click="$router.push('/')"></hm-nav>
    </div>
  </div>
</template>

<script>
import img from '../avatar/timg.jpg'
export default {

  computed: {
    avatar () {
      if (this.profile.head_img) {
        return this.$axios.defaults.baseURL + this.profile.head_img
      } else {
        return img
      }
    }
  },
  data () {
    return {
      profile: {},
      loading: false
    }
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '你确定要退出本系统吗?'
        })
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        this.$router.push('/login')
        this.$toast.success('推出成功')
      } catch {
        this.$toast('操作取消')
      }
    }
  },
  async created () {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('user_id')
    const res = await this.$axios.get(`/user/${userId}`, {
      headers: {
        Authorization: token
      }
    })

    this.profile = res.data.data
    this.loading = true
  }
}

</script>

<style lang='scss' scoped>
.hm-profile {
  .user-info {
    padding: 20px;
    display: flex;
    border-bottom: 5px solid #ccc;
    .avatar {
      width: 70px;
      height: 70px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        margin-top: 15px;
      }
    }
    .icon {
      width: 30px;
      i {
        line-height: 70px;
      }
    }
    .info {
      flex: 1;
      margin-left: 10px;
      p:first-child {
        height: 30px;
        line-height: 30px;
        font-size: 18px;
        color: #000;
      }

      p:last-child {
        font-size: 14px;
        color: #999;
      }
      .iconxingbienan {
        color: rgb(171, 213, 242);
      }
       .iconxingbienv {
        color: red;
      }
    }
  }
  .list {
    padding: 0 20px;
  }
}
</style>
