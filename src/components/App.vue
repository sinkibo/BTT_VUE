<template>
  <div>
    <Layout>
        <Header style="{position: 'fixed', width: '100%'}">
          <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo">BTT</div>
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
                      <router-link to="/help">Help <b class="caret"></b></router-link>
                  </template>
                  <MenuGroup title="help">
                      <MenuItem name="3-1"><router-link to="/reload">Reload</router-link></MenuItem>
                      <MenuItem name="3-2"><router-link to="/ref">Ref</router-link></MenuItem>
                  </MenuGroup>
                </Submenu>
            </div>
            
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
import { Vue, Component } from "vue-property-decorator";

@Component
export default class App extends Vue{
  
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
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-right{
    text-align: right;
}
.layout-content{
  padding: '0 50px';

}
</style>
