<template>
  <v-container fluid>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular 
        indeterminate 
        color="warning"
        :width="7"
        :size="70"
        v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <div v-else>
      <decks-row v-for="(group,index) in groups" :group="group" :key="index"></decks-row>
    </div>
  </v-container>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.getters.getLoading;
    },
    groups() {
      return this.$store.getters.getGroups;
    },
  }
};
</script>




