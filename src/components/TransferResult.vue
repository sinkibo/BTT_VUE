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
                                    <Input :value="transferData.transferForm.fromCardId" style="width: 200px" disabled />
                                </p>
                                <br>
                                <br>
                                <p>
                                    <Input :value="transferData.transferForm.amount" prefix="logo-usd" style="width: 200px" disabled />
                                </p>
                            </Card>
                        </Alert>
                    </Col>
                    <Col span="11" offset="2">
                        <Alert type="error" style="height:100%; width:100%">
                            <Card style="height:100%;height:100%">
                                <p slot="title">Transfer To</p>
                                <p>
                                    <Input :value="transferData.transferForm.toCardId" style="width: 200px" disabled />
                                </p>
                                <br>
                                <br>
                                <p>
                                    <Input :value="balance" style="width: 200px" prefix="logo-usd" disabled />
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
    },
    methods: {
        continueTransfer(){
            this.$router.push("/trans");
        }
    },

    created(){
        let acc = this.$store.state.transfer.transferData.cardList.filter((card: any) => {
            return card.card_id == this.$store.state.transfer.transferData.transferForm.toCardId;
        });
        let balance = (acc && acc[0]) ? acc[0].balance : "";
        this.$store.commit('transfer/setBalance',balance);
    }
}
</script>

<style>

</style>
