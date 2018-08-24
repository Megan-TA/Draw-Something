<template>
  <div id = 'wrapBox'>
    <canvas id = 'canvas' width="500" height = '300' class="canvas"></canvas>
  </div>
</template>

<script>
import { url } from '@/type'
const log = console.log

class Draw {
  constructor (el) {
    this.canvas = document.querySelector(`#${el}`)
    this.cxt = this.canvas.getContext('2d')
    this.cxt.strokeStyle = '#000'
    this.stage_info = this.canvas.getBoundingClientRect()
    // 用来传给websocket的绘画路径对象
    this.path = {
      beginX: 0,
      beginY: 0,
      endX: 0,
      endY: 0
    }
  }

  init (ws) {
    this.canvas.onmousedown = (event) => {
      this.drawBegin(event, ws)
    }
    this.canvas.onmouseup = (event) => {
      this.drawEnd()
      ws.send('stop')
    }
  }

  resizeCoordinate (event) {
    const startX = event.clientX - this.stage_info.left
    const startY = event.clientY - this.stage_info.top
    return {
      startX,
      startY
    }
  }

  drawBegin (event, ws) {
    // const self = this
    this.cxt.beginPath()
    const { startX, startY } = this.resizeCoordinate(event)
    this.cxt.moveTo(startX, startY)

    this.path.beginX = startX
    this.path.beginY = startY
    log(`画笔起始路径坐标是：${startX}, ${startY}`)
    document.onmousemove = (e) => {
      this.drawing(e, ws)
    }
  }

  drawing (e, ws) {
    const {startX, startY} = this.resizeCoordinate(e)
    this.cxt.lineTo(startX, startY)
    this.path.endX = startX
    this.path.endY = startY
    ws.send(this.path.beginX + '|' + this.path.beginY + '|' + this.path.endX + '|' + this.path.endY)
    this.cxt.stroke()
  }

  drawEnd () {
    document.onmousemove = document.onmouseup = null
  }
}
export default {
  mounted () {
    this.init()
  },

  methods: {
    init () {
      const ws = new WebSocket(url)
      const draw = new Draw('canvas')
      ws.onopen = () => {
        log('连接websocket成功~')
        draw.init(ws)
      }
    }
  }
}
</script>
<style>
.canvas {
  border: 1px solid #999;
}
</style>
