<template>
    <div>
        <div style="text-align:center;">
            <h2>Welcome to BTT VUE Example!
                &nbsp;&nbsp;<Button @click= "login" v-show="!auths.isLoggedIn" type="primary">Start</Button>
            </h2>
            <Carousel autoplay dots="outside" trigger="click" height="auto" arrow="always">
                <CarouselItem>
                    <div class="demo-carousel"><img src="../../static/images/BTT.jpg" alt="What is BTT?" style="display: block; width: 100%; height:100%"></div>
                </CarouselItem>
                <CarouselItem>
                    <div class="demo-carousel"><img src="../../static/images/ClientEngine.jpg" alt="Client Engine Architecture" style="display: block; width: 100%; height:100%"></div>
                </CarouselItem>
                <CarouselItem>
                    <div class="demo-carousel">
                        <img src="../../static/images/sample.jpg" alt="BTT Vue Sample" style="display: block; width: 100%; height:100%">
                        <div>
                        <a href="https://support.unicomsi.com/manuals/mbn/900/">About BTT Client Engine</a>
                        </div>
                    </div>
                </CarouselItem>
            </Carousel>
        </div>

        <!-- debug information -->
        <div v-if="this.$parent.$store.state.isDevMode">
            <pre style="padding:1em;margin-top:1em;background-color: #28a745!important;color: #fff!important;">
Tech Notes:
Configurations:
@ /static/unicomsi/btt/clientengine/Configure.js
{{ this.$parent.$store.state.clientEngineService._BTT.CONF}}
            </pre>
        </div>
    </div>
</template>
<script lang="ts">
import {  AuthService } from '../user/auth-service';
import { ClientEngineService } from '../app/unicomsi/btt/clientengine/vue/ClientEngineService';
export default {
    computed: {
        auths(): AuthService{
            return this.$store.state.auths;
        },
        clientEngineService(): ClientEngineService {
            return this.$store.state.clientEngineService;
        },
        isDevMode(): boolean {
            return this.$store.state.isDevMode;
        }
    },
    methods: {
        login(){
        this.$router.push({ path: 'login' });
    }
    }
}

</script>

<style>

</style>
