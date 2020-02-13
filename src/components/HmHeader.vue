<template>
  <div class="hm-header">
<div class="left" @click="$router.back()">
   <i class="iconfont iconjiantou2"></i>
</div>
<div class="center"> <slot></slot> </div>
<div class="right"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
.hm-header{
  line-height: 40px;
  height: 40px;
  text-align: center;
  display: flex;
  background-color: #ccc;
  .left,
  .right{
    width: 40px;
  }
  .center{
    flex: 1;
    font-weight: 700;
    font-size: 16px;
  }
}
</style>
