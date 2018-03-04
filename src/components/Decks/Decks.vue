<template>
  <v-container fluid>
    <v-layout row v-for="(group,index) in groups" :key="index">
      <v-flex xs12 lg8 offset-lg2>
        <h3 class="mb-1 ml-2">{{group}}</h3>
        <v-container>
          <v-layout row justify-start wrap>
            <v-flex xl3 lg4 sm6 xs12 v-for="deck in decks" :key="deck.id"  v-if="isInTheGroup(deck,group)">
              <v-btn class="primary mb-2 pa-2" :to="'./deck/'+deck.id" dark style="min-height: 90px; width: 90%;">
                {{deck.name}}
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 lg8 offset-lg2>
        <v-container>
          <v-layout>
            <v-flex xl3 lg4 sm6 xs12>
              <v-btn 
                xl3 lg4 sm6 xs12 
                class="secondary pa-2" 
                dark 
                style="min-height: 90px; width: 90%;"
                @click="openInput = !openInput"
                v-if="!openInput" >
                <span>{{newDeckName}}</span>
              </v-btn>
              <form v-else class="pa-2" dark @submit.prevent="createNewDeck" style="border-radius: 5px; border: 1px solid black;">
                <v-layout row>
                  <v-flex xs12 sm6 offset-sm3>
                    <v-text-field
                      name="name"
                      flat
                      label="Name"
                      id="Name"
                      v-model="newDeckName"
                      required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12 sm6 offset-sm3>
                    <v-text-field
                      name="description"
                      label="Description"
                      id="Description"
                      v-model="newDescription"
                      required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12 sm6 offset-sm3>
                    <v-btn 
                        class="primary" 
                        :disabled="formIsValid"
                        type="submit">Create meetup</v-btn>
                  </v-flex>
                </v-layout>
              </form>
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
      newDeckName: 'Create new deck!',
      openInput: false,
      newDescription: '',
    };
  },
  computed: {
    formIsValid() {
      if (!this.newDeckName || !this.newDescription) {
        return true;
      }
      return false;
    },
    decks() {
      return this.$store.getters.getDecks;
    },
    groups() {
      return this.$store.getters.getGroups;
    },
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
    createNewDeck() {
      this.decks.push({
        name: this.newDeckName,
        description: this.newDescription,
        groupName: ['Personal'],
        id: +new Date() + this.newDeckName,
      });
      this.newDeckName = 'Create your deck!';
      this.newDescription = '';
      this.openInput = false;
      return true;
    },
  },
};
</script>

