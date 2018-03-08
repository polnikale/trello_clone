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
      <decks-row v-for="(group,index) in groups.groups" :group="group" :key="index"></decks-row>
      <v-layout>
        <v-flex xs12 lg8 offset-lg2>
          <v-container>
            <v-layout row>
              <v-flex xl3 lg4 sm6 xs12>
                <v-btn v-if="!showGroupInput" @click="showGroupInput = true">Add new group</v-btn>
                <form v-else @submit.prevent="createNewGroup" class="pa-4" style="border-radius: 5px; border: 1px solid black;">
                  <v-text-field 
                    v-model="newGroupName" 
                    name="name"
                    flat
                    required
                    label="Name"
                    id="Name"></v-text-field>
                  <v-btn type="submit" :disabled="formIsValid" class="success">Submit!</v-btn>
                </form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      newGroupName: '',
      showGroupInput: false,
    };
  },
  computed: {
    loading() {
      return this.$store.getters.getLoading;
    },
    groups() {
      return this.$store.getters.getGroups;
    },
    formIsValid() {
      if (!this.newGroupName) {
        return true;
      }
      return false;
    },
  },
  methods: {
    createNewGroup() {
      this.$store.dispatch('createNewGroup', { name: this.newGroupName });
      this.newGroupName = '';
      this.showGroupInput = false;
    },
  },
};
</script>




