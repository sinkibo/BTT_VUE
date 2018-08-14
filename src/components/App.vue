<template>
  <div id="app">
    <nav class="navbar navbar-default" role="navigation">
      <div class="navbar-header">
        <router-link class="navbar-brand" href="#" to="/home">Unicom</router-link>
      </div>
      <div>
        <ul class="nav navbar-nav">
          <li class="active">
            <router-link to="/myAccount">My Account</router-link>
          </li>
          <li>
            <router-link to="/transer">Transer</router-link>
          </li>
          <li class="dropdown">
            <router-link to="/help">Help <b class="caret"></b>
            </router-link>
            <ul class="dropdown-menu">
              <li>
                <router-link to="/reload">Reload</router-link>
              </li>
              <li class="divider"></li>
              <li><router-link to="/ref">Ref</router-link></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Home extends Vue{
  
}
</script>

<style>
</style>
