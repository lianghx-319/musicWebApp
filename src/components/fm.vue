<template lang="html">
  <div class="page playingContain">
    <header>
      <mu-appbar class="head">
        <mu-icon-button
        @click="$router.go(-1)"
        slot="left"
        style="width:42px;height:42px;">
          <i class='icon iconfont icon-mjiantou-copy'></i>
        </mu-icon-button>
        <div class="title">
          <div class="songName" ref="songName">
            <span ref="rollName">{{this.songName}}</span>
          </div>
          <div class="singer">
            <span>{{this.artists}}</span>
          </div>
        </div>
        <mu-icon-button slot="right">
          <i class='icon iconfont icon-z-list'></i>
        </mu-icon-button>
      </mu-appbar>
    </header>
    <div class="ablumWrapper">
      <img
      class="cover"
      :src="this.ablumImgUrl" alt="">
    </div>
    <footer>
      <div class="timer">
        <span>{{ playingCurrent | timeFormat }}</span>
        <div class="progress" ref="progress">
          <div
          :style="{width: playingPrgress*100 + '%'}"
          class="progress-bar" ></div>
          <span
          @touchstart="startPrune"
          @touchmove="movePrune"
          @touchend="endPurne"
          :style="{left: playingPrgress*100 + '%'}"
          class="progress-ball"></span>
        </div>
        <span>{{ playTiming	| timeFormat }}</span>
      </div>
      <div class="playControl">
        <img class="collectIcon" src="../../static/icon/collect.png">
        <img
        v-if="playingState == 'pause'"
        class="playIcon"
        src="../../static/icon/play.png"
        @click="pause(playingState == 'pause' ? '' : 'pause')"
        >
        <img
        v-else
        @click="pause(playingState == 'pause' ? '' : 'pause')"
        class="pauseIcon"
        src="../../static/icon/pause.png"
        >
        <img
        @click="nextSong()"
        class="nextIcon" src="../../static/icon/pre_r.png">
      </div>
    </footer>
    <div class="bgimg-blur"
    :style="{backgroundImage: `url(${ablumImgUrl})`}"
    ></div>
		<div class="overlay"></div>
  </div>
</template>

