const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({ port: 8090 })
const chalk = require('chalk')
const { blue, red } = chalk
const log = console.log

log(1111)

wss.on('connection', (ws) => {
  log('连接websocket成功！')
  ws.on('message', (message) => {
    log(`接收到的信息为：${message}`)
    wss.clients.forEach(clients => {
      clients.send(message)
    })
  })
})