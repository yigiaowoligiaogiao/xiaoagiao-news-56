<template>
  <div class="search">
  <div class="header">
    <div class="left" @click="back">
       <i class="iconfont iconjiantou"></i>
    </div>
    <div class="center">
       <i class="iconfont iconsearch"></i>
      <input type="text" placeholder="搜索" v-model="keyword">
    </div>
    <div class="right" @click="getSearchList">搜索</div>
    </div>
    <div v-if="postList.length>0">
      <hm-post v-for="item in postList" :key='item.id' :post = item></hm-post>
    </div>
    <div class="history" v-else>
      <h3>历史记录</h3>
      <div class="record">
      <ul>
        <li v-for="item in history" :key='item' @click="hotSearch(item)">{{item}}</li>
      </ul>
    </div>
    <div class="hot-search">
    <h3>热门搜索</h3>
    <ul>
      <li v-for="item in hotKeys" :key='item' @click="hotSearch(item)">{{item}}</li>

    </ul>
    </div>
    </div>

  </div>

</template>

<script>
import HmPost from '../components/HmPost'
export default {
  components: {
    HmPost
  },
  created () {
    /*  this.getSearchList() */
  },
  data () {
    return {
      keyword: '',
      postList: [],
      hotKeys: ['说好不哭', '王祖贤', '性感', '关晓彤'],
      history: JSON.parse(localStorage.getItem('history')) || []
    }
  },
  methods: {
    async  getSearchList () {
      console.log('框内容', this.keyword)

      const res = await this.$axios.get(`/post_search`, {
        params: {
          keyword: this.keyword
        }
      })
      /*  const res = await this.$axios.get(`/post_search`, {
        params: {
          keyword: this.keyword
        }
      }) */
      console.log('数据', res)
      /*
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.postList = data
        console.log(this.postList)

        this.history = this.history.filter(item => item !== this.keyword)
        this.history.unshift(this.keyword)
        localStorage.setItem('history', JSON.stringify(this.history))
      } */
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.postList = data

        // 在搜索成功的时候，把关键字存储到history数组中
        // 先把老的关键给删除掉
        this.history = this.history.filter(item => item !== this.keyword)
        this.history.unshift(this.keyword)
        // 把history存储到localStorage中
        localStorage.setItem('history', JSON.stringify(this.history))
      }
    },
    hotSearch (item) {
      this.keyword = item
      this.getSearchList()
      console.log('关键字', this.keyword)
    },
    back () {
      if (this.keyword) {
        this.keyword = ''
      } else {
        this.$router.back()
      }
    }
  },
  watch: {
    keyword (value) {
      if (value === '') {
        this.postList = []
      }
    }
  }
}
</script>

<style lang='scss' scoped>
    .search{
      .header{
        display: flex;
        height: 45px;
        line-height: 45px;
        .left{
          width: 30px;
          text-align: center;
        }
        .center{
          flex: 1;
          width: 100%;
         text-align: center;
         height: 30px;
         display: flex;
        margin-top: 5px;
        padding-right: 15px;
         border-radius:15px;
          border: 1px solid #ccc;
         .iconfont {
          padding-left: 5px;
        line-height: 30px;
      /*   text-align: center; */
      }
         input{
           flex: 1;
           border-radius:0 15px 15px 0;
        /*   border: 1px solid #ccc; */
           border: none;
           text-indent: 8px;

         }

        }
        .right{
          width: 50px;
          text-align: center;
        }
      }
      .history{
     /*    height: 60px;
        line-height: 60px; */
      padding: 0 10px;
        margin-top: 20px;
        h3{
           width: 100%;
        font-size: 16px;
        font-weight: 700;
        }
         .record{

      }
       ul{
         overflow: hidden;
          li{
            float: left;
             height: 30px;
           line-height: 30px;
           font-size: 14px;
            font-weight: 300;
            padding: 0 5px;
          }
        }
      }

    }
</style>
