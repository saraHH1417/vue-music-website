import {
  firebaseAuth, createUserWithEmailAndPassword, usersCollection, doc, setDoc,
  updateProfile, signInWithEmailAndPassword, signOut,
} from '@/includes/firebase';

export default {
  state: {
    authModalShow: false,
    userLoggedIn: false,
  },
  getters: {

  },
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
  },
  actions: {
    async register({ commit }, payload) {
      // in fact commmit is destructured part of ctx , since we don't need all parts of ctx ,
      // we use {} for destructring it and selecting only the parts that we need
      const userCred = await
      createUserWithEmailAndPassword(firebaseAuth, payload.email, payload.password);
      const document = await doc(usersCollection, userCred.user.uid);

      await setDoc(document, {
        name: payload.name,
        email: payload.email,
        age: payload.age,
        country: payload.country,
      });

      await updateProfile(userCred.user, {
        displayName: payload.name,
      });

      commit('toggleAuth');
    },
    async login({ commit }, payload) {
      if (await signInWithEmailAndPassword(firebaseAuth, payload.email, payload.password)) {
        commit('toggleAuth');
      }
    },
    init_login({ commit }) {
      const user = firebaseAuth.currentUser;
      if (user) {
        commit('toggleAuth');
      }
    },
    async signOut({ commit }) {
      try {
        await signOut(firebaseAuth);
      } catch (error) {
        console.log(error);
      }

      commit('toggleAuth');
    },
  },
};
