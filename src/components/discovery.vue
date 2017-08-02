<template>
  <div class="recommend">
    <div class="swipe" :style="{height:newHeight+'px',}">
      <mt-swipe :auto="3000">
        <mt-swipe-item v-for="item,index in banners" :key="index">
          <img :src="item.pic" alt="">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="cards">
      <mu-flexbox>
        <mu-flexbox-item>
          <keep-alive>
            <router-link
            tag="div"
            class="midBtn"
            to="/fm">
              <div class="midIcon">
                <span>
                  <mu-icon value="radio"></mu-icon>
                </span>
              </div>
              <p>私人FM</p>
            </router-link>
          </keep-alive>
        </mu-flexbox-item>
        <mu-flexbox-item>
          <div class="midBtn">
            <div class="midIcon">
              <span>
                  {{day}}
              </span>
            </div>
            <p>每日推荐</p>
          </div>
        </mu-flexbox-item>
        <mu-flexbox-item>
          <router-link
          tag="div"
          class="midBtn"
          to="/toprank">
            <div class="midIcon">
              <span>
                <mu-icon value="trending_up"></mu-icon>
              </span>
            </div>
            <p>排行榜</p>
          </router-link>
        </mu-flexbox-item>
      </mu-flexbox>
    </div>
    <div class="list">
      <div class="listTitle">
        <span class="sideLine"></span>
        <mu-flat-button label="推荐歌曲" class="listBtn" labelPosition="before" icon="keyboard_arrow_right" color="#fff"/>
      </div>
      <div class="listItems">
        <mu-grid-list :cols="3" :cellHeight="cellHeight*1.4">
          <mu-grid-tile v-for="tile, index in recommendSongs" :key="index" titlePosition="top" titleBarClass="titleBarClass">
            <img :src="tile.picUrl" :style="{height:cellHeight+'px',}"/>
            <div class="itemTitle">
              <p>{{tile.name}}</p>
            </div>
            <span slot="title">{{tile.nowCount}}
              <i class="icon iconfont icon-erji"></i>
            </span>
          </mu-grid-tile>
        </mu-grid-list>
      </div>
    </div>
    <div class="latestMV">
      <div class="listTitle">
        <span class="sideLine"></span>
        <mu-flat-button label="推荐mv" class="listBtn" labelPosition="before" icon="keyboard_arrow_right" color="#fff"/>
      </div>
      <div class="listItems">
        <mu-grid-list :cellHeight="cellHeight*1.4">
          <mu-grid-tile v-for="tile, index in newMV" :key="index" titlePosition="top" titleBarClass="titleBarClass">
            <img :src="tile.picUrl" :style="{height:cellHeight+'px',}"/>
            <div class="itemTitle">
              <p>{{tile.name}}</p>
            </div>
            <span slot="title">
              <i class="icon iconfont icon-video"></i>
              {{tile.nowCount}}
            </span>
          </mu-grid-tile>
        </mu-grid-list>
      </div>
    </div>
  </div>
</template>

<script>
import {  mapMutations, } from 'vuex';
import axios from 'axios';
import api from '../api/index.js'
export default {
  name:'recommend',
  data () {
    return {
      w:document.documentElement.clientWidth,
      newHeight:'',
      cellHeight:'',
      banners:[],
      recommendSongs:[],
      newMV:[],
    }
  },
  methods: {
    ...mapMutations('playing', ['stackSonglist']),
    handleTabChange (val) {
      this.activeTab = val
    },
    toTenThousand(arr){
      arr.forEach(function(e){
        if(e.playCount>100000){
          e.nowCount = Math.floor(e.playCount/10000) + "万";
        }else{
          e.nowCount = Math.floor(e.playCount);
        }
      })
    },
    getFMmusic(){
      api.getFM()
      .then(res=>{
        // if(res.data.code == 200){
          let list = [];
          list.push(...res.data.data);
          this.stackSonglist(list);
          console.log(res);
          alert('可以使用fm');
          // i=5;
        // }
        // else
        // if(i<5){
        //   i++;
        //   //这个后台的api有时候获取歌单失败但是也正常返回
        //   setTimeout(this.getFMmusic(),500);
        // }
        // else{
        //   this.getFMmusic();
        // }
      })
      .catch(error=>{
        console.log(error);
      });
    },
  },
  computed:{
    day(){
      let today = new Date();
      return today.getDate();
    }
  },
  mounted(){
    this.newHeight = this.w*200/540;
    this.cellHeight = (this.w-8)/3;
    const that = this;
    window.onresize = function(){
      that.newHeight = document.documentElement.clientWidth*0.37;
      that.cellHeight = (document.documentElement.clientWidth-8)/3;
    };
    // this.getFMmusic();
  },
  created(){
    let that = this;
    axios.all([api.getBanner(),api.getRecommendSongs(),api.getNewMv(),api.getFM()])
    .then(axios.spread(function(banner,recSong,mv,fm){
      // console.log(banner);
      that.banners=banner.data.banners;
      that.recommendSongs=recSong.data.result;
      that.newMV=mv.data.result;
      that.toTenThousand(that.newMV);
      that.toTenThousand(that.recommendSongs);
      let list = [];
      list.push(...fm.data.data);
      that.stackSonglist(list);
    }))
    .catch(error=>{
      console.log(error);
      alert('网络错误，不能访问');
    })
  },
}
</script>

<style lang="scss" scoped>
  .recommend{
    width: 100%;
    color: $white-base;
    // position: relative;
    // top:96px;
    // background-color: #616161;
    .swipe{
      img{
          width:100%;
      }
    }
    .cards{
      padding-bottom: 10px;
      border-bottom: 1px solid $white-base;
      .midBtn{
        text-align: center;
        .midIcon{
          position: relative;
          width: 48%;
          margin: 10px auto 0;
          height: 0;
          padding-top: 48%;
          border-radius: 50%;
          border: 1px solid $white-base;
          span{
            position: absolute;
            left: 50%;
            top:50%;
            margin-left: -12px;
            margin-top: -12px;
            width: 24px;
            height: 24px;
            line-height: 24px;
            font-size: 20px;
          }
        }
      }
    }
    .list{
      .listTitle{
        position: relative;
        height:36px;
        .sideLine{
          top:4px;
          position: absolute;
          display: inline-block;
          background-color: $red-drak;
          height:24px;
          width:3px;
        }
        .listBtn{
          line-height: 36px;
        }
        .listItems{
          @at-root .itemTitle{
            p{
              width:100%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              font-weight: lighter;
              text-align: left;
            }
          }
        }
      }
    }
  }
</style>
