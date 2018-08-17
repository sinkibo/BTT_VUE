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
                </Submenu>
            </div>
            <div class="layout-login-out-button" style="font-size:16px;color:white;font-weight:bolder">Welcome {{auths.isLoggedIn ? auths.user.name : ""}}&nbsp;&nbsp;<Button type="primary" v-if="auths.isLoggedIn" @click="logout">Logout</Button> <Button type="primary" v-if="!auths.isLoggedIn" @click="login">Login</Button> </div>
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
import { Vue, Component, Inject } from "vue-property-decorator";
import { AuthService } from '../user/auth-service';

@Component
export default class App extends Vue{
  @Inject('auths') private auths: AuthService | any;

  goHome(): void{
    this.$router.push('/home');
  }

  logout():void {
    this.auths.logout();
  }

  login(): void{
    this.$router.push({ path: 'login' });
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
