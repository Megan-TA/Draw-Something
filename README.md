# 你画我猜简化版

基于websocket和canvas完成的一个你画我猜小游戏

启动步骤：

（确保安装node环境，建议高版本）

首先分别切换到`ganme`目录和`websocketServer`目录，执行 `npm install`

之后切换到`game`目录，启动服务`npm run dev`，url进入绘画端`http://localhost:8080/`

之后切换到`websocketServer`目录，运行`node index.js`,启动`websocket`服务端，新打开一个浏览器窗口`http://localhost:8080/show`，当做展示端

之后展示端会实时展示绘画端所绘画的内容
