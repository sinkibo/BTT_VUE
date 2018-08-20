<template>
    <div>
        <Card style="width:95%;margin:20px;height:90%">
            <p slot="title">Self Account Transfer</p>
            <p>
                <Row type="flex" justify="start" class="code-row-bg">
                    <Col span="11">
                        <Alert type="warning" style="height:100%;height:100%">
                            <Card style="height:100%;height:100%">
                                <p slot="title">Transfer From</p>
                                <p>
                                     <Select v-model="transferForm.fromCardId" clearable filterable style="width:200px" @on-change="updateBalance()">
                                        <Option v-for="card in data.cardList" :value="card.card_id" :key="card.card_id" :disabled="card.card_id==transferForm.toCardId">
                                            {{card.card_id}}
                                        </Option>
                                    </Select>
                                </p>
                                <br>
                                <br>
                                <p>
                                    <Input v-model="balance" prefix="logo-usd" style="width: 200px" disabled />
                                </p>
                            </Card>
                        </Alert>
                    </Col>
                    <Col span="11" offset="2">
                        <Alert type="error" style="height:100%; width:100%">
                            <Card style="height:100%;height:100%">
                                <p slot="title">Transfer To</p>
                                <p>
                                     <Select v-model="transferForm.toCardId" clearable filterable style="width:200px">
                                        <Option v-for="card in data.cardList" :value="card.card_id" :key="card.card_id" :disabled="card.card_id==transferForm.fromCardId">
                                            {{card.card_id}}
                                        </Option>
                                    </Select>
                                </p>
                                <br>
                                <br>
                                <p>
                                    <InputNumber :max="1000000" v-model="transferForm.amount" style="width: 200px"/>
                                    <Button shape="circle" icon="md-close" size="small" v-if="transferForm.amount" @click="transferForm.amount=0">
                                    </Button>
                                </p>
                            </Card>
                        </Alert>
                    </Col>
                </Row>
                <br>
                <br>
                <div style="text-align: center;">
                    <p v-if="transferForm.toCardId=='' || transferForm.fromCardId=='' || transferForm.amount== '' || transferForm.amount==null">
                        <Button type="success" @click="doTransfer()" long ghost disabled>Transfer</Button>
                    </p>
                    <p v-else>
                        <Button type="success" @click="doTransfer()" long ghost>Transfer</Button>
                    </p>
                </div>
            </p>
        </Card>
      
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
