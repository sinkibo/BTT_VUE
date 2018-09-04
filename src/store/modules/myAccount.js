import createLogger from 'vuex/dist/logger'

  const state = {
    message: "",
    isShowPublish: false,
    history: {
        selectCardId: null,
        historyList: []
    },
    account: {
        cardList:[],
        total_balance:0
    },

  }
  
  // getters
  const getters = {
  }
  
  // actions
  const actions = {
    initAction ({ state, commit, rootState }) {
        rootState.clientEngineService.execOperation("AccountStatementOp")
        .then(
            (store)=>{
                createLogger("Success to launch Flow: AccountStatementOp" + store);
                let flow = rootState.clientEngineService.getFlow();
                commit("setCardList", store.extractData().cardList);
                commit("setTotal_balance", store.extractData().total_balance);
            }
        );
    },

    getDetail ({ state, commit, rootState },id) {
        rootState.clientEngineService.execOperation("AccountDetailOp", {selectCardId : id})
        .then(
            (store)=>{
                createLogger("Success to launch Flow: AccountDetailOp" + store);
                let flow = rootState.clientEngineService.getFlow();
                commit("setSelectedCardId", store.extractData().selectCardId);
                commit("setHistoryList", store.extractData().historyList);
                commit("setShowPublish",true);
            }
        );
    }
  }
  
  // mutations
  const mutations = {
    setMessage (state, _message) {
      state.message = _message
    },

    setCardList (state, _data) {
      state.account.cardList = Object.assign(...state.account.cardList, _data)
    },

    setTotal_balance (state, _balance) {
        state.account.total_balance = _balance
    },

    setSelectedCardId (state, _cardId) {
        state.history.selectCardId = _cardId
    },

    setHistoryList (state, _data) {
        state.history.historyList = _data
    },

    setShowPublish  (state, value) {
        state.isShowPublish = value
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }