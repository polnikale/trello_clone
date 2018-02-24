<template>
  <v-container class="primary" light fluid style="min-height: 100%">
    <v-layout row>
      <v-flex xs12>
        <v-container>
          <v-layout row>
            <h2 style="color: #fff" class="mb-1">{{name}} | {{group}} | {{type}}</h2>
          </v-layout>
          <v-layout row>
            <v-flex xs2 v-for="(list,index) in lists" :key="index">
              <v-card light style="min-height: 90px; width: 90%;background-color:rgba(220, 220, 220, .9)" round>
                <v-card-title style="font-weight: 600">
                  {{list.name}}
                </v-card-title>
                <v-container fluid class="pa-2"> 
                  <v-layout row v-for="card in list.cards" :key="card.name" >
                    <v-flex xs12>
                      <new-card :card="card"></new-card> 
                      <!-- VERY IMPORTANT THING! WE ACTUALLY NEED TO SEPERATE IT TO IT'S OWN COMPONENT TO CREATE OWN SCOPE WITH CARD.PROPERTIES. IN OTHER CASE IT BLOCKS INPUT PRETTY MUCH! -->
                    </v-flex>
                  </v-layout>
                </v-container>
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
  props: ['id'],
  data() {
    return {
      name: 'Blabla',
      group: 'Personal',
      type: 'Private',
      lists: [
        {
          name: 'second list!',
          cards: [
            { name: 'do first', expires: '2018-02-18', showInputToRename: false },
            { name: 'do second', expires: '2018-02-24', showInputToRename: false },
            { name: 'do third', expires: '2018-02-27', showInputToRename: false },
          ],
        },
        {
          name: 'second list!',
          cards: [
            { name: 'complete first', expires: '2018-02-12', showInputToRename: false },
            { name: 'complete second', expires: '2018-02-21', showInputToRename: false },
            { name: 'complete third', expires: '2018-02-28', showInputToRename: false },
          ],
        },
      ],
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
    openRenameCard(card) {
      const currCard = card;
      currCard.showInputToRename = true;
    },
  },
};
</script>

