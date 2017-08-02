//定义一个全局可以使用的flag
const sideBar = {
  state:{
    open:false,
  },
  mutations:{
    toggle (state) {
      state.open = !state.open;
      console.log(state.open);
    },
  },
}

export default sideBar
