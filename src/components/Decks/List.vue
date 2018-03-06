<template>
  <div>
    <v-card light style="min-height: 90px; width: 90%;background-color:rgba(220, 220, 220, .9)" round>
      <v-card-title style="font-weight: 600">
        {{list.name}}
      </v-card-title>
      <v-container fluid class="pa-2"> 
        <v-layout row v-for="card in list.cards" :key="card.name" >
          <new-card :list="list"></new-card> 
        </v-layout>
        <v-layout row>
          <v-btn 
            xl3 lg4 sm6 xs12 
            class="secondary" 
            dark 
            style="min-height: 40px; width: 90%;"
            v-if="!openCardInput"
            @click="openCardInput = true">
            <span>Create new list!</span>
          </v-btn>
          <form v-else>alalala</form>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ['deck', 'list'],
  data() {
    return {
      openCardInput: false,
    };
  },
  computed: {
    lists() {
      const thisDeckLists = [];
      const lists = this.$store.getters.getLists;
      for (let counter = 0; counter < lists.length; counter++) {
        if (lists[counter].parentId === this.deck.id) {
          thisDeckLists.push(lists[counter]);
        }
      }
      return thisDeckLists;
    },
    formIsValid() {
      if (!this.newListName) {
        return true;
      }
      return false;
    },
  },
};
</script>

