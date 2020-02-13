<template>
<div @click='$router.push(`/news/${post.id}`)'>
  <div class="my-favorite-img" v-if='post.type === 2'>

        <div  class="top">{{post.title}}</div>

      <div class='center'>
       <img :src="post.cover[0].url" alt="">
       <van-icon class="play" name="play-circle-o" />

      </div>
      <div class="bottom">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
      </div>
    </div>

   <div class="my-favorite" v-else-if='post.cover.length<3'>
      <div class="left">
        <p>{{post.title}}</p>
        <div class="left-b">
          <span>{{post.user.nickname}}</span>
          <span>跟帖{{post.comment_length}}</span>
        </div>
      </div>
      <div class='right'>
        <img :src="post.cover[0].url" alt="">
      </div>
    </div>

     <div class="my-favorite-three" v-else>
      <div class="top">
        <p>{{post.title}}</p>
         <div class='center'>
        <div class="img"><img v-for='item in post.cover' :key=item.id :src="item.url" alt=""></div>
      </div>
        <div class="bottom">
          <span>{{post.user.nickname}}</span>
          <span>{{post.comment_length}}跟帖</span>
        </div>
      </div>

    </div>

</div>
</template>

<script>
export default {
  props: {
    post: Object

  }
}
</script>

<style lang='scss' scoped>
.my-favorite{
  display: flex;
  justify-content:space-between;
  padding: 10px 10px;
  border-bottom: 2px solid #ccc;

  .left-b{
    display: flex;
  justify-content:space-between;
  padding-top: 5px;

  }
  .right{
    width: 60px;
    height: 60px;
img{
  width: 60px;
  height: 60px;
  text-align: center;
}
  }

}
.my-favorite-img{
  padding: 5px;
  .top{
    padding: 7px ;
  }
.center{
  position: relative;

    text-align: center;

  img{
   /*  padding: 20px; */

    width:100%;

  }
  .play{
  position: absolute;
  top: 50%;
  left:50%;
  transform: translate(-50%,-50%);
  color: #fff;
  font-size: 50px;
 }
}
.bottom{
padding: 5px;
border-bottom: 2px solid #ccc;
 display: flex;
justify-content:space-between;
}

}
.my-favorite-three{
  padding: 10px;
  border-bottom: 2px solid #ccc;
  .center{
  display: flex;
  /* justify-content: space-around; */
    .img{
        flex: 1;
      text-align: center;

      img{
         width:31%;
      height: 74px;
      object-fit: cover;
        padding: 3px;
      }

    }
  }
  .bottom{
    display: flex;
    justify-content:space-between;
  }
  }
</style>
