import Vue from 'vue';
import Vuex from 'vuex';

import * as firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    decks: [],
    groups: ['Personal', 'Favourite'],
    error: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    createDeck(state, payload) {
      state.decks.push(payload);
    },
  },
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
      if (payload.name) {
        neededCard.name = payload.name;
      }
      if (payload.expires) {
        neededCard.expires = payload.expires;
      }
    },
    signUserUp({ commit }, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          commit('setUser', {
            id: user.uid,
            decks: [],
          });
        })
        .catch((error) => {
          console.log(error);
          commit('setError', error);
        });
    },
    signUserIn({ commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          commit('setUser', {
            id: user.uid,
            decks: [],
          });
        })
        .catch((error) => {
          commit('setError', error);
          console.log(error);
        });
    },
    autoSignIn({ commit }, payload) {
      commit('setUser', {
        id: payload.uid,
        decks: [],
      });
    },
    fetchUserData() {
      // it goes later
    },
    logoutUser({ commit }) {
      firebase.auth().signOut()
        .then(() => {
          commit('setUser', null);
        })
        .catch((err) => {
          console.log(err);
        });
    },


    createNewDeck({ commit }, payload) {
      const deck = {
        name: payload.name,
        description: payload.description,
        date: payload.date.toISOString(),
        groupName: payload.groupName,
      };
      console.log(deck);
      firebase.database().ref('/decks').push(deck)
        .then((data) => {
          commit('createDeck', {
            ...deck,
            id: data.key,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  getters: {
    getDecks(state) {
      return state.decks;
    },
    getUser(state) {
      return state.user;
    },
    getError(state) {
      return state.error;
    },
    getGroups(state) {
      return state.groups;
    },
  },
});
