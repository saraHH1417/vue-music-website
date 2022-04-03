<template>
  <div>
    <app-header></app-header>

    <router-view></router-view>
    <!-- Player -->
    <player-component></player-component>
    <auth-modal></auth-modal>
  </div>
</template>

<script>
import PlayerComponent from '@/components/PlayerComponent.vue';
import AppHeader from './components/AppHeader.vue';
import AuthModal from './components/AuthModal.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AuthModal,
    PlayerComponent,
  
  },
  created() {
    this.$store.dispatch('init_login');
  },
};
</script>
