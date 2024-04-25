import Vue from 'vue'
import Router from 'vue-router'
import EditScenario from '@/components/EditScenario'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EditScenario',
      component: EditScenario
    }
  ]
})
