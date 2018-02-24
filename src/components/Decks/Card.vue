<template>
  <div class="card-in-list">
    <span class="card-title" v-if="!cardShowInputToRename">
      <span>{{cardName}}</span>
      <v-icon @click="toggleRenameCard" style="font-size: 14px" hint="change name">create</v-icon>
    </span>
    <form v-else @submit.prevent="toggleRenameCard">
      <v-text-field name="input" label="Label Text" v-model="cardName" class="input-group--focused"></v-text-field>
      <v-btn class="success" type="submit" dark>Change!</v-btn>
    </form>
    <span v-show="cardExpires">{{cardExpires}}</span>
  </div>
</template>

<script>
export default {
  props: ['name', 'expires', 'showInputToRename'],
  data() {
    return {
      cardName: this.name,
      cardExpires: this.expires,
      cardShowInputToRename: this.showInputToRename,
    };
  },
  methods: {
    toggleRenameCard() {
      this.cardShowInputToRename = !this.cardShowInputToRename;
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
</style>


