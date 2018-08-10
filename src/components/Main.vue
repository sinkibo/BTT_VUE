<template>
    <div>
        <nav class="navbar navbar-default" role="navigation">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">Unicom</a>
            </div>
            <div>
                <ul class="nav navbar-nav">
                    <li class="active"><a href="javascript:;" @click="curId=0" :class="{'cur':curId===0}">My Account</a></li>
                    <li><a href="javascript:;" @click="curId=1" :class="{'cur':curId===1}">Transer</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        Help 
                        <b class="caret"></b>
                        </a>
                        <ul class="dropdown-menu">
                        <li><a href="javascript:;" @click="curId=2" :class="{'cur':curId===2}">Reload</a></li>
                        <li class="divider"></li>
                        <li><a href="javascript:;" @click="curId=3" :class="{'cur':curId===3}">Help</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="tab-con">
            <div v-show="curId===0">
                <my-account :auth='auth' :account='account'/>
            </div>
            <div v-show="curId===1">
                css
            </div>
            <div v-show="curId===2">
                javascript
            </div>
            <div v-show="curId===3">
                vue
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import MyAccount from "./MyAccount.vue";
import { AccountModel,SubAccount } from '../trans/account-model';
import { UserModel }  from '../user/user-model';

export default Vue.extend({
    props: [],
    
    data() {
        return {
            curId: 0,
            auth: {"account_id":{"t":"String","_":"BTT-User-1"},"gender":{"t":"String","_":"F"},"name":{"t":"String","_":"Emily"}},
            account: {"cardList":[{"balance":{"c":{"currency":"USD","numberType":"bigDecimal"},"t":"Currency","w":1,"_":"$74,488.21"},"historyList":[{"date":{"c":{"pattern":"yyyy-MM-dd"},"t":"Date","w":1,"_":"2018-07-26"},"amount":{"c":{"currency":"EUR","numberType":"bigDecimal"},"t":"Currency","w":1,"_":"$-46,111.13"},"name":{"t":"String","w":1,"_":"Transfer"}},{"date":{"c":{"pattern":"yyyy-MM-dd"},"t":"Date","w":1,"_":"2018-07-25"},"amount":{"c":{"currency":"EUR","numberType":"bigDecimal"},"t":"Currency","w":1,"_":"$-84,843.33"},"name":{"t":"String","w":1,"_":"Transfer"}},{"date":{"c":{"pattern":"yyyy-MM-dd"},"t":"Date","w":1,"_":"2018-07-24"},"amount":{"c":{"currency":"EUR","numberType":"bigDecimal"},"t":"Currency","w":1,"_":"$78,724.17"},"name":{"t":"String","w":1,"_":"Transfer"}}],"card_type":{"t":"String","w":1,"_":"credit"},"card_id":{"t":"String","w":1,"_":"1001000"}},{"balance":{"c":{"currency":"USD","numberType":"bigDecimal"},"t":"Currency","w":1,"_":"$51,265.32"},"historyList":[{"date":{"c":{"pattern":"yyyy-MM-dd"},"t":"Date","w":1,"_":"2018-07-26"},"amount":{"c":{"currency":"EUR","numberType":"bigDecimal"},"t":"Currency","w":1,"_":"$78,940.80"},"name":{"t":"String","w":1,"_":"Transfer"}},{"date":{"c":{"pattern":"yyyy-MM-dd"},"t":"Date","w":1,"_":"2018-07-25"},"amount":{"c":{"currency":"EUR","numberType":"bigDecimal"},"t":"Currency","w":1,"_":"$-1,866.18"},"name":{"t":"String","w":1,"_":"Cost"}}],"card_type":{"t":"String","w":1,"_":"debit"},"card_id":{"t":"String","w":1,"_":"1001001"}},{"balance":{"c":{"currency":"USD","numberType":"bigDecimal"},"t":"Currency","w":1,"_":"$15,183.16"},"historyList":[{"date":{"c":{"pattern":"yyyy-MM-dd"},"t":"Date","w":1,"_":"2018-07-26"},"amount":{"c":{"currency":"EUR","numberType":"bigDecimal"},"t":"Currency","w":1,"_":"$40,481.44"},"name":{"t":"String","w":1,"_":"Transfer"}},{"date":{"c":{"pattern":"yyyy-MM-dd"},"t":"Date","w":1,"_":"2018-07-25"},"amount":{"c":{"currency":"EUR","numberType":"bigDecimal"},"t":"Currency","w":1,"_":"$18,461.19"},"name":{"t":"String","w":1,"_":"Transfer"}},{"date":{"c":{"pattern":"yyyy-MM-dd"},"t":"Date","w":1,"_":"2018-07-24"},"amount":{"c":{"currency":"EUR","numberType":"bigDecimal"},"t":"Currency","w":1,"_":"$-37,093.46"},"name":{"t":"String","w":1,"_":"Cost"}},{"date":{"c":{"pattern":"yyyy-MM-dd"},"t":"Date","w":1,"_":"2018-07-23"},"amount":{"c":{"currency":"EUR","numberType":"bigDecimal"},"t":"Currency","w":1,"_":"$-23,802.23"},"name":{"t":"String","w":1,"_":"Transfer"}},{"date":{"c":{"pattern":"yyyy-MM-dd"},"t":"Date","w":1,"_":"2018-07-22"},"amount":{"c":{"currency":"EUR","numberType":"bigDecimal"},"t":"Currency","w":1,"_":"$38,582.01"},"name":{"t":"String","w":1,"_":"Transfer"}},{"date":{"c":{"pattern":"yyyy-MM-dd"},"t":"Date","w":1,"_":"2018-07-21"},"amount":{"c":{"currency":"EUR","numberType":"bigDecimal"},"t":"Currency","w":1,"_":"$-68,934.32"},"name":{"t":"String","w":1,"_":"Cost"}}],"card_type":{"t":"String","w":1,"_":"debit"},"card_id":{"t":"String","w":1,"_":"1001002"}},{"balance":{"c":{"currency":"USD","numberType":"bigDecimal"},"t":"Currency","w":1,"_":"$35,715.72"},"historyList":[{"date":{"c":{"pattern":"yyyy-MM-dd"},"t":"Date","w":1,"_":"2018-07-26"},"amount":{"c":{"currency":"EUR","numberType":"bigDecimal"},"t":"Currency","w":1,"_":"$47,660.96"},"name":{"t":"String","w":1,"_":"Transfer"}},{"date":{"c":{"pattern":"yyyy-MM-dd"},"t":"Date","w":1,"_":"2018-07-25"},"amount":{"c":{"currency":"EUR","numberType":"bigDecimal"},"t":"Currency","w":1,"_":"$77,028.60"},"name":{"t":"String","w":1,"_":"Transfer"}},{"date":{"c":{"pattern":"yyyy-MM-dd"},"t":"Date","w":1,"_":"2018-07-24"},"amount":{"c":{"currency":"EUR","numberType":"bigDecimal"},"t":"Currency","w":1,"_":"$47,946.07"},"name":{"t":"String","w":1,"_":"Transfer"}},{"date":{"c":{"pattern":"yyyy-MM-dd"},"t":"Date","w":1,"_":"2018-07-23"},"amount":{"c":{"currency":"EUR","numberType":"bigDecimal"},"t":"Currency","w":1,"_":"$2,403.60"},"name":{"t":"String","w":1,"_":"Transfer"}}],"card_type":{"t":"String","w":1,"_":"credit"},"card_id":{"t":"String","w":1,"_":"1001003"}},{"balance":{"c":{"currency":"USD","numberType":"bigDecimal"},"t":"Currency","w":1,"_":"$91,308.98"},"historyList":[{"date":{"c":{"pattern":"yyyy-MM-dd"},"t":"Date","w":1,"_":"2018-07-26"},"amount":{"c":{"currency":"EUR","numberType":"bigDecimal"},"t":"Currency","w":1,"_":"$-78,755.68"},"name":{"t":"String","w":1,"_":"Transfer"}},{"date":{"c":{"pattern":"yyyy-MM-dd"},"t":"Date","w":1,"_":"2018-07-25"},"amount":{"c":{"currency":"EUR","numberType":"bigDecimal"},"t":"Currency","w":1,"_":"$-1,973.70"},"name":{"t":"String","w":1,"_":"Cost"}},{"date":{"c":{"pattern":"yyyy-MM-dd"},"t":"Date","w":1,"_":"2018-07-24"},"amount":{"c":{"currency":"EUR","numberType":"bigDecimal"},"t":"Currency","w":1,"_":"$69,319.65"},"name":{"t":"String","w":1,"_":"Transfer"}},{"date":{"c":{"pattern":"yyyy-MM-dd"},"t":"Date","w":1,"_":"2018-07-23"},"amount":{"c":{"currency":"EUR","numberType":"bigDecimal"},"t":"Currency","w":1,"_":"$-19,066.80"},"name":{"t":"String","w":1,"_":"Cost"}}],"card_type":{"t":"String","w":1,"_":"debit"},"card_id":{"t":"String","w":1,"_":"1001004"}}],"total_balance":{"c":{"currency":"EUR","numberType":"bigDecimal"},"t":"Currency","w":1,"_":"$267,961.39"},"btt_isOperation":{"t":"String","w":1,"_":true},"account_id":{"t":"String","w":1,"_":null},"card_amount":{"c":{"numberType":"integer","minimumNumber":"-2147483648","maximumNumber":"2147483647"},"t":"Number","w":1,"_":5}},
        
        }
    },
    methods: {
        method1() {  },
        method2() {
            
        },
    },
    computed: {
        exclamationMarks(): string {
            return "";
        }
    },
    components: {
        MyAccount
    }
});


</script>

<style>
#tab{
        width: 600px;
        margin: 0 auto;
    }
    .tab-tit{
        font-size: 0;
        width: 600px;
    }
    .tab-tit a{
        display: inline-block;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        width: 25%;
        text-align: center;
        background: #ccc;
        color: #333;
        text-decoration: none;
    }
    .tab-tit .cur{
        background: #09f;
        color: #fff;
    }
    .tab-con div{
        border: 1px solid #ccc;
        height: 400px;
        padding-top: 20px;
    }
</style>