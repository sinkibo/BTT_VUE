
  const state = {
    message: "",
    isShowPublish: false,
    history: {
        selectCardId: null,
        historyList: [],
        subHistoryList: [],
        pageTotal: 0,
        pageNum: 1,
        pageSize: 10,
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
                let flow = rootState.clientEngineService.getFlow();
                commit("setSelectedCardId", store.extractData().selectCardId);
                commit("setHistoryList", store.extractData().historyList);
                commit("setShowPublish",true);
                commit("setPageTotal",store.extractData().historyList.length);
                commit("setSubHistoryList");
            }
        );
    }
  }
  
  // mutations
  const mutations = {
    setMessage (state, _message) {
      state.message = _message
    },

    setPageNum (state, _pageNum) {
        state.history.pageNum = _pageNum
    },

    setPageSize (state, _pageSize) {
        state.history.pageSize = _pageSize
    },

    setPageTotal (state, _pageTotal) {
        state.history.pageTotal = _pageTotal
    },

    setCardList (state, _data) {
      //state.account.cardList = Object.assign(...state.account.cardList, _data)累加合并
      state.account.cardList = _data
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

    setSubHistoryList (state) {
        var subListFrom = (state.history.pageNum - 1) * state.history.pageSize;
        var subListTo = Math.min(subListFrom + state.history.pageSize,state.history.pageTotal)
        state.history.subHistoryList = state.history.historyList.slice(subListFrom,subListTo)
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