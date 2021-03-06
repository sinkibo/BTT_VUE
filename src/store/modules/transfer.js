
  const state = {
    message: "",
    balance: "",
    toBalance: "",
    balanceNumber: 0.0,
    toBalanceNumber: 0.0,
    transferData: {
      cardList:  [],
      transferForm: {
        amount: null,
        fromCardId: "",
        toCardId: ""
      }
    }
  }
  
  // getters
  const getters = {
    cardList: state => {
      return state.transferData.cardList
    },
    transferForm: state => {
      return state.transferData.transferForm
    }
  }
  
  // actions
  const actions = {
    loadData ({ state, commit, rootState }) {
      rootState.clientEngineService.launchFlow("AccountTransferFlow").then(
        (store) => {
            let flow = rootState.clientEngineService.getFlow();
            commit("setTransferData", flow.getStore().extractData());
        }
      ).catch((e) => {
        console.log("Fail to launch Flow: AccountTransferFlow")
      })
    },

    updateBalance ({ state, commit, rootState }) {
      let acc = state.transferData.cardList.filter((card)=>{
        return card.card_id == state.transferData.transferForm.fromCardId;
      });

      let _balance = (acc && acc[0]) ? acc[0].balance : "";
      commit("setBalance",_balance);
    },

    updateToBalance ({ state, commit, rootState }) {
      let acc = state.transferData.cardList.filter((card)=>{
        return card.card_id == state.transferData.transferForm.toCardId;
      });

      let _balance = (acc && acc[0]) ? acc[0].balance : "";
      commit("setToBalance",_balance);
    },

    doTransfer ({ state, commit, rootState }) {
      return new Promise((resolve, reject) => {
        rootState.clientEngineService.getFlow("AccountTransferFlow").changeEvent("submit", state.transferData)
        .then(
          (store)=>{
              console.log("Success to do transfer" + store);
              let flow = rootState.clientEngineService.getFlow();
              if (flow.getState() !="ResultState" ) // error at server side
              {
                  commit('setTransferData',flow.getStore().extractData());
                  commit('setMessage',"There are something wrong on server side.");
                  reject();
              }else{
                flow.changeEvent("exit").then(()=>{
                  let transferResultData = flow.getStore().extractData();
                  transferResultData.transferForm.amount = parseFloat(transferResultData.transferForm.amount.replace("$","").replace(/,/g,""));
                  commit('setTransferData',transferResultData);
                  commit('setMessage',"Success to Transfer!");
                  resolve();
                }).catch(() => {
                  commit('setMessage',"Fail to do exit transfer flow.");
                  reject();
                })
              }
          }
        ).catch((e) => {
          commit('setMessage',"Success to Transfer!"+e.response.responseText);
          console.log("Fail to do transfer")
        })
      });
    }
  }
  
  // mutations
  const mutations = {
    setMessage (state, _message) {
      state.message = _message
    },

    setTransferData (state, _data) {
      state.transferData = Object.assign(...state.transferData, _data)
    },

    setBalance (state, _balance) {
      state.balance = _balance.replace(/\$/g,"")
      state.balanceNumber = parseFloat(_balance.replace(/\,/g,"").substr(1))
    },

    setToBalance (state, _balance) {
      state.toBalance = _balance.replace(/\$/g,"")
      state.toBalanceNumber = parseFloat(_balance.replace(/\,/g,"").substr(1))
    },

    updateAmount (state, _amount) {
      state.transferData.transferForm.amount = _amount
    },

    updateFromAccount  (state, fromAccount) {
      state.transferData.transferForm.fromCardId = fromAccount
    },

    updateToAccount  (state, toAccount) {
      state.transferData.transferForm.toCardId = toAccount
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }