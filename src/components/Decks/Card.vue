<template>
  <div class="card-in-list">
    <span class="card-title" v-if="!cardShowInputToRename">
      <span>{{cardName}}</span>
      <v-icon @click="showRenameCard" style="font-size: 14px" hint="change name">create</v-icon>
    </span>
    <form v-else @submit.prevent="closeRenameCard">
      <v-text-field name="input" label="Label Text" v-model="cardName" class="input-group--focused"></v-text-field>
      <v-btn class="success" type="submit" dark>Change!</v-btn>
    </form>
    <span v-show="cardExpires" :style="{color: showGreenOrRed}">{{cardExpires}}</span>
  </div>
</template>

<script>
export default {
  props: ['card'],
  data() {
    return {
      cardName: this.card.name,
      cardExpires: this.card.expires,
      cardShowInputToRename: this.card.showInputToRename,
    };
  },
  methods: {
    showRenameCard() {
      this.cardShowInputToRename = true;
    },
    closeRenameCard() {
      this.cardShowInputToRename = false;
      // change data in vuex and firebase
    },
  },
  computed: {
    showGreenOrRed() {
      console.log(new Date() - new Date(this.cardExpires));
      if (new Date() - new Date(this.cardExpires) < 0) {
        return 'green';
      }
      return 'red';
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


