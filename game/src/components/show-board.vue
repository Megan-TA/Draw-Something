<template>
  <div>
    <canvas id = 'show' width="500" height="300" class = 'canvas'></canvas>
  </div>
</template>
<script>
import { url } from '@/type'
export default {
  mounted () {
    const ws = new WebSocket(url)
    const canvas = document.querySelector('#show')
    const cxt = canvas.getContext('2d')
    let moveToSwitch = 1
    ws.onmessage = ({data}) => {
      cxt.strokeStyle = '#000'
      const arr = data.split('|')
      if (moveToSwitch && data !== 'stop') {
        cxt.beginPath()
        cxt.moveTo(arr[0], arr[1])
        moveToSwitch = 0
      } else if (!moveToSwitch && data === 'stop') {
        cxt.beginPath()
        cxt.moveTo(arr[0], arr[1])
        moveToSwitch = 1
      }
      cxt.lineTo(arr[2], arr[3])
      cxt.stroke()
    }
  }
}
</script>

<style scoped>
.canvas {
  border: 1px solid red;
}
</style>
