import Vue from 'vue';
import Vuex from 'vuex';

import * as firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    decks: [],
    lists: [],
    cards: [],
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
    createList(state, payload) {
      state.lists.push(payload);
    },
    createCard(state, payload) {
      state.cards.push(payload);
    },
  },
  actions: {
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
    updateDeck() {

    },
    createNewList({ commit }, payload) {
      firebase.database().ref('/lists').push(payload)
        .then((data) => {
          commit('createList', {
            ...payload,
            id: data.key,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateList() {

    },
    createNewCard({ commit }, payload) {
      firebase.database().ref('/cards').push(payload)
        .then((data) => {
          commit('createCard', {
            ...payload,
            key: data.key,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateCard() {
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
    getLists(state) {
      return state.lists;
    },
    getCards(state) {
      return state.cards;
    },
  },
});
