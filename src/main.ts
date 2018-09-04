// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vuex from 'vuex'
import Router from 'vue-router'
import Routers  from './router/index'
import App from '@/components/App.vue'
import Home from '@/components/Home.vue'
import MyAccount from '@/components/MyAccount.vue'
import AccountDetail from '@/components/AccountDetail.vue'
import Transfer from '@/components/Transfer.vue'
import TransferResult from '@/components/TransferResult.vue'
import Login from '@/components/Login.vue'
import iView from 'iview'
import { locale, Page } from 'iview'
import lang from 'iview/dist/locale/en-US'
import 'iview/dist/styles/iview.css'
import store from './store'
//import { sync } from 'vuex-router-sync'

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
  //再secssion里面读取用户登陆信息。要是没有登陆就到login。要是登陆了就检查是否登陆超时，要死超时了还要去login界面，最好带一点标记能给出alert
  if(from.name == null && to.name != 'Home' && to.name != 'Login'){
    next('/login');
  }else
    next();
});

//const unsync = sync(store, router)
//unsync() // Unsyncs store from router
//sync(store, router, { moduleName: 'RouteModule' } )

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
  store,
  components: { App, MyAccount, Home, Login, Transfer, TransferResult, AccountDetail },
  template: '<App/>'
})

// 扩充
declare module 'vue/types/vue' {
  interface Vue {
    $router: Router
  }
}

