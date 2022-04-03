import { createStore } from 'vuex';
import { 
  firebaseAuth, createUserWithEmailAndPassword, usersCollection, doc, setDoc,
  updateProfile, signInWithEmailAndPassword, signOut,
} from '@/includes/firebase';
import { Howl } from 'howler';
import helper from '@/includes/helper';

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
    currentSong: {},
    sound: {},
    seek: '00:00',
    duration: '00:00',
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
    newSong(state, payload) {
      state.currentSong = payload;
      state.sound = new Howl({
        src: [payload.url],
        html5: true,
      });
    },
    updateAudioPosition(state) {
      state.seek = helper.formatTime(state.sound.seek());
      state.duration = helper.formatTime(state.sound.duration());
    },
  },
  getters: {
    // getAuthModalShow: (state) => state.authModalShow,
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing();
      }
      return false;
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
    async newSong({ commit, state, dispatch }, payload) {
      commit('newSong', payload);
      state.sound.play();
      state.sound.on('play', () => {
        requestAnimationFrame(() => {
          dispatch('progressAudio');
        });
      });
    },
    async toggleAudio({ state }) {
      if (!state.sound.playing) {
        return;
      }
      if (state.sound.playing()) {
        state.sound.pause();
      } else {
        state.sound.play();
      }
    },
    progressAudio({ commit, state, dispatch }) {
      commit('updateAudioPosition');
      if (state.sound.playing()) {
        requestAnimationFrame(() => {
          dispatch('progressAudio');
        });
      }
    },
  },
});
