<template>
    <div>
        <h2 class="win-title">Customer Profile</h2>
        <div class="row">
            <div class="col-sm-12 col-md-4 col-topic">
                <div class="row">
                    <div class="col-12 col-sm-6 col-md-12 text-nowrap" style="padding-right:5px;">
                        <h4>{{ auth.name }}</h4>
                        <span>UserID: {{ auth.account_id }}</span><br/>
                        <span>e-Mail: {{ auth.name }}@btt.com</span><br/>
                        <span>Balance: {{ account.total_balance }}</span><br/>
                    </div>
                    <div class="col-12 col-sm-6 col-md-12">
                        <img class="img-thumbnail" style="margin-top: 2em;margin-bottom:2em; height:180px;" :src="auth.photo" alt="customer image">
                    </div>
                </div>
            </div>
            <!-- 2nd row/col: account list -->
            <div class="col-sm-12 col-md-8 col-topic">
                <h4>Accounts</h4>
                <div style="margin:1em; border-right: 1px solid #808080; padding-right:15px;">
                    <div class="row grid-header text-white">
                        <div class="col-2 col-sm-1 grid-cell bg-secondary" style="padding-left: 5px">
                        No.
                        </div>
                        <div class="col-6 col-sm-3 grid-cell bg-primary">
                        Account
                        </div>    
                        <div class="col-4 col-sm-2 grid-cell bg-danger text-center">
                        Type
                        </div>
                        <div class="col-8 col-sm-4 grid-cell bg-success text-right">
                        Balance
                        </div>
                        <div class="col-4 col-sm-2 grid-cell bg-secondary text-center">
                        Details
                        </div>
                    </div>
                    <div class="row grid-row" v-for="(item, index) in account.cardList" :key="index">
                        <div class="col-2 col-sm-1 grid-cell">
                        {{index+1}}
                        </div>
                        <div class="col-6 col-sm-3 text-primary font-weight-bold grid-cell">
                        {{item.card_id}}
                        </div>
                        <div class="col-4 col-sm-2 text-center grid-cell" :class="{'text-danger':item.card_type=='credit'}" >
                        {{item.card_type}}
                        </div>
                        <div class="col-8 col-sm-4 text-right text-success grid-cell">
                        {{item.balance}}
                        </div>
                        <div class="col-4 col-sm-2 text-center grid-cell" style="cursor: pointer;" @click="toggleDetail(item.card_id)">
                        ...
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <AccouneDetail :is-show="isShowPublish" @on-close="closeDialog">
            <div slot="header">
                <div class="modal-header">
                    <h3 class="modal-title">Account Histoy: {{this.history.selectCardId}}</h3>
                    <button type="button" class="close pull-right" aria-label="Close" @click="closeDialog">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
            <div class="dialog_publish_main" slot="main">
                <div class="row grid-header text-white" style="border-right: 1px solid #808080;">
                    <div class="col-2 col-sm-1 grid-cell bg-secondary" style="padding-left: 5px">
                    No.
                    </div>
                    <div class="col-6 col-sm-3 text-center grid-cell bg-primary">
                    Date
                    </div>
                    <div class="col-4 col-sm-2 grid-cell bg-danger text-center">
                    Type
                    </div>
                    <div class="col-8 col-sm-4 grid-cell bg-success text-right">
                    Amount
                    </div>
                    <div class="col-4 col-sm-2 grid-cell bg-secondary text-center">
                    Details
                    </div>
                </div>

                <div class="row grid-row" v-for="(item, index) in this.history.historyList" style="border-right: 1px solid #808080;" :key="index">
                    <div class="col-2 col-sm-1 grid-cell">
                    {{index+1}}
                    </div>
                    <div class="col-6 col-sm-3 text-center text-primary grid-cell text-nowrap">
                    {{item.date | formatDate}}
                    </div>
                    <div class="col-4 col-sm-2 text-center grid-cell" :class="{'text-danger':(item.amount+'').indexOf('-')>-1}">
                    {{(item.amount+'').indexOf('-')>-1 ? "outcome" : "income"}}
                    </div>
                    <div class="col-8 col-sm-4 text-right text-success grid-cell">
                    {{item.amount}}
                    </div>
                    <div class="col-4 col-sm-2 text-center grid-cell">
                    {{item.name}}
                    </div>
                </div>
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
<style>
</style>