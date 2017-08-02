<template >
  <div class="page">
    <header>
      <mu-appbar class="head">
        <mu-icon-button
        @click="$router.go(-1)"
        slot="left"
        style="width:42px;height:42px;">
          <i class='icon iconfont icon-mjiantou-copy'></i>
        </mu-icon-button>
        <div class="title">
          排行榜
        </div>
        <mu-icon-button slot="right">
          <i class='icon iconfont icon-z-list'></i>
        </mu-icon-button>
      </mu-appbar>
    </header>
    <div class="pageContent mainContain">
      <mu-flexbox orient="vertical">
        <mu-flexbox-item class="itemContain" v-for='item,index in topList' :key="index">
          <div class="imgFlex">
            <img :src="item.coverImgUrl" alt="">
          </div>
          <div class="listFlex">
            <div class="centerList">
              <ul>
                <li>1.{{item.tracks[0].name}}</li>
                <li>2.{{item.tracks[1].name}}</li>
                <li>3.{{item.tracks[2].name}}</li>
              </ul>
            </div>
          </div>
        </mu-flexbox-item>
      </mu-flexbox>
    </div>
    <div class="bottomNav">
      <mu-bottom-nav
        value="bottomNav"
        shift
        >
        <mu-bottom-nav-item
          value="discovery"
          title="Discovery"
          to="/discovery"
          icon="all_inclusive"/>
        <mu-bottom-nav-item
          value="music"
          title="Music"
          to="/music"
          icon="music_note"/>
        <mu-bottom-nav-item
          value="friend"
          title="Friend"
          to="/friend"
          icon="supervisor_account"/>
      </mu-bottom-nav>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import api from '../api/index.js';

export default {
  name:'topTen',
  data(){
    return{
      billboard:{},
      itunes:{},
      hkTaiwan:{},
      china:{},
      hkRadio:{},
      topList:[],
    }
  },
  created(){
    let that = this;
    axios.all([api.getTopten(6),api.getTopten(8),api.getTopten(14),api.getTopten(15),api.getTopten(16)])
    .then(axios.spread(function(_billboard,_itunes,_hkTaiwan,_china,_hkRadio){
      // console.log(_billboard);
      that.billboard = _billboard.data.result;
      that.itunes = _itunes.data.result;
      that.hkTaiwan = _hkTaiwan.data.result;
      that.china = _china.data.result;
      that.hkRadio = _hkRadio.data.result;
      that.topList = [that.billboard,that.itunes,that.hkTaiwan,that.china,that.hkRadio];
      console.log("加载完成了");
    }))
    .catch(error=>{
      console.log(error);
      alert('网络错误，不能访问');
    });
  },
  updated(){
    console.log(this.topList);
  },
}
</script>

<style lang='scss' scoped>
  .head{
    box-shadow: none!important;
    background-color: transparent!important;
    .icon-mjiantou-copy,
    .icon-z-list{
      color: $gray-line-default;
      font-size: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .title{
      height: $header-height;
      width:70%;
      margin:0 auto;
      font-weight: 300;
      text-align: center;
      line-height: $header-height;
      }
    }
  .mainContain{
    margin-left: 2px;
    color: $white-base;
  }
  .itemContain{
    display: flex;
  }
  .imgFlex{
    display: flex;
    flex:1;
    align-items: center;

    /*background-color: red;*/
  }
  img{
    width:100%;
  }
  .listFlex{
    display: flex;
    flex:2;
    background-color:rgba(0,0,0,.2);
    align-items: center;

    /*justify-content: center;*/
  }
  .centerList{
    margin-left: 10px;
  }
</style>
