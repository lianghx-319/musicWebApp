<template lang="html">
  <div class="">
    <audio :src="mp3Url" ref="audio"
    @timeupdate="_playingProgress"
      @canplaythrough="_playProgress"
    ></audio>
  </div>
</template>

<script>
const NameSpace = 'playing';
import api from '../api/index.js'
import store from '../vuex/store.js'
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
  name:'audio',
  data(){
    return{
      nowDuration:0,
    }
  },
  computed: {
			...mapState(NameSpace, ['songMsg', 'songState']),
			playingState() {
				return this.songState.playingState;
			},
			playingSongid() {
				return this.songMsg.songid;
			},
			playingPrgress() {
				return this.songState.playingProgress;
			},
			currentTime() {
				return this.songState.current;
			},
			pruneTime() {
				return this.songState.pruneTime;
			},
			mp3Url() {
				return this.songMsg.url;
			},
		},
    watch: {
      playingState(state){
        let audio = this.$refs.audio;
      	if (state == 'pause') {
					audio.pause();
				}else{
          audio.play();
        }
      },
			// Play Or Pause When PlayingState Modified
			// playingState(state) {
			// 	let audio = this.$refs.audio;
      //
			// 	if (state == 'pause') {
			// 		audio.pause()
			// 	}else {
			// 		// Check if first frame has been downloaded, otherwise recursice call this function
			// 		// 30 times if it still fail throw a error and change the play state
			// 		let stack = 0;
			// 		function recursivePlay() {
			// 			// Attention the play method return a promise
			// 			let playPromise = audio.play();
			// 			if (playPromise) {
			// 				playPromise.catch(e => {
      //           // console.log('test');
			// 					setTimeout(() => {
			// 						++stack >= 30 ? (alert('音乐加载失败， 请重试'), store.commit(NameSpace+ '/pause', 'pause')) : recursivePlay();
			// 					}, 500)
			// 				});
			// 			}
			// 		}
			// 		// must update the dom view first, because the audio src has not been updated now
			// 		// the deep reason for this is because Vue watch method excute is take prioirty than
			// 		// dom view update
			// 		this.$nextTick(recursivePlay);
			// 	}
			// },
      pruneTime(time) {
  			let audio = this.$refs.audio;
  			audio.currentTime = time;
  		},
    },
  methods:{
    ...mapMutations(NameSpace, ['pause',]),
		// ...mapMutations('list', ['toggleShow']),
		...mapActions(NameSpace, ['playSong']),
		_playProgress(e) {
			let audio = e.target,
				currentTime = audio.currentTime,
        duration = this.nowDuration;
			this.nowDuration = audio.duration;
      audio.play();
        // console.log(currentTime,duration,);
			store.dispatch(NameSpace + '/resetProgress', {currentTime, duration});
		},
		_playingProgress(e) {
			let audio = e.target,
      currentTime = audio.currentTime,
      duration = this.nowDuration;
        // console.log(currentTime,duration,);
			store.dispatch(NameSpace + '/resetProgress', {currentTime, duration});
		},
  },
  mounted(){
    // console.log(store);
  }
}
</script>

<style lang="scss">
</style>
