<template >
  <div class="page">
    <div class="pageContent">
      <div class="unlogin" v-if="uid">
        登录以查看你的音乐列表
      </div>
      <mu-list>
        <mu-list-item title="我创建的歌单" toggleNested :open="false">
          <!-- <keep-alive> -->
            <mu-list-item slot="nested" :title="item.name" titleClass="titleClass" v-for="item,index in favorList" :key='index' @click.native="toPlayList(item.id)">
              <mu-avatar :src="item.coverImgUrl" slot="leftAvatar" ></mu-avatar>
            </mu-list-item>
          <!-- </keep-alive> -->
        </mu-list-item>
        <mu-divider />
        <mu-list-item title="我收藏的歌单" toggleNested :open="false">
          <mu-list-item slot="nested" :title="item.name" v-for="item,index in collectList" :key='index' @click.native="toPlayList(item.id)">
            <mu-avatar :src="item.coverImgUrl" slot="leftAvatar" ></mu-avatar>
          </mu-list-item>
        </mu-list-item>
      </mu-list>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import api from '../../ajax/api.js'
export default {
  name:'songsList',
  data(){
    return{
      favorList:[],
      collectList:[],
      uid:this.$store.state.userId,
    }
  },
  methods:{
    toPlayList(id){
      let url = "/playList?id=" + id;
      this.$router.push(url);
    }
  },
  created(){
    if(this.uid){
      const that = this;
      api.getFavorList(this.uid)
      .then(res=>{
        console.log(res.data);
        let playList = res.data.playlist;
        playList.forEach(function(e){
          if (e.userId == that.uid) {
            // console.log(that.collectList[0].name);
            that.favorList.push(e);
            console.log(2);
          } else {
            that.collectList.push(e);
          }
        })
      })
      .catch(error=>{
        alert('error');
        console.log(error);
      })
    }
  },
}
</script>

<style>
  .mu-item{
    color:#fff;
    border-bottom: 1px solid rgba(0,0,0,0.23);
  }
  .mu-item-svg-icon{
    color:#fff;
  }
  .songsContain{
    height: 100%;
    width: 100%;
    /*overflow: hidden;*/
  }
  .header{
    z-index: 4;
    position: absolute;
    top:0;
    font-size: 20px;
    width:100%;
    height: 48px;
    background-color: #474a4f;
    color:#fff;
    line-height: 48px;
  }
  .listContain{
    text-align: left;
    overflow:auto;
    background-color: #616161;
    margin:48px 0 52px;
  }
</style>
