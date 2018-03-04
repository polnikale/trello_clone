<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3 class="primary">
        <v-card class="pa-4">
          <v-card-media class="mb-5" src="https://wac-cdn.atlassian.com/dam/jcr:d6a89d75-bad0-46f3-88aa-406542eb6cb5/trello-logo-blue-flat.png?cdnVersion=jp" height="220px"></v-card-media>
          <v-card-title class="primary--text">
            <h1 class="mx-auto mb-3" >Welcome to my amazing Trello clone!</h1>
            <h3>I've worked really alot on this. I really hope you like it. To begin using my app, click the button below!</h3>
          </v-card-title>
          <v-card-actions>
            <v-container v-if="userIsAuthorized">
              <v-layout row >
                <v-flex style="text-align: right">
                  <v-btn to="/decks" class="primary ml-auto">Go to decks!</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
            <v-container v-else>
              <v-layout row >
                <v-flex style="text-align: center">
                  <v-btn to="/signin" class="primary">Signin</v-btn>
                  <v-btn to="/signup" class="primary">Sign Up!</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    userIsAuthorized() {
      if (this.user !== null && this.user !== undefined) {
        return true;
      } else {
        return false;
      }
    },
    user() {
      return this.$store.getters.getUser;
    },
  },

};
</script>
