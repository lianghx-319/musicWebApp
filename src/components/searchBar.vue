<template lang="html">
  <div class="searchPage">
    <div class="searchNav">
      <form class="searchBar" action="#">
        <i class="icon iconfont icon-4"></i>
        <input
        type="search"
        ref="searchInput"
        v-model="keyword"
        @input="writing()"
        placeholder="搜索音乐、歌词、电台">
        <i
        @click="clearKey()"
        v-show="del"
        class="icon iconfont icon-sousuoshanchu"></i>
      </form>
      <!-- <span v-show="showList">取消</span> -->
    </div>
    <div class="searchSuggest" v-if="del">
      <div class="listContain">
        <div class="searchWord">
          <span>搜索&quot{{keyword}}&quot</span>
        </div>
        <!-- <mu-divider/> -->
        <div
        class="searchContent"
        v-for="s,key in searchList"
        :key="s.key"
        v-if="s.items">
          <div class="searchTitle">
            <span>
              <i :class="['icon','iconfont',s.icon]"></i>
              {{s.title}}
            </span>
          </div>
          <div class="searchItem">
            <!-- <mu-divider/> -->
            <ul>
              <li
              v-for="i,index in s.items"
              :key="index"
              >
              {{i.name}}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api/index.js'
export default {
  name:'searchBar',
  data(){
    return{
      keyword:'',
      del:false,
      showWord:false,
      searchList:[
        {key:0,items:[],title:'歌手',icon:'icon-geshou'},
        {key:1,items:[],title:'单曲',icon:'icon-gequ'},
        {key:2,items:[],title:'专辑',icon:'icon-zhuanji'},
        {key:3,items:[],title:'MV',icon:'icon-mv'},
        {key:4,items:[],title:'歌单',icon:'icon-gedan'}
      ],
    }
  },
  watch:{
    keyword(val,oldVal){
      if (val == '') {
        this.del = false;
        this.searchList.forEach(e=>{
          e.items = [];
        })
      } else {
        this.del = true;
      }
    }
  },
  methods:{
    clearKey(){
      this.keyword = '';
      this.$refs.searchInput.focus();
    },
    writing(){
      this.keyword = this.$refs.searchInput.value;
      let key = this.$refs.searchInput.value.replace(/\'/g,"");
      api.getSearchSuggest(key)
      .then(res=>{
        console.log(res.data.result);
        if(res.data.code == 200){
        let data = res.data.result;
        this.searchList[0].items = data.artists;
        this.searchList[1].items = data.songs;
        this.searchList[2].items = data.albums;
        this.searchList[3].items = data.mvs;
        this.searchList[4].items = data.playlists;
      }else{
        this.searchList.forEach(e=>{
          e.items = [];
        })
      }})
      .catch(error=>{
        alert('网络错误');
      })
      // console.log(2);
      // this.$emit('searchKey',[this.keyword]);
    },
  },
}
</script>

<style lang="scss" scoped>
  .searchSuggest{
    background-color: $gray-drak;
    border-radius: 5px;
    margin-top:7px;
    .listContain{
      padding-top: 10px;
      .searchWord{
        box-sizing:border-box;
        padding-left: 10px;
        padding-bottom: 10px;
        color: $blue-light;
        // border-bottom: 1px solid $gray-minor;
      }
      .searchContent{
        color: $gray-default;
        display: flex;
        &:nth-child(2) .searchTitle{
          border-top:1px solid $gray-minor;
        }
        .searchTitle{
          font-size: 16px;
          text-align: center;
          padding-top: 10px;
          flex:1;
          border-right:1px solid $gray-minor;
        }
        .searchItem{
          padding:10px 10px 5px;
          flex:2;
          border-top:1px solid $gray-minor;
          ul{

            max-width: 130px;
            li{
              padding-bottom: 5px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
</style>
