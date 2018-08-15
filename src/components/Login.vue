<template>
    <div class="login">
        <Card :bordered="false">
            <p slot="title">Login</p>
            <p>
                <div>
                    <Input type="text" :clearable=true :maxlength=20 prefix="ios-contact" placeholder="Enter name" style="width: auto" v-model="auths.user.account_id"/>
                </div>
                <br/>
                <div>
                    <Input type="password" :clearable=true :maxlength=20 prefix="ios-lock" placeholder="Enter password" style="width: auto" v-model="auths.user.password"/>
                </div>
                <br/>
            
                <div>
                    <Button v-if="!auths.isLoggedIn" type="primary" @click="doLogin">Start</Button>
                    <Button type="warning" @click="logout" v-if="auths.isLoggedIn">Logout</Button>
                </div>
            </p>
        </Card>
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

    doLogin(name:any): void {
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

    get user() :any{
        return this.auths._user;
    }
    
}

</script>

<style>
.login{
    background:#eee;
    padding: 20px;
    width: 300px;
    margin: 0 auto;
}

</style>
