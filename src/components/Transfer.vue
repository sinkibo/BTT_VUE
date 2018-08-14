<template>
    <div>
        <h2 class="win-title">Self Account Transfer</h2>

        <form id="transForm" @submit.prevent="doTransfer()">
            <div class="row ">
                <div class="col-12 col-sm-6">
                    <div class="border border-success boxshadow" style="min-height:10em;padding:1em 3em 1em 1em;margin-bottom:1em;">
                        <h6>Transfer from</h6>
                        <div hideRequiredMarker="false" floatLabel="auto">
                            <select placeholder="from Account" v-model="transferForm.fromCardId" name="transferForm.fromCardId" @change="updateBalance()" required>
                                <option>None</option>
                                <option v-for="(card, index) in data.cardList" :value="card.card_id" :class="{'disabled':card.card_id==transferForm.toCardId}" :key="index">
                                    {{card.card_id}}
                                </option>
                            </select>
                           
                        </div>
                        <br/>
                        <br/>
                        <div hideRequiredMarker="false" floatLabel="auto">
                            <input matInput placeholder="Balance" :value="balance" disabled class="text-info">
                            <br/>
                        </div>
                    </div>
                </div>
            
                <div class="col-12 col-sm-6">
                    <div class="border border-danger boxshadow" style="min-height:10em;padding:1em 3em 1em 1em;margin-bottom:1em;">
                        <h6>Transfer to</h6>
                        <div hideRequiredMarker="false" floatLabel="auto">
                            <select placeholder="to Account" v-model="transferForm.toCardId" name="transferForm.toCardId" required>
                                <option>None</option>
                                <option v-for="(card, index) in data.cardList" :value="card.card_id" :class="{'disabled':card.card_id==transferForm.fromCardId}" :key="index">
                                    {{card.card_id}}
                                </option>
                            </select>
                            
                        </div>
                        <br/>
                        <br/>
                        <div hideRequiredMarker="false" floatLabel="auto"> 
                            <input matInput name="transferForm.amount" v-model="transferForm.amount" placeholder="Amount" type="number" required>
                            <button mat-button v-if="transferForm.amount" matSuffix mat-icon-button aria-label="Clear" @click="transferForm.amount=''">
                                <i class="fa fa-close" style="color:green"></i>
                            </button>
                            <br/>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12" style="text-align:center;">
                    <button mat-raised-button color="primary" type="submit">Transfer</button>
                         &nbsp;
                    <button mat-raised-button color="warn" type="reset">Reset</button>
                </div>
            </div>
        </form>
        <span class="mat-error">{{message}}</span>

        <!-- debug information -->
        <div v-if="isDevMode">
        <pre class="bg-success text-white" style="padding:1em;margin-top:1em;">
        Tech Notes:

        Transfer Component
        @ /src/app/trans/transfer
        Template-driven form with angular material controls
        Form Data:
        {{transForm.value | json }}
        </pre>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject } from "vue-property-decorator";
import { ClientEngineService } from '../app/unicomsi/btt/clientengine/vue/ClientEngineService';
import { Flow } from '../app/unicomsi/btt/clientengine/vue/Flow'

@Component
export default class Transfer extends Vue {
    @Inject('clientEngineService') private clientEngineService: ClientEngineService | any;
    @Inject('isDevMode') private isDevMode: boolean | any;

    message = "";
    data: any = {};
    transferForm: any = {};
    balance: string = "";

    constructor(){
        super();
    }

    created(){
        this.clientEngineService.launchFlow("AccountTransferFlow").then(
            (store: any) => {
                console.debug(store);
                let flow: Flow = this.clientEngineService.getFlow();
                this.data = flow.getStore().extractData();
                this.transferForm = this.data.transferForm;
                // return flow.changeEvent("login", this._user);
            }
        )
    }

    doTransfer(){
        this.clientEngineService.getFlow("AccountTransferFlow").changeEvent("submit", this.data)
        .then(
            (store: any)=>{
                console.debug(store);
                let flow: Flow = this.clientEngineService.getFlow();
                if (flow.getState() !="ResultState" ) // error at server side
                {
                    this.data = flow.getStore().extractData();
                    this.transferForm = this.data.transferForm;
                    return;
                }
                flow.changeEvent("exit").then(()=>{
                    this.showResult();
                });
            }
        );
    }

    updateBalance(){
        console.debug(this.data);
        let acc = this.data.cardList.filter((card: any)=>{
            return card.card_id == this.transferForm.fromCardId;
        });

        this.balance = (acc && acc[0]) ? acc[0].balance : "";
    }

    showResult(){
        this.$router.push({ path: "/transResult" });
    }
}
</script>

<style>

</style>
