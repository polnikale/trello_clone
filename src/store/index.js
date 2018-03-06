import Vue from 'vue';
import Vuex from 'vuex';

import * as firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    loading: false,
    groups: ['Personal', 'Favourite'],
    error: null,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setDecks(state, payload) {
      state.user.decks = payload;
    },
    setLists(state, payload) {
      state.user.lists = payload;
    },
    setCards(state, payload) {
      state.user.cards = payload;
    },
    createDeck(state, payload) {
      state.user.decks.push(payload);
    },
    createList(state, payload) {
      state.user.lists.push(payload);
    },
    createCard(state, payload) {
      state.user.cards.push(payload);
    },
  },
  actions: {
    signUserUp({ commit }, payload) {
      commit('setLoading', true);
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          commit('setUser', {
            id: user.uid,
            decks: [],
            lists: [],
            cards: [],
          });
          commit('setLoading', false);
        })
        .catch((error) => {
          console.log(error);
          commit('setLoading', false);
          commit('setError', error);
        });
    },
    signUserIn({ commit }, payload) {
      commit('setLoading', true);
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          commit('setUser', {
            id: user.uid,
            decks: [],
            lists: [],
            cards: [],
          });
          commit('setLoading', false);
        })
        .catch((error) => {
          commit('setLoading', false);
          commit('setError', error);
          console.log(error);
        });
    },
    autoSignIn({ commit }, payload) {
      commit('setUser', {
        id: payload.uid,
        decks: [],
        lists: [],
        cards: [],
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
    createNewDeck({ commit, getters }, payload) {
      commit('setLoading', true);
      const deck = {
        name: payload.name,
        description: payload.description,
        date: payload.date.toISOString(),
        groupName: payload.groupName,
        creatorId: getters.getUser.id,
      };
      firebase.database().ref('/decks').push(deck)
        .then((data) => {
          commit('createDeck', {
            ...deck,
            id: data.key,
          });
          commit('setLoading', false);
        })
        .catch((error) => {
          commit('setLoading', false);
          console.log(error);
        });
    },
    updateDeck() {

    },
    createNewList({ commit, getters }, payload) {
      commit('setLoading', true);
      const list = {
        ...payload,
        creatorId: getters.getUser.id,
      };
      firebase.database().ref('/lists').push(list)
        .then((data) => {
          commit('createList', {
            ...list,
            id: data.key,
          });
          commit('setLoading', false);
        })
        .catch((error) => {
          commit('setLoading', false);
          console.log(error);
        });
    },
    updateList() {

    },
    createNewCard({ commit, getters }, payload) {
      commit('setLoading', true);
      const card = {
        ...payload,
        creatorId: getters.getUser.id,
      };
      firebase.database().ref('/cards').push(card)
        .then((data) => {
          commit('createCard', {
            ...card,
            id: data.key,
          });
          commit('setLoading', false);
        })
        .catch((error) => {
          commit('setLoading', false);
          console.log(error);
        });
    },
    updateCard() {
    },

    loadData({ commit, getters }) {
      commit('setLoading', true);
      firebase.database().ref('/decks').once('value')
        .then((data) => {
          let decks = data.val();
          let decksCreated = [];
          for (let key in decks) {
            if (decks[key].creatorId === getters.getUser.id) {
              const neededData = {
                ...decks[key],
                id: key,
              };
              decksCreated.push(neededData);
            } 
          }
          commit('setDecks', decksCreated);
          firebase.database().ref('/lists').once('value')
            .then((data1) => {
              let lists = data1.val();
              let listsCreated = [];
              for (let key in lists) {
                if (lists[key].creatorId === getters.getUser.id) {
                  const neededData = {
                    ...lists[key],
                    id: key,
                  };
                  listsCreated.push(neededData);
                } 
              }
              commit('setLists', listsCreated);
              firebase.database().ref('/cards').once('value')
                .then((data) => {
                  let cards = data.val();
                  let cardsCreated = [];
                  for (let key in cards) {
                    if (cards[key].creatorId === getters.getUser.id) {
                      const neededData = {
                        ...cards[key],
                        id: key,
                      };
                      cardsCreated.push(neededData);
                    } 
                  }
                  commit('setCards', cardsCreated);
                  commit('setLoading', false);
                });
            });
        })
        .catch((err) => {
          commit('setLoading', false);
          console.log(err);
        });
    },
    // loadListData({ commit, getters }) {
    //   firebase.database().ref('/lists').once('value')
    //     .then((data) => {
    //       let lists = data.val();
    //       let listsCreated = [];
    //       for (let key in lists) {
    //         if (lists[key].creatorId === getters.getUser.id) {
    //           listsCreated.push(lists[key]);
    //         } 
    //       }
    //       commit('setLists', listsCreated);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    // loadCardData({ commit, getters }) {
    //   firebase.database().ref('/cards').once('value')
    //     .then((data) => {
    //       let cards = data.val();
    //       let cardsCreated = [];
    //       for (let key in cards) {
    //         if (cards[key].creatorId === getters.getUser.id) {
    //           const neededData = {
    //             ...cards[key],
    //             id: key,
    //           };
    //           cardsCreated.push(neededData);
    //         } 
    //       }
    //       commit('setCards', cardsCreated);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
  },
  getters: {
    getDecks(state) {
      return state.user.decks;
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
      return state.user.lists;
    },
    getCards(state) {
      return state.user.cards;
    },
    getLoading(state) {
      return state.loading;
    },
  },
});
