<template>
  <v-container fluid>
    <v-layout row v-for="(group,index) in groups" :key="index">
      <v-flex xs12 lg8 offset-lg2>
        <h3 class="mb-1 ml-2">{{group}}</h3>
        <v-container>
          <v-layout row justify-start wrap>
            <v-flex xl3 lg4 sm6 xs12 v-for="deck in decks" :key="deck.id"  v-if="isInTheGroup(deck,group)">
              <v-card class="primary mb-2 pa-2 ml-2 mr-2" :to="'./deck/'+deck.id" dark style="min-height: 90px">
                {{deck.name}}
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: 'First app!',
    };
  },
  methods: {
    isInTheGroup(deck, group) {
      const deckGroups = deck.groupName;
      let found = false;
      for (let deckGroupIndex = 0; deckGroupIndex < deckGroups.length; deckGroupIndex += 1) {
        if (group === deckGroups[deckGroupIndex]) {
          found = true;
          break;
        }
      }
      return found;
    },
  },
};
</script>

