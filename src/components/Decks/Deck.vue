<template>
  <v-container class="primary" light fluid style="min-height: 100%">
    <v-layout row>
      <v-flex xs12>
        <v-container>
          <v-layout row>
            <h2 style="color: #fff" class="mb-1">{{name}} | {{group}} | {{type}}</h2>
          </v-layout>
          <v-layout row>
            <v-flex xs2 v-for="(list,index) in lists" :key="index" round>
              <v-card light style="min-height: 90px; width: 90%;">
                <v-card-title>
                  {{list.name}}
                  <v-container fluid class="pa-0"> 
                    <v-layout row v-for="card in list.cards" :key="card.name" >
                      <v-flex xs12>
                        <v-btn style="width: 99%" class="caption">
                          <span>{{card.name}}</span>
                          <v-text-field style="display: none" v-model="card.name"></v-text-field>
                          <v-spacer></v-spacer>
                          <span v-show="card.expires">{{card.expires}}</span>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-title>
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
            { name: 'do first', expires: '24.02.2018' },
            { name: 'do second', expires: '25.02.2018' },
            { name: 'do third', expires: '28.02.2018' },
          ],
        },
        {
          name: 'second list!',
          cards: [
            { name: 'complete first', expires: '24.02.2018' },
            { name: 'complete second', expires: '25.02.2018' },
            { name: 'complete third', expires: '28.02.2018' },
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
    openRenameCard(event) {
      const target = event.target;
      console.log(target);
      target.style.display = 'none';
      target.nextElementSibling.style.display = 'block'; // show input
    },
  },
};
</script>

