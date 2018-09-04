<template>
    <div>
        <Card style="width:95%;margin:20px;height:90%">
            <p slot="title">Customer Profile</p>
            <p>
                <Row type="flex" justify="start" class="code-row-bg">
                    <Col span="7">
                        <Alert type="warning" style="height:100%;height:100%">
                            <Card style="height:100%;height:100%" class="layout-tablecell">
                                <p slot="title">{{ auth.name }}</p>
                                <p>UserID: {{ auth.account_id }}</p>
                                <p>e-Mail: {{ auth.name }}@btt.com</p>
                                <p>Balance: {{ account.total_balance }}</p>
                                <p>Rating: <Rate disabled v-model="rate" /></p>
                                <p><img class="img-thumbnail" style="margin-top: 2em;margin-bottom:2em; height:180px;" :src="auth.photo" alt="customer image"></p>
                            </Card>
                        </Alert>
                    </Col>
                    <Col span="16" offset="1">
                        <Alert type="success" style="height:100%; width:100%">
                            <Card style="height:100%; width:100%">
                                <p slot="title">Accounts</p>
                                <p>
                                    <Row class-name="layout-tablecell layout-headercell">
                                        <Col span="5" class-name="layout-tablecol1">NO.</Col>
                                        <Col span="5" class-name="layout-tablecol2">Account</Col>
                                        <Col span="5" class-name="layout-tablecol3">Type</Col>
                                        <Col span="5" class-name="layout-tablecol4">Blance</Col>
                                        <Col span="4" class-name="layout-tablecol5">Details</Col>
                                    </Row>
                                    <Row v-for="(item, index) in account.cardList" :key="index" class-name="layout-tablecell">
                                        <Col span="5">{{index+1}}</Col>
                                        <Col span="5" class-name="layout-col-color-blue">{{item.card_id}}</Col>
                                        <Col v-if="item.card_type == 'credit'" span="5" class-name="layout-col-color-red">{{item.card_type}}</Col>
                                        <Col v-if="item.card_type == 'debit'" span="5">{{item.card_type}}</Col>
                                        <Col span="5" class-name="layout-col-color-green">{{item.balance}}</Col>
                                        <Col span="4"><div @click="toggleDetail(item.card_id)" style="cursor: pointer;">......</div></Col>
                                    </Row>
                                </p>
                            </Card>
                        </Alert>
                    </Col>
                </Row>
            </p>
        </Card>

        <AccountDetail :is-show="isShowPublish" @on-close="closeDialog">
            <div slot="header" style="width:100%">
                <Alert type="error" style="layout-accountdetail-header">
                    <h3>Account Histoy: {{selectCardId}}</h3>
                </Alert>
            </div>
            <div slot="main" style="width:100%">
                <Alert type="success" style="margin: 10px;">
                    <Row type="flex" justify="start" class="code-row-bg" class-name="layout-tablecell layout-headercell">
                        <Col span="5" class-name="layout-tablecol1">NO.</Col>
                        <Col span="5" class-name="layout-tablecol2">Date</Col>
                        <Col span="5" class-name="layout-tablecol3">Type</Col>
                        <Col span="5" class-name="layout-tablecol4">Amount</Col>
                        <Col span="4" class-name="layout-tablecol5">Details</Col>
                    </Row>
                    <Row v-for="(item, index) in historyList" :key="index" type="flex" justify="start" class="code-row-bg" class-name="layout-tablecell">
                        <Col span="5">{{index+1}}</Col>
                        <Col span="5" class-name="layout-col-color-blue">{{item.date | formatDate}}</Col>
                        <Col v-if="(item.amount+'').indexOf('-')>-1" span="5" class-name="layout-col-color-red">{{(item.amount+'').indexOf('-')>-1 ? "outcome" : "income"}}</Col>
                        <Col v-else="" span="5">{{(item.amount+'').indexOf('-')>-1 ? "outcome" : "income"}}</Col>
                        <Col span="5" class-name="layout-col-color-green">{{item.amount}}</Col>
                        <Col v-if="item.name == 'Transfer'" span="4" class-name="layout-col-color-yellow">{{item.name}}</Col>
                        <Col v-else="" span="4">{{item.name}}</Col>
                    </Row>
                </Alert>
            </div>
        </AccountDetail>
    </div>
</template>

<script lang="ts">
import { AccountModel, SubAccount } from '../trans/account-model';
import { ClientEngineService } from '../app/unicomsi/btt/clientengine/vue/ClientEngineService';
import { AuthService } from '../user/auth-service';
import { UserModel } from '../user/user-model';
import AccountDetail from './AccountDetail.vue'
export default {
  components: { AccountDetail },
  computed: {
      rate():number {
        let bs = this.$store.state.myAccount.account.total_balance || "";
        let bn = parseInt(bs.replace(/\D+/g, ''));
        let r = bn / 1000000;
        if (r > 5) r = 5;
        return r;
      },
      auth(): UserModel{
        return this.$store.state.auths.user;
      },
      account() {
        return this.$store.state.myAccount.account;
      },
      selectCardId() {
          return this.$store.state.myAccount.history.selectCardId;
      },
      historyList(){
          return this.$store.state.myAccount.history.historyList;
      },
      isShowPublish(){
          return this.$store.state.myAccount.isShowPublish;
      }
      
  },
  methods: {
    toggleDetail(id: string) {
        this.$store.dispatch('myAccount/getDetail',id);
    },
    closeDialog(){
        this.$store.commit("myAccount/setShowPublish",false);
    }
  },

  created () {
       this.$store.dispatch('myAccount/initAction');
  }
}

</script>
<style scoped>
.layout-tablecell{
    line-height: 2.5em;
    border-left: 1px solid #dcdee2;
    border-bottom: 1px solid #dcdee2;
    border-right: 1px solid #dcdee2;
    width:100%;
}
.layout-col-color-blue{
    color: blue;
}
.layout-col-color-green{
    color: green;
}
.layout-col-color-red{
   color: red; 
}
.layout-col-color-yellow{
    color: orange;
}
.layout-headercell{
    color: white;
    font-weight: bold;
}
.layout-tablecol1{
    background-color: #868e96!important;
}
.layout-tablecol2{
    background-color: #007bff!important
}
.layout-tablecol3{
    background-color: #f44336!important;
}
.layout-tablecol4{
    background-color: green!important;
}
.layout-tablecol5{
    background-color: #ffd77a!important;
}
.layout-accountdetail-header{
    width:100%;
}
</style>