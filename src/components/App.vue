<template>
  <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
    <div>
      <div class="layout-menu-left" :class="{'layout-mobile-menu' : isLeftHiden}">
        <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']" :class="menuitemClasses">
            <div class="layout-logo-left" @click="goHome">
              <img src="/static/images/logo.png" />
              <p>BTT</p>
            </div>
            <MenuItem name="1">
              <Icon type="ios-navigate" />
                <router-link to="/myAccount">My Account</router-link>
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-people" />
              <router-link to="/trans">Transfer</router-link>
            </MenuItem>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-stats" />
                  Help
              </template>
              <MenuItem name="3-1"><router-link to="/home">Reload</router-link></MenuItem>
              <MenuItem name="3-2"><router-link to="/about">About BTT</router-link></MenuItem>
              <MenuItem name="3-2"><router-link to="/unicom">About Unicom</router-link></MenuItem>
              <MenuItem name="3-3"><a href="#" @click="switchTechNotes()">Tech Notes</a></MenuItem>
            </Submenu>            
          </Menu>  
      </div>

      <div class="layout-content-right " :class="{'layout-mobile-content' : isLeftHiden}">

        <div class="layout-header">
          <i-button type="text" @click="toggleClick">
            <Icon type="md-list" size="30"></Icon>
          </i-button>

          <div class="user-banner">
            <Badge class="user-banner-message">
              <!--<Icon type="ios-email-outline" size="30"></Icon>-->
            </Badge>

            <Icon class="user-banner-icon" type="ios-person-outline" size="30"></Icon>

            <Dropdown trigger="click">
              <a href="javascript:void(0)">
                {{auths.isLoggedIn ? auths.user.name : ""}}
                <Icon type="md-arrow-dropdown"></Icon>
              </a>
              <Dropdown-menu slot="list">
                <Dropdown-item @click.native="logoutAction" v-if="auths.isLoggedIn">Logout</Dropdown-item>
                <Dropdown-item @click.native="login" v-if="!auths.isLoggedIn">Login</Dropdown-item>
              </Dropdown-menu>
            </Dropdown>
          </div>
        </div>
        <keep-alive>
          <router-view class="layout-router-view"></router-view>
        </keep-alive>

        <div class="layout-copy">
          <a >BTT Client Engine Example(VUE)</a> © <a href="https://www.unicomglobal.com/about/contact-us/" target="_unicom">unicom</a>
            &nbsp;
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { AuthService } from '../user/auth-service';
import { mapActions } from 'vuex'

export default {
    data(){
      return {
        isCollapsed: false,
        spanLeft: 5,
        spanRight: 19,
        isLeftHiden: false
      };
    },
    computed: {
        auths(): AuthService{
            return this.$store.state.auths;
        },
        menuitemClasses: function () {
          return [
            'menu-item',
            this.isCollapsed ? 'collapsed-menu' : ''
          ]
        },
        iconSize () {
          return this.spanLeft === 5 ? 14 : 24;
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
        },
        toggleClick () {
          this.isLeftHiden = !this.isLeftHiden;
        },
        togglemobileauto(ismobile){
          this.isLeftHiden = ismobile
        }
        
    },
    beforeMount () {
      const {body} = document
      const WIDTH = 992;
      const RATIO = 3;
      const handler = () => {
        if (!document.hidden) {
          let rect = body.getBoundingClientRect()
          let isMobile = rect.width - RATIO < WIDTH
          this.togglemobileauto(isMobile)
        }
      }
      document.addEventListener('visibilitychange', handler)
      window.addEventListener('DOMContentLoaded', handler)
      window.addEventListener('resize', handler);
    }
}
</script>

<style scoped>
 .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
    text-align: right;
  }

  .layout-menu-left {
    background: white;
    position: fixed;
    width: 200px;
    height: 100%;
    border-right: 1px solid lightgray;
    border-bottom: 2px solid lightgray;
  }

  .layout-content-right {
    margin-left: 200px;
    position: relative;
    height: 100vh;
  }

  .layout-header {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    /*position: fixed;*/
    /*top: 0px;*/
    /*left: 0px;*/
    /*width: 100%;*/
    /*padding-right: 200px;*/
  }

  .layout-logo-left {
    width: 90%;
    height: 45px;
    background: white;
    border-radius: 3px;
    margin: 15px auto;
  }

  .layout-logo-left p {
    text-align: center;
    font-size: 30px;
    font-weight: 700;
  }

  .layout-logo-left img {
    float: left;
    margin-left: 20px;
    cursor:pointer;
  }

  .layout-router-view {
    height: calc(100vh - 92px);
    overflow:scroll;
  }

  .user-banner {
    float: right;
    vertical-align: middle;
    padding: 6px 15px;
  }

  .user-banner-icon {
    vertical-align: middle
  }

  .user-banner-message {
    margin-right: 20px
  }

  .ivu-menu-vertical.ivu-menu-light:after {
    background: none;
  }

  .layout-mobile-content {
    margin-left: 0px;
  }

  .layout-mobile-menu {
    display: none;
  }

  a {
    text-decoration: none;
  }

</style>
