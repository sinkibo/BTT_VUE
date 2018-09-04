import Vue from 'vue'
import Vuex from 'vuex'
import transfer from './modules/transfer'
import myAccount from './modules/myAccount'
import createLogger from 'vuex/dist/logger'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
import { AuthService } from '../user/auth-service'
import { ClientEngineService } from '../app/unicomsi/btt/clientengine/vue/ClientEngineService'
import { UserModel } from "../user/user-model"

var clientEngineService = new ClientEngineService(window['BTT']);

const state = {
    clientEngineService: clientEngineService,
    auths: new AuthService(clientEngineService, new UserModel()),
    isDevMode: false,
    message: ""
}

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    transfer,
    myAccount
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  state,
  mutations,
  getters,
  actions
})