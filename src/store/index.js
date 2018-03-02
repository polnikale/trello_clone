import Vue from 'vue';
import Vuex from 'vuex';

import * as firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    decks: [
      {
        name: 'My first trello app!',
        type: 'Private',
        description: 'This is just for managing my trello app!',
        groupName: ['Personal'],
        id: 'smmeseefsesbb',
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
      },
      {
        name: 'My first trello app!',
        type: 'Private',
        description: 'This is just for managing my trello app!',
        groupName: ['Personal'],
        id: 'smmesesesbb',
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
      },
      {
        name: 'My app!',
        type: 'Private',
        description: 'This is just for managing my trello app!',
        groupName: ['Personal', 'Favourite'],
        id: 'smesesesbb',
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
      },
      {
        name: 'My second trello app!',
        type: 'Private',
        description: 'This is just for managing my trello app!',
        groupName: ['Favourite'],
        id: 'smmejytbngsbb',
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
      },
    ],
  },
  mutations: {},
  actions: {
    updateCard({ commit, getters }, payload) {
      const deck = payload.deck;
      const decks = getters.getDecks;
      const card = payload.card;
      let neededCard;
      const neededDeckList = decks[decks.indexOf(deck)].lists;
      for (let counter = 0; counter <= neededDeckList.length; counter += 1) {
        if (neededDeckList[counter].cards.indexOf(card) !== -1) {
          neededCard = neededDeckList[counter].cards[neededDeckList[counter].cards.indexOf(card)];
          break;
        }
      }
      if (data.name) {
        neededCard.name = data.name;
      }
      if (data.expires) {
        neededCard.expires = data.expires;
      }
    },
    signUserUp({ commit }, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((hey) => {
          console.log(hey);
        });
    },
  },
  getters: {
    getDecks(state) {
      return state.decks;
    },
  },
});