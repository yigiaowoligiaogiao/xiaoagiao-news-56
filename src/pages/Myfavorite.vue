<template>
<!-- <div >
   <hm-header>我的收藏</hm-header>

       <hm-post v-for="item in list" :key='item.id' :post='item'></hm-post>

</div> -->
<div>
    <hm-header>我的收藏</hm-header>
    <hm-post v-for="item in list" :key="item.id" :post="item"></hm-post>
  </div>

</template>

<script>
import HmPost from '../components/HmPost'
export default {
  components: {
    HmPost
  },
  created () {
    this.getMyfavorite()
  },
  methods: {
    async getMyfavorite () {
      const res = await this.$axios.get(`/user_star`)
      console.log(res)
      const { status, data } = res.data
      if (status === 200) {
        data.forEach(item => {
          item.comment_length = item.comments.length
        })
      }
      this.list = data
    }
  },
  data () {
    return {
      list: []
    }
  }
}
</script>

<style>

</style>
