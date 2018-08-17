// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import Routers  from './router/index'
import App from '@/components/App.vue'
import Home from '@/components/Home.vue'
import MyAccount from '@/components/MyAccount.vue'
import Transfer from '@/components/Transfer.vue'
import TransferResult from '@/components/TransferResult.vue'
import Login from '@/components/Login.vue'
import { AuthService } from './user/auth-service'
import { ClientEngineService } from './app/unicomsi/btt/clientengine/vue/ClientEngineService'
import { UserModel } from "./user/user-model"
import iView from 'iview'
import { locale, Page } from 'iview'
import lang from 'iview/dist/locale/en-US'
import 'iview/dist/styles/iview.css'

var padDate=function(va){
  va=va<10?'0'+va:va;
  return va
}

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(Router);
const router = Routers;
router.beforeEach((to,from,next) => {
  console.log(from);
  console.log("from above ++++++++");
  console.log(to);
  console.log("to above ++++");
  if(from.name == null && to.name != 'Home' && to.name != 'Login'){
    next('/login');
  }else
    next();
});

Vue.use(iView,{
  transfer: true,
  size: 'large'
});
// configure language
locale(lang);

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

