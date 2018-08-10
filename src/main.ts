// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import App from '@/components/App.vue'
import Home from '@/components/Home.vue'
import MyAccount from '@/components/MyAccount.vue'
import Login from '@/components/Login.vue'
import Main from '@/components/Main.vue'
import { AuthService } from './user/auth-service'
import { ClientEngineService } from './app/unicomsi/btt/clientengine/vue/ClientEngineService'

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(Router)
const router =new Router({
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
    }
  ]
})
/* eslint-disable no-new */
new Vue({
  el: '#appdiv',
  router,
  components: { App, MyAccount, Home, Login },
  template: '<App/>',
  provide: {
    clientEngineService: new ClientEngineService(window['BTT']),
    auths: new AuthService(new ClientEngineService(window['BTT']), router),
    isDevMode: false
   }
})

// 扩充
declare module 'vue/types/vue' {
  interface Vue {
    $router: Router
  }
}

