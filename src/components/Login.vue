<template>
    <div class="login">
        <Card :bordered="false">
            <p slot="title">Login</p>
            <p>
                <div>
                    <Input type="text" :clearable=true :maxlength=20 prefix="ios-contact" placeholder="Enter name" style="width: auto" v-model="username"/>
                </div>
                <br/>
                <div>
                    <Input type="password" :clearable=true :maxlength=20 prefix="ios-lock" placeholder="Enter password" style="width: auto" v-model="pwd"/>
                </div>
                <br/>
            
                <div>
                    <Button v-if="!auths.isLoggedIn" type="primary" @click="loginAction">Start</Button>
                    <Button type="warning" @click="logoutAction" v-if="auths.isLoggedIn">Logout</Button>
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
import { mapActions } from 'vuex'
import {  AuthService } from '../user/auth-service';


export default {
    computed: {
        auths(): AuthService{
            return this.$store.state.auths;
        },
        isDevMode(): boolean {
            return this.$store.state.isDevMode;
        },
        message(): String{
            return this.$store.state.message;
        },
        username: {
          get () {
            return this.$store.state.auths.user.account_id;
          },
          set (value) {
            this.$store.commit('updateUserName', value)
          }
        },
        pwd: {
            get () {
                return this.$store.state.auths.user.password
            },
            set (value) {
                this.$store.commit('updatePWD', value)
            }
        },
    },
    methods: {
        ...mapActions ({
            doLogin: 'login',
            doLogout: 'logout'
        }),
        loginAction(){
            this.doLogin().then(
                (redirect)=>{
                    console.log('success login')
                    this.$router.push({ path: redirect });
                },
                ()=>{
                    console.log('fail to login')
                }
            );
        },
        logoutAction(){
            this.doLogout().then(
                (redirect)=>{
                    console.log('success logout')
                    this.$router.push({ path: redirect });
                },
                ()=>{
                    console.log('fail to logout')
                }
            );
        }
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
