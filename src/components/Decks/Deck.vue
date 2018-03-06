<template>
  <v-container class="primary deck-main" light fluid style="min-height: 100%"> <!-- dont' change deck-main!!!!! -->
    <v-layout row>
      <v-flex xs12>
        <v-container>
          <v-layout row>
            <h2 style="color: #fff" class="mb-1">{{deck.name}} |<span v-for="group in deck.groupName" :key="group"> {{group}} |</span> {{deck.type}}</h2>
          </v-layout>
          <div style="display: flex">
            <new-list style="width: 320px; flex-shrink: 0;" v-if="list != ''" v-for="(list,index) in lists" :key="index" :list="list" :deck="deck"></new-list>
            <div style="width: 320px; flex-shrink: 0;">
              <v-btn 
                xl3 lg4 sm6 xs12 
                class="secondary pa-2" 
                dark 
                style="min-height: 90px; width: 90%;"
                @click="openListInput = true"
                v-if="!openListInput" >
                <span>Create new list!</span>
              </v-btn>
              <form v-else class="pa-2 accent" style="border-radius: 5px" dark @submit.prevent="createNewList">
                <v-layout row>
                  <v-flex xs12 sm6 offset-sm3>
                    <v-text-field
                      name="name"
                      label="Name"
                      id="Name"
                      v-model="newListName"
                      required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12 sm6 offset-sm3>
                    <v-btn 
                        class="primary" 
                        flat
                        :disabled="formIsValid"
                        type="submit">Create meetup</v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </div>
          </div>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      decks: '',
      openListInput: false,
      newListName: 'Your list name!',
    };
  },
  computed: {
    deck() {
      this.decks = this.$store.getters.getDecks;
      for (let counter = 0; counter < this.decks.length; counter += 1) {
        if (this.decks[counter].id === this.id) {
          return this.decks[counter];
        }
      }
      return false;
    },
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
  methods: {
    createNewList() {
      this.$store.dispatch('createNewList', { name: this.newListName, parentId: this.deck.id, });
      this.newListName = 'Your list name!';
      this.openListInput = false;
    },
  },
};
</script>

<style>
.deck-main {
  background-color: #47CAF9;
  overflow-x: auto; 
}
</style>
<!-- in case we have on deck component too much lists, it shouldn't shrink and have scroll!!!!!! --> 


