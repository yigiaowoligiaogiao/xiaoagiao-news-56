<template>
  <div class="edit-manager">
      <hm-header>栏目管理</hm-header>
    <div class="content">
      <div class="title">点击删除以下频道（至少保留3个）</div>
      <div class="list">
        <div class="item" v-for="(item, index) in activeTabs" :key="item.id" @click="del(index)">{{item.name}}</div>
      </div>

      <div class="title">点击添加以下频道</div>
       <div class="list">
        <div class="item" v-for="(item, index) in deactiveTabs" :key="item.id" @click="add(index)">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeTabs: [],
      deactiveTabs: []
    }
  },
  created () {
    this.gettabList()
  },
  methods: {
    async gettabList () {
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      console.log(data)

      if (statusCode === 200) {
        this.activeTabs = data
      }
    },
    del (index) {
      if (this.activeTabs.length <= 3) {
        return
      }
      this.deactiveTabs.push(this.activeTabs[index])
      this.activeTabs.splice(index, 1)
    },
    add (index) {
      this.activeTabs.push(this.deactiveTabs[index])
      this.deactiveTabs.splice(index, 1)
    }

  },
  watch: {
    activeTabs () {
      localStorage.setItem('activeTabs', JSON.stringify(this.activeTabs))
      localStorage.setItem('deactiveTabs', JSON.stringify(this.deactiveTabs))
    }
  }
}
</script>

<style lang='scss' scoped>
.edit-manager {
  .content {
    padding: 10px;
  }
  .title {
    color: #888;
    padding: 10px 0;
  }
  .list {
    overflow: hidden;
    .item {
      float: left;
      width: 60px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border: 1px solid #ccc;
      background-color: #ddd;
      margin-right: 8px;
      margin-bottom: 8px;
    }
  }
}
</style>