<script>
const NameSpace = 'playing';
import api from '../api/index.js';
import store from '../vuex/store.js';
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
  name:'fm',
  components:{

  },
  data(){
    return{
      list: [],
      touch: {
        startProgress: 0,
        width: 0,
        x: 0
      },
      lastTouch: {
        x: 0
      },
    }
  },
  computed:{
    ...mapState(NameSpace, ['songMsg', 'songState','songlist']),
    playingState() {
			return this.songState.playingState;
		},
		playingPrgress() {
			return this.songState.playingProgress;
		},
		playingCurrent() {
			return this.songState.current;
		},
    ablumImgUrl() {
      return this.songMsg.ablumurl;
    },
    songName() {
      return this.songMsg.songname;
    },
    artists() {
      return this.songMsg.artists;
    },
    songId() {
			return this.songMsg.songid;
		},
    playTiming() {
			return this.songState.timing;
		},
    playOrder() {
			return this.songState.playingOrder;
		},
  },
  watch:{
    songlist(){
      // console.log(this.songlist.length);
      let i=0;
      if(this.songlist.length <2 ){
        // console.log(1);
        api.getFM()
        .then(res=>{
          // if(res.data.code == 200){
            // console.log(res.data.data);
            let list = [];
            list.push(...res.data.data);
            this.pushSonglist(list);
            // this.playSong(0);
            // console.log('获取成功');
            // console.log(this.songlist);
          // }else if(i<5){
          //   i++;
          //   //这个后台的api有时候获取歌单失败但是也正常返回
          //   setTimeout(this.getFM(),1000);
          // }else{
          //   resolve();
          // }
        })
        .catch(error=>{
          console.log(error);
        })
        // console.log(this.songlist);
      }
    },
  },
  methods:{
    ...mapMutations(NameSpace, ['pause', 'pushSonglist', 'pruneCurrentTime','stackSonglist']),
		...mapActions(NameSpace, ['playSong','pruneProgress','clearSong','resetProgress']),
    nextSong(){
      this.clearSong(0);
      this.playSong(0);
    },
    //歌名过长滚动效果
    roll(){
      let songName = this.$refs.songName;
      let rollName = this.$refs.rollName;
      const width = songName.offsetWidth;
      const _width = rollName.offsetWidth;
      if (_width > width) {
        songName.innerHTML += songName.innerHTML;
        let start = () =>{
          if ( _width + 40 - songName.scrollLeft == 0) {
            songName.scrollLeft = 0;
            setTimeout(start,2000);
          } else {
            songName.scrollLeft++;
            setTimeout(start,30);
          }
        }
        setTimeout(start,2000);
      } else {
        return false;
      }
    },
    startPrune(e) {
      this.pause('pause');
      this.touch.x = e.changedTouches[0].clientX;
      this.touch.startProgress = this.playingPrgress;
      this.touch.width = this.touch.width || this.$refs.progress.getBoundingClientRect().width;
    },
    movePrune(e) {
      e && e.preventDefault();
      let touch = e.changedTouches[0],
        offsetX = touch.clientX - this.touch.x;
      this.lastTouch.x = touch.clientX;
      this.pruneProgress(this.touch.startProgress + offsetX/this.touch.width);
    },
    endPurne() {
      let touch = this.lastTouch,
        offsetX = touch.x - this.touch.x;
      this.pruneCurrentTime(this.touch.startProgress + offsetX/this.touch.width);

      // play the music
      this.pause();
      // clear prune msg
      this.touch = {};
      this.lastTouch = {};
    },
    getFM(){
      api.getFM()
      .then(res=>{
        let i = 0;
        if(res.data.code == 200){
          let list = [];
          list.push(...res.data.data);
          this.stackSonglist(list);
          this.playSong(0);
          console.log('获取成功');
          i=5;
        }else if(i<5){
          i++;
          //这个后台的api有时候获取歌单失败但是也正常返回
          setTimeout(this.getFM(),1000);
        }else{
          return false;
          console.log('稍后重试');
        }
      })
      .catch(error=>{
        console.log(error);
      })
    },
  },
  updated(){
    this.roll();
  },
  created(){
    this.playSong(0);
  },
}
</script>

<style lang="scss" scoped>
  .playingContain{
    z-index: 4;
    .bgimg-blur, .overlay {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			filter: blur(15px);
		}
		.bgimg-blur {
			z-index: -2;
			transform: scale(1.15);
			background-size: cover;
		  background-position:center;
      // background-image: url( 'http://p1.music.126.net/RcKklCkJDQJajii4yrxL7Q==/7969260280196460.jpg');
		}
		.overlay {
			z-index: -1;
			background-color: rgba(0, 0, 0, .3);
		}
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
        .songName{
          overflow: hidden;
          line-height: 24px;
          height: 24px;
          font-size: 18px;
          span{
            display: inline-block;
            &:nth-child(2){
              padding-left: 40px;
            }
          }
        }
        .singer{
          overflow: hidden;
          line-height: 18px;
          height: 18px;
          font-size: 16px;
        }
      }
    }
    .ablumWrapper{
      margin-top: 2rem;
      .cover{
        @include img-responsive;
				@include center-auto;
				width: 70%;
				border-radius: 8px;
        box-shadow:1px 1px 2px  $gray-line-default;
				// border: 1px solid rgba(255, 255, 255, .3);
      }
    }
    footer{
      position: fixed;
      bottom:10px;
      left:0;
      right: 0;
      .playControl {
        display: flex;
        margin-top: 10px;
        padding: 0 20px;
        justify-content: space-around;
        align-items: center;
        .nextIcon {
          width: 1.5rem;
          height: 1.5rem;
        }
        .playIcon,
        .pauseIcon
         {
          width: 3rem;
          height: 3rem;
        }
        .collectIcon, {
          height: 1.25rem;
          width: 1.25rem;
        }
      }
    }

  }




</style>
