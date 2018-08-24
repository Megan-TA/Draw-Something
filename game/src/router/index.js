import Vue from 'vue'
import Router from 'vue-router'
import DrawingBoard from '@/components/drawing-board'
import ShowBoard from '@/components/show-board'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DrawingBoard',
      component: DrawingBoard
    },
    {
      path: '/show',
      name: 'ShowBoard',
      component: ShowBoard
    }
  ]
})
