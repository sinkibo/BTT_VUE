<template>
    <div>
        <Alert type="success" class="layout-default">
            <Card class="layout-default">
                <p slot="title" class="layout-title">About BTT</p>               
                <p class="layout-p">
                    <img class="layout-img" src="../../static/images/sample.jpg" alt="customer image"/>
                </p>
            </Card>
        </Alert>
    </div>
</template>

<script>
 export default {
      
      }
</script>

<style>
.layout-default{
    width:100%;
    height:100%
}
.layout-p{
    max-width: 1140px;
}
.layout-img{
    margin-top: 2em;
    margin-bottom:2em;
    max-width: 100%;
    height: auto;
}
.layout-title{
    text-align: center;
    font-size: 20px !important;
    color: blue !important;
}
</style>
