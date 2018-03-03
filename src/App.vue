<template>
  <v-app>
    <v-navigation-drawer
      fixed
      class="primary"
      dark
      temporary
      :clipped="$vuetify.breakpoint.mdAndUp"
      app
      v-model="showToolbar">
      <v-list dense>
        <v-subheader inset class="subheading">Welcome to my app!</v-subheader>
        <v-divider></v-divider>
        <v-list-tile class="title" v-for="item in menuItems" :key="item.name" :to="item.link">
          <v-list-tile-action class="mr-2">
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{item.name}}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile class="title" @click="onLogout" v-if="userIsAuthenticated">
          <v-list-tile-action class="mr-2">
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      class="primary darken-2"
      dark
      app
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      fixed>
      <v-toolbar-title class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="showToolbar = !showToolbar" class="hidden-sm-and-up"></v-toolbar-side-icon>
        <router-link tag="span" to="/" style="cursor: pointer">
          Trello CLONE!
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn 
          v-for="item in menuItems" 
          :key="item.name"
          flat
          :to="item.link">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.name}}
        </v-btn>
        <v-btn 
          v-if="userIsAuthenticated"
          flat
          @click="onLogout">
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      showToolbar: false,
    };
  },
  computed: {
    userIsAuthenticated() {
      if (this.user !== null && this.user !== undefined) {
        return true;
      }
      return false;
    },
    user() {
      return this.$store.getters.getUser;
    },
    menuItems() {
      let menuItems = [
        { icon: 'lock_open', name: 'Sign in', link: '/signin' },
        { icon: 'exit_to_app', name: 'Sign up', link: '/signup' },
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: 'dashboard', name: 'Decks', link: '/decks' },
          { icon: 'account_box', name: 'Profile', link: '/profile' },
        ];
      }
      return menuItems;
    },
  },
  methods: {
    onLogout() {
      console.log('lol');
    }
  }
};
</script>

<style scoped>
v-list {
  font-size: 2em;
}
</style>

