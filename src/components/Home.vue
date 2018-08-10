<template>
    <div>
        <!--ng-template #popTemplate>
            Pause on mouse hover,<br/>
            Click to switch page.<br/>
            <span style="color:red;">{{pop['showtimer']}}</span>
        </ng-template-->
        <div class="container" style="text-align:center;">
            <h2>Welcome to BTT VUE Example!
                &nbsp;&nbsp;<button class="btn btn-outline-success my-2 my-sm-0" @click= "login" v-show="!auths.isLoggedIn">Start</button>
            </h2>
            <!--carousel id="home-carousel" [interval]="10000">
                <slide>
                    <img src="../assets/images/BTT.jpg" alt="What is BTT?" style="display: block; width: 100%;">
                </slide>
                <slide>
                    <img src="../assets/images/ClientEngine.jpg" alt="Client Engine Architecture" style="display: block; width: 100%;">
                </slide>
                <slide>
                    <img src="../assets/images/sample.jpg" alt="BTT Angular Sample" style="display: block; width: 100%;">
                    <div class="carousel-caption d-md-block">
                    <a href="https://support.unicomsi.com/manuals/mbn/900/">About BTT Client Engine</a>
                    </div>
                </slide>
            </carousel-->
            <!--span
                #pop="bs-popover"
                popoverTitle="Tech Notes"
                [popover]="popTemplate"
                placement="top"
                [isOpen]="dev.isDevMode"
                (onShown)="hidePopAfter(pop, 4)"
            >&nbsp;</span-->
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
    //@Prop() name!: string;

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
