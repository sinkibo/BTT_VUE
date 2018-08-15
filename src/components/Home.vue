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
                        <img src="../../static/images/sample.jpg" alt="BTT Angular Sample" style="display: block; width: 100%; height:100%">
                        <div>
                        <a href="https://support.unicomsi.com/manuals/mbn/900/">About BTT Client Engine</a>
                        </div>
                    </div>
                </CarouselItem>
            </Carousel>
        </div>

        <!-- debug information -->
        <div v-if="isDevMode">
            <pre class="bg-success text-white" style="padding:1em;margin-top:1em;">
            Tech Notes:

            Configurations:
            @ /static/unicomsi/btt/clientengine/Configure.js
            {{ btt.CONF }}
            </pre>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Inject } from "vue-property-decorator";
import {  AuthService } from '../user/auth-service';
import { ClientEngineService } from '../app/unicomsi/btt/clientengine/vue/ClientEngineService';
@Component
export default class Home extends Vue {

    @Inject('clientEngineService') private clientEngineService: ClientEngineService | any;
    @Inject('auths') private auths: AuthService | any;
    @Inject('isDevMode') private isDevMode: boolean | any;

    login(){
        this.$router.push({ path: 'login' });
    }
    
}

</script>

<style>

</style>
