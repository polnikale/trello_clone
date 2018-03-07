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
      <v-layout row v-for="(group,index) in groups" :key="index">
        <v-flex xs12 lg8 offset-lg2>
          <h3 class="mb-1 ml-2">{{group}}</h3>
          <v-container>
            <v-layout row justify-start wrap>
              <v-flex xl3 lg4 sm6 xs12 v-for="deck in decks" :key="deck.id"  v-if="isInTheGroup(deck,group)" style="position: relative"> 
                <v-btn class="primary mb-2 pa-2" :to="'./deck/'+deck.id" dark style="min-height: 90px; width: 90%;">
                  <span>{{deck.name}}</span>
                </v-btn>
                <v-icon class="star" :class="deck.groupName.indexOf('Favourite') !== -1 ? 'active' : '' " @click="toggleFavourite(deck)">star_border</v-icon>
              </v-flex>
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
    </div>
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
    user() {
      return this.$store.getters.getUser;
    },
    decks() {
      return this.user.decks;
    },
    groups() {
      return this.$store.getters.getGroups;
    },
    loading() {
      return this.$store.getters.getLoading;
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
      this.$store.dispatch('createNewDeck', {
        name: this.newDeckName,
        description: this.newDescription,
        date: new Date(),
        groupName: ['Personal'],
      });
      console.log('lol');
      this.newDeckName = 'Create your deck!';
      this.newDescription = '';
      this.openInput = false;
      return true;
    },
    toggleFavourite(data) {
      const groups = [...data.groupName];
      if (groups.includes('Favourite')) {
        groups.splice(groups.indexOf('Favourite'), 1);
      } else {
        groups.push('Favourite');
      }
      this.$store.dispatch('updateDeck', {
        id: data.id,
        groupName: groups,
      });
    },
  },
};
</script>

<style scoped>
.star {
  color: black !important;
  position: absolute;
  right: 30px;
  cursor: pointer;
  top: 10px;
  z-index: 500;
  transition: all .3s;
}
.star.active {
  color: rgb(161, 161, 4) !important;
}
.star:hover {
  color: rgb(161, 161, 4) !important;
}
</style>

