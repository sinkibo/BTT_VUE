<template>
    <div>
        <h2 class="win-title">Login</h2>
        <form class="bg-white" style="min-width:300px;" @submit.prevent="doLogin">
            <div class="row">
                <div class="col-12">
                    <!--mat-form-field hideRequiredMarker="false" floatLabel="auto"-->
                        <input matInput name="account_id" v-model="auths.user.account_id" placeholder="Account ID" required>
                        <button type="button" mat-button v-if="auths.user.account_id" matSuffix mat-icon-button aria-label="Clear" @click="clear('account')">
                            <i class="fa fa-close" style="color:green"></i>
                        </button>
                        <!--mat-hint>Please input your Account ID</mat-hint-->
                    <!--/mat-form-field-->
                </div>
            </div>
            <br/>
            <div class="row">
                <div class="col-12">
                    <!--mat-form-field hideRequiredMarker="false" floatLabel="auto"-->
                        <input matInput name="password" v-model="auths._user.password" placeholder="Password" type="password" required>
                        <button type="button" mat-button v-if="auths._user.password" matSuffix mat-icon-button aria-label="Clear" @click="clear('pwd')">
                            <i class="fa fa-close" style="color:green"></i>
                        </button>
                        <!--mat-hint>Please input your Password</mat-hint-->
                    <!--/mat-form-field-->
                </div>
            </div>
            <br/>
    
            <div class="row" >
                <div class="col-12" style="text-align:center" >
                    <button mat-raised-button color="primary" type="submit" v-if="!auths.isLoggedIn" >Login</button>
                    <button mat-raised-button color="warn"    type="button" @click="logout" v-if="auths.isLoggedIn">Logout</button>
                </div>
            </div>
        </form>
        <span class="mat-error">{{ message }}</span>

        <!-- debug information -->
        <div v-if="isDevMode">
            <pre class="bg-success text-white" style="padding:1em;margin-top:1em;">
            Tech Notes:

            Login Module
            @ /src/components/login
                Vue Materail
                BTT Flow: LoginFlow
                Form data:
                {{loginForm.value | json }}
            </pre>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject } from "vue-property-decorator";
import { UserModel } from "../user/user-model";
import { AuthService } from '../user/auth-service';
import { ClientEngineService } from '../app/unicomsi/btt/clientengine/vue/ClientEngineService';
@Component
export default class Login extends Vue {
    
    @Inject('auths') private auths: AuthService | any;
    @Inject('isDevMode') private isDevMode: boolean | any;
    message = "";

    doLogin(credential:any): void {
        this.message = 'Trying to log in ...';

            this.auths.login().then(() => {
                if (this.auths._user.isLoggedIn){
                    // Get the redirect URL from our auth service
                    // If no redirect has been set, use the default
                    let redirect = this.auths.redirectUrl ? this.auths.redirectUrl : '/myAccount';

                    // Set our navigation extras object
                    // that passes on our global query params and fragment
                    //let navigationExtras: NavigationExtras = {
                    //queryParamsHandling: 'preserve',
                   // };

                    // Redirect the user
                    this.$router.push({ path: redirect });
                }
            }).catch(
                (reason :any) => {
                    this.message = reason.message ? reason.message : "Failed to login, please try again!";
                }
            );
    }

    logout() :void {
            this.auths.logout();
    }

    clear(type :string) : void{
            if(type == 'pwd'){
                Vue.set(this.auths._user,'password', '');
            }else if(type == 'account'){
                Vue.set(this.auths._user,'account_id', '');
            }
            
    }

    get user() :any{
        return this.auths._user;
    }
    
}

</script>

<style>

</style>
