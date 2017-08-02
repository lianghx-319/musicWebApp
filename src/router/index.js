import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/index'
import Discovery from '@/components/discovery'
import Music from '@/components/music'
import Friend from '@/components/friend'
import Fm from '@/components/fm'
import TopTen from '@/components/topTen'
// import Login from '@/components/login'
// import PlayList from '@/components/playList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/discovery',
      component: Home,
      children: [
        { path: 'discovery',name: 'discovery', component: Discovery },
        { path: 'music',name:'music', component: Music },
        { path: 'friend',name:'friend', component: Friend },

      ]
    },
    {
      path: '/fm',
      name: '私人FM',
      component: Fm
    },
    {
      path: '/toprank',
      name:'toprank',
      component: TopTen
    },
  ]
})
