<template>
  <div class="login">
    <div class="close" @click = '$router.go(-1)'>
      <i class="iconfont iconicon-test"></i>
    </div>
    <div class="logo">
      <i class="iconfont iconnew"></i>
    </div>
    <div class="username">
      <hm-input  placeholder="亲输入用户名" v-model="username" :rules='/^1\d{4,9}$/' err-msg='你输入的东西有误'></hm-input>
    </div>
    <div class="password">
    <hm-input type="password" placeholder="请输入密码" v-model="password" :rules='/^\d{3,9}$/' err-msg='你输入的东西有误'></hm-input>
    </div>
    <div class="btn">
      <div>
      <hm-btn @click='login'> <router-link to='profile'> 登录</router-link></hm-btn>
      </div>
      <div class="go-register">
       没有账号去 <router-link to='/register'>注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import HmInput from '../components/HmInput.vue'
import HmBtn from '../components/HmBtn.vue'

import axios from 'axios'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  created () {
    const { username, password } = this.$route.params
    this.username = username
    this.password = password
  },
  components: {
    HmInput,
    HmBtn
  },
  methods: {
    async login () {
      if (!this.username || !this.password) return
      const res = await axios.post('http://localhost:3000/login', {
        username: this.username,
        password: this.password

      })
      if (res.data.statusCode === 401) {
        this.$toast.fail('用户名错误')
      } else {
        const { token, user } = res.data.data
        localStorage.setItem('token', token)
        localStorage.setItem('user_id', user.id)
        this.$toast.success('成功')
        this.$router.push('/homepage')
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.login{
   padding: 20px;

   .logo{
      width: 100%;
      margin: 0 auto;
        text-align: center;
     i{
       margin: 0 auto;
       font-size: 120px;
       color: red;

     }
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
