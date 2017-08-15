<template lang="html">
  <div class="">
    <mu-icon-button
    icon="person"
    @click.nativ="toggle()"></mu-icon-button>
    <mu-drawer :docked="false" :open="o" @close="toggle()">
      <mu-appbar title="Account"/>
      <mu-list>
        <mu-list-item title="userName" disabled>
          <mu-avatar slot="left" src="avatarUrl"/>
        </mu-list-item>
        <mu-list-item title="设置">
          <mu-icon slot="left" value="settings"/>
        </mu-list-item>
        <mu-list-item title="支持作者">
          <mu-icon slot="left" value="thumb_up"/>
        </mu-list-item>
        <mu-list-item title="关于">
          <mu-icon slot="left" value="error"/>
        </mu-list-item>
        <mu-list-item>
          <mu-raised-button label="退出登录" secondary></mu-raised-button>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name:'account',
  // props:['open'],
  data(){
    return{
      o: false,
      // docked: true,
    }
  },
  methods:{
    // ...mapMutations([ 'toggle' ]),
    toggle (flag) {
      this.o = !this.o;
    },
  },
}
</script>

<style lang="scss">
</style>
