<template>
  <div class="edit-profile">
    <hm-header>编辑资料</hm-header>

    <div class="box">
    <div class="avatar">
      <img :src="avatar" alt="">
      <van-uploader :after-read="afterRead" />
    </div>
    <hm-nav name='昵称' :desc='profile.nickname' @click='iShowname'>

    </hm-nav>
   <van-dialog  v-model="shownickname" title="修改昵称" show-cancel-button @confirm="editnickname">
   <van-field v-model="nickname" placeholder="请输入昵称" />
    </van-dialog>

    <hm-nav name='密码' desc='******' @click="iShowpassword"></hm-nav>
    <van-dialog v-model="showpassword" title="修改密码" show-cancel-button @confirm="editpassword">
    <van-field v-model="password" placeholder="请输入密码" />
    </van-dialog>
    <hm-nav @click="iSgender" name='性别' :desc="profile.gender === 1 ? '男' : '女'"></hm-nav>
     <van-dialog v-model="showgender" title="修改性别"  show-cancel-button @confirm=" editgender">
    <van-radio-group v-model="gender" >
   <van-cell-group>
    <van-cell title="男" clickable @click="gender = 1">
      <van-radio slot="right-icon" :name="1" />
    </van-cell>
    <van-cell title="女" clickable @click="gender = 0">
      <van-radio slot="right-icon" :name="0" />
    </van-cell>
    </van-cell-group>
    </van-radio-group>
    </van-dialog>

    </div>

    <div id="cropper" v-if=" iShowloading">
    <VueCropper
      ref="cropper"
      :img=" option.img"
      :info="option.info"
      :outputSize="option.outputSize"
      :outputType="option.outputType"
      :canMove="option.canMove"
      :autoCrop="option.autoCrop"
      :autoCropWidth="option.autoCropWidth"
      :autoCropHeight="option.autoCropHeight"
      :fixedBox="option.fixedBox"
      :original="option.original"
      :infoTrue="option.infoTrue"
      :centerBox="option.centerBox"
      :canMoveBox="option.canMoveBox"
      :canScale="option.canScale"
      :fixed="option.fixed"
      :fixedNumber="option.fixedNumber"
    ></VueCropper>
<div class="src">
  <span><van-button type="primary" @click='crop'>开始截图</van-button></span>
<span><van-button type="danger" @click='Showloading=false'>取消</van-button></span>
</div>
    </div>
    </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
/* import { Img } from '../avatar/timg (1).jpg' */
export default {
  components: { VueCropper },
  data () {
    return {
      profile: {},
      iShowloading: false,
      loading: false,
      nickname: '',
      shownickname: false,
      showpassword: false,
      showgender: false,
      password: '',
      gender: 0,
      option: {
        img: '', // 这个img应该要是上传的那张图片，只不过现在我写死了
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 150, // 默认生成截图框宽度
        autoCropHeight: 150, // 默认生成截图框高度
        fixed: false, // 是否开启截图框宽高固定比例
        fixedNumber: [4, 4] // 截图框的宽高比例
      }

    }
  },
  computed: {
    avatar () {
      if (this.profile.head_img) {
        return this.$axios.defaults.baseURL + this.profile.head_img
      } else {
        return ''
      }
    }
  },

  methods: {
    iShowname () {
      this.shownickname = true
      this.nickname = this.profile.nickname
    },
    iShowpassword () {
      this.showpassword = true
      this.password = this.profile.password
    },
    iSgender () {
      this.showgender = true
      this.gender = this.profile.gender
    },
    async  getProfile () {
      const userId = localStorage.getItem('user_id')

      const res = await this.$axios.get(`/user/${userId}`)
      this.profile = res.data.data
      this.loading = true
    },
    async editProfile (data) {
      const id = localStorage.getItem('user_id')
      const res = await this.$axios.post(`/user_update/${id}`, data)
      if (res.data.statusCode === 200) {
        this.$toast.success(res.data.message)
        this.getProfile()
      }
    },
    editnickname () {
      this.editProfile({ nickname: this.nickname })
    },
    editpassword () {
      this.editProfile({ password: this.password })
    },
    editgender () {
      this.editgender({ gender: this.gender })
    },

    async afterRead (file) {
      this.iShowloading = true
      console.log(file)
      this.option.img = file.content
      /*  const fd = new FormData()
      fd.append('file', file.file)
      const res = await this.$axios.post('/upload', fd

      )
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.editProfile({ head_img: data.url })
      } */
    },
    crop () {
      this.$refs.cropper.getCropData(async agiao => {
        // do something
        /* console.log(agiao) */
        const file = this.convertBase64UrlToBlob(agiao)
        const fd = new FormData()
        fd.append('file', file)
        const res = await this.$axios.post('/upload', fd)
        /* console.log(res) */
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.editProfile({ head_img: data.url })
          this.iShowloading = false
        }
      })
    },

    convertBase64UrlToBlob (urlData) {
      let bytes = window.atob(urlData.split(',')[1])// 去掉url的头，并转换为byte
      // 处理异常,将ascii码小于0的转换为大于0
      let ab = new ArrayBuffer(bytes.length)
      let ia = new Uint8Array(ab)
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
      }
      return new Blob([ab], { type: 'image/jpeg' })
    }

  },

  async created () {
    this.getProfile()
  }
}
</script>

<style lang='scss' scoped>
.edit-profile{

position: relative;
  .box {
  padding: 0 20px;
  .avatar {
    padding: 30px 0;
  text-align: center;
    img {
      width: 70px;
      height: 70px;

      border-radius: 50%;
    }
    .van-uploader {
      position: absolute;
      top: 45px;
      left: 50%;
      transform: translateX(-50%);
       opacity: 0;

    }
  }
}
#cropper {
  margin: 0 auto;
   height:100%;
  width: 100%;
  position: relative;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

 .src{
   width: 100%;
 position: fixed;
  top: 0;
left: 0;
  /* transform: translateX(-50%); */
  display: flex;

  justify-content:space-between;
    span:first-child{

  }
  span:last-child{

  }
 }
}

}
</style>
