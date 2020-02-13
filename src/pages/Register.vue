<template>
  <div class="register">
    <div class="close"  @click="$router.go(-1)">
      <i class="iconfont iconicon-test"></i>
    </div>
    <div class="logo">
      <i class="iconfont iconnew"></i>
    </div>
    <div class="username">
      <hm-input  placeholder="亲输入用户名" v-model="form.username" :rules='/^1\d{4,9}$/' err-msg='你输入的东西有误'></hm-input>
    </div>
    <div class="nickname">
    <hm-input placeholder="昵称" v-model="form.nickname" :rules="/^[\u4e00-\u9fa5]{3,8}$/" err-msg=
      "昵称只能是3-8位的中文哟"></hm-input>
    </div>
    <div class="password">
    <hm-input type="password" placeholder="请输入密码" v-model="form.password" :rules='/^\d{3,9}$/' err-msg='你输入的东西有误'></hm-input>

    </div>
    <div class="register-btn">
      <van-button type='danger' size='large' round @click = 'register'>注册</van-button>
    </div>
    <div class="go-register">
      已有账号？立即 <router-link to='/login'>登录</router-link>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      form: {
        username: '',
        password: '',
        nickname: ''
      }
    }
  },
  methods: {
    async register () {
      const res = await this.$axios.post('/register', this.form)
      if (res.data.statusCode === 400) {
        this.$toast.fail('用户名已经存在')
      } else {
        this.$toast.success('注册成功')
        this.$router.push({
          name: 'login',
          params: {
            username: this.form.username,
            password: this.form.password
          }
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.register {
  padding: 20px;
  .close {
    i {
      font-size: 27px;
    }
  }
  .logo {
    text-align: center;
    i {
      font-size: 126px;
      color: #d81e06;
    }
  }
  .register-btn {
    margin-top: 30px;
  }

  .go-register {
    text-align: center;
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    margin-top: 10px;
  }
}

</style>
