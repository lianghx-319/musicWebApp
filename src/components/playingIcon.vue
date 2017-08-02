<template lang="html">
  <div class="iconContain">
    <canvas
    ref="canvas"
    width="240"
    height="240">
      <!-- 当设备不支持canvas时的图标 -->
    </canvas>
  </div>
</template>

<script>
export default {
  name:'PlayingGIf',
  data(){
    return{
      y:220,
      lines:[
        {
          x:30,
          beginY:120,
          maxY:120,
          minY:50,
          speed:3,
        },
        {
          x:90,
          beginY:20,
          minY:20,
          maxY:90,
          speed:-3,
        },
        {
          x:150,
          beginY:80,
          maxY:80,
          minY:10,
          speed:3,
        },
        {
          x:210,
          beginY:40,
          minY:40,
          maxY:110,
          speed:-3,
        },
      ],
    }
  },
  methods:{
    draw(){
      let canvas = this.$refs.canvas,
          context = canvas.getContext('2d'),
          lines = this.lines;
      context.lineWidth = 25;
      context.strokeStyle = '#ffffff';
      context.lineCap = 'round';
      this.lines.forEach(e=>{
        context.beginPath();
        context.moveTo(e.x,this.y);
        context.lineTo(e.x,e.beginY);
        context.stroke();
      });
    },
    playing(){
      let canvas = this.$refs.canvas,
          context = canvas.getContext('2d'),
          lines = this.lines;

      let animate = () =>{
        //清空画布
        context.clearRect(0,0,canvas.width,canvas.height);
        //刷新Y坐标
        lines.forEach(e=>{
          // console.log(e.speed);
          let s = Math.abs(e.speed);
          if(e.beginY + s >e.maxY || e.beginY - s <e.minY){
            e.speed = -e.speed;
          };
          e.beginY = e.beginY + e.speed;
          // console.log(Math.abs(e.speed));
        });
        //图案
        this.draw();
        window.requestAnimationFrame(animate);
      }
        animate();
    }
  },
  mounted(){
    this.playing();
  }
}
</script>

<style lang="scss" scoped>
  .iconContain{
    background-color: transparent;
    canvas{
      width:24px;
      height:24px;
    }
  }
</style>
