<template>
  <v-container class="primary" light fluid style="min-height: 100%">
    <v-layout row>
      <v-flex xs12>
        <v-container>
          <v-layout row>
            <h2 style="color: #fff" class="mb-1">{{deck.name}} |<span v-for="group in deck.groupName" :key="group"> {{group}} |</span> {{deck.type}}</h2>
          </v-layout>
          <v-layout row>
            <div style="width: 320px" v-if="list != ''" v-for="(list,index) in deck.lists" :key="index">
              <v-card light style="min-height: 90px; width: 90%;background-color:rgba(220, 220, 220, .9)" round>
                <v-card-title style="font-weight: 600">
                  {{list.name}}
                </v-card-title>
                <v-container fluid class="pa-2"> 
                  <v-layout row v-for="card in list.cards" :key="card.name" >
                    <new-card :card="card" :deck="deck"></new-card> 
                    <!-- VERY IMPORTANT THING! WE ACTUALLY NEED TO SEPERATE IT TO IT'S OWN COMPONENT TO CREATE OWN SCOPE WITH CARD.PROPERTIES. IN OTHER CASE IT BLOCKS INPUT PRETTY MUCH! -->     
                  </v-layout>
                </v-container>
              </v-card>
            </div>
            <div style="width: 320px">
              <v-btn 
                xl3 lg4 sm6 xs12 
                class="secondary pa-2" 
                dark 
                style="min-height: 90px; width: 90%;"
                @click="openInput = !openInput"
                v-if="!openInput" >
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
          </v-layout>
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
      openInput: false,
      newListName: 'Your list name!',
    };
  },
  computed: {
    deck() {
      for (let counter = 0; counter < this.decks.length; counter += 1) {
        if (this.decks[counter].id === this.id) {
          return this.decks[counter];
        }
      }
      return false;
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
      this.$store.dispatch('createNewList', { name: this.newListName, id: this.deck.id });
      this.newListName = 'Your list name!';
      this.openInput = false;
    },
  },
  created() {
    this.decks = this.$store.getters.getDecks;
  },
};
</script>

