import Vue from 'vue';
import Vuex from 'vuex';
import {getCurrentIndex, shuffle, floatNumber, } from '../util';
import api from '../api/index.js';

Vue.use(Vuex);

export default new Vuex.Store({
	modules:{
		playing:{
			namespaced: true,
			state:{
				// 正在播放音乐详情
				songMsg:{
					songid:'',
					songname:'',
					ablumurl:'',
					artists:'',
					url:'',
				},
				//歌曲列表
				songlist:[],
				songState:{
					//音乐播放的两个状态
					//1:pause(暂停),2:playing + songid(正在播放歌曲id)
					playingState: 'pause',
					//播放进度
					playingProgress:0,
					//缓冲进度
					bufferedProgress:[],
					//当前播放时间
					current:0,
					//记录拖动进度条的时间进度
					pruneTime:0,
					//正在播放歌曲在歌曲列表的索引
					currentIndex:0,
					// curent playing lyric index in currentLyric array
					currentLyricIndex: '',
					// current lyric playing time
					currentLyricDuration: '',
					// current lyrics array
					currentLyricArr: [],
					// 歌曲总时长
					timing: 0,
					// 播放方式的三种状态
					// 1: cycle, 2: singleCycle, 3: random,
					playingOrder: 'cycle'
				},
			},
			mutations: {
				//播放或暂停音乐
				pause(state,status){
					let songid = state.songMsg.songid;
					state.songState.playingState = status == 'pause' || songid == null ? 'pause' : 'playing';// + songid
				},
				pruneCurrentTime(state,time){
					state.songState.pruneTime = state.songState.timing*time || 0;
				},
				//stack songlist
				stackSonglist(state,stack){
					state.songlist = [...(stack instanceof Array ? stack : [stack || {}])];
					state.songState.currentIndex = 0;
					// console.log(state.songlist);
				},
				pushSonglist(state,stack){
					state.songlist = [...state.songlist, ...(stack instanceof Array ? stack : [])];
				},
				switchPlayOrder(state, order) {
					let	orderArr = ['cycle', 'singleCycle', 'random'],
						current = orderArr.indexOf(state.songState.playingOrder),
						next = orderArr.indexOf(order);
					state.songState.playingOrder = next > -1 ? orderArr[next] : orderArr[current >= 2 ? 0 : current + 1];
				},
				// swtich the current lyric index
				switchLyricIndex(state, index) {
					state.songState.currentLyricIndex = index;
				},
				switchLyricsArr(state, lyricArr) {
					state.songState.currentLyricArr = lyricArr instanceof Array ? lyricArr : [];
				},
				switchLyricDuration(state, duration) {
					state.songState.currentLyricDuration = duration;
				},
			},
			actions:{
				playSong({state, commit, dispatch}, index){
					let nextIndex;
					if(typeof index == 'string'){
						let playingOrder = state.songState.playingOrder,
							songlist = state.songlist,
							length = songlist.length,
							currentIndex = state.songState.currentIndex;
						switch(playingOrder) {
							case 'cycle':
								if (index == 'next') {
									nextIndex = currentIndex >= length - 1 ? 0 : ++currentIndex;
								}else if (index == 'prev') {
									nextIndex = currentIndex == 0 ? length - 1 : --currentIndex;
								}
								break;
							case 'random':
								nextIndex = Math.random()*songlist.length >> 0;
								break;
							case 'singleCycle':
								nextIndex = currentIndex;
								break;
						}
					}else{
						nextIndex = index >> 0;
					}
					//拼接歌手名字
					let a = [];
					state.songlist[nextIndex].artists.forEach(e=>{
						a.push(e.name);
					});
					state.songMsg.artists = a.join('/');
					state.songMsg.songid = state.songlist[nextIndex].id;
					state.songMsg.songname = state.songlist[nextIndex].name;
					state.songMsg.ablumurl = state.songlist[nextIndex].album.blurPicUrl;
					state.songState.currentIndex = nextIndex;
					state.songState.playingState = 'playing';// + state.songMsg.songid;
					api.getMusic(state.songlist[nextIndex].id)
					.then(res=>{
						// console.log(res);
						state.songMsg.url = res.data.data[0].url;
					})
					.catch(error=>{
						console.log(error);
					})
					dispatch('resetProgress');
				},
				//从正在播放列表中删除一个
				clearSong({state, dispatch}, index) {
					state.songlist.splice(index >> 0, 1);
				},
				//清空播放裂变
				clearSongStack({state, commit, dispatch}) {
					let defaultSongMsg = {
						songid:'',
						songname:'',
						ablumurl:'',
						artists:'',
					};
					state.songlist = [];
					state.songMsg = defaultSongMsg;
					// dispatch('resetProgress');
					commit('pause', 'pause');
				},
				// Reset Play Progress To Some Point
				resetProgress({state, commit, dispatch}, payload = {currentTime: 0, duration: 0}) {
					let current = parseInt(payload.currentTime) || 0,
						timing = parseInt(payload.duration) || 0;

					state.songState.playingProgress = current/timing;
					state.songState.current = current;
					state.songState.timing = timing;
					if (current >= timing && timing>0) {
						console.log('test');
						dispatch('playSong', 'next');
						commit('pruneCurrentTime', 0);
					}
				},
				// 用于歌曲的播放进度调整
				pruneProgress({state, dispatch}, progress) {
					let formatProgress;

					if (progress <0) {
						formatProgress = 0
					}else if (progress > 1) {
						formatProgress = 1;
					}else {
						formatProgress = progress;
					}

					dispatch('resetProgress', {
						currentTime: state.songState.timing*formatProgress,
						duration: state.songState.timing
					});
				},
			},
		}
	}
})
