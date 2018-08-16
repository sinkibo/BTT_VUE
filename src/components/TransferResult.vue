<template>
    <div>
        <Card style="width:95%;margin:20px;height:90%">
            <p slot="title">Transfer Successfully</p>
            <p>
                <Row type="flex" justify="start" class="code-row-bg">
                    <Col span="11">
                        <Alert type="warning" style="height:100%;height:100%">
                            <Card style="height:100%;height:100%">
                                <p slot="title">Transfer From</p>
                                <p>
                                    <Input v-model="transferForm.fromCardId" style="width: 200px" disabled />
                                </p>
                                <br>
                                <br>
                                <p>
                                    <Input v-model="transferForm.amount" prefix="logo-usd" style="width: 200px" disabled />
                                </p>
                            </Card>
                        </Alert>
                    </Col>
                    <Col span="11" offset="2">
                        <Alert type="error" style="height:100%; width:100%">
                            <Card style="height:100%;height:100%">
                                <p slot="title">Transfer To</p>
                                <p>
                                    <Input v-model="transferForm.toCardId" style="width: 200px" disabled />
                                </p>
                                <br>
                                <br>
                                <p>
                                    <Input v-model="balance" style="width: 200px" disabled />
                                </p>
                            </Card>
                        </Alert>
                    </Col>
                </Row>
                <br>
                <br>
                <div style="text-align: center;">
                    <Button type="success" @click="continueTransfer" long ghost>Continue Transfer</Button>
                </div>
            </p>
        </Card>
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
