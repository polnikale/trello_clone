<template>
  <v-flex>
    <div class="card-in-list" v-if="!openCardRenameInput">
      <span class="card-title">
        <span>{{cardName}}</span>
        <v-icon style="font-size: 14px" @click="openCardRenameInput = true">create</v-icon>
      </span>
      <span v-show="cardExpires" :style="{color: showGreenOrRed}">{{cardExpires}}</span>
    </div>
    <form v-else @submit.prevent="confirmRenameCard">
      <h3>Change your name!</h3>
      <v-text-field v-model="cardName" required></v-text-field>
      <div v-show="cardExpires">
        <h3>Change your date!</h3>
        <v-date-picker v-model="cardExpires" :reactive="true" style="width: 100%"></v-date-picker>
      </div>
      <v-btn type="submit" class="success">Change!</v-btn>
    </form>
  </v-flex>
  
</template>

<script>
export default {
  props: ['list', 'card'],
  data() {
    return {
      openCardRenameInput: false,
      cardName: this.card.name,
      cardExpires: this.card.expires,
    };
  },
  computed: {
    cards() {
      const cards = this.$store.getters.getCards;
      const thisListCards = [];
      for (let cardCounter = 0; cardCounter < cards.length; cardCounter += 1) {
        if (cards[cardCounter].parentId === this.list.id) {
          thisListCards.push(cards[cardCounter]);
        }
      }
      return thisListCards;
    },
    showGreenOrRed() {
      if (new Date() - new Date(this.cardExpires) < 0) {
        return 'green';
      }
      return 'red';
    },
  },
  methods: {
    confirmRenameCard() {
    },
  },
};
</script>

<style scoped>
.card-in-list {
  border-radius: 5px;
  padding: 6px;
  background-color: #fff;
  margin-bottom: 10px;
  transition: all 0.3s;
  cursor: pointer;
}

.card-title {
  display: flex;
  justify-content: space-between;
}

.card-in-list:hover {
  background-color: rgba(201, 200, 200, 0.65);
}

span.green {
  background-color: green;
}
span.red {
  background-color: red;
}
</style>


