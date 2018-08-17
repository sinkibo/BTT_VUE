import Router from 'vue-router'
import Home from '@/components/Home.vue'
import MyAccount from '@/components/MyAccount.vue'
import Transfer from '@/components/Transfer.vue'
import TransferResult from '@/components/TransferResult.vue'
import Login from '@/components/Login.vue'
import About from '@/components/About.vue'
import Unicome from '@/components/Unicome.vue'

export default new Router({
    routes: [
      {
        path: '/myAccount',
        name: 'MyAccount',
        component: MyAccount
      },
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/trans',
        name: 'Transfer',
        component: Transfer
      },
      {
        path: '/transResult',
        name: 'TransferResult',
        component: TransferResult
      },
      {
        path: '/home',
        name: 'Home',
        component: Home
      },
      {
        path: '/about',
        name: 'About',
        component: About
      },
      {
        path: '/unicome',
        name: 'Unicome',
        component: Unicome
      }

  ]
  
})