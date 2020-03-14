<template>
  <div
    :class="dark ? 'dark' : 'light'"
    id="app"
  >
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
import { EventBus } from './event-bus';
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar
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

<style lang=scss>
  @import "./assets/scss/reset.scss";
  @import "./assets/scss/styles.scss";
</style>
