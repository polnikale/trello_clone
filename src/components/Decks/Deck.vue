<template>
  <v-container class="primary" light fluid style="min-height: 100%">
    <v-layout row>
      <v-flex xs12>
        <v-container>
          <v-layout row>
            <h2 style="color: #fff" class="mb-1">{{deck.name}} |<span v-for="group in deck.groupName" :key="group"> {{group}} |</span> {{deck.type}}</h2>
          </v-layout>
            <v-layout row>
              <div style="width: 320px" v-for="(list,index) in deck.lists" :key="index">
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
  },
  created() {
    this.decks = this.$store.getters.getDecks;
  },
};
</script>

