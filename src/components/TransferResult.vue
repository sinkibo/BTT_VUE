<template>
    <div>
        <h2 class="win-title">Transfer successfully</h2>
        <div class="row ">
            <div class="col-12 col-sm-6">
                <div class="border border-success boxshadow" style="min-height:10em;padding:1em 3em 1em 1em;margin-bottom:1em;">
                    <h6>Transfer from</h6>
                    <div>
                        <input matInput placeholder="from Account" :value="transferForm.fromCardId" disabled>
                        <br/>
                    </div>
                    <br/>
                    <br/>
                    <div hideRequiredMarker="false" floatLabel="auto">
                        <input matInput :value="transferForm.amount" placeholder="Amount" disabled>
                    </div>
                </div>
            </div>

            <div class="col-12 col-sm-6">
                <div class="border border-danger boxshadow" style="min-height:10em;padding:1em 3em 1em 1em;margin-bottom:1em;">
                    <h6>Transfer to</h6>
                    <div>
                        <input matInput :value="transferForm.toCardId" placeholder="to Account" disabled>
                    </div>
                    <br/>
                    <br/>
                    <div hideRequiredMarker="false" floatLabel="auto">
                        <input matInput placeholder="Balance" :value="balance" disabled class="text-info">
                        <br/>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12" style="text-align:center;">
                <a class="nav-link">
                    <button mat-raised-button color="warn" type="button" @click="continueTransfer">Continue Transfer</button>
                </a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Inject } from "vue-property-decorator";
import { ClientEngineService } from '../app/unicomsi/btt/clientengine/vue/ClientEngineService';

@Component
export default class TransferResult extends Vue {
    @Inject('clientEngineService') private clientEngineService: ClientEngineService | any;

    data: any = {};
    transferForm: any = {};
    balance: string = "";

    constructor(){
        super();
    }

    created(){
        let flow = this.clientEngineService.getFlow("AccountTransferFlow");
        this.data = flow.getStore().extractData();
        this.transferForm = this.data.transferForm;
        let acc = this.data.cardList.filter((card: any) => {
            return card.card_id == this.transferForm.toCardId;
        });
        
        console.debug(this.transferForm);
        this.balance = (acc && acc[0]) ? acc[0].balance : "";
    }

    continueTransfer(){
        this.$router.push("/trans");
    }
}
</script>

<style>

</style>
