<template>
  <div class="input_box">
    <input :type="type" :placeholder="placeholder" class='hm-input' :value="value" @input='handleinput'
    :class="[stauts]"
    >
    <span class="tips" v-show='showTips'>{{errMsg}}</span>
  </div>
</template>

<script>
export default {

  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    rules: {
      type: RegExp
    },
    errMsg: {
      type: String
    }
  },
  data () {
    return {
      stauts: ''
    }
  },
  computed: {
    showTips () {
      return this.stauts === 'error' && this.errMsg
    }
  },
  methods: {
    handleinput (e) {
      const { value } = e.target
      this.$emit('input', value)
      if (!this.rules) {
        return
      }
      if (this.rules.test(value)) {
        this.stauts = 'success'
      } else {
        this.stauts = 'error'
      }
    }
  }
}

</script>

<style lang='scss' scoped>
  .input_box {
    padding-bottom: 15px;
    position: relative;
    .hm-input{
      width: 100%;
      height: 38px;
      background-color: transparent;
      border-bottom: 1px solid #666;
      font-size: 18px;

      &.error {
        border-color:red;
      }
      &.success {
         border-color:green;
      }
    }
    .tips {
      color:red;
      position: absolute;
      bottom: 0;
      left:0;
    }
  }
</style>
