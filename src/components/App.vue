<template>
  <div>
    <Layout>
        <Header style="{position: 'fixed', width: '100%'}">
          <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo" @click="goHome"></div>
            <div class="layout-nav">
                <MenuItem name="1">
                  <Icon type="ios-navigate" />
                  <router-link to="/myAccount">My Account</router-link>
                </MenuItem>
                <MenuItem name="2">
                  <Icon type="ios-people" />
                  <router-link to="/trans">Transer</router-link>
                </MenuItem>
                <Submenu name="3">
                  <template slot="title">
                      <Icon type="ios-stats" />
                      Help
                  </template>
                  <MenuItem name="3-1"><router-link to="/home">Reload</router-link></MenuItem>
                  <MenuItem name="3-2"><router-link to="/about">About BTT</router-link></MenuItem>
                  <MenuItem name="3-2"><router-link to="/unicome">About Unicome</router-link></MenuItem>
                  <MenuItem name="3-3"><a href="#" @click="switchTechNotes()">Tech Notes</a></MenuItem>
                </Submenu>
            </div>
            <div class="layout-login-out-button" style="font-size:16px;color:white;font-weight:bolder">Welcome {{auths.isLoggedIn ? auths.user.name : ""}}&nbsp;&nbsp;<Button type="primary" v-if="auths.isLoggedIn" @click="logoutAction">Logout</Button> <Button type="primary" v-if="!auths.isLoggedIn" @click="login">Login</Button> </div>
          </Menu>
        </Header>
        <Content class="layout-content">
          <router-view/>
        </Content>
        <Footer class="layout-footer-right">
          <a >BTT Client Engine Example(VUE)</a> © <a href="https://www.unicomglobal.com/about/contact-us/" target="_unicom">unicom</a>
            &nbsp;
        </Footer>
    </Layout>
  </div>
</template>

<script lang="ts">
import { AuthService } from '../user/auth-service';
import { mapActions } from 'vuex'

export default {
    computed: {
        auths(): AuthService{
            return this.$store.state.auths;
        }
    },
    methods: {
        ...mapActions ({
            doLogout: 'logout'
        }),
        goHome(): void{
          this.$router.push('/home');
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
        },

        login(): void{
          this.$router.push({ path: 'login' });
        },

        switchTechNotes(): void{
          this.$parent.$store.commit('changeDebugModel');
        }
    }
}
</script>

<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 45px;
    height: 45px;
    background-image: url("/static/images/logo.png");
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
    cursor:pointer;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 250px;
}
.layout-footer-right{
    text-align: right;
}
.layout-content{
  padding: '0 50px';

}
.layout-login-out-button{
  float: right;
  margin: 0 auto;
  margin-right: 20px;
}
</style>
