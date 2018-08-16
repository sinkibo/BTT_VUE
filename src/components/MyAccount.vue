<template>
    <div>
        <Card style="width:95%;margin:20px;height:90%">
            <p slot="title">Customer Profile</p>
            <p>
                <Row type="flex" justify="start" class="code-row-bg">
                    <Col span="6">
                        <Alert type="warning" style="height:100%;height:100%">
                            <Card style="height:100%;height:100%">
                                <p slot="title">{{ auth.name }}</p>
                                <p>UserID: {{ auth.account_id }}</p>
                                <p>e-Mail: {{ auth.name }}@btt.com</p>
                                <p>Balance: {{ account.total_balance }}</p>
                                <p><img class="img-thumbnail" style="margin-top: 2em;margin-bottom:2em; height:180px;" :src="auth.photo" alt="customer image"></p>
                            </Card>
                        </Alert>
                    </Col>
                    <Col span="17" offset="1">
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

        <AccouneDetail :is-show="isShowPublish" @on-close="closeDialog">
            <div slot="header" style="width:100%">
                <Alert type="error" style="layout-accountdetail-header">
                    <h3>Account Histoy: {{this.history.selectCardId}}</h3>
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
                    <Row v-for="(item, index) in this.history.historyList" :key="index" type="flex" justify="start" class="code-row-bg" class-name="layout-tablecell">
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
        </AccouneDetail>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject, Model } from "vue-property-decorator";
import { AccountModel, SubAccount } from '../trans/account-model';
import { ClientEngineService } from '../app/unicomsi/btt/clientengine/vue/ClientEngineService';
import { AuthService } from '../user/auth-service';
import { UserModel } from '../user/user-model';
import AccouneDetail from './AccountDetail.vue'

@Component({
    components: {AccouneDetail}
})
export default class MyAccount extends Vue {

    @Inject('clientEngineService') private clientEngineService: ClientEngineService | any;
    @Inject('isDevMode') private isDevMode: boolean | any;
    @Inject('auths') private authService: AuthService | any;

    
    public account: AccountModel|any;
    
    public auth: UserModel|any = this.authService.user;

    public history: any;

    public isShowPublish: Boolean = false;
    
    constructor(){
        super();
        this.account = {};
        this.history = {};
        
        this.clientEngineService.execOperation("AccountStatementOp")
        .then(
            (store :any)=>{
                 //this.account = Object.assign({},this.account,store.extractData());
                 this.$set(this.account, 'cardList', store.extractData().cardList);
                 this.$set(this.account, 'total_balance', store.extractData().total_balance);
            }
        );

    }

    toggleDetail(id: string, opened: boolean) {
        console.debug(`sub-account(${id}) has been ${opened ? 'opened' : 'closed'}`);
        this.clientEngineService.execOperation("AccountDetailOp", {selectCardId : id})
        .then(
            (store: any)=>{
                console.debug(store.extractData());
                this.$set(this.history, 'selectCardId', store.extractData().selectCardId);
                this.$set(this.history, 'historyList', store.extractData().historyList);
                this.isShowPublish = true;
            }
    );
  }

  closeDialog(){
    this.isShowPublish=false;
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