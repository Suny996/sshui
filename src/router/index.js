import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TestCustomise from '@/views/test/TestCustomise'
import TestCustomise2 from '@/views/test/TestCustomise2'
import Test from '@/views/test/Test'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/test',
      name: 'TestCustomise',
      component: TestCustomise
    },{
      path: '/test2',
      name: 'TestCustomise2',
      component: TestCustomise2
    },{
      path: '/test1',
      name: 'Test',
      component: Test
    }
  ]
})
