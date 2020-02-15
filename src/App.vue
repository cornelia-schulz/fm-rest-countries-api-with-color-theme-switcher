<template>
  <div
    :class="dark ? 'dark' : 'light'"
    id="app"
  >
    <Navbar />
    <Home />
  </div>
</template>

<script>
import { EventBus } from './event-bus';
import Home from './components/Home.vue';
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar,
    Home
  },
  data() {
    return {
      dark: false
    }
  },
  mounted(){
    EventBus.$on('switch-theme', dark => {
      this.dark = dark;
    });
  },
  name: 'app'
}
</script>

<style>
</style>
