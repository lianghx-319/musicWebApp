<template lang="html">
  <div class="page">
    <div class="top">
      <div class="topTitle">
        <search-bar
        v-if="bottomNav=='discovery'"></search-bar>
        <p
        v-else-if="bottomNav=='music'"
        class="title">我的音乐</p>
        <p
        v-else="bottomNav=='friend'"
        class="title">动态</p>
      </div>
      <div class="topNav">
        <mu-appbar>
          <account slot="left"></account>
          <mu-icon-button slot="right">
            <gif></gif>
          </mu-icon-button>
        </mu-appbar>
      </div>
    </div>
    <div class="pageContent">
      <keep-alive>
        <router-view :key="key"></router-view>
      </keep-alive>
    </div>
    <div class="bottomNav">
      <mu-bottom-nav
        :value="bottomNav"
        shift
        @change="handleChange">
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
import gif from './playingIcon.vue'
import account from './account.vue'
import discovery from './discovery.vue'
import searchBar from './searchBar.vue'
import { mapMutations } from 'vuex'
export default {
  name:'index',
  components:{
    gif,account,discovery,searchBar
  },
  data(){
    let navDefault = this.$route.name
    return{
      //配置路由后改成动态navDefault，解决刷新页面时active不在当前页面
      bottomNav: 'discovery',
      // showSearch:false,
      // open: this.$store.state.sideBar.open,
      // docked: true,
    }
  },
  methods: {
    ...mapMutations([ 'toggle' ]),
    handleChange (val) {
      this.bottomNav = val;
      console.log(this.bottomNav);
    },
  },
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  },
  mounted(){

  }
}
</script>

<style lang="scss" scoped>
  .page{
    .topNav{
      background-color: $gray-drak;
      .rightButton{
        position: absolute;
        right: 0;
      }
    }
  }
</style>
