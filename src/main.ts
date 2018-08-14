// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import App from '@/components/App.vue'
import Home from '@/components/Home.vue'
import MyAccount from '@/components/MyAccount.vue'
import Transfer from '@/components/Transfer.vue'
import TransferResult from '@/components/TransferResult.vue'
import Login from '@/components/Login.vue'
import { AuthService } from './user/auth-service'
import { ClientEngineService } from './app/unicomsi/btt/clientengine/vue/ClientEngineService'
import { UserModel } from "./user/user-model";

var padDate=function(va){
  va=va<10?'0'+va:va;
  return va
}

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(Router)
Vue.filter('formatDate',function(val){
  var value=new Date(val);
  var year=value.getFullYear();
  var month=padDate(value.getMonth()+1);
  var day=padDate(value.getDate());
  var hour=padDate(value.getHours());
  var minutes=padDate(value.getMinutes());
  var seconds=padDate(value.getSeconds());
  return year+'-'+month+'-'+day;
})
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
    }
    
  ]
})
/* eslint-disable no-new */
new Vue({
  el: '#appdiv',
  router,
  components: { App, MyAccount, Home, Login, Transfer, TransferResult },
  template: '<App/>',
  provide: {
    clientEngineService: new ClientEngineService(window['BTT']),
    auths: new AuthService(new ClientEngineService(window['BTT']), router, new UserModel()),
    isDevMode: false
   }

})

// 扩充
declare module 'vue/types/vue' {
  interface Vue {
    $router: Router
  }
}

