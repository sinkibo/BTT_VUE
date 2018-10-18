
<template>
    <div>
        <Card style="width:95%;margin:20px;height:fit-content">
            <p slot="title">Self Account Transfer</p>
            <p>
                <Row type="flex" justify="start" class="code-row-bg">
                    <Col :md="{span:11}" :sm="24">
                        <Alert type="warning" style="height:100%;height:100%">
                            <Card style="height:100%;height:100%">
                                <p slot="title">Transfer From</p>
                                <p>
                                     <Select v-model="fromAccount" clearable filterable style="width:200px" @on-change="updateBalance()">
                                        <Option v-for="card in transferData.cardList" :value="card.card_id" :key="card.card_id" :disabled="card.card_id==toAccount">
                                            {{card.card_id}}
                                        </Option>
                                    </Select>
                                </p>
                                <br>
                                <br>
                                <p>
                                    <Input :value="balance" prefix="logo-usd" style="width: 200px" disabled />
                                </p>
                            </Card>
                        </Alert>
                    </Col>
                    <Col :md="{span:11, offset:2}" :sm="24">
                        <Alert type="error" style="height:100%; width:100%">
                            <Card style="height:100%;height:100%">
                                <p slot="title">Transfer To</p>
                                <p>
                                     <Select v-model="toAccount" clearable filterable style="width:200px">
                                        <Option v-for="card in transferData.cardList" :value="card.card_id" :key="card.card_id" :disabled="card.card_id==fromAccount">
                                            {{card.card_id}}
                                        </Option>
                                    </Select>
                                </p>
                                <br>
                                <br>
                                <p>
                                    <InputNumber :max="balanceNumber" :min="0" v-model="enternumber" style="width: 200px"/>
                                    <Button shape="circle" icon="md-close" size="small" v-if="enternumber" @click="clear">
                                    </Button>
                                </p>
                            </Card>
                        </Alert>
                    </Col>
                </Row>
                <br>
                <br>
                <div style="text-align: center;">
                    <p v-if="fromAccount=='' || toAccount=='' || enternumber== '' || enternumber==null">
                        <Button type="success" @click="transferAndRoute()" long ghost disabled>Transfer</Button>
                    </p>
                    <p v-else>
                        <Button type="success" @click="transferAndRoute()" long ghost>Transfer</Button>
                    </p>
                </div>
            </p>
        </Card>
      
        <span class="mat-error">{{message}}</span>

        <!-- debug information -->
        <div v-if="this.$parent.$store.state.isDevMode">
        <pre class="bg-success text-white" style="padding:1em;margin-top:1em;background-color: #28a745!important;color: #fff!important;">
Tech Notes:

Transfer Component
@ /src/app/components/Transfer
Template-driven form with vue material controls
Form Data:
{{this.$store.state.transfer.transferData.transferForm}}
        </pre>
        </div>
    </div>
</template>

<script lang="ts">
import { mapActions } from 'vuex'
export default {
  computed: {
      message(){
          return this.$store.state.transfer.message
      },
      transferData(){
          return this.$store.state.transfer.transferData
      },
      balance(){
          return this.$store.state.transfer.balance
      },
      isDevMode(): Boolean{
          return this.$store.state.isDevMode
      },
      balanceNumber(){
          return this.$store.state.transfer.balanceNumber
      },
      enternumber: {
          get () {
            return this.$store.state.transfer.transferData.transferForm.amount
          },
          set (value) {
            this.$store.commit('transfer/updateAmount', value)
          }
      },
      fromAccount: {
          get () {
            return this.$store.state.transfer.transferData.transferForm.fromCardId
          },
          set (value) {
            this.$store.commit('transfer/updateFromAccount', value)
          }
      },
      toAccount: {
          get () {
            return this.$store.state.transfer.transferData.transferForm.toCardId
          },
          set (value) {
            this.$store.commit('transfer/updateToAccount', value)
          }
      }
  },
  methods: {
    ...mapActions ({
       doTransfer: 'transfer/doTransfer',
       updateBalance: 'transfer/updateBalance'
    }),
    clear (){
        this.$store.commit('transfer/updateAmount',0)
    },
    transferAndRoute(){

       this.doTransfer().then(
        ()=>{
          console.log('success transfer')
          this.$store.dispatch('transfer/updateToBalance');
          this.$store.dispatch('myAccount/initAction');//update myAccount data,because the balance was changed.
          this.$router.push({ path: "/transResult" })
        },
        ()=>{
         console.log('fail to transfer')
        }
       );
    } 
  },

  created () {
      this.$store.dispatch('transfer/loadData');
  }
}


</script>

<style>

</style>
