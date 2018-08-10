<template>
    <div>
        <h2 class="win-title">Customer Profile</h2>
        <div class="row">
            <div class="col-sm-12 col-md-4 col-topic">
                <div class="row">
                    <div class="col-12 col-sm-6 col-md-12 text-nowrap" style="padding-right:5px;">
                        <h4>{{ auth.name._ }}</h4>
                        <span>UserID: {{ auth.account_id._ }}</span><br/>
                        <span>e-Mail: {{ auth.name._ }}@btt.com</span><br/>
                        <span>Balance: {{ account.total_balance._ }}</span><br/>
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
                        {{item.card_id._}}
                        </div>
                        <div class="col-4 col-sm-2 text-center grid-cell" :class="{'text-danger':item.card_type=='credit'}" >
                        {{item.card_type._}}
                        </div>
                        <div class="col-8 col-sm-4 text-right text-success grid-cell">
                        {{item.balance._}}
                        </div>
                        <div class="col-4 col-sm-2 text-center grid-cell" style="cursor: pointer;" @click="toggleDetail(item.card_id._)">
                        ...
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AccountModel, SubAccount } from '../trans/account-model';
import { UserModel } from '../user/user-model';

export default Vue.extend({
    props: ['account', 'subAccount','auth'],
    data() {
        return {
            _account: this.account
        }
    },
    methods: {
        toggleDetail() {  },
        decrement() {
            
        },
    },
    computed: {
        exclamationMarks(): string {
            return "";
        }
    }
});

</script>
<style>
</style>