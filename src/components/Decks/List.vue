<template>
  <div>
    <v-card light style="min-height: 90px; width: 96%; background-color:rgba(220, 220, 220, .9)" round>
      <v-card-title style="font-weight: 600">
        {{list.name}}
      </v-card-title>
      <v-container fluid class="pa-2"> 
        <v-layout row v-for="card in cards" :key="card.name" >
          <new-card style="width: 90%" :list="list" :card="card"></new-card> 
        </v-layout>
        <v-layout row>
          <v-btn 
            xl3 lg4 sm6 xs12 
            class="secondary" 
            dark 
            multi-line
            style="min-height: 40px; width: 90%;"
            v-if="!openCardInput"
            @click="openCardInput = true">
            <span>Create new list!</span>
          </v-btn>
          <form v-else @submit.prevent="confirmCreateCard">
            <v-text-field v-model="cardName" required></v-text-field>
            <v-btn class="accent" dark v-if="!openDateInput" @click="openDateInput = true">Choose date(optionally)</v-btn>
            <div v-else>
              <v-date-picker v-model="cardExpires" :reactive="true"></v-date-picker>
              <v-btn class="accent" dark @click="openDateInput = false">Don't want to choose date</v-btn>
            </div>
            <v-btn type="submit" class="success">Create!</v-btn>
          </form>
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
      openDateInput: false,
      cardName: '',
      cardExpires: '',
    };
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    lists() {
      const thisDeckLists = [];
      const lists = this.user.lists;
      for (let counter = 0; counter < lists.length; counter++) {
        if (lists[counter].parentId === this.deck.id) {
          thisDeckLists.push(lists[counter]);
        }
      }
      return thisDeckLists;
    },
    cards() {
      const thisDeckCards = [];
      const cards = this.user.cards;
      for (let counter = 0; counter < cards.length; counter++) {
        if (cards[counter].parentId === this.list.id) {
          thisDeckCards.push(cards[counter]);
        }
      }
      return thisDeckCards;
    },
    formIsValid() {
      if (!this.cardName) {
        return true;
      }
      return false;
    },
  },
  methods: {
    confirmCreateCard() {
      let card;
      if (this.openDateInput) {
        card = {
          name: this.cardName,
          expires: this.cardExpires,
          parentId: this.list.id,
        };}
      else {
        card = {
          name: this.cardName,
          expires: '',
          parentId: this.list.id,
        };
      }
      this.$store.dispatch('createNewCard', card);
      this.openDateInput = false;
      this.openCardInput = false;
      this.cardName = '';
      this.cardExpires = '';
    },
  },
};
</script>

