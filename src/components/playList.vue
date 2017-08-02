<template>
  <div class="playList" >
    <header>
      <h2 class="header">歌单</h2>
    </header>
    <div class="playListContain">
      <div class="listCard">
        <img src="" alt="">
        <span></span>
      </div>
      <div class="listItem">

      </div>
    </div>
  </div>
</template>

<script>
import api from '../ajax/api.js';
export default {
  name:'playList',
  data(){
    return{
      listId:this.$route.query.id,
    }
  },
  created(){
    const that = this;
    api.getPlayList(this.listId)
    .then(res=>{
      let data = res.data;
      console.log(data);
    })
  }
}
</script>

<style lang="css">
.playListContain{
  text-align: left;
  overflow:auto;
  background-color: #616161;
  margin:48px 0 52px;
}
</style>
